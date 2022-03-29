const messages = [
    "Hello! My name is GAC. I am an AI that Alexis built. Alexis and Grant wanted me to thank you for being a part of their special day.", 
    "So, we have prepared something very special for you that will walk you through their entire love story from the moment they met, through all the ups and downs, all the way to today.",
    "It all started on August 18th, 2017. Alexis and Grant were just moving to college. It was freshman orientation weekend at DSU and they had lots of "
];
const images = ["resources/neutralGAC.png","resources/excitedGAC.png", "resources/loveGAC.png","resources/upsetGAC.png" ];
var glitching = false;
var glitchInterval;
var glitchCounter = 0;
var step = 0;

localStorage.setItem('page','intro');

nextMsg();

async function typeText(id, str, cont = false){
	var textBox = document.querySelector('#'+id);
	if(!cont){textBox.innerHTML = ""};
	for(var i = 0; i < str.length; i++){
		textBox.innerHTML += str[i];
		await new Promise(r => setTimeout(r, 50));
	}
}

async function nextMsg(){
    var nxtButton = document.querySelector('#next');
    var img = document.querySelector('#GAC');
    nxtButton.style.display = "none";
    img.setAttribute("src","../" + images[step]);
    await typeText('text', messages[step]);
    if(step == 2){
        addGlitch("activities");
        await typeText('text', " planned for the ", true);
        addGlitch("students");
        img.setAttribute("src","../resources/surprisedGAC.png");
        await new Promise(r => setTimeout(r, 5000));
        await typeText('text',"I’m sorry, my system ")
        addGlitch("10010110");
        await typeText('text'," seems to be ", true);
        addGlitch('01101001');
        await typeText('text'," malfunctioning. I don't want to interrupt the couple on their special night. ", true);
        addGlitch('11011001');
        await typeText('text'," Do you think you could help me? ", true);
        document.getElementById('introPuzzle').style.display = "block";
    }
    if(messages[step+1]){nxtButton.style.display = "block";}
    step++;
}
function addGlitch(str){
    document.querySelector('#text').innerHTML += "<span class = 'glitch'> " + str + "</span>";
    if (!glitching) {glitchInterval = setInterval(glitch, 250); glitching = true;}
}

function introPuzzle(){
    glitching = false;
    clearInterval(glitchInterval);
    window.location.href = '../pages/introPuzzle.html';
}

async function glitch(){
    var glitches = document.getElementsByClassName('glitch');
    for(var i =0; i < glitches.length; i++){
        glitches[i].textContent = glitches[i].textContent.shuffle();
    }
    if(Math.random() < 0.08){
        document.getElementsByTagName('body')[0].style.backgroundColor = 'darkgrey';
        await new Promise(r => setTimeout(r, 50));
        document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
    }
}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;
    for(var i = n - 1; i > 1; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}