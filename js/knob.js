var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var photos = document.getElementById('photoDiv');

img.src = "../resources/neutralGAC.png"
var knobs = [];
var currRotation = [];
var answers = [1,2,0,3,2,0,3,3,2];

localStorage.setItem('page','knob');

function addImage(name, num, add=false){
    var photo = document.createElement('img');
    photo.src = "../resources/"+name;
    photo.classList.add("knobPhoto");
    photo.classList.add("knob"+num);
    if(add){photo.classList.add('height')}
    photos.appendChild(photo);
}

function addKnob(){
    var knob = document.createElement('img');
    knob.src = "../resources/knob.png";
    knob.classList.add('knob');
    knob.setAttribute('onclick','rotate('+knobs.length+')');
    knobs.push(knob);
    currRotation.push(0);
    photos.appendChild(knob);
}

function rotate(index){
    var knob = knobs[index];
    currRotation[index]+=90;
    knob.style.transform = "rotate("+currRotation[index]+"deg)";
}

function checkAnswers(){
    var correct = 0;
    for(var i = 0; i < currRotation.length; i++){
        if(currRotation[i]/90 %4 == answers[i]){
            correct++;
        }
    }
    if(correct == 9){
        img.src = "../resources/happyGAC.png";
        closeHints();
        text.innerHTML = "That was a lot of things to optimize. Like when they were trying to pick jobs... Let me try that!";
        next.style.display = "block";
        photoDiv.style.display = "none";
        document.getElementById('submit').style.display = 'none';
    }
    else{
        img.src = "../resources/sadGAC.png";
        text.innerHTML = "Hmm.. that didn't seem to work";
    }
}

var step = 0;
function nextThing(){
    if(step == 0){
        text.style.fontFamily = 'Garamond';
        text.style.fontSize = 'medium';
        text.innerHTML = "Trying to find jobs amidst a pandemic was really hard for both of them. Alexis had lined up an internship with the NSA and even flew to Maryland to do her polygraph. She was almost fully hired into her position when all NSA internships were cancelled. Grant was applying for jobs left and right only to be told that the companies had gone into a hiring freeze. They weren't left with a ton of options. Alexis got a remote internship with WAPA (where Grant worked) and Grant was offered a full-time position at WAPA. They both were still going to work towards their Master's degrees, but at least they weren't completley jobless for the summer of 2020.";
        step++;
    }
    else if(step == 1){
        window.location.href = "../pages/colors.html";
    }
}

addImage("pokemon1.png",3);
addImage("princess1.jpg", 3);
addImage("show1.png", 3);

addImage("pokemon2.png",9);
addKnob();
addImage("pokemon3.png",9);
addImage("princess2.jpg",9);
addKnob();
addImage("princess3.jpg",9);
addImage("show2.jpg",9);
addKnob();
addImage("show3.png",9);

addImage("pokemon4.png",3);
addImage("princess4.jpg", 3);
addImage("show4.png", 3,true);


addImage("food1.png",3);
addImage("candy1.png", 3);
addImage("holiday1.png", 3);

addImage("food2.png",9);
addKnob();
addImage("food3.png",9,"");
addImage("candy2.png",9);
addKnob();
addImage("candy3.png",9);
addImage("holiday2.png",9);
addKnob();
addImage("holiday3.png",9);

addImage("food4.jpg",3);
addImage("candy4.jpg", 3);
addImage("holiday4.png", 3);



addImage("animal1.png",3);
addImage("color1.png", 3);
addImage("emoji1.png", 3);

addImage("animal2.png",9);
addKnob();
addImage("animal3.jpg",9,"");
addImage("color2.png",9);
addKnob();
addImage("color3.png",9);
addImage("emoji2.png",9);
addKnob();
addImage("emoji3.png",9);

addImage("animal4.jpg",3);
addImage("color4.png", 3);
addImage("emoji4.png", 3);