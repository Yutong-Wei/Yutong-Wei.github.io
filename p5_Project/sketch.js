// Create an empty array to store ripple sound effects
let rippleSounds = [];
// Set the increment for Perlin noise sampling
var inc = 0.1;
// Set the scale of each grid cell in the flowfield
var scl = 70;
// Declare variables to store the number of columns and rows based on canvas size
var cols, rows;
// Initialize the z-offset for 3D Perlin noise;
var zoff = 0;

// var fr;

// Create empty arrays to store
let particles = [];
let clovers = [];
let circles = [];
var flowfield;

var canvas;

// Preload followings
function preload() {
  streamSound = loadSound("p5_Project/streamSound.mp3");
  // put two ripple sounds in my rippleSounds array
  rippleSounds[0] = loadSound("p5_Project/rippleSound.mp3");
  rippleSounds[1] = loadSound("p5_Project/rippleSound2.mp3");
}

function setup() {
  //Create canva matching the window size
  canvas = createCanvas(windowWidth, windowHeight);
  // Position the canvas at the top-left corner
  canvas.position(0, 0);
  // Set it to be the bottom layer
  canvas.style("z-index", "-1");
  // Play the background stream sound
  streamSound.play();

  // Calculate the number of columns and rows based on canvas size and grid scale
  cols = floor(width / scl);
  rows = floor(height / scl);

  // Create an array “flowfield” for each cell
  flowfield = new Array(cols * rows);

  // Create 5000 particles and store in "particles" array
  for (var i = 0; i < 5000; i++) {
    particles[i] = new Particle();
  }
  // set my background color
  background(237, 247, 245);
}

// Generate a flow field by creating a vector `v` at each grid cell
// develop from Perlin Noise
function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
    }
    yoff += inc;
    zoff += 0.0003;
  }

  // Iterates through each circle object, and update
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].update();
  }

  // draw particle: let it following the flowfield, update it, check if it exceeds the edge, and show the particles
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  // display clover
  for (let i = 0; i < clovers.length; i++) {
    clovers[i].display();
  }
}

// when mouse pressed,
function mousePressed() {
  // generate random size from 10-50,
  let s = random(10, 50);
  // random angle,
  let randomRotation = random(TWO_PI);
  // the clover is located at where the mouse pressed, s size, and randomRotation
  let clover = new FourLeafClover(mouseX, mouseY, s, randomRotation);
  // push clover to my array
  clovers.push(clover);
  // call the circlesAround function below to let the circle around clover
  circlesAround(clover);

  //  RIPPLE SOUND
  // when mouse pressed, play random one of the two sonuds from my rippleSounds array
  let index = floor(random(rippleSounds.length));
  currentRipple = rippleSounds[index];
  currentRipple.play();
}

// set the properties of the circles (ripple)
function circlesAround(clover) {
  noStroke();
  let clr = color(random(50, 150), random(70, 150), random(100, 170), 9);
  circles.push(new Circle(clover.x, clover.y, clover.size, clr));
}

// when click Spacebar, call the resetSketch function, and replay the sound
function keyPressed() {
  if (key === " ") {
    resetSketch();
    streamSound.stop();
    streamSound.play();
  }
}
// clear and reset everything
function resetSketch() {
  background(237, 247, 245);
  clovers = [];
  circles = [];
  particles = [];
  for (let i = 0; i < 5000; i++) {
    particles[i] = new Particle();
  }
}
