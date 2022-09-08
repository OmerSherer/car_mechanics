const canvas=document.getElementById("myCanvas");
canvas.width=400;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width*0.5, canvas.width*0.9, 5);
const car=new Car(canvas.width*0.5,window.innerHeight*0.7,30,50,'#FF0000');

const cam_borders = 0.3;

var x_draw = 0;
var y_draw = 0;

animate();

function animate(){
    car.update();

    canvas.height=window.innerHeight;

    if(car.y < canvas.height*cam_borders - y_draw && car.isUpward()){
        x_draw = 0;
        y_draw = -car.y + canvas.height*cam_borders;
    }
    else if(car.y > canvas.height*(1-cam_borders) - y_draw && car.isDownward()){
        x_draw = 0;
        y_draw = -car.y + canvas.height*(1-cam_borders);
    }
    ctx.translate(x_draw,y_draw);
    
    road.draw(ctx);
    car.draw(ctx);

    requestAnimationFrame(animate);
}