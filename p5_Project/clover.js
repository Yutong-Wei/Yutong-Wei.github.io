// define a class called fourLeafClover, and set up its properties — xy location,  size, and rotation
class FourLeafClover {
  constructor(x, y, size, rotation) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = rotation;
  }

  // draw the clover by setting up its properties, using push() pop() to only affect the clover itself
  display() {
    push();
    stroke(125, 155, 100, random(0, 8));
    strokeWeight(1);
    fill(187, 230, 186, random(0, 8));
    translate(this.x, this.y);
    rotate(this.rotation);
    // call the drawLeaf function. let the leaf rotates 90° four time to be a clover.
    for (let i = 0; i < 4; i++) {
      rotate(PI / 2);
      // let it to start drawing at the center
      // drawn upward by a distance of this.size on the y-axis.
      // the leaf will be this.size large
      this.drawLeaf(0, -this.size, this.size);
    }
    pop();
  }

  // draw each leaf using Bezier curve (heart shape - code from internet)
  drawLeaf(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(
      x - size / 2,
      y - size / 2,
      x - size,
      y + size / 3,
      x,
      y + size
    );
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
  }
}

// define a class called Circle for ripple, and set up its properties — xy location, radius, and color
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  // display the circle by setting up how its look, position, and size.
  display() {
    noFill();
    stroke(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  // circle's radius is increased by 5 each time using update.
  update() {
    this.radius += 5;
  }
}
