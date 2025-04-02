let rippleSounds = [];

var inc = 0.1;
var scl = 60;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var clovers = [];

let circles = [];

var flowfield;

let pg;

var canvas;

function preload(){
  streamSound = loadSound("p5_Project/streamSound.mp3")
  rippleSounds[0] = loadSound ("p5_Project/rippleSound.mp3")
  rippleSounds[1]= loadSound ("p5_Project/rippleSound2.mp3")
}
  
function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  streamSound.play();

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP("");

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 5000; i++) {
    particles[i] = new Particle();
  }
  background(237, 247, 245);
}

function draw() {
  //pg = createGraphics(width, height);

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

  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].update();
  }

  // image(pg,0,0);
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));

  for (let i = 0; i < clovers.length; i++) {
    clovers[i].display();
  }
}

function mousePressed() {
  let s = random(10, 50);
  let randomRotation = random(TWO_PI);
  let clover = new FourLeafClover(mouseX, mouseY, s, randomRotation);
  clovers.push(clover);
  circlesAround(clover);

  //  RIPPLE SOUND
  let index = floor(random(rippleSounds.length));
  currentRipple = rippleSounds[index];
  currentRipple.play();
}

function circlesAround(clover) {
  noStroke();
  let clr = color(random(50, 150), random(70, 150), random(100, 170), 9);
  circles.push(new Circle(clover.x, clover.y, clover.size, clr));
}

function keyPressed() {
  if (key === " ") {
    resetSketch();
    streamSound.stop();
    streamSound.play();
  }
}

function resetSketch() {
  background(237, 247, 245);
  clovers = [];
  circles = [];
  particles = [];
  for (let i = 0; i < 5000; i++) {
    particles[i] = new Particle();
  }
}
