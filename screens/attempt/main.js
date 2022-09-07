const canvas=document.getElementById("myCanvas");
canvas.width=400;

const ctx = canvas.getContext("2d");
const car=new Car(canvas.width*0.5,window.innerHeight*0.7,30,50,'#FF0000');

animate();

function animate(x,y){
    car.update();
    
    canvas.height=window.innerHeight;

    if(car.y <canvas.height*0.2){
        ctx.translate(0,-car.y + canvas.height*0.2 );
    }
    else if(car.y > canvas.height*0.8){
        ctx.translate(0,-car.y + canvas.height*0.8);
    }

    car.draw(ctx);

    requestAnimationFrame(()=>{animate(car.x,car.y)});
}