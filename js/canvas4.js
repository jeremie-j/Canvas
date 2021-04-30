var canvas = document.getElementById("canvas4");
var ctx = canvas.getContext("2d");

var dot = []; //Composition de la liste dot [x,y,vx,vy,distancesouris]
var setup = true;

function draw() {
  var width = 700;
  //var width = window.innerWidth
  //|| document.documentElement.clientWidth
  //|| document.body.clientWidth;
  canvas.width = width;
  background();
  dotDraw();
  if (setup == true) {
    dotGeneration();
    mousePos = 10,10;
    setup = false;
  }
}

function background() {
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#303030";
  ctx.fill();
}

function dotGeneration() {
  for(i = 0; i <= canvas.width/5; i++){
  var x = getRandomInt(canvas.width);
  var y = getRandomInt(canvas.height);
  var vx = velocity();
  var vy = velocity();
  var DistanceInter = 0;
  var taille = getRandomInt(3)+0.5;
  dot.push([x, y, vx, vy, DistanceInter, taille]);
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
    ctx.arc(dot[i][0], dot[i][1], dot[i][5], 0, 2 * Math.PI, false);
    ctx.strokeStyle = "#F2F4F4";
    ctx.fillStyle = "#F2F4F4";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    var distanceTrait = 100;
    for(j = 0; j < dot.length; j++){
      DistanceInterPoint = calculDistance();
    if( DistanceInterPoint < distanceTrait){
      ctx.beginPath();
      ctx.moveTo(dot[i][0],dot[i][1]);
      ctx.lineTo(dot[j][0],dot[j][1]);
      ctx.strokeStyle = "rgba(242, 244, 244," + (DistanceInterPoint - distanceTrait)*-1/distanceTrait + ")";
      ctx.stroke();
      ctx.closePath();
    }}
    distancesouris = calculDistanceSouris()
    if(distancesouris < distanceTrait){
      ctx.beginPath();
      ctx.moveTo(dot[i][0],dot[i][1]);
      ctx.lineTo(mousePos.x,mousePos.y);
      ctx.strokeStyle = "rgba(242, 244, 244," + (distancesouris - distanceTrait)*-1/distanceTrait + ")";
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
  D = Math.sqrt(Math.pow(dot[i][0] - dot[j][0],2)+Math.pow(dot[i][1] - dot[j][1],2));
  return D;
}
function calculDistanceSouris(){
  D = Math.sqrt(Math.pow(dot[i][0] - mousePos.x,2)+Math.pow(dot[i][1] - mousePos.y,2));
  return D;
}

canvas.addEventListener("mousemove", function (evt) {
  mousePos = getMousePos(canvas, evt)});

  var interval = setInterval(draw, 10);
