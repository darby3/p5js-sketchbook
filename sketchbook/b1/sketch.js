var block;
var blocks = [];

var desktopWidth = 800;
var desktopHeight = 800;
// var desktopWidth = 2560;
// var desktopHeight = 1600;
var canvasScalingFactor = 1;

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Block(gridSize) {
  this.x = getRandomIntInclusive(0, floor(width / gridSize)) * gridSize;
  this.y = getRandomIntInclusive(0, floor(height / gridSize)) * gridSize;
  
  this.r = 255;
  this.g = 255;
  this.b = 255;
  this.a = getRandomIntInclusive(0, 255);
  
  this.draw = function() {
    fill(this.r, this.g, this.b, this.a);
    rect(this.x, this.y, gridSize, gridSize)
  };

  this.die = function() {
    var i = blocks.indexOf(this);
    blocks.splice(i, 1);
  }
  
  this.update = function() {
    // if (coinFlip()) {
    //   createBlocks(5);
    // }
    
    if (blocks.length < 10) {
      createBlocks(100);
    }

    if (this.a < 10) {
      createBlocks(1);
      this.die();
    }

    if (this.r < 5 || this.g < 5 || this.b < 5) {
      createBlocks(1);
      this.die();
    }

    this.a = this.a - 5;
    
    if (coinFlip()) {
      this.r = this.r - 20;
    } 
    
    if (coinFlip()) {
      this.g = this.g - 10;
    }
    
    if (coinFlip()) {
      this.b = this.b - 10;
    }
  };
}

function createBlocks(num) {
  var top = blocks.length;
  var newTop = top + num;
  
  for (var i = top; i < newTop; i++) {
    blocks[i] = new Block(20);
  }
}


function setup() {
  createCanvas(desktopWidth / canvasScalingFactor, desktopHeight / canvasScalingFactor);
  background(202, 223, 243);

  noStroke();
  
  createBlocks(1000);
}

function draw() {
  background(98, 155, 155);

  for (var i= 0; i < blocks.length; i++) {
    blocks[i].draw();
    blocks[i].update();
  }

  
  // var canvasName = "fungrid" + nf(frameCount, 5) + ".png";
  // saveCanvas(canvasName, 'png');
  
}
