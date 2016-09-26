var totLen = lineLengths.length;

function getLongest(arr) {
  var curHigh = arr[0];
  for (var i = 1; i < arr.length; i++) {
    curHigh = arr[i] > curHigh ? arr[i] : curHigh;
  }
  return curHigh;
}

function setup() {
  var longest = getLongest(lineLengths);
  createCanvas(1000, totLen);

  background(13, 13, 13);

  // code lines

  // j will be the y value
  // lineLenths[j] will be the x value,
  // mapped : 0 to highest, 0 to width

  stroke(5, 17, 242);

  for (var j = 0; j < totLen; j++) {
    line(0, j, map(lineLengths[j], 0, longest, 0, width), j);
  }

  // create some highlighted regions
  stroke(255, 255, 255, 100);

  // main function
  fill(242, 131, 107, 50);
  rect(0, 14, width - 1, 27);

  // the factory function
  fill(242, 68, 68, 50);
  rect(0, 41, width - 1, 10113);

  // sizzle selector engine
  fill(255, 255, 255, 20);
  rect(0, 544, width - 1, 2197);
}

function draw() {

}


function keyPressed() {
  if (key == 'X' || key == 'x') {
    var canvasName = "myCanvas" + frameCount + ".png";
    saveCanvas(canvasName, 'png');
  }
}
