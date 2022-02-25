let cRe, cIm;
let maxIterations_Julia, maxIterations_Mandelbrot, _iterator = 0;
let canvasOffset = 50;

let zoom = -3;
let zoom_speed = 2;
let offX = 0;
let offY = 0;

let iterSlider, buttonAdd, buttonSub, offsetSliderY, offsetSliderX;


// Fordi programmer laver 2 canvas, skal den laves på denne måde
// og alle p5 funktioner hører under sketch
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

    // sætter c reelle værdi og imaginære værdi
    cRe = -0.7;
    cIm = 0.2;

    height = sketch.height;
    width = sketch.width;
  }

  sketch.draw = function () { // opdaterer hver frame

    maxIterations_Julia = iterSlider.value();

    sketch.background(20);

    // initialiserer pixels array
    sketch.loadPixels();

    // går igennem hver pixel på canvas og farver derefter
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        
        // sætter farven baseret på antal iterationer
        let i = calculateJuliaSet(x, y, maxIterations_Julia, sketch);

        // mapper ned til tal mellem 0 og 255
        let color_val_julia = sketch.map(i, 0, maxIterations_Julia, 0, 255);

        // giver nuværende koordinat, og farve til colopixel funktionen
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

  // pixel index hver pixel tager 4 argumenter
  let index = (x + y * sketch.width) * 4;
  sketch.pixels[index] = r;
  sketch.pixels[index + 1] = g;
  sketch.pixels[index + 2] = b;
  sketch.pixels[index + 3] = 255;
}

// layout
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