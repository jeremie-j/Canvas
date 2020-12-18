var canvas = document.getElementById("canvas2");
var ctx = canvas.getContext("2d");

var dot = []; //Composition de la liste dot [x,y,vx,vy,ax,ay,distancesouris, taille]
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
    mousePos = -10,-10;
    setup = false;
  }
}

function background() {
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#303030";
  ctx.fill();
}

function dotGeneration() {
  for(i = canvas.width/30; i <= canvas.width - 30; i += canvas.width/30){
    for(j = 50; j <= canvas.height - 40; j += 50){
    var x = Math.round(i);
    var y = Math.round(j);
    var vx = 0;
    var vy = 0;
    var ax = 0;
    var ay = 0;
    var DistanceInter = 0;
    var taille = 3;
    var mag = false;
    dot.push([x, y, vx, vy, ax, ay, DistanceInter, taille, mag]);
  }}
}

function velocity() {
  var velocity = getRandomInt(360);
  velocity = Math.cos(velocity)/5;
  return velocity;
}

function dotDraw() {
  for (i = 0; i < dot.length; i++) {
    ctx.beginPath();
    ctx.arc(dot[i][0] + dot[i][2], dot[i][1] + dot[i][3], dot[i][7], 0, 2 * Math.PI, false);
    console.log(dot[i][0] + dot[i][2])
    ctx.strokeStyle = "#F2F4F4";
    ctx.fillStyle = "#F2F4F4";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    if(dot[i][0] < 0 - 10 || dot[i][0] > canvas.width + 10){
      dot[i][2] *= -1;
    }
    if(dot[i][1] < 0 - 10 || dot[i][1] > canvas.height + 10){
      dot[i][3] *= -1;
    }
    distanceSouris = calculDistanceSouris();
    distanceOrigine = calculDistance();
    if (distanceSouris <= 100 && distanceSouris > 50){
      dot[i][8] = true;
    }else{
      dot[i][8] = false;
    }
    if (dot[i][8] == true){
    dot[i][2] += (mousePos.x - dot[i][0])/distanceSouris*2;
    dot[i][3] += (mousePos.y - dot[i][1])/distanceSouris*2;
    }if (dot[i][8] == false && dot[i][3]+dot[i][1] < 0){
      dot[i][2] -= (dot[i][2] - dot[i][0])/distanceSouris*2;
      dot[i][3] -= (dot[i][3] - dot[i][1])/distanceSouris*2;
  }
}}

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
  D = Math.sqrt(Math.pow(dot[i][0] - (dot[i][0] + dot[i][2]) ,2)+Math.pow(dot[i][1] - (dot[i][1]+dot[i][3],2)));
  return D;
}
function calculDistanceSouris(){
  D = Math.sqrt(Math.pow((dot[i][0]+dot[i][2]) - mousePos.x,2)+Math.pow((dot[i][1] + dot[i][2])- mousePos.y,2));
  return D;
}

canvas.addEventListener("mousemove", function (evt) {
  mousePos = getMousePos(canvas, evt)});

setInterval(draw, 10);
