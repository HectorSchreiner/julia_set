
let cRe, cIm;
let newRe, newIm, oldRe, oldIm;
let maxIterations = 128;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);

  cRe = 0.3;
  cIm = 0.1;
}

function draw() {
  background(20);

  // initialiserer pixels array
  loadPixels();


  // går igennem hver pixel på canvas og farver derefter
  for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++)  {

       newRe = 1.5 * (x - width / 2) / (0.5 * width);
       newIm = (y - height / 2) / (0.5 * height);
       let i;
       for (i = 0; i < maxIterations; i++) {

        // husker values fra tidligere iteration
        oldRe = newRe;
        oldIm = newIm;
        newRe = oldRe * oldRe - oldIm * oldIm + cRe;
        newIm = 2 * oldRe * oldIm + cIm;

        // hvis punktet er uden for cirklen med radius 2 -> stop
        if ((newRe * newRe + newIm * newIm) > 4)
        {
          break;
        }

       }
       let r, b, g;
       r = i % 256;
       g = 0;
       b = 255 * (i < maxIterations);

      colorPixel(x, y, r, g, b, 255);
    }
  }

  updatePixels();
}

// farver en given pixel(x,y) med rgb value
function colorPixel(x, y, r, g, b, alpha) {

  // pixel index 
  let index = (x + y * width) * 4;
  pixels[index] = r;
  pixels[index + 1] = g;
  pixels[index + 2] = b;
  pixels[index + 3] = alpha;
}
