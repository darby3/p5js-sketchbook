// this is something else entirely

var inc = 0;

var block;
var blocks = [];

var gridSteps = [];
var gridStepsG = [];
var gridStepsR = [];

var desktopWidth = 2560;
var desktopHeight = 1600;
var canvasScalingFactor = 1;

var gridSize = 48;
var lifetime = 1000;

var previousCoords = {};
var nextCoords = {};

var previousCoordsG = {};
var nextCoordsG = {};

var previousCoordsR = {};
var nextCoordsR = {};

function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function Block(gridSize) {
  
  // inc = inc - 0.001;

  this.x = getRandomIntInclusive(0, floor(width / gridSize)) * gridSize;
  this.y = getRandomIntInclusive(0, floor(height / gridSize)) * gridSize;

  // this.r = 255;
  // this.g = 255;
  // this.b = 255;

  this.r = 30;
  this.g = 33;
  this.b = 29;

  this.a = noise(inc) * 120;
  
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
      createBlocks(1000);
    }

    if (this.a < 10) {
      createBlocks(1);
      this.die();
    }

    if (this.r < 5 || this.g < 5 || this.b < 5) {
      createBlocks(1);
      this.die();
    }

    this.a = this.a - 1;
    
    if (coinFlip()) {
      this.r = this.r + 6;
      this.g = this.g + 3;
      this.b = this.b + 3;
    } 
    
  };
}

function createBlocks(num) {
  var top = blocks.length;
  var newTop = top + num;
  
  for (var i = top; i < newTop; i++) {
    blocks[i] = new Block(gridSize);
  }
  
}




function updateNextCoords() {
  previousCoords.x = nextCoords.x;
  previousCoords.y = nextCoords.y;
  
  var direction = (coinFlip()) ? 1 : -1;  

  if (coinFlip()) {
    nextCoords.x = nextCoords.x + (gridSize * direction);
  } else {
    nextCoords.y = nextCoords.y + (gridSize * direction);
  }

  if (nextCoords.x < 0) {
    nextCoords.x = nextCoords.x + gridSize;
  } else if (nextCoords.x > width) {
    nextCoords.x = nextCoords.x - gridSize;
  }
  
  if (nextCoords.y < 0) {
    nextCoords.y = nextCoords.y + gridSize;
  } else if (nextCoords.y > height) {
    nextCoords.y = nextCoords.y - gridSize;
  }
  
}

function updateNextCoordsG() {
  previousCoordsG.x = nextCoordsG.x;
  previousCoordsG.y = nextCoordsG.y;
  
  var direction = (coinFlip()) ? 1 : -1;  

  if (coinFlip()) {
    nextCoordsG.x = nextCoordsG.x + (gridSize * direction);
  } else {
    nextCoordsG.y = nextCoordsG.y + (gridSize * direction);
  }

  if (nextCoordsG.x < 0) {
    nextCoordsG.x = nextCoordsG.x + gridSize;
  } else if (nextCoordsG.x > width) {
    nextCoordsG.x = nextCoordsG.x - gridSize;
  }
  
  if (nextCoordsG.y < 0) {
    nextCoordsG.y = nextCoordsG.y + gridSize;
  } else if (nextCoordsG.y > height) {
    nextCoordsG.y = nextCoordsG.y - gridSize;
  }
  
}

function updateNextCoordsR() {

  previousCoordsR.x = nextCoordsR.x;
  previousCoordsR.y = nextCoordsR.y;
  
  var direction = (coinFlip()) ? 1 : -1;  

  if (coinFlip()) {
    nextCoordsR.x = nextCoordsR.x + (gridSize * direction);
  } else {
    nextCoordsR.y = nextCoordsR.y + (gridSize * direction);
  }

  if (nextCoordsR.x < 0) {
    nextCoordsR.x = nextCoordsR.x + gridSize;
  } else if (nextCoordsR.x > width) {
    nextCoordsR.x = nextCoordsR.x - gridSize;
  }
  
  if (nextCoordsR.y < 0) {
    nextCoordsR.y = nextCoordsR.y + gridSize;
  } else if (nextCoordsR.y > height) {
    nextCoordsR.y = nextCoordsR.y - gridSize;
  }
  
}

