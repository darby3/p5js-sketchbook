var x = 1;
var l = 0;
var dir = true;
var otherdir = true;
var mp = true;

function setup() {
  createCanvas(640, 360);

  background(0, 0, 0);

  stroke(0, 125, 176);
  fill(0, 75, 123, 10);

}

function draw() {
  var w = random(640);
  var h = random(360);
  var o = random(100);

  if (dir) {
    if (x + 1 > 100) {
      dir = false;
      x -= 1;
    } else {
      x += 1;
    }
  } else {
    if (x - 1 < 0) {
      dir = true;
      x += 1;
    } else {
      x -= 1;
    }
  }


  if (otherdir) {

    if (l + 1 > width) {
      otherdir = false;
      l -= 1;
    } else {
      l += 1;
    }

  } else {

    if (l - 1 < 0) {
      otherdir = true;
      l += 1;
    } else {
      l -= 1;
    }


  }

  console.log(x);



  // textSize(36);
  // noStroke();
  // fill(0, 75, 123);
  // text(w, 10, 30);

  stroke(255, 255, 255, x);

  var blue = random(0, x) + 100;
  console.log("blue = " + blue);
  if (mp) {
    fill(0, x + 145, blue, x);
  } else {
    fill(0, 0, blue - 50, x + 50);
  }

  ellipse(l, mouseY, w, h);
}

function mousePressed() {
  mp = !mp;
}