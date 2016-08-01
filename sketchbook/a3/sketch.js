var circs = [];
var num = 5;

var fillColor = {
  r: 0,
  g: 0,
  b: 0
}

function setup() {
  createCanvas(640, 360);
  frameRate(5);

}

function draw() {


  fill(fillColor.r, fillColor.g, fillColor.b, random(255));

  var white = map(mouseX, 0, 640, 0, 255);
  var opac = map(mouseY, 0, 360, 0, 255);
  stroke(white, opac);

  for (var i = 0; i < num; i++) {
    circs[i] = {
      x: random(0, width),
      y: random(0, height),
      r1: random(0, width),
      r2: random(0, height)
    };
  }

  console.log(circs);


  for (var i = 0; i < num; i++) {
    ellipse(circs[i].x, circs[i].y, circs[i].r1, circs[i].r2);
  }

}


function mousePressed() {
  fillColor.r = random(255);
  fillColor.g = random(255);
  fillColor.b = random(255);
  
  var canvasName = "myCanvas" + frameCount + ".png";
  saveCanvas(canvasName, 'png');
}