const ctx = canvas.getContext('2d');

// console.log('Platform class loaded');

export class Platform {
    constructor(x, y, width, height, color = 'white') { 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.outlineColor = 'black';
        this.outlineWidth = 3;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.outlineColor;
        ctx.lineWidth = this.outlineWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export default Platform;