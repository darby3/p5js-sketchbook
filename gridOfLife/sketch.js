var block;
var blocks = [];

var desktopWidth = 2560;
var desktopHeight = 1600;
var canvasScalingFactor = 3;

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function Block(gridSize) {
  this.x = mouseX;
  this.y = mouseY;
  
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
        this.x = this.x + gridSize / 2;
      } else {
        this.y = this.y + gridSize / 2;
      }
    } else {
      if (coinFlip()) {
        this.x = this.x - gridSize / 2;
      } else {
        this.y = this.y - gridSize / 2;
      }
    }
  };
}

function createBlocks(num) {

  var top = blocks.length;
  var newTop = top + num;
  
  for (var i = top; i < newTop; i++) {
    blocks[i] = new Block(12);
  }
  
}

function setup() {
  createCanvas(desktopWidth / canvasScalingFactor, desktopHeight / canvasScalingFactor);
  background(0, 46, 96);
  fill(0, 176, 54, 35);
  stroke(255, 255, 255, 100);
  
  createBlocks(100);
}

function draw() {
  background(0, 46, 96);
  stroke(255, 255, 255, 10);

  for (var i= 0; i < blocks.length; i++) {
    blocks[i].draw();
    blocks[i].update();
  }
  
  var numberToDie = Math.floor(random(10));
  
  println(blocks.length);
  
  if (blocks.length > 10) {
    for (var kill = numberToDie; kill >= 0; kill--) {
      if (coinFlip()) {
        blocks[kill].die();        
      }
    }
  }
  
}

function mousePressed() {
  println("mouse pressed");

  createBlocks(frameCount);
}

function keyPressed() {
  if (key == 'X' || key == 'x') {
    var canvasName = "myCanvas" + frameCount + ".png";
    saveCanvas(canvasName, 'png');
  }
}

