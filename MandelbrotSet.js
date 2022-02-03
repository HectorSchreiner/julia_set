let height, width;
let minVal, maxval;


let mandelbrotSet = function (sketch) {
    sketch.setup = function () {

        minVal = -2;
        maxVal = 2;

        sketch.pixelDensity(1);

        let canvas = sketch.createCanvas(600, 600);
        canvas.position(600, 0);

        sketch.background(20);
        height = sketch.height;
        width = sketch.width;
    }

    sketch.draw = function () {
        sketch.loadPixels();
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {

                let_a = sketch.map(x, 0, width, minVal, maxVal);
                let b = sketch.map(y, 0, height, minVal, maxVal);

                let c_a = a;
                let c_b = b;

                let i = 0;

                while (i < maxIterations) {
                    let a_new = _a * a - b * b;
                    let b_new = 2 * a * b;
                    a = a_new + c_a;
                    b = b_new + c_b;

                    if (a + b > 16) {
                        break;
                    }

                    i++;
                }

                //giver colorvalue baseret på antal iterations
                let color_val_mandel = sketch.map(i, 0, maxIterations, 0, 255)

                colorPixel(x, y, color_val_mandel, color_val_mandel, color_val_mandel, 255, sketch);
            }
        }

        sketch.updatePixels();
    }


}

new p5(mandelbrotSet);