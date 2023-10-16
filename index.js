//target canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//set background
const background = new Image();
background.src = "Images/background.png";

// Set the canvas size to window 
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// Calculate scale factors
let scaleX = canvasWidth / background.width;
let scaleY = canvasHeight / background.height;

let scale = Math.min(scaleX, scaleY);  

let scaledImageWidth = background.width * scale;
let scaledImageHeight = background.height * scale;

canvas.width = scaledImageWidth;
canvas.height = scaledImageHeight;

background.onload = function() {
    ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, scaledImageWidth, scaledImageHeight);
};