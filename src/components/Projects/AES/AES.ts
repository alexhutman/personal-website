/* eslint-disable */

import { Lookups, MultTable } from './Lookups';

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
    // console.log(`msg: ${JSON.stringify(msg)}`);
    // console.log(`key: ${JSON.stringify(key)}`);
    AES.validateKey(key, this.keyLength);
    [this.Nk, this.Nr] = AES.calculateConstants(key, this.keyLength);

    this.keySchedule = this.generateKeySchedule(key);
    // console.log(`keyschedule: ${JSON.stringify(this.keySchedule)}`);

    const encryptedBlocks: number[][][] = [];

    msg.forEach((block) => {
    let state = AES.addRoundKey(block, this.getRoundKey(0));

    // console.log(`initial msg: ${JSON.stringify(msg)}`);
    // console.log(`roundkey0: ${JSON.stringify(this.getRoundKey(0))}`);

    AES.range(this.Nr, 1).forEach((roundI) => {
      console.log(`i: ${roundI}`);
      console.log(`state: ${JSON.stringify(state)}`);
      state = AES.byteSub(state);
      console.log(`after bytesub: ${JSON.stringify(state)}`);
      // console.log(`transposed: ${JSON.stringify(AES.transpose(state))}`);
      state = AES.transpose(AES.shiftRow(AES.transpose(state)));
      console.log(`after transpose(shiftrow(transpose))): ${JSON.stringify(state)}`);
      if (roundI !== this.Nr) {
        const t1 = AES.transpose(state);
        console.log(`conditional transpose1: ${JSON.stringify(t1)}`);

        const mc1 = AES.mixColumns(t1);
        console.log(`conditional mixcolumns: ${JSON.stringify(mc1)}`);

        const t2 = AES.transpose(mc1);
        console.log(`conditional transpose2 ${JSON.stringify(t2)}`);

        state = t2;
        // state = AES.transpose(AES.mixColumns(AES.transpose(state)));
        // console.log(`conditional transpose(mix_cols(transpose())): ${JSON.stringify(state)}`);
      }

      const rKey = this.getRoundKey(roundI);
      console.log(`round ${roundI} key: ${JSON.stringify(rKey)}`);

      state = AES.addRoundKey(state, rKey);
      console.log(`after ARK: ${JSON.stringify(state)}`);
      console.log('');
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
    const subbed: number[][] = [];

    AES.range(state.length).forEach((i) => {
      const temp: number[] = [];
      AES.range(state[i].length).forEach((j) => {
        temp.push(Lookups.sBox[state[i][j]]);
      });
      subbed.push(temp);
    });
    return subbed;
  }

  private static addRoundKey(state: number[][], roundKey: number[][]): number[][] {
    // console.log(`state in ARK: ${JSON.stringify(state)}`);
    const XORd: number[][] = [];
    AES.range(roundKey.length).forEach((i) => {
      XORd.push(AES.xorCol(state[i], roundKey[i]));
    });
    return XORd;
  }

  private static shiftRow(state: number[][]) {
    const temp: number[][] = [];

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
    const statePrime: number[][] = [];
    AES.range(4).forEach((i) => {
      statePrime.push([0, 0, 0, 0]);
    });
    AES.range(state.length).forEach((col) => {
      statePrime[0][col] = MultTable.multiplyInGF256(0x2, state[0][col])
                           ^ MultTable.multiplyInGF256(0x3, state[1][col])
                           ^ state[2][col]
                           ^ state[3][col];
      console.log(`multtable[0x2, ${state[0][col]}]: ${MultTable.multiplyInGF256(0x2, state[0][col])}`);
      console.log(`multtable[0x3, ${state[1][col]}]: ${MultTable.multiplyInGF256(0x3, state[1][col])}`);
      console.log(`state[2][${col}]: ${state[2][col]}`);
      console.log(`state[3][${col}]: ${state[3][col]}`);
      // console.log(`first column: ${JSON.stringify(statePrime[0][col])}`);
      statePrime[1][col] = state[0][col]
                           ^ MultTable.multiplyInGF256(0x2, state[1][col])
                           ^ MultTable.multiplyInGF256(0x3, state[2][col])
                           ^ state[3][col];
      console.log(`state[0][${col}]: ${state[0][col]}`);
      console.log(`multtable[0x2, ${state[1][col]}]: ${MultTable.multiplyInGF256(0x2, state[1][col])}`);
      console.log(`multtable[0x3, ${state[2][col]}]: ${MultTable.multiplyInGF256(0x3, state[2][col])}`);
      console.log(`state[3][${col}]: ${state[3][col]}`);
      // console.log(`second column: ${JSON.stringify(statePrime[1][col])}`);
      statePrime[2][col] = state[0][col]
                           ^ state[1][col]
                           ^ MultTable.multiplyInGF256(0x2, state[2][col])
                           ^ MultTable.multiplyInGF256(0x3, state[3][col]);
      console.log(`state[0][${col}]: ${state[0][col]}`);
      console.log(`state[1][${col}]: ${state[1][col]}`);
      console.log(`multtable[0x2, ${state[2][col]}]: ${MultTable.multiplyInGF256(0x2, state[2][col])}`);
      console.log(`multtable[0x3, ${state[3][col]}]: ${MultTable.multiplyInGF256(0x3, state[3][col])}`);
      // console.log(`third column: ${JSON.stringify(statePrime[2][col])}`);
      statePrime[3][col] = MultTable.multiplyInGF256(0x3, state[0][col])
                           ^ state[1][col]
                           ^ state[2][col]
                           ^ MultTable.multiplyInGF256(0x2, state[3][col]);
      console.log(`multtable[0x3, ${state[0][col]}]: ${MultTable.multiplyInGF256(0x3, state[0][col])}`);
      console.log(`state[1][${col}]: ${state[1][col]}`);
      console.log(`state[2][${col}]: ${state[2][col]}`);
      console.log(`multtable[0x2, ${state[3][col]}]: ${MultTable.multiplyInGF256(0x2, state[3][col])}`);
      // console.log(`fourth column: ${JSON.stringify(statePrime[3][col])}`);
    });
    return statePrime;
  }

  private static transpose(matrix: number[][]) {
    const transposed: number[][] = [];
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

    const w: number[][] = [];
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
