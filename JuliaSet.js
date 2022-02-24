let cRe, cIm;
let maxIterations_Julia, maxIterations_Mandelbrot, _iterator = 0;
let canvasOffset = 50;

let zoom = 1;
let zoom_speed = 2;
let offX = 0;
let offY = 0;

let iterSlider, buttonAdd, buttonSub;


let juliaSet = function (sketch) {

  iterSlider = sketch.createSlider(8, 256, 20, 8)

  buttonAdd = sketch.createButton("Zoom +");
  buttonSub = sketch.createButton("Zoom -")
  buttonAdd.mouseClicked(() => zoom += zoom_speed);
  buttonSub.mouseClicked(() => zoom -= zoom_speed);



  sketch.setup = function () {
    let canvas1 = sketch.createCanvas(400, 400);
    canvas1.position(width, canvasOffset);

    sketch.pixelDensity(1);

    cRe = -0.7;
    cIm = 0.2;

    height = sketch.height;
    width = sketch.width;
  }

  sketch.draw = function () {

    maxIterations_Julia = iterSlider.value();


    sketch.background(20);

    // initialiserer pixels array
    sketch.loadPixels();

    // går igennem hver pixel på canvas og farver derefter

    // -----------------------------------------
    // * TODO Optimiser til kun pixels in view *
    // -----------------------------------------

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        let i = calculateJuliaSet(x, y, maxIterations_Julia, sketch);

        // newRe = 1.5 * (x - width / 2) / (0.5 * width * sketch.pow(1.1, zoom)) + offX;
        // newIm = (y - height / 2) / (0.5 * height * sketch.pow(1.1, zoom)) + offY;

        // for (i = 0; i < maxIterations_Julia; i++) {

        //   // husker values fra tidligere iteration
        //   oldRe = newRe;
        //   oldIm = newIm;
        //   newRe = oldRe * oldRe - oldIm * oldIm + cRe;
        //   newIm = 2 * oldRe * oldIm + cIm;

        //   // hvis punktet er uden for cirklen med radius 2 -> stop
        //   if ((newRe * newRe + newIm * newIm) > 4) {
        //     break;
        //   }

        // }

        let color_val_julia = sketch.map(i, 0, maxIterations_Julia, 0, 255);

        colorPixel(x, y, color_val_julia, color_val_julia, color_val_julia, sketch);
      }
    }

    sketch.updatePixels();

    drawText(sketch);

    //console.log(sketch.frameRate());
  }
}

new p5(juliaSet);

// farver en given pixel(x,y) med rgb value
function colorPixel(x, y, r, g, b, sketch) {

  // pixel index 
  let index = (x + y * sketch.width) * 4;
  sketch.pixels[index] = r;
  sketch.pixels[index + 1] = g;
  sketch.pixels[index + 2] = b;
  sketch.pixels[index + 3] = 255;
}

function drawText(sketch) {
  let textString = "C = ";
  textString += sketch.str(cRe.toFixed(3));
  textString += " + ";
  textString += sketch.str(cIm.toFixed(3));
  textString += " i";

  sketch.fill("white");
  sketch.textSize(16);
  sketch.text(textString, 10, 20);
}


// newRe = 1.5 * (x - width / 2) / (0.5 * width * sketch.pow(1.1, zoom)) + offX;
// newIm = (y - height / 2) / (0.5 * height * sketch.pow(1.1, zoom)) + offY;

// for (i = 0; i < maxIterations_Julia; i++) {

//   // husker values fra tidligere iteration
//   oldRe = newRe;
//   oldIm = newIm;
//   newRe = oldRe * oldRe - oldIm * oldIm + cRe;
//   newIm = 2 * oldRe * oldIm + cIm;

//   // hvis punktet er uden for cirklen med radius 2 -> stop
//   if ((newRe * newRe + newIm * newIm) > 4) {
//     break;
//   }

// }

function calculateJuliaSet(x, y, maxDepth, sketch) {
  function recurseJuliaSet(re, im, cDepth) {

    if (cDepth == maxDepth) {
      return maxDepth;
    }

    const reNew = re * re - im * im + cRe;
    const imNew = 2 * re * im + cIm;

    if (reNew * reNew + imNew * imNew > 4) {
      return cDepth;
    }

    return recurseJuliaSet(reNew, imNew, cDepth + 1);
  }

  re = 1.5 * (x - width / 2) / (0.5 * width * sketch.pow(1.1, zoom)) + offX;
  im = (y - height / 2) / (0.5 * height * sketch.pow(1.1, zoom)) + offY;

  return recurseJuliaSet(re, im, 0);
}






