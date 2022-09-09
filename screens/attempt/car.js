class Car{
    constructor(x,y,width,height,color){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.speed_acceleration=0.2;
        this.maxSpeed=5;
        this.speed_friction=0.05;

        this.angle=0;
        this.angle_sensivity = 0;
        this.angle_acceleration = 0.005;
        this.angle_maxSensivity = 0.05;
        this.angle_friction = 0.0015;
        
        this.color = color;

        this.controls=new Controls();
    }

    update(){
        this.#move();
    }

    #move(){
        // speed
        this.update_speed();

        // angle
        this.update_angle("realistic"); // modes: "normal" or "realistic"
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);


        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.strokeStyle = "black";
        ctx.lineWidth=3;
        ctx.beginPath();
        ctx.moveTo(0,-this.height/2.5);
        ctx.lineTo(0,this.height/2.5);
        ctx.moveTo(this.width/50,-this.height/2.5);
        ctx.lineTo(-this.width/2.5,-this.height/10);
        ctx.moveTo(-this.width/50,-this.height/2.5);
        ctx.lineTo(this.width/2.5,-this.height/10);
        ctx.stroke();
        //ctx.fill();

        ctx.restore();
    }

    // speed
    update_speed(){
        if(this.controls.forward){
            this.speed+=this.speed_acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.speed_acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.speed_friction;
        }
        if(this.speed<0){
            this.speed+=this.speed_friction;
        }
        if(Math.abs(this.speed)<this.speed_friction){
            this.speed=0;
        }
    }

    // angle
    update_angle(mode){
        switch(mode){
            case "normal":
                this.update_angle_normal();
                break;
            case "realistic":
                this.update_angle_realistic();
                break;
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

    update_angle_normal(){
        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=this.angle_maxSensivity*flip;
            }
            if(this.controls.right){
                this.angle-=this.angle_maxSensivity*flip;
            }
        }
    }

    update_angle_realistic(){
        if(this.controls.left){
            this.angle_sensivity+=this.angle_acceleration;
        }
        else if(this.controls.right){
            this.angle_sensivity-=this.angle_acceleration;
        }

        if(this.angle_sensivity>this.angle_maxSensivity){
            this.angle_sensivity=this.angle_maxSensivity;
        }
        else if(this.angle_sensivity<-this.angle_maxSensivity){
            this.angle_sensivity=-this.angle_maxSensivity;
        }

        if(this.angle_sensivity>0){
            this.angle_sensivity-=this.angle_friction;
        }
        else if(this.angle_sensivity<0){
            this.angle_sensivity+=this.angle_friction;
        }

        if(Math.abs(this.angle_sensivity)<this.angle_friction){
            this.angle_sensivity=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            this.angle+=this.angle_sensivity*flip;
        }
    }

    // direction
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