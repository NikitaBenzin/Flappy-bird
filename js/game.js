var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// audio files 
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 90;

// on keydown bird is going up
document.addEventListener("keydown", moveUp);

function moveUp(){
    yPos -= 25; 
    fly.play();
}

// creating the blocks
var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}

var score = 0;
// bird position
var xPos = 10;
var yPos = 150;
var grav = 1.5;

// drawing the images 
function draw(){
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;
        // spawn a columns in the random place 
        if(pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height 
            })
        }

        // check when bird touch a columns or floor
        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height){
            location.reload();
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    // bird falling down
    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;