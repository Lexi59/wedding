var img = document.getElementById('GAC');
var text = document.getElementById('text');
var answer = document.getElementById('answerArea');

var correctAnswer = ['a','n','n','a','g','g','b','a'];
var userAnswer = [];
localStorage.setItem('page','getToKnow');

img.setAttribute('src','../resources/neutralGAC.png');
text.innerHTML = ""

function addAnswer(str){
    var newImg = document.createElement('img');
    newImg.classList.add('smallArrow');
    if(userAnswer.length < correctAnswer.length + 1){
        userAnswer.push(str.substr(0,1));

        if(str == 'both'){
            newImg.setAttribute('src','../resources/up.png');
        }
        else if (str == 'alexis'){
            newImg.setAttribute('src','../resources/right.png');
        }
        else if (str == 'grant'){
            newImg.setAttribute('src','../resources/left.png');
        }
        else if (str == 'neither'){
            newImg.setAttribute('src','../resources/down.png');
        }

        answer.appendChild(newImg);
    }
}

function reset(){
    answer.innerHTML = "";
    userAnswer = [];
}

function checkAnswer(){
    console.log(userAnswer, correctAnswer);
    if(userAnswer.length != correctAnswer.length){
        wrong()
    }
    else{
        var correct = true; 
        for(var i = 0; i < correctAnswer.length; i++){
            if(correctAnswer[i] != userAnswer[i]){
                wrong();
                return;
            }
        }
        answer.innerHTML = "";
        document.getElementById('bigDirectionArrows').style.display = 'none';
        document.getElementById('buttonDiv').style.display = 'none';
        img.setAttribute('src','../resources/happyGAC.png');
        startStory();
    }
}
function wrong(){
    img.setAttribute('src','../resources/sadGAC.png');
    text.innerHTML = "Hmm… that didn’t seem to work.";
    reset();
}
async function startStory(){
    closeHints();
    text.innerHTML = "Oh yeah! That’s right. They were playing get to know you games. Hold on, let me try that!";
    await new Promise(r => setTimeout(r, 4000));
    text.style.fontFamily = 'Garamond';
    text.style.fontSize = 'medium';
    text.innerHTML = "It was freshman orientation weekend at DSU. Grant and Alexis had both finished moving into their dorm rooms and had headed down to the freshman orientation kick-off on the lawn of 'East Hall' which is a building on campus. After the President of the University had finished with her welcome speech, she told everyone to look at their name badges and find the number in the bottom corner. There were upperclassmen scattered around the lawn holding signs. They had to find the sign that matched the number on their name tag. Alexis and Grant ended up in the same group. Once everyone was there, the upperclassman handed out orange bandanas. Alexis and Grant both still have theirs. They played all kinds of get to know you games. Afterwards, they all got in line to get supper, which was spaghetti. Grant ended up right in front of Alexis and Alexis ended up right next to someone she knew from high school and they started talking. At some point Alexis mentioned that she was from Mitchell and Grant turned around and said 'Oh, you're from Mitchell? Do you know Raina Grimsley?' and they hit it off immediately. They talked the whole time they were in line, sat next to each other at supper, and exchanged phone numbers at the end, before heading in their own directions."
    next.style.display = 'block';
}