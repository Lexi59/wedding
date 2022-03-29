var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var list = document.getElementById('list');

img.src = "../resources/neutralGAC.png";
localStorage.setItem('page','key');

var items = document.getElementsByTagName('li');
var currSelected =document.getElementById(0);
currSelected.classList.toggle('selected')

var dirArrows = document.getElementsByClassName('dirBtn');
for(var i =0; i<dirArrows.length; i++){
    dirArrows[i].style.height = dirArrows[i].style.width;
}

function select(event){
    document.getElementById(event.target.id).classList.toggle('selected');
    currSelected.classList.toggle('selected');
    currSelected = document.getElementById(event.target.id);
}

function moveUp() {
    if(currSelected.id > 0){
        el2 = currSelected;
        el1 = document.getElementById(parseInt(currSelected.id)-1);
        let prev1 = el1.previousSibling;
        let prev2 = el2.previousSibling;
        var temp = el1.id;
        el1.id = el2.id;
        el2.id = temp;
        prev1.after(el2);
        prev2.after(el1);
    }
}
function moveDown() {
    if(currSelected.id < 8){
        el2 = currSelected;
        el1 = document.getElementById(parseInt(currSelected.id)+1);
        let prev1 = el1.previousSibling;
        let prev2 = el2.previousSibling;
        var temp = el1.id;
        el1.id = el2.id;
        el2.id = temp;
        prev1.after(el2);
        prev2.after(el1);
    }
}

var rightOrder = ["First met","First Date", "First Kiss",'"I love you"', "First Vacation","Moved to Watertown","Proposal","Closed on First Home","Wedding"];
async function checkAnswers(){
    var items = document.getElementsByTagName('li');
    var keyKnobs = document.getElementsByClassName('keyKnob');
    currSelected.classList.toggle('selected');
    var correct = true;

    for(var i = 0; i < items.length; i++){
        var text = items[i].textContent.split('-')[0].trim();
        if(text != rightOrder[i]){correct = false; console.log(text, rightOrder[i], text == rightOrder[i]);}
        var value = parseInt(items[i].textContent.split('-')[1].trim());
        items[i].style.backgroundColor = "red";
        keyKnobs[i].style.height = (2*value) + 'vw';
        keyKnobs[i].style.backgroundColor = "red";
        await new Promise(r => setTimeout(r, 250));
        keyKnobs[i].style.backgroundColor = "black";
        items[i].style.backgroundColor = "#eaeaea";
    }
    currSelected.classList.toggle('selected');

    var text = document.getElementById('text')
    if(correct){
        text.textContent = "That looks like a key! Like when Alexis and Grant moved into their new place a few months ago. Let's try that!";
        img.src = "../resources/excitedGAC.png"
        closeHints();
        document.getElementById('key').style.display = 'none';
        document.getElementById('listArea').style.display = 'none';
        document.getElementById('submit').style.display = 'none';
        document.getElementById('next').style.display = 'block';
    }
    else{
        text.textContent = "Hmm.. that didn't seem to work."
        img.src = "../resources/sadGAC.png";
    }
}

var step=0;
function nextThing(){
    if(step==0){
        text.style.fontFamily = 'Garamond';
        text.style.fontSize = 'medium';
        img.src = "../resources/happyGAC.png"
        text.innerHTML = "Rent was getting crazy, interest rates were being to explode out of control, and they were engaged. So, Alexis and Grant started looking at houses. They thought it might take a while to find one that they liked, but it did not. They toured 3 houses and put an offer in on one a few days later. They pushed off the closing date for a while, but eventually got to move in April 29th, 2022 and they could not be happier." 
        step++;
    }
    else if(step==1){
        text.innerHTML = "And that brings us to today! We hope you enjoy all the wedding festivities and that you enjoyed reading their story. They really are thankful that you were able to come celebrate with them. Thank you again for helping me get all the files put back together!"
        step++;
    }
    else if (step == 2){
        text.innerHTML = "Safe Code for prize: 3249"
        var i = document.createElement('img');
        i.src = "../resources/Wedding Designs.png";
        i.style = "width: 90%; margin: auto; display:block;"
        text.after(i);
        next.style.display = 'none';
    }
}