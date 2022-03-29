var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var form = document.getElementById('quoteForm');
var h3 = document.getElementById('quotes');

img.setAttribute('src','../resources/neutralGAC.png');
localStorage.setItem('page','quote');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(document.getElementById('answer').value.trim().toLowerCase() == 'guts'){
        next.style.display = 'block';
        closeHints();
        text.innerHTML = "A lot of important things happened over text messages. Let me search for the word 'guts' and see what comes up."
        form.style.display = 'none';
        h3.style.display = 'none';
    }
    else{
        img.setAttribute('src','../resources/sadGAC.png');
        text.innerHTML = "Hmm.. that didn't seem to work."
    }
})

var step = 1;
function nextThing(){
    text.style.fontFamily = 'Garamond';
    text.style.fontSize = 'medium';
    if(step == 1){
        img.src=  "../resources/happyGAC.png"
    text.innerHTML = "After the accidental first kiss, Grant and Alexis were texting back and forth. At one point Alexis said 'I think I'm missing something. You seem too good to be true.' and Grant responded with 'I'm the one that is missing something'. Alexis was very confused, so she responded with 'What?' and Grant said 'I'm missing the guts to ask you out.' And so, September 18th, 2017 marked the start of their official relationship."
    step++;
    }
    else if (step == 2){
        window.location.href = '../pages/soccerBall.html'
    }
}