type keyRange = 128 | 192 | 256;

export default class AES {
  private N_b = 4;
  private keyLength: number;

  private N_k: number;
  private N_r: number;

  private keySchedule: number[];

  constructor(key_len: number) {
    this.keyLength = key_len as keyRange;
  }

  public encrypt(msg: string[], key: string[]): string {
    this.validateKey(key, this.keyLength);
    [this.N_k, this.N_r] = this.calculateConstants(key, this.keyLength);

    this.keySchedule = this.generateKeySchedule(key);
    print("-"*25)
    print("KEY SCHEDULE:")
    #pprint([[hex(a) for a in row] for row in this.key_schedule])
    print("-"*25)

    encrypted_blocks = []

    for block in msg:
        state = this.__add_round_key(block, this.__get_round_key(0))  # Add initial key to message block

        print("round {} - state: {}".format(0, hexify_state(state)))
        for round_i in range(1, this.N_r+1):
            state = this.__byte_sub(state)
            print("round {} - bytesub: {}".format(round_i, hexify_state(state)))
            state = transpose(this.__shift_row(transpose(state)))
            print("round {} - shift_row: {}".format(round_i, hexify_state(state)))
            if round_i != this.N_r:
                state = transpose(this.__mix_columns(transpose(state)))
                print("round {} - mix_columns: {}".format(round_i, hexify_state(state)))

            print("-"*25)
            print(f"ROUND KEY FOR ROUND {round_i}:")
            r_key = this.__get_round_key(round_i)
            print(hexify_state(r_key))
            print("-"*25)

            state = this.__add_round_key(state, r_key)
            print("round {} - add_round_key: {}".format(round_i, hexify_state(state)))

        encrypted_blocks.append(state)

    return "".join([hexify_state(enc_block) for enc_block in encrypted_blocks])
  }

  private validateKey(key: string[], keyLen: number): void {
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

  private calculateConstants(key: string[], keyLen: number): number[] {
    const numRounds = {
      128: 10,
      192: 12,
      256: 14
    };

    const N_k = keyLen / 32;
    const N_r = numRounds[keyLen];
    return [N_k, N_r];
  }

  // private generateKeySchedule(key: string[]): string[] {
  //   const rCon = this.generateRoundConsts();

  //   const w = [];
  //   for i in range(4*(self.N_r+1)): #TODO: change 11 to num_round keys needed
  //       #print(f"i = {i}")
  //       if i < self.N_k:
  //           print("Case 1")
  //           w.append(key[4*i:4*i+4])
  //       elif i >= self.N_k and i % self.N_k == 0:
  //           print("Case 2")
  //           w.append(Encrypt.__xor_col(w[i - self.N_k], Encrypt.__transform_col(w[i - 1], Rcon[(i // self.N_k) - 1])))
  //       elif i >= self.N_k and self.N_k > 6 and i % self.N_k == 4:
  //           print("Case 3")
  //           w.append(Encrypt.__xor_col(w[i - self.N_k], [lookups.s_box[x] for x in w[i-1]]))
  //       else:
  //           print("Case 4")
  //           w.append(Encrypt.__xor_col(w[i - self.N_k], w[i-1]))
  //       #print(f"w[{i}] = {''.join([hex(a)[2:].rjust(2, '0') for a in w[i]])}")

  //   return w
  // }

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

  private range(n: number): number[] {
    return [...Array(n).keys()];
  }
}
