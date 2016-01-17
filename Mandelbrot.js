/* global Complex */
var canvas = document.getElementById("mb-canvas");
var ctx = canvas.getContext("2d");

var WIDTH = 480;
var HEIGHT = 480;

var MAX_ITERATIONS_LIMIT = 400;

var POWER = 2;

function canvasFillPixel(x,y,color) {
	ctx.fillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
	ctx.fillRect(x, y, 1, 1);
}

function CoordsToComplex(x,y) {
	var real = -2 + ((x / WIDTH) * 4);
	var img = 2 - ((y / HEIGHT) * 4);
	
	return new Complex(false, real, img);
}

function inMandelbrotSet(c) {
	var z = new Complex(false, 0,0);
	
	var i;
	for(i=0; i<MAX_ITERATIONS_LIMIT; i++) {
		var exp = z.pow(POWER);
		z = Complex.add(exp,c);
		
		if(((z.real*z.real) + (z.img*z.img)) > 4) { return false; }
	}
	
	return i==MAX_ITERATIONS_LIMIT;
}

function drawMandelbrot() {
	
	var inset = 0;
	var total = 0;
	
	for(var y = 0; y<HEIGHT; y++) {
		for(var x = 0; x<WIDTH; x++) {
			var c = CoordsToComplex(x,y);
			
			if(inMandelbrotSet(c)) {
				canvasFillPixel(x,y,{r:42,g:42,b:255});
				inset++;
			}
			
			total++;
		}
	}
	
	console.log("In the set: " + inset + "/" + total);
}