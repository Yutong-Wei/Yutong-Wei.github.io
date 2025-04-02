

class FourLeafClover {
  constructor(x, y, size, rotation) {
    this.x = x;
    this.y = y;
    this.size = size;
   this.rotation = rotation;
  }

  display() {
    
    //background(255);
    push();
    stroke(125, 155, 100, random(0,8));
    strokeWeight(1);
    fill(187, 230, 186, random(0,8));
    translate(this.x, this.y);
    rotate(this.rotation);
    for (let i = 0; i < 4; i++) {
      rotate(PI / 2);
      this.drawLeaf(0, -this.size, this.size);
    }
    pop();
  }

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

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
   this.growing = true;
  }

  display() {
    //background(255);
    noFill();
    stroke(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

  }

  update() {
    this.radius += 5
  }
}
    