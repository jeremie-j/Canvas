var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");

var dot = []; //Composition de la liste dot [x,y,vx,vy,distancesouris]
var setup = true;

function draw() {
  var width = window.innerWidth - 200;
  //var width = window.innerWidth
  //|| document.documentElement.clientWidth
  //|| document.body.clientWidth;
  canvas.width = width;
  background();
  dotDraw();
  if (setup == true) {
    dotGeneration();
    setup = false;
  }
}

function background() {
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#303030";
  ctx.fill();
}

function dotGeneration() {
  for(i = 0; i <= 200; i++){
  var x = getRandomInt(canvas.width);
  var y = getRandomInt(canvas.height);
  var vx = velocity();
  var vy = velocity();
  var distancesouris = 0;
  dot.push([x, y, vx, vy, distancesouris]);
  }
}

function velocity() {
  var velocity = getRandomInt(360);
  velocity = Math.cos(velocity)/5;
  return velocity;
}

function dotDraw() {
  for (i = 0; i < dot.length; i++) {
    ctx.beginPath();
    ctx.arc(dot[i][0], dot[i][1], 2, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "#F2F4F4";
    ctx.fillStyle = "#F2F4F4";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    var distanceTrait = 100;
    if(dot[i][4] < distanceTrait){
      ctx.beginPath();
      ctx.moveTo(dot[i][0],dot[i][1]);
      ctx.lineTo(mousePos.x,mousePos.y);
      ctx.strokeStyle = "rgba(242, 244, 244," + (dot[i][4] - distanceTrait)*-1/distanceTrait + ")";
      ctx.stroke();
      ctx.closePath();
    }

    dot[i][0] += dot[i][2];
    dot[i][1] += dot[i][3];
    if(dot[i][0] < 0 - 10 || dot[i][0] > canvas.width + 10){
      dot[i][2] *= -1;
    }
    if(dot[i][1] < 0 - 10 || dot[i][1] > canvas.height + 10){
      dot[i][3] *= -1;
    }
    dot[i][4] = calculDistance();
  }
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - rect.left),
    y: Math.round(evt.clientY - rect.top),
  };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function calculDistance(){
  D = Math.sqrt(Math.pow(dot[i][0] - mousePos.x,2)+Math.pow(dot[i][1] - mousePos.y,2));
  console.log(D)
  return D;
}

canvas.addEventListener("mousemove", function (evt) {
  mousePos = getMousePos(canvas, evt)});

setInterval(draw, 10);
