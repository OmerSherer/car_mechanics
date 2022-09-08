class Car{
    constructor(x,y,width,height,color){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=6;
        this.friction=0.05;
        this.angle=0;
        this.sensivity = 0.05;

        this.color = color;

        this.controls=new Controls();
    }

    update(){
        this.#move();
    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=this.sensivity*flip;
            }
            if(this.controls.right){
                this.angle-=this.sensivity*flip;
            }
        }

        while(this.angle >= 2*PI){
            this.angle -= 2*PI;
        }
        while(this.angle < 0){
            this.angle += 2*PI;
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
    }

    isFacingUp(){
        if((this.angle < PI/2 && this.angle >= 0) || (this.angle < 2*PI && this.angle > 1.5*PI)){
            return true;
        }
        return false;
    }

    isFacingDown(){
        if(this.angle > PI/2 && this.angle < 1.5*PI){
            return true;
        }
        return false;
    }

    isUpward(){
        if((this.isFacingUp() && this.speed > 0) || (this.isFacingDown() && this.speed < 0)) {
            console.log("up");
            return true;
        }
        else{
            return false;
        }
    }

    isDownward(){
        if((this.isFacingDown() && this.speed > 0) || (this.isFacingUp() && this.speed < 0)) { 
            console.log("dowm");
            return true;
        }
        else{
            return false;
        }
    }
}