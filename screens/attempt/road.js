class Road{
    constructor(x,y,width,height,color){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=4;
        this.friction=0.05;
        this.angle=0;

        this.color = color;

        this.controls=new Controls();
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
}