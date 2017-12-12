particles = 180;
points = [];
points1 = [];
pointers = [];

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var x = canvas.width, y = canvas.height;
img=document.getElementById("img");

exp = 5;
for(i=0; i<particles; i++){
  exp = exp*(Math.floor(Math.random()*20)/100+1);
  newX = exp;
  points[points.length] = newX;
  
  exp = exp*(Math.floor(Math.random()*20)/100+1);
  newX = exp;  
  points1[points1.length] = newX;
}

pointX = x/2;
pointY = y/2;

rotate = 0.04;
function draw(){
  context.fillStyle = "rgba(0,0,0,0.03)";
  context.fillRect(0,0,x,y);
  context.save();
  context.translate(pointX,pointY);
  context.rotate(rotate);
  i = 0;
  while(i<points.length){
    context.fillStyle = "#FFF";
    context.fillRect(points[i],0,1,1);
    i++;
  }
  context.restore();
  context.save();
  context.translate(pointX,pointY);
  context.rotate(rotate*0.7);
  i = 0;
  while(i<points.length){
    context.fillStyle = "#FFF";
    context.fillRect(points1[i],0,1,1);
    i++;
  }
  context.restore();
  rotate = rotate+0.01;
  requestAnimationFrame(draw);
}
// requestAnimationFrame(draw);

exp = 5;
for(i=0; i<particles; i++){
  point = {};
  exp = exp*(Math.floor(Math.random()*12)/100+1);
  point.x = exp;
  point.r0 = Math.floor(Math.random()*50)/10+1;
  point.r = Math.floor(Math.random()*Math.PI)+1;
  pointers[pointers.length] = point;
}

function drawNew(){
  context.fillStyle = "rgba(0,0,0,0.03)";
  context.fillRect(0,0,x,y);
  context.fillStyle = "#FFF";
  context.save();
  i=0;
  while(i<pointers.length){
    context.save();
    context.translate(pointX,pointY);
    context.rotate(pointers[i].r*0.1);
    pointers[i].r = pointers[i].r+pointers[i].r0*0.05;
    context.fillRect(pointers[i].x,0,1,1);    
    context.restore();
    i++;
  }
  requestAnimationFrame(drawNew);
}
requestAnimationFrame(drawNew);