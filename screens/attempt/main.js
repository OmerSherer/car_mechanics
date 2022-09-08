const canvas=document.getElementById("myCanvas");
canvas.width=400;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width*0.5, canvas.width*0.9, 5);
const car=new Car(canvas.width*0.5,window.innerHeight*0.7,30,50,'#FF0000');

animate(0,0);

function animate(x,y){
    car.update();

    canvas.height=window.innerHeight;

    ctx.save();

    if(car.y <canvas.height*0.2 && car.isUpward()){
        ctx.translate(0,-car.y + canvas.height*0.2);
    }
    else if(car.y <canvas.height*0.2){

    }
    else if(car.y > canvas.height*0.8){
        ctx.translate(0,-car.y + canvas.height*0.8);
    }
    else {
        ctx.translate(0,0);
    }
    
    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();

    requestAnimationFrame(()=>{animate(car.x,car.y)});
}