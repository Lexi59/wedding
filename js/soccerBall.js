var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var ball = document.getElementById('soccerBall');
var lockedPoints = [];
var currSelected = "";
var matches = 0;

localStorage.setItem('page','soccerBall');
img.setAttribute('src','../resources/neutralGAC.png');
ball.style.visibility = 'hidden';

text.innerHTML = "Oh! I recognize this shape!";
text.style.color = 'white';

function handleClick(str){
    console.log("clientX: " + event.clientX +" - clientY: " + event.clientY);
    lockedPoints.push([event.clientX,event.clientY]); 
    if(lockedPoints.length % 2 == 0){connect('green', 5, str)}  
    else{currSelected = str;}
}

async function connect(color, thickness, match) {
    var l = lockedPoints.length-1;
    var x1 = lockedPoints[l-1][0];
    var y1 = lockedPoints[l-1][1];
    var x2 = lockedPoints[l][0];
    var y2 = lockedPoints[l][1];
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
    document.body.appendChild(htmlLine);

    if(currSelected == "Met" && match == "81817"){matches++;}
    else if(currSelected == "Engaged" && match == "81121"){matches++;}
    else if(currSelected == "Dating" && match == "91817"){matches++;}
    else if(currSelected == "81817" && match == "Met"){matches++;}
    else if(currSelected == "81121" && match == "Engaged"){matches++;}
    else if(currSelected == "91817" && match == "Dating"){matches++;}
    else{
        htmlLine.style.backgroundColor = 'red';
        img.src = '../resources/sadGAC.png';
        await new Promise(r => setTimeout(r, 500));
        htmlLine.remove();
    }
    if(matches == 3){complete()}
}

async function complete(){
    img.src = '../resources/happyGAC.png'
    text.style.color = 'black'
    closeHints();
    await new Promise(r => setTimeout(r, 1000));
    ball.style.visibility = "";
    ball.classList.add('fade-in');
    await new Promise(r => setTimeout(r, 6000));
    document.getElementById('images').style.display = 'none';

    var lines = document.getElementsByClassName('line');
    for(var i= 0; i < lines.length; i++){
        lines[i].style.display = 'none';
    }
    text.style.fontFamily = 'Garamond';
    text.style.fontSize = 'medium';
    text.innerHTML = "It’s a soccer ball. A few days after they started officially dating, there was a soccer game in Watertown and Grant wanted to go. He asked Alexis to come with him. She, of course, said yes. They made it to the soccer fields and Grant showed Alexis the secret best place to sit. At one point, Grant had picked a dandelion off the ground and handed it to Alexis. She tried to hang on to it, but lost it at some point during the game. After the game was over, Grant said hi to a few people who knew him. Because Grant was in town, his parents wanted to see him, so they asked if he wanted to get supper with them. He said yes, so Alexis and Grant went to Taco Johns and that is where Alexis met Grant's parents. They were super nice and it went really well."
    next.style.display = 'block';
}
function nextThing(){
    window.location.href = '../pages/cipher.html';
}