// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/ikwNrFvnL3g

var inc = 0.005;


var block;
var blocks = [];

var desktopWidth = 2560;
var desktopHeight = 1600;
var canvasScalingFactor = 3;

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function Block(gridSize) {
  // this.x = width / 2 + (random(width) / 4 * random(-1 * gridSize, 1 * gridSize));
  // this.y = height / 2 + (random(height) / 4 * random(-1 * gridSize, 1 * gridSize));

  this.x = width / 2;
  this.y = height / 2;

  this.draw = function() {
    rect(this.x, this.y, gridSize, gridSize)
  };

  this.die = function() {
    var i = blocks.indexOf(this);
    blocks.splice(i, 1);
  }

  this.update = function() {
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.x = width / 2;
      this.y = height / 2
    }

    if (coinFlip()) {
      if (coinFlip()) {
        this.x = this.x + gridSize;
      } else {
        this.y = this.y + gridSize;
      }
    } else {
      if (coinFlip()) {
        this.x = this.x - gridSize;
      } else {
        this.y = this.y - gridSize;
      }
    }
  };
}

function createBlocks(num) {
  var top = blocks.length;
  var newTop = top + num;

  for (var i = top; i < newTop; i++) {
    blocks[i] = new Block(15);
  }
}


function setup() {
  createCanvas(600, 600);
  background(0, 46, 96);
  pixelDensity(1);

  createBlocks(1000);
}

var ginc = 0.01;

function draw() {
  background(0, 46, 96);

  var yoff = 0;
  loadPixels();
  for (var y = 0; y < height; y++) {
    var xoff = 0;
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 10;
      var g = noise(xoff + ginc, yoff + ginc) * 190;
      var b = noise(xoff, yoff) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = random(195, 255);
      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();
  
  ginc += 0.01;

  fill(0, 176, 54, 35);
  stroke(255, 255, 255, 100);

  for (var i= 0; i < blocks.length; i++) {
    blocks[i].draw();
    blocks[i].update();
  }

  // var canvasName = "myCanvas" + nf(frameCount, 5) + ".png";
  // saveCanvas(canvasName, 'png');
}
