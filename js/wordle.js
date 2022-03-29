var img = document.getElementById('GAC');
var text = document.getElementById('text');
var answer = document.getElementById('answerArea');
var next = document.getElementById('next');
var board = document.getElementById('wordleBoard');
var keyboard = document.getElementById('keyboardContainer');

localStorage.setItem('page','wordle');
img.setAttribute('src','../resources/neutralGAC.png');

var currentGuess = -1;
var currentLetter = 0;
var solutionWord = "CHEER";
addGuessRow();

function addGuessRow(){
    var guessRow = document.createElement('div');
    guessRow.classList.add('guessRow');
    board.appendChild(guessRow);
    for(var i = 0; i < 5; i++){
        var square = document.createElement('div');
        square.classList.add('wordleSquare');
        square.classList.add('animate__animated');
        guessRow.appendChild(square);
        square.style.height = square.offsetWidth*0.9 + 'px';
    }
    currentGuess++;
    currentLetter = 0;
}


var keys = document.querySelectorAll(".keyboardRow button");

for(var i = 0; i < keys.length; i++){
    keys[i].setAttribute('onclick', 'addLetter(keys['+i+'].getAttribute("data-key"))')
}

function addLetter(letter){
    if(letter == 'enter'){
        tryWord();
    }
    else if (letter == 'del'){
        var guessRow = document.getElementsByClassName('guessRow')[currentGuess];
        if(currentLetter <= 0){return;}
        currentLetter--;
        guessRow.children[currentLetter].innerHTML = "";
        
    }
    else{
        if(currentLetter <5){
            var row = document.getElementsByClassName('guessRow')[currentGuess];
            var square = row.children[currentLetter];
            square.innerHTML = "<h1>" + letter.toUpperCase(); + "</h1>"
            currentLetter++;
        }
    }
}

async function tryWord(){
    var guessRow = document.getElementsByClassName('guessRow')[currentGuess];
    var guessStr = "";
    for(var i = 0; i < guessRow.children.length; i++){
        guessStr += guessRow.children[i].textContent;
    }
    if(guessStr.length != 5){return;}
    
    await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+guessStr, {
      method: "GET",
      headers: {},
    })
    .then((res) => res.json())
    .then(async (data) => {
        if(data.length > 0){validWord(guessStr)}
        else{
            document.getElementById('error').style.display = 'block';
            await new Promise(r => setTimeout(r, 2000));
            document.getElementById('error').style.display = 'none';
        }
    })
}

async function validWord(guessStr){
    // is a real word, figure out colors
    var validLetters = 0; 
    var letters = document.getElementsByClassName('guessRow')[currentGuess].children; 
    for(var j = 0; j < guessStr.length; j++){
        var backgroundColor = 'white';
        var color = 'black';
        if(guessStr[j] == solutionWord[j]){
            validLetters++;
            backgroundColor = 'green';
            color = 'white';
        }
        else if (solutionWord.indexOf(guessStr[j]) >= 0){
            if(guessStr.indexOf(guessStr[j]) == guessStr.lastIndexOf(guessStr[j]))
                backgroundColor = 'yellow';
            else if (solutionWord.indexOf(guessStr[j]) != solutionWord.lastIndexOf(guessStr[j]))
                backgroundColor = 'yellow';
            else if(guessStr.indexOf(guessStr[j]) == j && guessStr[guessStr.lastIndexOf(guessStr[j])] != solutionWord[guessStr.lastIndexOf(guessStr[j])])
                backgroundColor = 'yellow';
        }
        letters[j].style.visibility = 'hidden';
        letters[j].style.backgroundColor = backgroundColor;
        letters[j].style.color = color;
        await new Promise(r => setTimeout(r, 250));
        letters[j].style.visibility = '';
        var keyboardPiece = document.querySelector("[data-key='"+guessStr[j].toLowerCase()+"']");
        console.log(guessStr[j], keyboardPiece.style.backgroundColor);
        if(backgroundColor == 'white' && keyboardPiece.style.backgroundColor == ""){keyboardPiece.style.backgroundColor = 'black'}
        else if(backgroundColor == 'yellow' && keyboardPiece.style.backgroundColor == ''){keyboardPiece.style.backgroundColor = backgroundColor; keyboardPiece.style.color = 'black'}
        else if (backgroundColor == 'green'){keyboardPiece.style.backgroundColor = backgroundColor; keyboardPiece.style.color = 'black'}
    }
    if(validLetters==5){
        img.src = "../resources/happyGAC.png";
        closeHints();
        text.innerHTML = 'Oh yeah! That’s right. Alexis wasn’t responding to Grant’s texts, so he went to go watch her cheer. Let me try that!'
        next.style.display = 'block';
        keyboard.style.display = 'none';
        board.style.display = 'none';
    }
    else{
        addGuessRow();
    }
}

var step = 1;
function nextThing(){
    board.style.display = 'none';
    keyboard.style.display = 'none';
    text.style.fontFamily = 'Garamond';
    text.style.fontSize = 'medium';
    if(step == 1){
        text.innerHTML = "Grant and Alexis were talking pretty consistently for a few days. Then, seemingly out of nowhere, Alexis stopped responding to Grant's text messages. She had given her number to too many people that freshman orientation weekend and had too many text conversations going, so she just stopped responding to everyone. Grant was the only one who consistently texted her, even when she wouldn't always text back. <br> There was a big football game that week and Grant decided to go. At the tailgating event before the game, Grant ran into Alexis giving temporary tattoos with the other cheerleaders. He stopped by and said hi and even let her give him a tattoo on his hand. <br> The game was really chilly. After the game, a fellow cheerleader offered to give Alexis a ride back to campus. She graciously accepted, excited for the warmth. On her way to the car, she ran into Grant, who asked her to walk back to campus with him. She said yes, even though she was cold. They talked the whole time and Grant asked her to go to supper with him on Monday."
        step++;
    }
    else if(step == 2){
        text.innerHTML = "On Monday, Alexis and Grant met in the cafeteria for supper. Alexis grabbed her student ID out of her pocket, ready to go get supper. Grant had other ideas. He asked if she wanted to go out to eat somewhere nicer. Alexis agreed and they ended up at a sports bar called 'Stadium'. They had a great time getting to know each other and after eating supper, they weren't ready to call it a night. So, they drove out to Lake Herman State Park and parked the car near the beach. They went and sat on some rocks and continued their conversation. They were really hitting it off, but eventually they did have to go back to campus."
        step++;
    }
    else if(step == 3){
        window.location.href = "../pages/origami.html";
    }
}