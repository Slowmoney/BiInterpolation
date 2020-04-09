var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var width = 2000;
var height = 2000;
canvas.width = width;
canvas.height = height;
var mx = 0;
var my = 0;
canvas.addEventListener("mousemove", (e) => {
    mx = e.offsetX;
    my = e.offsetY;
});
function point(e) {
    
   
    o[e.id]= e.value;
}
var o = {
    t1:0,
    t2:0,
    t3:0,
    t4:0,
}

function loop() {

    let data = new Uint8ClampedArray(4 * canvas.width * canvas.height);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {


            let color = biLine({ x: 0, y: 0 }, { x: mx, y: my }, o.t1, o.t2, o.t3, o.t4, { x: x, y: y });
            data[4 * (x + y * width) + 0] = 255 - color;
            data[4 * (x + y * width) + 1] = 255 - color;
            data[4 * (x + y * width) + 2] = color;
            data[4 * (x + y * width) + 3] = 255;

        }

    }

    ctx.putImageData(new ImageData(data, width, height), 0, 0)
    requestAnimationFrame(loop);
}

//lineInterpol(2,20,4,40,3.5) == 35
function lineInterpol(x0, y0, x1, y1, x) {
    return ((x - x0) / (x1 - x0)) * (y1 - y0) + y0;
}
function biLine(q00, q11, f00, f10, f01, f11, p) {
    return ((f00) / ((q11.x - q00.x) * (q11.y - q00.y))) * (q11.x - p.x) * (q11.y - p.y) + (f10 / ((q11.x - q00.x) * (q11.y - q00.y))) * (p.x - q00.x) * (q11.y - p.y) + (f01 / ((q11.x - q00.x) * (q11.y - q00.y))) * (q11.x - p.x) * (p.y - q00.y) + (f11 / ((q11.x - q00.x) * (q11.y - q00.y))) * (p.x - q00.x) * (p.x - q00.y);



}
requestAnimationFrame(loop);