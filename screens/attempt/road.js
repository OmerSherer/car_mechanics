class Road{
    constructor(x,width,lane_count){
        this.x = x;
        this.width = width;
        this.lane_count = lane_count;

        this.infinity = 1000000;

        this.top = -this.infinity;
        this.bottom = this.infinity;
        this.left = x-width/2;
        this.right = x+width/2;


        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders = [
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ]
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i=1;i<=this.lane_count-1;i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.lane_count
            );
            
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }

        ctx.lineWidth=8;
        ctx.strokeStyle="yellow";
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}