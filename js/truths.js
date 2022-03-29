var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var submit = document.getElementById('submit');

img.src = '../resources/neutralGAC.png';
localStorage.setItem('page','truths');

var cards = document.getElementsByClassName('card-container');

for(var i =0; i < cards.length; i++){
    cards[i].style.width = window.innerWidth*0.23 + 'px';
    cards[i].style.height = window.innerWidth*0.23 + 'px';
    cards[i].setAttribute('onclick', 'flip('+i+')');
}

var answers = [false, true, true, false, false, true, true, false, false];


function checkAnswers(){
    var win = true;
    for(var i =0; i < cards.length; i++){
        if(cards[i].classList.contains('flip') != answers[i]){
            win = false
        }
    }
    if(win){
        img.src = "../resources/happyGAC.png";
        closeHints();
        text.innerHTML = "That was a fun trip for them. Let me see if I can access this file now."
        next.style.display = 'block';
        for(var i =0; i < cards.length; i++){
            cards[i].style.display = 'none';
        }
        submit.style.display = 'none';
    }
    else{
        img.src = "../resources/sadGAC.png";
        text.innerHTML = "Hmm.. that didn't seem to work."
    }
}

function flip(id){
    var card = cards[id];
    card.classList.toggle('flip');
}

var step = 0;
function nextThing(){
    text.style.fontFamily = 'Garamond';
    text.style.fontSize = 'medium';
    if(step == 0){
        text.innerHTML = "In October of their last year of college, Alexis had gone to a Women in Cyber Security conference and signed up for a raffle for a free cruise. AND SHE WON! So they booked the cruise for spring break week. They left Saturday after classes had ended and drove to Chicago, then they flew to Miami and got on the boat. They had a blast doing all the things on the boat and at the stops they made. The craziest thing was that they did not pay for Wi-Fi so, they did not have internet access or any knowledge of what was happening in the real world the whole time. COVID-19 was a thing before they left on the cruise and they debated not going on the cruise, but COVID was so minor at the time that they felt safe going on the cruise. When they finally made it back to land, the world had totally fallen apart. School had extended spring break for an extra week to buy time and all the professional sports had suspended their seasons. They were able to get off the boat, go on a tour of Miami, and fly home with no problems, but they were definitely worried. They made it back and went to their family homes for the rest of that semester."
        step++;
    }
    else if (step == 1){
        window.location.href = "../pages/maze.html";
    }
}