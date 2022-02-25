let height, width;
let minVal, maxVal;
let marker;
let iterSlider_mandelbrot;

let mandelbrotSet = function (sketch) {
    sketch.setup = function () {

        iterSlider_mandelbrot = sketch.createSlider(8, 256, 128, 8);
        minVal = -2;
        maxVal = 2;

        sketch.pixelDensity(1);

        let canvas = sketch.createCanvas(400, 400);

        height = sketch.height;
        width = sketch.width;

        canvas.position(width, canvasOffset);
        iterSlider_mandelbrot.position(width, 0);

        sketch.background(20);
    }

    sketch.draw = function () {
        sketch.loadPixels();

        maxIterations_Mandelbrot = iterSlider_mandelbrot.value();

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {

                //giver colorvalue baseret på antal iterations
                let i = calculateMandelbrotSet(x, y, maxIterations_Mandelbrot, sketch);
                
                // mapper ned til tal mellem 0 og 255
                let color_val_mandel = sketch.map(i, 0, maxIterations_Mandelbrot, 0, 255)

                colorPixel(x, y, color_val_mandel, color_val_mandel, color_val_mandel, sketch);
            }
        }
        sketch.updatePixels();
        sketch.mouseClicked = function () {

            if (sketch.mouseX > 0 && sketch.mouseX < width && sketch.mouseY > canvasOffset && sketch.mouseY < height + canvasOffset) {
                getConstantValues();
            }
        }

        function getConstantValues() {
            cRe = sketch.map(sketch.mouseX, 0, width, minVal, maxVal);
            cIm = sketch.map(sketch.mouseY, 0, height, minVal, maxVal);
        }
    }
}

new p5(mandelbrotSet);

function calculateMandelbrotSet(x, y, maxDepth, sketch) {

    // Her mappes x og y koordinatet til det komplekse koordinatsystem
    a = sketch.map(x, 0, width, minVal, maxVal);
    b = sketch.map(y, 0, height, minVal, maxVal);

    // konstanterne gemmes
    const c_a = a;
    const c_b = b;

    function recurseMandelbrotSet(a, b, cDepth) {

        // Hvis max dybde er nået -> er vi ikke i mandelbrot mængden-
        // -og vi kan returnere max dybde. 
        if (cDepth == maxDepth) {
            return maxDepth;
        }

        // Mandelbrot funktionen
        const a_new = a * a - b * b + c_a; // 
        const b_new = 2 * a * b + c_b;  

        // hvis c er udenfor cirklen med radius 2, returner antal iterationer det tog
        if ((a_new*a_new + b_new*b_new) > 4) {
            return cDepth;
        }

        // pas a og b igennem igen, og increment nuværende dybde med 1.
        return recurseMandelbrotSet(a_new, b_new, cDepth + 1)
    }
    return recurseMandelbrotSet(a, b, 0);
}