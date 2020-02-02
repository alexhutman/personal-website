import P5 from 'p5';

const path = require('../../../../public/assets/img/papabiceps.jpg');

export default class GaussianBlur {
  public p5: Promise<P5>;

  public canvas: any;

  private kernelsize = 31;

  private kernelwidth: number = Math.floor(this.kernelsize / 2);

  private sigma = 9;

  constructor() {
    this.p5 = this.createP5(this.sketch);
    this.p5.then((data) => {
      this.canvas = data;
    });
  }

  createP5 = (func: (p5: P5) => any) => new Promise<P5>((resolve, reject) => {
    resolve(new P5(func));
  });

  sketch = (p5: P5) => {
    const canvasCol = document.getElementById('canvas-col');
    let img: P5.Image;
    p5.preload = () => {
      img = p5.loadImage(path);
    };
    /* eslint no-param-reassign: ["error", { "props": false }] */
    p5.setup = () => {
      if (canvasCol) {
        // const ws = canvasCol.offsetWidth;
        // const hs = canvasCol.offsetHeight;

        // const rs = ws / hs;

        // @TODO Make the column stretch to the bottom of the screen so that
        // we can call this to make it fit the column
        // const wi = img.width;
        // const hi = img.height;
        // const ri = wi / hi;

        // const dims = rs > ri ? [wi * hs / hi, hs] : [ws, hi * ws / wi];
        // img.resize(dims[0], dims[1]);

        const canvas = p5.createCanvas(img.width, img.height);
        canvas.parent('canvas-col');
        canvas.removeClass('p5Canvas');

        p5.pixelDensity(1);
      } else {
        console.log('There ain\'t no canvasCol element');
      }

      p5.noLoop();
    };

    p5.draw = () => {
      p5.image(img, 0, 0);
    };
  };

  public async gaussianBlur(): Promise<any> {
    const imgWidth = (this.canvas as any).width;
    const imgHeight = (this.canvas as any).height;

    const trueWidth = imgWidth - 1;
    const trueHeight = imgHeight - 1;

    const weightVector = this.createWM(this.kernelsize, this.kernelwidth);

    const jeff = (await this.p5);

    jeff.loadPixels();

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
          sumR += matrixVal * jeff.pixels[curColor];
          sumG += matrixVal * jeff.pixels[curColor + 1];
          sumB += matrixVal * jeff.pixels[curColor + 2];
          // sumA += matrixVal * this.p5.pixels[curColor + 3];
        }
        jeff.pixels[loc] = sumR;
        jeff.pixels[loc + 1] = sumG;
        jeff.pixels[loc + 2] = sumB;
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
          sumR += matrixVal * jeff.pixels[curColor];
          sumG += matrixVal * jeff.pixels[curColor + 1];
          sumB += matrixVal * jeff.pixels[curColor + 2];
          // sumA += matrixVal * this.p5.pixels[curColor + 3];
        }
        jeff.pixels[loc] = sumR;
        jeff.pixels[loc + 1] = sumG;
        jeff.pixels[loc + 2] = sumB;
        // this.p5.pixels[loc + 3] = sumA;
      }
    }

    jeff.updatePixels();
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
