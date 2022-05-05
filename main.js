Levitating="";
Blank_Space="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
songbs = "";
songl = "";

function setup(){
    canvas = createCanvas(600,600);
    canvas.position(1000,300);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Blank_Space = loadSound("Blank Space.mp3");
    Levitating = loadSound("levitating.mp3");
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw(){
    image(video,0,0,600,600);

    fill("#00ff00");
    stroke("#ff0000");

    songbs = Blank_Space.isPlaying();
    console.log(songbs);

    songl = Levitating.isPlaying();
    console.log(songl);

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        Levitating.stop();
        if(songbs == false){
        Blank_Space.play();
        }
    }

    else
    {
        console.log("Song Name: Blank Space Song");
        document.getElementById("song1").innerHTML = "Song Name: Blank Space Song";
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWrist_x, rightWrist_y,20);
        Blank_Space.stop();
        if(songl == false){
        Levitating.play();
        }
    }

    else
    {
        console.log("Song Name: Levitating Song");
        document.getElementById("song2").innerHTML = "Song Name: Levitating Song";
    }
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}