function Step() {
  this.x1 = previousCoords.x;
  this.y1 = previousCoords.y;
  
  this.x2 = nextCoords.x;
  this.y2 = nextCoords.y;
  
  this.ticks = lifetime;
  
  this.draw = function() {
    line(this.x1, this.y1, this.x2, this.y2);
  };

  this.die = function() {
    var i = gridSteps.indexOf(this);
    gridSteps.splice(i, 1);
  }
  
  this.update = function() {
    if (this.ticks < 1) {
      this.die();
    } else {
      this.ticks--;
    }
  };
}


function StepG() {
  this.x1 = previousCoordsG.x;
  this.y1 = previousCoordsG.y;
  
  this.x2 = nextCoordsG.x;
  this.y2 = nextCoordsG.y;
  
  this.ticks = lifetime;
  
  this.draw = function() {
    line(this.x1, this.y1, this.x2, this.y2);
  };

  this.die = function() {
    var i = gridStepsG.indexOf(this);
    gridStepsG.splice(i, 1);
  }
  
  this.update = function() {
    if (this.ticks < 1) {
      this.die();
    } else {
      this.ticks--;
    }
  };
}

function StepR() {
  this.x1 = previousCoordsR.x;
  this.y1 = previousCoordsR.y;
  
  this.x2 = nextCoordsR.x;
  this.y2 = nextCoordsR.y;
  
  this.ticks = lifetime;
  
  this.draw = function() {
    line(this.x1, this.y1, this.x2, this.y2);
  };

  this.die = function() {
    var i = gridStepsR.indexOf(this);
    gridStepsR.splice(i, 1);
  }
  
  this.update = function() {
    if (this.ticks < 1) {
      this.die();
    } else {
      this.ticks--;
    }
  };
}

function setup() {
  createCanvas(desktopWidth / canvasScalingFactor, desktopHeight / canvasScalingFactor);
  // pixelDensity(2);
  
  background(0,0,0);
  noFill();
  stroke(255, 255, 255, 20);
  strokeWeight(4);
  
  // previousCoords.x = getRandomIntInclusive(0, width);
  // previousCoords.y = getRandomIntInclusive(0, height);

  previousCoords.x = width/2;
  previousCoords.y = height/2;

  nextCoords.x = previousCoords.x + gridSize;
  nextCoords.y = previousCoords.y;

  // previousCoordsG.x = getRandomIntInclusive(0, width);
  // previousCoordsG.y = getRandomIntInclusive(0, height);

  previousCoordsG.x = width/2;
  previousCoordsG.y = height/2;

  nextCoordsG.x = previousCoordsG.x + gridSize;
  nextCoordsG.y = previousCoordsG.y;

  // previousCoordsR.x = getRandomIntInclusive(0, width);
  // previousCoordsR.y = getRandomIntInclusive(0, height);

  previousCoordsR.x = width/2;
  previousCoordsR.y = height/2;

  nextCoordsR.x = previousCoordsR.x + gridSize;
  nextCoordsR.y = previousCoordsR.y;

  gridSteps.push(new Step());
  gridStepsG.push(new StepG());
  gridStepsR.push(new StepR());

  
  createBlocks(1000);
  
  
}


function draw() {
  inc = inc + 0.001;

  // background(noise(inc) * 50);
  background(20, 23, 12);


  strokeWeight(10);
  
  stroke(0, 0, 255, 20);
  for (var i = 0; i < gridSteps.length; i++) {
    gridSteps[i].draw();
    gridSteps[i].update();
  }

  stroke(0, 255, 0, 20);
  for (var j = 0; j < gridStepsG.length; j++) {
    gridStepsG[j].draw();
    gridStepsG[j].update();
  }

  stroke(255, 0, 0, 20);
  for (var l = 0; l < gridStepsR.length; l++) {
    gridStepsR[l].draw();
    gridStepsR[l].update();
  }

  updateNextCoords();  
  updateNextCoordsG();  
  updateNextCoordsR();  
  
  gridSteps.push(new Step());
  gridStepsG.push(new StepG());
  gridStepsR.push(new StepR());

  
  
  
  noStroke();
  for (var k = 0; k < blocks.length; k++) {
    blocks[k].draw();
    blocks[k].update();
  }
  
}



function keyPressed() {
  if (key == 'X' || key == 'x') {
    var canvasName = "myCanvas" + frameCount + ".png";
    saveCanvas(canvasName, 'png');
  }
}
