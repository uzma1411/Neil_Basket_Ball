class BasketballHoop {
  constructor(x, y, width) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.circle(x, y, width, options);

    this.width = width;
    //this.height = height;
    this.image = loadImage("./Images/Basketball Hoop.png");

    World.add(world, this.body);
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    //imageMode(RADIUS);
    //image(this.image, 0, 0, 160, 160);
    ellipseMode(RADIUS)
    //ellipse( 0, 0, 50, 50);
    pop();
  }
}
