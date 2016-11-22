// this isn't what I meant to do but it's kinda funky

var gridSteps = [];

var desktopWidth = 2560;
var desktopHeight = 1600;
var canvasScalingFactor = 3;

var gridSize = 20;
var lifetime = 100;

var previousCoords = {};
var nextCoords = {};


function coinFlip() {
  return Math.floor(Math.random() * 2);
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateNextCoords(yes) {
  var tempX = nextCoords.x;
  var tempY = nextCoords.y;

  if (coinFlip()) {
    nextCoords.y = previousCoords.y;

    if (coinFlip()) {
      nextCoords.x = previousCoords.x + gridSize;
    } else {
      nextCoords.x = previousCoords.x - gridSize;
    }
  } else {
    nextCoords.x = previousCoords.x;

    if (coinFlip()) {
      nextCoords.y = previousCoords.y + gridSize;
    } else {
      nextCoords.y = previousCoords.y - gridSize;
    }
  }

  if (yes) {
    previousCoords.x = tempX;
    previousCoords.y = tempY;    
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
  // pixelDensity(2);
  background(0,0,0);
  noFill();
  stroke(255,255,255);
  
  previousCoords.x = getRandomIntInclusive(0, width);
  previousCoords.y = getRandomIntInclusive(0, height);

  updateNextCoords();
  
  gridSteps.push(new Step());
}

function draw() {
  background(0,0,0);
  stroke(255, 255, 255, 50);
  
  for (var i = 0; i < gridSteps.length; i++) {
    gridSteps[i].draw();
    gridSteps[i].update();
  }

  updateNextCoords(true);  
  
  gridSteps.push(new Step());
}