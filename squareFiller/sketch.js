var w = 1024;
var h = 768;

var tot = 400;

var finalSize;

function setup() {
  createCanvas(w, h);
  background(32, 32, 32);

  fill(255, 0, 0, 5);
  stroke(255, 255, 255, 10);
  strokeWeight(1);

  var s = floor(sqrt(w * h / tot));
  var size = s;
  
  for (size; size > 1; size--) {
    
    // square position: does change (as the loop draws)
    var sqX = 0;
    var sqY = 0;
  
    console.log(size);
    
    // draw a bunch of squares
    for (var i = 0; i < tot; i++) {
      // if we're at the end of a line jump to the next line
      if ((sqX > w) || (sqX + size > w)) {
        sqX = 0;
        sqY = sqY + size;
      }
      // TODO: I can probably do this without having to actually draw the rects in setup;
      // I just want the maths really
      rect(sqX, sqY, size, size);
      sqX = sqX + s;
      sqY = sqY;
    }

    if (sqY > h || sqY + size > h) {
      continue;
    } else {
      break;
    }
  }

  // now we've got our size....
  console.log(size);
  finalSize = size;
}

function draw() {

  background(32, 32, 32);

  // let's refresh and draw thw squares for realsies
  
  fill(255, 0, 0);
  stroke(255, 255, 255);
  strokeWeight(1);
  
  // square position: does change (as the loop draws)
  var sqX = 0;
  var sqY = 0;

  // draw a bunch of squares
  for (var i = 0; i < tot; i++) {
    // if we're at the end of a line jump to the next line
    if ((sqX > w) || (sqX + finalSize > w)) {
      sqX = 0;
      sqY = sqY + finalSize;
    }
    rect(sqX, sqY, finalSize, finalSize);
    sqX = sqX + finalSize;
    sqY = sqY;
  }

}