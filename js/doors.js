var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var doorDiv = document.getElementById('doorDiv');

img.src = '../resources/neutralGAC.png';
localStorage.setItem('page','doors');

var currentStep = 0;
var doors = [
    [8,12,6,11,7,3],
    [8,7,7,4,10],
    [7,9,1,5,2],
    [5,12,3],
    [5,7,9,8],
    [6,9,4],
    [5,3,1],
    [10,6,5,4],
    [7,3,9],
    [5,7,11,4,6,11],
    [12,1,11,11,1],
    [1,8,7,3,7]
]
var answers = [11,4,9,3,5,9,1,6,9,11,12,1];

var imgMap = ['',]
for(var i = 1; i <= 12; i++){
    imgMap.push('../resources/door'+i+'.png');
}
nextPage();

function addDoorToPage(num){
    var newDoor = document.createElement('img');
    newDoor.src = imgMap[num];
    newDoor.classList.add('door');
    newDoor.style.width = '30%';
    newDoor.style.margin = '1%';
    newDoor.setAttribute('onclick',"checkAnswer("+ num + ")");
    doorDiv.appendChild(newDoor);
}

function clearDoors(){
    var d = document.getElementsByClassName('door');
    for(var i = d.length-1; i >= 0; i--){
        d[i].remove();
    }
}

function nextPage(){
    clearDoors();
    if(currentStep == 12){
        doorDiv.style.display = 'none';
        next.style.display = 'block';
        document.getElementById('bar').style.display = 'none'
        closeHints();
        text.innerHTML = "Oh my goodness that was a lot of options and a lot of decisions. That kind of reminds me of when they were trying to find internships. Let’s see if that works!"
    }
    else{
        for(var i = 0; i < doors[currentStep].length; i++){
        addDoorToPage(doors[currentStep][i]);
        }
    }
}

function checkAnswer(num){
    console.log(num, answers[currentStep], currentStep);
    if(num == answers[currentStep]){
        currentStep++;
    }
    else{
        currentStep = 0;
    }
    document.getElementById('progress').style.width = currentStep*8.3 + '%';
    nextPage();
}

var step = 0
function nextThing(){
    if(step == 0){
        text.style.fontFamily = 'Garamond';
        text.style.fontSize = 'medium';
        img.src = "../resources/happyGAC.png";
        text.innerHTML = "Finding their first internships was pretty hard. The very first summer they were dating, Alexis got an internship in Mitchell doing something that wasn't super related to what she wanted to do when she graduated, but she figured any experience is better than none. Grant worked at the golf course in Watertown. <br> Their second year of school flew by. They had tons of fun getting to know each other, going on dates, playing Pokemon Go, acing their classes, and being involved on campus. <br> The second summer they were together, Grant got an internship at WAPA in Watertown working for the DOE. Alexis got an internship in Thief River Falls, MN at Digi-Key Electronics. They both had a great time and learned a lot, but it was hard being so far apart. They spent a lot of weekends driving to see each other. <br> I feel like something important happened before the third summer. Let's see if we can get the next file unscrambled."
        step++;
    }
    else if(step == 1){
        window.location.href = "../pages/truths.html";
    }
}