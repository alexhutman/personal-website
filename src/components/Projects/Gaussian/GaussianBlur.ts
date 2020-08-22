import P5 from 'p5';

const path = require('../../../../public/assets/img/papabiceps.jpg');

export type GaussianImg = {
  domImg: P5.Element|null,
  loading: boolean
}

export default class GaussianBlur {
  public p5: P5;

  public canvas: any;

  public gaussianImg: GaussianImg;

  public sigma = 1;

  private kernelsize!: number;

  private kernelwidth!: number;

  constructor() {
    this.p5 = new P5(this.sketch);
    this.gaussianImg = { domImg: this.p5.select('#dom-image'), loading: true };
    this.setKernelSize(1);
  }

  public setKernelSize(n: number): void {
    this.kernelsize = n;
    this.kernelwidth = Math.floor(this.kernelsize / 2);
  }

  public getKernelSize(): number {
    return this.kernelsize;
  }

  sketch = (p5: P5) => {
    let img: P5.Image;

    const gaussianBlur = () => {
      p5.clear();
      p5.image(img, 0, 0);

      const imgWidth = this.canvas.width;
      const imgHeight = this.canvas.height;

      const trueWidth = imgWidth - 1;
      const trueHeight = imgHeight - 1;

      const weightVector = this.createWM(this.kernelsize, this.kernelwidth);

      this.canvas.loadPixels();

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
            sumR += matrixVal * p5.pixels[curColor];
            sumG += matrixVal * p5.pixels[curColor + 1];
            sumB += matrixVal * p5.pixels[curColor + 2];
            // sumA += matrixVal * p5.pixels[curColor + 3];
          }
          p5.pixels[loc] = sumR;
          p5.pixels[loc + 1] = sumG;
          p5.pixels[loc + 2] = sumB;
          // p5.pixels[loc + 3] = sumA;
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
            sumR += matrixVal * p5.pixels[curColor];
            sumG += matrixVal * p5.pixels[curColor + 1];
            sumB += matrixVal * p5.pixels[curColor + 2];
            // sumA += matrixVal * p5.pixels[curColor + 3];
          }
          p5.pixels[loc] = sumR;
          p5.pixels[loc + 1] = sumG;
          p5.pixels[loc + 2] = sumB;
          // p5.pixels[loc + 3] = sumA;
        }
      }

      this.canvas.updatePixels();
      this.updateImg();
    };

    p5.preload = () => {
      img = p5.loadImage(path);
      this.gaussianImg.loading = false;
    };
    /* eslint no-param-reassign: ["error", { "props": false }] */
    p5.setup = () => {
      this.canvas = p5.createCanvas(img.width, img.height);
      this.canvas.parent('#canvas-col');
      this.canvas.style('display', 'none');

      const sigmaSlider = p5.select('#sigma-slider') as any;
      const kernelSlider = p5.select('#kernel-slider') as any;

      if (sigmaSlider) {
        // @TODO: maybe use a promise somehow to not make the page lag on change
        sigmaSlider.changed(() => {
          this.gaussianImg.loading = true;
          Promise.resolve(gaussianBlur()).then(() => {
            this.gaussianImg.loading = false;
          });
        });
      }

      if (kernelSlider) {
        // @TODO: maybe use a promise somehow to not make the page lag on change
        kernelSlider.changed(() => {
          this.gaussianImg.loading = true;

          Promise.resolve(gaussianBlur()).then(() => {
            this.gaussianImg.loading = false;
          });
        });
      }

      p5.pixelDensity(1);

      p5.noLoop();
    };

    p5.draw = () => {
      p5.image(img, 0, 0);

      this.updateImg();
    };
  };

  private updateImg(): void {
    if (this.gaussianImg.domImg) {
      this.gaussianImg.domImg.attribute('src', this.getImgURL());
    }
  }

  private getImgURL(): string {
    const urlToReturn = (this.canvas && this.canvas.elt) ? this.canvas.elt.toDataURL() : '';
    return urlToReturn;
  }

  public sigmaChanged(): Promise<string> {
    return Promise.resolve(this.sketch.gaussianBlur())
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
