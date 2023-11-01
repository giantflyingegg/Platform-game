
const ctx = canvas.getContext('2d');
console.log('playerloaded');

class CharacterSprite {
    constructor(x, y, initials = '') {
        this.x = x;
        this.y = y;
        this.vx = 0; // horizontal velocity
        this.vy = 0; // vertical velocity
        this.isJumping = false;
        this.gravity = 0.5;
        this.jumpStrength = -10; // negative because canvas Y is inverted
        this.initials = initials;
    }

    //set initials
    setInitials(initials) {
        this.initials = initials;
    }

    draw(ctx) {


    // body
    ctx.beginPath();
    ctx.arc(this.x, this.y, 25, 0, Math.PI, true);
    ctx.fillStyle = "#06330c";    
    ctx.fill();
    ctx.closePath();

    // //head
    ctx.beginPath();
    ctx.roundRect(this.x+8, this.y-35, 20, 15, 7);
    ctx.fillStyle = "#118c21";
    ctx.fill();
    ctx.closePath();

    // //eye
    ctx.beginPath();
    ctx.arc(this.x+17, this.y-30, 2, 0, Math.PI *2, true);
    ctx.fillStyle = "black";    
    ctx.fill();
    ctx.closePath();

    // ///mouth
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(this.x+19, this.y-24);
    ctx.lineTo(this.x+27, this.y-24);
    ctx.stroke();

    // //back foot
    ctx.beginPath();
    ctx.arc(this.x-15, this.y, 6, 0, Math.PI, false);
    ctx.fillStyle = "#118c21";
    ctx.fill(); 
    ctx.closePath();

    //front foot
    ctx.beginPath();
    ctx.arc(this.x+13, this.y, 6, 0, Math.PI, false);
    ctx.fillStyle = "#118c21";
    ctx.fill(); 
    ctx.closePath();

    //shell initials
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.initials}`, this.x-12, this.y-4);

    }

    update(platforms) {
        // Gravity effect
        this.vy += this.gravity;
    
        // Add horizontal movement
        this.x += this.vx;
    
        // Check collisions with platforms
        for (let platform of platforms) {
            if (
                this.x - 25 < platform.x + platform.width &&
                this.x + 25 > platform.x &&
                this.y + 25 > platform.y &&
                this.y < platform.y + platform.height
            ) {
                this.y = platform.y - 25;
                this.isJumping = false;
                this.vy = 0;  // stop vertical movement
            }
        }
    
        this.y += this.vy;
    
        // Ensure character stays within canvas bounds
        if (this.x < 25) this.x = 25;
        if (this.x > canvas.width - 25) this.x = canvas.width - 25;
        if (this.y > canvas.height - 25) {
            this.y = canvas.height - 25;
            this.isJumping = false;
            endGameFallOff();  // Call the end game function for falling off
            return; // Stop further updates after end game state
        }
    
        // Check if the player touches the right hand end of the screen
        if (this.x + 25 > canvas.width) {
            endGameTouchRight();
            return; // Stop further updates after end game state
        }
    }
    
    moveLeft() {
        this.vx = -10;
    }

    moveRight() {
        this.vx = 10;
    }

    stopHorizontalMovement() {
        this.vx = 0; // sets horizontal velocity to 0
    }

    jump() {
        if (!this.isJumping) {
            this.vy = this.jumpStrength;
            this.isJumping = true;
        }
    }

}
export default CharacterSprite;