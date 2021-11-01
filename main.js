song="";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreL = 0;
scoreR = 0;

function preload(){
    song = loadSound("ABBA - Eagle (Video).mp3");
    song1 = loadSound("The Beatles - Here Comes The Sun.mp3");
}

function setup(){
    canvas = createCanvas(/*450,350*/600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is on the service!");
}

function gotPoses(results){
    if (results.length > 0){
        //console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreL = results[0].pose.keypoints[9].score;
        scoreR = results[0].pose.keypoints[10].score;
        //console.log("LWX-"+leftWristX+"LWY"+leftWristY+"RWX"+rightWristX+"RWY"+rightWristY);
        //console.log(scoreL);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#03fce3");
    stroke("#027d71");
    //circle(leftWristX-10, leftWristY-20, 20);
    //circle(rightWristX, rightWristY, 20);

    if (scoreR > 0.2){
        circle(rightWristX, rightWristY,20);
        song1.stop();
        song.play();
    }

    if (scoreL > 0.2){
        circle(leftWristX, leftWristY, 20);
        song.stop();
        song1.play();
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}