// defines a constructor function called Particle
function Particle() {
  // particle has random position on the canva
  this.pos = createVector(random(width), random(height));
  // particle's velocity starts at 0
  this.vel = createVector(0, 0);
  // particle's acceleration starts at 0
  this.acc = createVector(0, 0);
  // particle's maximum speed is 3
  this.maxspeed = 3;
  // stores the particle's previous position. Will use it to draw lines later
  this.prevPos = this.pos.copy();

  // update particle's movement
  this.update = function () {
    // velocity = velocity + acceleration. Simplified Δt = 1
    this.vel.add(this.acc);
    // Limits the velocity so it cannot exceed maxspeed
    this.vel.limit(this.maxspeed);
    // position = position + velocity
    this.pos.add(this.vel);
    // multiplies by 0 to clears acceleration to make it be independent for each frame
    this.acc.mult(0);
  };

  // Find the index of the corresponding vector grid cell according to the particle's position.
  this.follow = function (vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    // find the force at that grid cell
    var force = vectors[index];
    // apply this force to the particle
    this.applyForce(force);
  };
  // define applyForce. add this force to the particle's acceleration
  this.applyForce = function (force) {
    this.acc.add(force);
  };

  // define show to draw the trail of particles
  this.show = function () {
    stroke(58, 127, 176, 2);
    strokeWeight(2);
    // use line to connect the particle from previous position to current position
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    // update “previous position” to be current position
    this.updatePrev();
  };

  // define updatePrev to update position
  this.updatePrev = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  //  define edges to deal with the particles going out of the canvas
  this.edges = function () {
    // If the particle goes beyond the right edge, make it reappear from the left
    // And make it to "previous position" so that there'll be no line go across the canva
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    // If the particle goes beyond the left edge, make it reappear from the right
    // And make it to "previous position" so that there'll be no line go across the canva
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    // If the particle goes beyond the top edge, make it reappear from the bottom
    // And make it to "previous position" so that there'll be no line go across the canva
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    // If the particle goes beyond the bottom edge, make it reappear from the top
    // And make it to "previous position" so that there'll be no line go across the canva
    if (this.pos.y < 0) {
      this.pos.x = height;
      this.updatePrev();
    }
  };
}
