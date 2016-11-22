// this is what I meant to do

var gridSteps = [];
var gridStepsG = [];

var desktopWidth = 2560;
var desktopHeight = 1600;
var canvasScalingFactor = 3;

var gridSize = 24;
var lifetime = 1000;

var previousCoords = {};
var nextCoords = {};

var previousCoordsG = {};
var nextCoordsG = {};


function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

function setup() {
  createCanvas(desktopWidth / canvasScalingFactor, desktopHeight / canvasScalingFactor);
  
  background(0,0,0);
  noFill();
  stroke(255, 255, 255, 20);
  strokeWeight(4);
  
  previousCoords.x = getRandomIntInclusive(0, width);
  previousCoords.y = getRandomIntInclusive(0, height);

  nextCoords.x = previousCoords.x + gridSize;
  nextCoords.y = previousCoords.y;

  previousCoordsG.x = getRandomIntInclusive(0, width);
  previousCoordsG.y = getRandomIntInclusive(0, height);

  nextCoordsG.x = previousCoordsG.x + gridSize;
  nextCoordsG.y = previousCoordsG.y;

  gridSteps.push(new Step());
  gridStepsG.push(new StepG());
}

var inc = 0;

function draw() {
  inc = inc + 0.001;

  background(noise(inc) * 50);

  stroke(0, 0, 255, 20);
  for (var i = 0; i < gridSteps.length; i++) {
    gridSteps[i].draw();
    gridSteps[i].update();
  }

  stroke(0, 255, 0, 20);
  for (var i = 0; i < gridStepsG.length; i++) {
    gridStepsG[i].draw();
    gridStepsG[i].update();
  }

  updateNextCoords();  
  updateNextCoordsG();  
  
  gridSteps.push(new Step());
  gridStepsG.push(new StepG());
  
}