import P5 from 'p5';

export default class GaussianBlur {
  p5: P5;

  kernelsize = 31;

  kernelwidth: number = Math.floor(this.kernelsize / 2);

  sigma = 9;

  constructor(p5: P5) {
    this.p5 = p5;
  }

  public gaussianBlur(cnv: HTMLCanvasElement): void {
    const imgWidth = cnv.width;
    const imgHeight = cnv.height;

    const trueWidth = imgWidth - 1;
    const trueHeight = imgHeight - 1;

    const weightVector = this.createWM(this.kernelsize, this.kernelwidth);

    this.p5.loadPixels();

    // Horizontal pass
    for (let y = 0; y < imgHeight; y += 1) {
      for (let x = 0; x < imgWidth; x += 1) {
        const xBasis = x - this.kernelwidth;
        const loc = 4 * (y * imgWidth + x);
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        // let sumA = 0;

        for (let xOffset = 0; xOffset < this.kernelsize; xOffset += 1) {
          let curX = xBasis + xOffset;
          const offscreenXneg = curX < 0;
          const offscreenXpos = curX > trueWidth;
          if (offscreenXneg) {
            curX = 0;
          }
          if (offscreenXpos) {
            curX = trueWidth;
          }

          const matrixVal = weightVector[xOffset];
          const curColor = 4 * (y * imgWidth + curX);
          sumR += matrixVal * this.p5.pixels[curColor];
          sumG += matrixVal * this.p5.pixels[curColor + 1];
          sumB += matrixVal * this.p5.pixels[curColor + 2];
          // sumA += matrixVal * this.p5.pixels[curColor + 3];
        }
        this.p5.pixels[loc] = sumR;
        this.p5.pixels[loc + 1] = sumG;
        this.p5.pixels[loc + 2] = sumB;
        // this.p5.pixels[loc + 3] = sumA;
      }
    }

    // Vertical pass
    for (let x = 0; x < imgWidth; x += 1) {
      for (let y = 0; y < imgHeight; y += 1) {
        const yBasis = y - this.kernelwidth;
        const loc = 4 * (y * imgWidth + x);
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        // let sumA = 0;

        for (let yOffset = 0; yOffset < this.kernelsize; yOffset += 1) {
          let curY = yBasis + yOffset;
          const offscreenYneg = curY < 0;
          const offscreenYpos = curY > trueHeight;
          if (offscreenYneg) {
            curY = 0;
          }
          if (offscreenYpos) {
            curY = trueHeight;
          }

          const matrixVal = weightVector[yOffset];
          const curColor = 4 * (curY * imgWidth + x);
          // console.log(curColor);
          sumR += matrixVal * this.p5.pixels[curColor];
          sumG += matrixVal * this.p5.pixels[curColor + 1];
          sumB += matrixVal * this.p5.pixels[curColor + 2];
          // sumA += matrixVal * this.p5.pixels[curColor + 3];
        }
        this.p5.pixels[loc] = sumR;
        this.p5.pixels[loc + 1] = sumG;
        this.p5.pixels[loc + 2] = sumB;
        // this.p5.pixels[loc + 3] = sumA;
      }
    }

    this.p5.updatePixels();
  }

  private blur(x: number, y: number) {
    const twoSigma = 2 * this.sigma * this.sigma;
    if (x === 0 && y === 0) {
      return 1 / (Math.PI * twoSigma);
    }

    const sum = x * x + y * y;
    return (1 / (Math.PI * twoSigma)) * Math.exp(-sum / (twoSigma));
  }

  private createWM(kSize: number, kWidth: number): number[] {
    let sum = 0;
    const weightVector: number[] = [];

    for (let i = 0; i < kSize; i += 1) {
      const val = this.blur(i - kWidth, 0);
      weightVector[i] = val;
      sum += val;
    }
    for (let i = 0; i < kSize; i += 1) {
      weightVector[i] /= sum;
    }

    return weightVector;
  }
}
