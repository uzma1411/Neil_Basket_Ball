const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerHead, playerBase, hands;
var playerShots = [];
var Hoop;
var numberOfShots = 30;

var score = 0;

function preload() {
  backgroundImg = loadImage("./Images/Background.jpg");
  himg = loadImage("./Images/Basketball Hoop.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new InvisibleBase(1300, 820, 180, 150);
  player = new BasketballPlayer(1300, playerBase.body.position.y - 120, 200, 180);
  playerHead = new BasketballPlayer2(1304, player.body.position.y - 110, 60, 45)
  hands = new Hands(1300, playerBase.body.position.y - 265, 30, 30);
  Hoop = new BasketballHoop(230, 490, 50);
}

function draw() {
  background(backgroundImg);
  text("X: " + mouseX + " y: " + mouseY, mouseX, mouseY)
  Engine.update(engine);
  push()
  imageMode(CENTER)
  image(himg, 180, 400, 300, 300);
  pop()
  // InvisibleBase.display();
  player.display();
  playerHead.display();
  hands.display();

  Hoop.display();

  for (var i = 0; i < playerShots.length; i++) {

    if (playerShots[i] !== undefined) {
      playerShots[i].display();

      /*var HoopCollision = Matter.SAT.collides(
        Hoop.body,
        playerShots[i].body
      );


      if (HoopCollision.collided) {
        score += 5;
        playerShots[i].remove(i);
        break;
        
      }*/
      if (playerShots[i].body.position.x > width || playerShots[i].body.position.y > height) {
        if (!playerShots[i].isRemoved) {
          playerShots[i].remove(i);
        }
      }
    }
  }

  for (var i = 0; i < playerShots.length; i++) {
    if (playerShots[i] !== undefined) {
      
      Matter.Events.on(engine, 'collisionStart', function(event) {
        let a = event.pairs.bodyA;
        let b = event.pairs.bodyB;
      
        // check bodies, do whatever...
      });
      
      var p = Matter.SAT.collides(
        Hoop.body,
        playerShots[i].body
      )
      console.log()
      if (p.collided ) {
        score += 5;
        break
      }
    }
  }
  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(60);
  text("Basketball", width / 2, 80);

  // Score
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Score: " + score, width - 350, 100);

  // Basketball Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Shots: " + numberOfShots, 350, 100);
  if (numberOfShots == 0) {
    gameOver();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfShots > 0) {
      var posX = hands.body.position.x;
      var posY = hands.body.position.y;
      var angle = hands.body.angle;

      var ball = new Ball(posX, posY, angle);

      ball.trajectory = [];
      Matter.Body.setAngle(ball.body, angle);
      playerShots.push(ball);
      numberOfShots -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerShots.length) {
      var angle = hands.body.angle;
      playerShots[playerShots.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}


