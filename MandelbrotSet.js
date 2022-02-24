let height, width;
let minVal, maxVal;
let marker;
let iterSlider_mandelbrot;


let mandelbrotSet = function (sketch) {
    sketch.setup = function () {

        iterSlider_mandelbrot = sketch.createSlider(8, 256, 20, 8);
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

                let i = calculateMandelbrotSet(x, y, maxIterations_Mandelbrot, sketch);

                // let c_a = a;
                // let c_b = b;

                // let i = 0;

                // while (i < maxIterations_Mandelbrot) {
                //     let a_new = a * a - b * b;
                //     let b_new = 2 * a * b;
                //     a = a_new + c_a;
                //     b = b_new + c_b;

                //     if (sketch.abs(a + b) > 4) {
                //         break;
                //     }

                //     i++;
                // }

                //giver colorvalue baseret på antal iterations
                let color_val_mandel = sketch.map(i, 0, maxIterations_Mandelbrot, 0, 255)

                colorPixel(x, y, color_val_mandel, color_val_mandel, color_val_mandel, sketch);


            }
        }
        sketch.updatePixels();
        sketch.mouseClicked = function () {

            if (sketch.mouseX > 0 && sketch.mouseX < width && sketch.mouseY > canvasOffset && sketch.mouseY < height + canvasOffset) {
                getConstantValues();
                UI_marker(sketch.mouseX, sketch.mouseY, sketch)
            }
        }

        function getConstantValues() {
            cRe = sketch.map(sketch.mouseX, 0, width, minVal, maxVal);
            cIm = sketch.map(sketch.mouseY, 0, height, minVal, maxVal);
        }
    }


    function UI_marker(x_pos, y_pos, sketch) {
        sketch.fill("red");
        sketch.strokeWeight(2);
        sketch.ellipse(x_pos, y_pos, 10);
        console.log(sketch.mouseX, sketch.mouseY);
    }
}

new p5(mandelbrotSet);

// let c_a = a;
// let c_b = b;

// let i = 0;

// while (i < maxIterations_Mandelbrot) {
//     let a_new = a * a - b * b;
//     let b_new = 2 * a * b;
//     a = a_new + c_a;
//     b = b_new + c_b;

//     if (sketch.abs(a + b) > 4) {
//         break;
//     }

//     i++;
// }

function calculateMandelbrotSet(x, y, maxDepth, sketch) {

    a = sketch.map(x, 0, width, minVal, maxVal);
    b = sketch.map(y, 0, height, minVal, maxVal);

    const c_a = a;
    const c_b = b;

    function recurseMandelbrotSet(a, b, cDepth) {
        if (cDepth == maxDepth) {
            return maxDepth;
        }

        const a_new = a * a - b * b;
        const b_new = 2 * a * b;

        a = a_new + c_a;
        b = b_new + c_b;

        if (sketch.abs(a + b) > 4) {
            return cDepth;
        }

        return recurseMandelbrotSet(a, b, cDepth + 1)
    }



    return recurseMandelbrotSet(a, b, 0);
}

