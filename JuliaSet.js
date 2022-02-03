let cRe, cIm;
let maxIterations;

let juliaSet = function (sketch) {

  let newRe, newIm, oldRe, oldIm;
  maxIterations = 20;

  let width;
  let height;
  let zoom = 1;
  let offX = 0;
  let offY = 0;

  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(600, 600);
    sketch.pixelDensity(1);

    cRe = -0.7;
    cIm = 0.2;

    height = sketch.height;
    width = sketch.width;
  }

  sketch.draw = function () {

    sketch.background(20);

    // initialiserer pixels array
    sketch.loadPixels();

    // går igennem hver pixel på canvas og farver derefter
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        newRe = 1.5 * (x - width / 2) / (0.5 * width * zoom) + offX;
        newIm = (y - height / 2) / (0.5 * height * zoom) + offY;
        let i;
        for (i = 0; i < maxIterations; i++) {

          // husker values fra tidligere iteration
          oldRe = newRe;
          oldIm = newIm;
          newRe = oldRe * oldRe - oldIm * oldIm + cRe;
          newIm = 2 * oldRe * oldIm + cIm;

          // hvis punktet er uden for cirklen med radius 2 -> stop
          if ((newRe * newRe + newIm * newIm) > 4) {
            break;
          }

        }

        let color_val_julia = sketch.map(i, 0, maxIterations, 0, 255);
        colorPixel(x, y, color_val_julia, color_val_julia, color_val_julia, 255, sketch);
      }
    }

    sketch.updatePixels();

    drawText(sketch);
  }

  // farver en given pixel(x,y) med rgb value


  sketch.mouseClicked = function () {
    getConstantValues();
  }

  function getConstantValues() {
    cRe = -1 + sketch.mouseX / width * 2;
    cIm = -1 + sketch.mouseY / height * 2;
  }
}

new p5(juliaSet);

function colorPixel(x, y, r, g, b, alpha, sketch) {

  // pixel index 
  let index = (x + y * sketch.width) * 4;
  sketch.pixels[index] = r;
  sketch.pixels[index + 1] = g;
  sketch.pixels[index + 2] = b;
  sketch.pixels[index + 3] = alpha;
}

function drawText(sketch) {
  let textString = "C = ";
  textString += sketch.str(cRe);
  textString += " + ";
  textString += sketch.str(cIm);
  textString += " i";

  sketch.fill("white");
  sketch.textSize(16);
  sketch.text(textString, 10, 20);
}




