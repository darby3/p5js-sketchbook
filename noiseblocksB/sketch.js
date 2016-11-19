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

  this.xDir = coinFlip() ? -1 : 1;
  this.yDir = coinFlip() ? -1 : 1;
  
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
      this.x = this.x + this.xDir * gridSize;      
    }
    
    if (coinFlip()) {
      this.y = this.y + this.yDir * gridSize;
    }


    // if (coinFlip()) {
    //   if (coinFlip()) {
    //     this.x = this.x + gridSize;
    //   } else {
    //     this.y = this.y + gridSize;
    //   }
    // } else {
    //   if (coinFlip()) {
    //     this.x = this.x - gridSize;
    //   } else {
    //     this.y = this.y - gridSize;
    //   }
    // }
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
  background(120, 46, 96);
  pixelDensity(1);

  createBlocks(1);
}

var ginc = 0.01;
var alphainc = 0.0025;

function draw() {
  background(120, 46, 96);

  var yoff = 0;
  loadPixels();
  for (var y = 0; y < height; y++) {
    var xoff = 0;
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 10;
      var g = noise(xoff + ginc, yoff + ginc) * 190;
      var b = noise(xoff, yoff) * 255;
      var pxa = noise(xoff + alphainc, yoff + alphainc) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = pxa;
      xoff += inc;
    }
    yoff += inc;
  }
  updatePixels();

  ginc += 0.01;
  alphainc -= 0.0025;

  fill(255, 255, 255, 35);
  // stroke(255, 255, 255, 125);
  noStroke();

  for (var i= 0; i < blocks.length; i++) {
    blocks[i].draw();
    blocks[i].update();
  }

  createBlocks(1);

  var canvasName = "myCanvas" + nf(frameCount, 5) + ".png";
  saveCanvas(canvasName, 'png');
}
