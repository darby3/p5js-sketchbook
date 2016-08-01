var block;
var blocks = [];

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function Block(gridSize) {
  this.x = width/2;
  this.y = height/2;
  
  this.draw = function() {
    rect(this.x, this.y, gridSize, gridSize)
  };
  
  this.update = function() {
    
    // if (this.x > width || this.x < 0) {
    //   this.x = width/2;
    // }
    
    // if (this.y > height || this.y < 0) {
    //   this.y = height/2;
    // }


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
    blocks[i] = new Block(36);
  }
  
}


function setup() {
  createCanvas(2560, 1440);
  background(0, 46, 119);
  fill(0, 176, 54, 35);
  stroke(255, 255, 255, 100);
  
  createBlocks(100);
}

function draw() {
  background(0, 46, 119);
  stroke(255, 255, 255, 10);

  for (var i= 0; i < blocks.length; i++) {
    blocks[i].draw();
    blocks[i].update();
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

