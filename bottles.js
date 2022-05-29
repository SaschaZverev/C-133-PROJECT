s = "";
bottle_image = "";
objects = [];

function setup(){
    canvas = createCanvas(640,450);
    canvas.position(450, 200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function preload(){
    bottle_image = loadImage("bottle.jpg");
}

function modelLoaded(){
    console.log("Model Loaded!");
    s = true;
    object_Detector.detect(bottle_image,gotResults);
}

function draw() {
    image(bottle_image, 0, 0, 640, 420);
  
       if(s != "")
        {
          for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
      
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          }
  }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}