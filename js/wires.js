var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var colors = document.getElementById('colorDiv');
var wireSpace = document.getElementById('wireSpace');

localStorage.setItem('page','wires');
img.src = "../resources/neutralGAC.png";
text.textContent ='hi';
text.style.color = 'white';

var currentColor = "";
var lockedPoints = [];
var curSelected = "";
var lockedColors = [];

function addColor(name){
    var color = document.createElement('img');
    color.setAttribute('onclick', 'setColor("'+name+'")');
    color.classList.add('color');
    color.src = "../resources/"+name + '.png';
    color.setAttribute('id', name);
    colors.appendChild(color);
}

addColor('red');
addColor('pink');
addColor('green');
addColor('purple');
currentColor = 'red';
document.getElementById('red').classList.toggle('selectedColor');

function setColor(name){
    var oldColor = document.getElementById(currentColor);
    var newColor = document.getElementById(name);
    oldColor.classList.toggle('selectedColor');
    newColor.classList.toggle('selectedColor');
    currentColor = name;
}

function getOffset( el ) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

function connect(div1, div2, color, thickness) { // draw a line connecting elements
    lockedColors.push(color);
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);
    // bottom right
    var x1 = off1.left + off1.width/2;
    var y1 = off1.top + off1.height/2;
    // top right
    var x2 = off2.left + off2.width/2;
    var y2 = off2.top + off2.height/2;
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    var htmlLine = document.createElement('div');
    htmlLine.classList.add('line');
    htmlLine.style = "padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);"
    wireSpace.appendChild(htmlLine);
}

function select(thing){
    if(curSelected == ""){curSelected = thing;}
    lockedPoints.push(thing);

    if(lockedPoints.length%2 == 0){
        connect(document.getElementById(lockedPoints[lockedPoints.length-2]),document.getElementById(thing),currentColor, 5);
        document.getElementById(lockedPoints[lockedPoints.length-2]).style.outline = "";
    }
    else{
        document.getElementById(thing).style.outline = "2px solid " + currentColor;
    }
}

function reset(){
    var lines = document.getElementsByClassName('line');
    for(var i = lines.length -1; i >= 0; i--){
        lines[i].remove();
    }
    if(lockedPoints.length > 0)
        document.getElementById(lockedPoints[lockedPoints.length-1]).style.outline = "";
    lockedColors = [];
    lockedPoints = [];
}

function checkAnswers(){
    text.style.color = 'black';
    if(lockedPoints.length == 8){
        var colorIndex = 0;
        var correct = 0;
        for(var i = 0; i < lockedPoints.length; i+=2){
            var a = lockedPoints[i];
            var b = lockedPoints[i+1];
            console.log(a,b,lockedColors[colorIndex],colorIndex, correct);
            if(((a == '1' && b=='A') || (a=='A' && b == '1')) && lockedColors[colorIndex] == 'red'){
                correct++;
            }
            else if(((a == '2' && b=='B') || (a=='B' && b == '2')) && lockedColors[colorIndex] == 'purple'){
                correct++;
            }
            else if(((a == '3' && b=='D') || (a=='D' && b == '3')) && lockedColors[colorIndex] == 'pink'){
                correct++;
            }
            else if(((a == '4' && b=='C') || (a=='C' && b == '4')) && lockedColors[colorIndex] == 'green'){
                correct++;
            }
            colorIndex++;
        }
        if(correct == 4){
            closeHints();
            text.innerHTML = "Alexis was connecting the dots like that when it came to her proposal. Let's try that!";
            img.src = "../resources/happyGAC.png";
            wireSpace.style.display = 'none';
            document.getElementById('submit').style.display ='none';
            document.getElementById('reset').style.display = 'none';
            next.style.display = 'block';
            colors.style.display = 'none';
            return;
        }
    }
    text.textContent = "Hmm.. that didn't seem to work";
    img.src = "../resources/sadGAC.png";
}


var step = 0;
function nextThing(){
    if(step == 0){
        text.style.fontFamily = 'Garamond';
        text.style.fontSize = 'medium';
        text.innerHTML = "DSU was opening a new building and Grant wanted to go, so he asked Alexis to come with him. Plus, Grant was supposed to get a plaque for graduating with the honor society on campus, so he said he arranged to pick it up that same day. So, Wednesday August 11, 2021, Grant and Alexis went to the grand opening of the new building. They stood near the back. When all the speeches were over, it was time to go get the honors plaque. So, they walked off to East Hall lawn to meet the professor who had it. On their way over, Alexis was pretty sure she saw someone run across the sidewalk in front of them, but Grant said he didn't see it, so she brushed it off. When they got to the lawn where they first met on August 18th, Alexis said 'Babe, Kemper isn't over here.' Grant just kind of smiled and got down on one knee and said 'Alexis Rae Vander Wilt, Will you marry me?' And of course she said yes. She immediately pulled him off the ground and started hugging him.";
        step++;
    }
    else if (step == 1){
        text.innerHTML = "Soon after that, the person Alexis had seen run across the sidewalk popped out from her hiding place and told Alexis that she captured the moment with her camera. They walked all around campus, Alexis smiling like a goofball and Grant sighing in relief that he didn't mess up the moment. After things had settled a little and the photographer left, Grant told Alexis that her whole family was coming to Madison to eat supper with them, but it wasn't for a few hours yet. So, they drove to the state park and sat in the same spot they did on their first date and talked about how excited they were."
        step++;
    }
    else if (step == 2){
        text.innerHTML = "Alexis immediately wanted to call her sister to tell her the news. So, she dialed the number and waited for Aubree to answer. When Aubree finally did answer, her voice cracked when she said hello, almost as if she had been crying. So, Alexis hid her excitement and asked what was wrong. Aubree said 'I'm just tired and dad says he has a suprise for us tonight and I don't want to go'. In that moment, Alexis realized that her family had no idea this was happening. Grant had asked her dad, but no one else knew what was going on. So, Alexis struggled to get through the rest of the conversation with Aubree without blabbing the news."
        step++;
    }
    else if (step == 3){
        text.innerHTML = "Eventually, everyone arrived and Grant ushered all of them into the restaurant. Alexis's family, Grant's family, and both sets of Alexis's grandparents had come to celebrate the occassion, all without knowing what they were coming for. When Alexis did finally tell everyone, everyone was so excited! They celebrated all night until the restaurant closed and they had to leave. Alexis told herself she was going to hold off on wedding planning and enjoy her engagement, but she did not do that. She started planning immediately and the date was set, September 10, 2022."
        step++;
    }
    else if (step == 4){
        window.location.href = "../pages/key.html"
    }
}