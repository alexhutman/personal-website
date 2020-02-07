/* eslint-disable */

import Lookups from './Lookups';

type keyRange = 128 | 192 | 256;

export default class AES {
  private Nb = 4;

  private keyLength: number;

  private Nk!: number;

  private Nr!: number;

  private keySchedule!: number[][];

  constructor(keyLen: number) {
    this.keyLength = keyLen as keyRange;
  }

  private static generateRoundConsts(): number[] {
    const rc: number[] = [];

    AES.range(10).forEach((i) => {
      if (i === 0) {
        rc.push(1);
      } else if (i > 0 && rc[i - 1] < 0x80) {
        rc.push(2 * rc[i - 1]);
      } else if (i > 0 && rc[i - 1] >= 0x80) {
        rc.push(((2 * rc[i - 1]) ^ 0x1B) & 0xFF);
      }
    });

    return rc;
  }

  private static numberDictKeys(dict: Record<string, Number>): number[] {
    return Object.keys(dict).map(str => Number(str));
  }

  // From https://stackoverflow.com/a/10050831/6708303
  private static range(size:number, startAt:number = 0):ReadonlyArray<number> {
    return [...Array(size).keys()].map(i => i + startAt);
  }


  public encrypt(msg: number[][][], key: number[]): string {
    AES.validateKey(key, this.keyLength);
    [this.Nk, this.Nr] = AES.calculateConstants(key, this.keyLength);

    this.keySchedule = this.generateKeySchedule(key);

    const encryptedBlocks: number[][][] = [[[]]];

    msg.forEach((block) => {
      let state = AES.addRoundKey(block, this.getRoundKey(0));

      AES.range(1, this.Nr + 1).forEach((roundI) => {
        state = AES.byteSub(state);
        state = AES.transpose(AES.shiftRow(AES.transpose(state)));
        if (roundI !== this.Nr) {
          state = AES.transpose(AES.mixColumns(AES.transpose(state)));
        }

        const rKey = this.getRoundKey(roundI);

        state = AES.addRoundKey(state, rKey);
      });

      encryptedBlocks.push(state);
    });

    let res = '';
    encryptedBlocks.forEach((block) => {
      res += AES.hexifyState(block);
    });
    return res;
  }

  private static byteSub(state: number[][]) {
    const subbed: number[][] = [[]];

    AES.range(state.length).forEach((i) => {
      const temp: number[] = [];
      AES.range(state[i].length).forEach((j) => {
        temp.push(Lookups.sBox[state[i][j]]);
      });
      subbed.push(temp);
    });
    return state;
  }

  private static addRoundKey(state: number[][], roundKey: number[][]): number[][] {
    const XORd: number[][] = [[]];
    AES.range(roundKey.length).forEach((i) => {
      XORd.push(AES.xorCol(state[i], roundKey[i]));
    });
    return XORd;
  }

  private static shiftRow(state: number[][]) {
    const temp: number[][] = [[]];

    AES.range(state.length).forEach((row) => {
      temp.push(AES.rotWord(state[row], row));
    });
    return temp;
  }

  private static mixColumns(state: number[][]): number[][] {
    /*
    Multiplies the state matrix with the following matrix on the left:
    [x   x+1   1   1]
    [1   x   x+1   1]
    [1   1   x   x+1]
    [x+1   1   1   x]
    :param state:
    :return:
    */
    const statePrime: number[][] = [[]];
    AES.range(4).forEach((i) => {
      statePrime.push([0, 0, 0, 0]);
    });
    AES.range(state.length).forEach((col) => {
      statePrime[0][col] = Lookups.multTable.get([0x2, state[0][col]])
                           ^ Lookups.multTable.get([0x3, state[1][col]])
                           ^ state[2][col]
                           ^ state[3][col];
      statePrime[1][col] = state[0][col]
                           ^ Lookups.multTable.get([0x2, state[1][col]])
                           ^ Lookups.multTable.get([0x3, state[2][col]])
                           ^ state[3][col];
      statePrime[2][col] = state[0][col]
                           ^ state[1][col]
                           ^ Lookups.multTable.get([0x2, state[2][col]])
                           ^ Lookups.multTable.get([0x3, state[3][col]]);
      statePrime[3][col] = Lookups.multTable.get([0x3, state[0][col]])
                           ^ state[1][col]
                           ^ state[2][col]
                           ^ Lookups.multTable.get([0x2, state[3][col]]);
    });
    return statePrime;
  }

