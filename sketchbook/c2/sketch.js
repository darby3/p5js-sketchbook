// this is what I meant to do

var gridSteps = [];

var desktopWidth = 2560;
var desktopHeight = 1600;
var canvasScalingFactor = 3;

var gridSize = 24;
var lifetime = 1000;

var previousCoords = {};
var nextCoords = {};


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

  gridSteps.push(new Step());
}

function draw() {
  background(0,0,0);
  
  for (var i = 0; i < gridSteps.length; i++) {
    gridSteps[i].draw();
    gridSteps[i].update();
  }

  updateNextCoords(true);  
  
  gridSteps.push(new Step());
}