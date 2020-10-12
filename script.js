let lastTime = new Date().getTime();
let currentTime = 0;
var balls = new Array();

var c = document.getElementById("bgd");
var ctx = c.getContext("2d");
ctx.canvas.width = ( 50*window.innerWidth) / 100;
ctx.canvas.height = (99 * window.innerHeight)/100;
ctx.font = "18px Arial";

function drawObjects(ctx, circles) {
  for (const circle of circles) {
    ctx.beginPath();
    ctx.arc(circle.xpos, circle.ypos, circle.rad, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(circle.number, circle.xpos-5, circle.ypos+5);
  }
}

document.getElementById("bgd").onclick = function () {
  balls.push(
    new Circle(
      event.clientX,
      event.clientY,
      5,
      50,
      0,
      0,
      10,
      (0, 0, 0),
      balls.length + 1
    )
  );
};

function update() {
  currentTime = new Date().getTime();
  var dt = (currentTime - lastTime) / 1000;
  dt *= 10;
  if (!pause){
    ballCollision(dt);
    wallCollision(dt);
  }
  lastTime = currentTime;
  ctx.clearRect(0, 0, bgd.width, bgd.height);
  formDisplay()
  drawObjects(ctx, balls);
  window.requestAnimationFrame(update);
}

update();