  private static transpose(matrix: number[][]) {
    const transposed: number[][] = [[]];
    AES.range(matrix.length).forEach((row) => {
      const temp: number[] = [];
      AES.range(matrix[0].length).forEach((col) => {
        temp.push(matrix[col][row]);
      });
      transposed.push(temp);
    });
    return transposed;
  }

  private static validateKey(key: number[], keyLen: number): void {
    const numRounds = {
      128: 10,
      192: 12,
      256: 14,
    };

    if (!AES.numberDictKeys(numRounds).includes(keyLen)) {
      throw new Error(`KeyLengthException: Key length must be either 128, 192,
                       or 256 bits long (got ${keyLen}).`);
    }

    const givenKeyLen = 8 * key.length;
    if (givenKeyLen !== keyLen) {
      throw new Error(`KeyLengthException: Key length must be ${keyLen} long
                       (got ${givenKeyLen} bits).`);
    }
  }

  private static calculateConstants(key: number[], keyLen: number): number[] {
    const numRounds: { [keyLen: number]: number } = {
      128: 10,
      192: 12,
      256: 14,
    };

    const Nk = keyLen / 32;
    const Nr = numRounds[keyLen];
    return [Nk, Nr];
  }

  private static xorCol(col1: number[], col2: number[]): number[] {
    const temp = new Array<number>(col1.length);
    AES.range(col1.length).forEach((i) => {
      temp[i] = col1[i] ^ col2[i];
    });

    return temp;
  }

  private static rotWord(word: number[], n: number) {
    const temp: number[] = [];
    AES.range(word.length, n).forEach((i) => {
      temp.push(word[i % word.length]);
    });
    return temp;
  }

  private static transformCol(col: number[], rConst: number) {
    const temp = AES.rotWord(col, 1);
    AES.range(temp.length).forEach((i) => {
      temp[i] = Lookups.sBox[temp[i]];
    });

    temp[0] ^= rConst;
    return temp;
  }

  private generateKeySchedule(key: number[]): number[][] {
    const rCon = AES.generateRoundConsts();

    const w: number[][] = [[]];
    // const w: number[][];
    AES.range(4 * (this.Nr + 1)).forEach((i) => {
      if (i < this.Nk) {
        w.push(key.slice(4 * i, 4 * i + 4));
      } else if (i >= this.Nk && i % this.Nk === 0) {
        w.push(AES.xorCol(w[i - this.Nk], AES.transformCol(w[i - 1], rCon[(i / this.Nk) - 1])));
      } else if (i >= this.Nk && this.Nk > 6 && i % this.Nk === 4) {
        const substituted = new Array<number>(w[i - 1].length);
        AES.range(w[i - 1].length).forEach((j) => {
          substituted[j] = Lookups.sBox[w[i - 1][j]];
        });
        w.push(AES.xorCol(w[i - this.Nk], substituted));
      } else {
        w.push(AES.xorCol(w[i - this.Nk], w[i - 1]));
      }
    });

    return w;
  }

  private getRoundKey(curRound: number): number[][] {
    return this.keySchedule.slice(4 * curRound, 4 * curRound + 4);
  }

  // Shoutout to Al
  private static hexifyState(state: number[][]): string {
    let res = '';
    state.forEach((row) => {
      row.forEach((entry) => {
        const hexed = entry.toString(16).padStart(2, '0');
        res += hexed;
      });
    });
    return res as string;
  }
}
