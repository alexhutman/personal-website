import Lookups from './Lookups';

type keyRange = 128 | 192 | 256;

export default class AES {
  private N_b = 4;
  private keyLength: number;

  private N_k!: number;
  private N_r!: number;

  private keySchedule!: number[][];

  constructor(key_len: number) {
    this.keyLength = key_len as keyRange;
  }

  private generateRoundConsts(): number[] {
    const rc: number[] = [];

    this.range(10).forEach((i) => {
      if (i == 0) {
        rc.push(1);
      } else if (i > 0 && rc[i-1] < 0x80) {
        rc.push(2 * rc[i-1]);
      } else if (i > 0 && rc[i - 1] >= 0x80) {
        rc.push(((2 * rc[i-1]) ^ 0x1B) & 0xFF);
      }
    });

    return rc;
  }

  private numberDictKeys(dict: Record<string, Number>): number[] {
    return Object.keys(dict).map((str) => Number(str));
  }

  // From https://stackoverflow.com/a/10050831/6708303
  private range(size:number, startAt:number = 0):ReadonlyArray<number> {
    return [...Array(size).keys()].map(i => i + startAt);
  }


  public encrypt(msg: number[][][], key: number[]): string {
    this.validateKey(key, this.keyLength);
    [this.N_k, this.N_r] = this.calculateConstants(key, this.keyLength);

    this.keySchedule = this.generateKeySchedule(key);

    const encrypted_blocks = new Array<Array<Array<number>>>();

    msg.forEach((block) => {
      let state = this.addRoundKey(block, this.getRoundKey(0));

      this.range(1, this.N_r+1).forEach((roundI) => {
        state = this.byteSub(state);
        state = this.transpose(this.shiftRow(this.transpose(state)));
        if (roundI != this.N_r){
          state = this.transpose(this.mixColumns(this.transpose(state)))
        }

        const rKey = this.getRoundKey(roundI);

        state = this.addRoundKey(state, rKey)
      });

      encrypted_blocks.push(state)
    });

    return "".join([hexify_state(enc_block) for enc_block in encrypted_blocks])
  }

  private byteSub(state: number[][]) {
    const subbed = new Array<Array<number>>();

    this.range(state.length).forEach((i) => {
      const temp = new Array<number>();
        this.range(state[i].length).forEach((j) => {
          temp.push(Lookups.sBox[state[i][j]]);
        });
      subbed.push(temp);
    });
    return state;
  }

  private addRoundKey(state: number[][], roundKey: number[][]): number[][] {
    const XORd = new Array<Array<number>>();
    this.range(roundKey.length).forEach((i) => {
      XORd.push(this.xorCol(state[i], roundKey[i]))
    });
    return XORd;
  }

  private transpose(matrix: number[][]) {
    const transposed = new Array<Array<number>>();
    this.range(matrix.length).forEach((row) => {
      const temp = new Array<number>();
      this.range(matrix[0].length).forEach((col) => {
        temp.push(matrix[col][row]);
      });
      transposed.push(temp);
    });
    return transposed;
  }

  private validateKey(key: number[], keyLen: number): void {
    const numRounds = {
      128: 10,
      192: 12,
      256: 14
    };

    if (!this.numberDictKeys(numRounds).includes(keyLen)) {
      throw `KeyLengthException: Key length must be either 128, 192, or 256 bits long (got ${keyLen}).`;
    }

    const givenKeyLen = 8 * key.length;
    if (givenKeyLen != keyLen) {
      throw `KeyLengthException: Key length must be ${keyLen} long (got ${givenKeyLen} bits).`;
    }
  }

  private calculateConstants(key: number[], keyLen: number): number[] {
    const numRounds: { [keyLen: number]: number } = {
      128: 10,
      192: 12,
      256: 14
    };

    const N_k = keyLen / 32;
    const N_r = numRounds[keyLen];
    return [N_k, N_r];
  }

  private xorCol(col1: number[], col2: number[]): number[] {
    const temp = new Array<number>(col1.length);
    this.range(col1.length).forEach((i) => {
      temp[i] = col1[i] ^ col2[i];
    });

    return temp;
  }

  private rotWord(word: number[], n: number) {
    const temp = new Array<number>(word.length);
    this.range(n, word.length + n).forEach((i) => {
      temp.push(word[i % word.length])
    });
    return temp;
  }

  private transformCol(col: number[], r_const: number) {
    const temp = this.rotWord(col, 1);
    this.range(temp.length).forEach((i) => {
      temp[i] = Lookups.sBox[temp[i]];
    });
    temp[0] = temp[0] ^ r_const;
    return temp;
  }

  private generateKeySchedule(key: number[]): number[][] {
    const rCon = this.generateRoundConsts();

    const w = new Array<Array<number>>();
    // const w: number[][];
    this.range(4*(this.N_r+1)).forEach((i) => {
      if (i < this.N_k) {
        w.push(key.slice(4*i, 4*i+4));
      } else if (i >= this.N_k && i % this.N_k == 0) {
        w.push(this.xorCol(w[i - this.N_k], this.transformCol(w[i - 1], rCon[(i / this.N_k) - 1])))
      } else if (i >= this.N_k && this.N_k > 6 && i % this.N_k == 4) {
        const substituted = new Array<number>(w[i - 1].length);
        this.range(w[i - 1].length).forEach((j) => {
          substituted[j] = Lookups.sBox[w[i - 1][j]];
        });
        w.push(this.xorCol(w[i - this.N_k], substituted));
      } else {
        w.push(this.xorCol(w[i - this.N_k], w[i-1]));
      }
    });

    return w;
  }

  private getRoundKey(curRound: number): number[][] {
    return this.keySchedule.slice(4*curRound, 4*curRound+4);
  }
}
