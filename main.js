song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;




function preload()
{
    song = loadSound('music.mp3');
    
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}   

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "left wrist y" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + rightWristX + "right wrist y = " + rightWristY);

    }
    
        
}

function modelLoaded()
{
    console.log("posenet initizialield");
}

function draw(){
    image(video,0,0,600,530);
    fill("#8AFF33");
    stroke("#8AFF33");
    circle(rightWristX, rightWristY, 20);
    if(rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }

    if(rightWristY > 100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }

    if(rightWristY > 200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }

    if(rightWristY > 300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }

    if(rightWristY > 400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }

    

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        inNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(inNumberLeftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }
    
}



function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}