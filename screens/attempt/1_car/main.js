const canvas=document.getElementById("myCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const car=new Car(canvas.width*0.5,window.innerHeight*0.8,30,50,'#FF0000');

animate();

function animate(){
    car.update();
    
    canvas.height=window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate);
}