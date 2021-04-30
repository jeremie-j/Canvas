var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");

var dot = [[1, 1, 1, 1, 1, 1]]; //Composition de la liste dot [x,y,vx,vy,taille,couleur]
var lastMove = 0;
var oldx = 10;
var oldy = 10;

(mousePos = 0), 0;
function draw() {
  var width = 700;
  //var width = window.innerWidth
  //|| document.documentElement.clientWidth
  //|| document.body.clientWidth;
  canvas.width = width;
  background();
  dotDraw();
}

function background() {
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#303030";
  ctx.fill();
}


function positive() {
  if (getRandomInt(2) == 0) {
    return true;
  } else {
    return false;
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function dotDraw() {
  for (let i = 0; i < dot.length; i++) {
    ctx.beginPath();
    ctx.arc(dot[i][0], dot[i][1], dot[i][4], 0, 2 * Math.PI, false);
    ctx.fillStyle = dot[i][5];
    ctx.fill();
    ctx.closePath();
    dot[i][0] += dot[i][2];
    dot[i][1] += dot[i][3];
    dot[i][4] -= 0.04;
    if (dot[i][4] < 1) {
      dot.shift();
    }
  }
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - rect.left),
    y: Math.round(evt.clientY - rect.top),
  };
}
function randomColor() {
  var nb = getRandomInt(5);
  if (nb == 0) {
    return "#F4D03F";
  }
  if (nb == 1) {
    return "#82E0AA";
  }
  if (nb == 2) {
    return "#3498DB";
  }
  if (nb == 3) {
    return "#E74C3C";
  }
  if (nb == 4) {
    return "#ECF0F1";
  }
  if (nb == 5) {
    return "#138D75";
  }
}


canvas.addEventListener("mousemove", function (evt) {
  mousePos = getMousePos(canvas, evt);
  if(Date.now() - lastMove > 20) {
if (dot.length < 200) {
  var x = mousePos.x;
  var y = mousePos.y;
  var vx = Math.round((mousePos.x - oldx) / 8);
  var vy = Math.round((mousePos.y - oldy) / 8);
  var taille = 20;
  var color = randomColor();
  dot.push([x, y, vx, vy, taille, color]);
  oldx = mousePos.x;
  oldy = mousePos.y;
} else {
  dot.shift();
}
lastMove = Date.now();
}});

var interval = setInterval(draw, 10);
