//elements
var first = document.getElementById('first');
var second = document.getElementById('second');
var third = document.getElementById('third');
var img = document.getElementById('GAC');
var text = document.getElementById('text');
var form = document.getElementById('introPuzzleForm');
var code = document.getElementsByTagName('pre')[0];
var next = document.getElementById('next');

var step = 1;

localStorage.setItem('page','introPuzzle');
img.setAttribute('src','../resources/sadGAC.png')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    var firstAnswer = first.value.trim();
    var secondAnswer = second.value.trim();
    var thirdAnswer = third.value.trim();

    if(firstAnswer == '12'){
        first.classList.add('is-valid');
        first.classList.remove('is-invalid');
    }
    else{
        first.classList.add('is-invalid');
        first.classList.remove('is-valid');
    }
    if(secondAnswer == 'learningRate'){
        second.classList.add('is-valid');
        second.classList.remove('is-invalid');
    }
    else{
        second.classList.add('is-invalid');
        second.classList.remove('is-valid');
    }
    if(thirdAnswer == 'continue()'){
        third.classList.add('is-valid');
        third.classList.remove('is-invalid');
    }
    else{
        third.classList.add('is-invalid');
        third.classList.remove('is-valid');
    }

    if(firstAnswer == '12' && secondAnswer == 'learningRate' && thirdAnswer == 'continue()'){
        form.style.display = 'none';
        code.style.display = 'none';
        closeHints();
        img.setAttribute('src','../resources/neutralGAC.png');
        text.innerHTML = "I think that might work. Let's try it!";
        next.style.display = 'block';
        window.scrollTo(0,document.body.scrollHeight);
    }

});

async function compile(){
    if(step == 1){
        code.style.display = 'none';
        next.style.display = 'none';
        text.style.fontSize = 'medium'; 
        text.innerHTML = "Compiling new source code…"
        await new Promise(r => setTimeout(r, 7000));
        text.style.color = 'green';
        img.setAttribute('src','../resources/happyGAC.png');
        text.innerHTML = "Success!"
        await new Promise(r => setTimeout(r, 3000));
        text.style.color = 'black';
        img.setAttribute('src','../resources/neutralGAC.png');
        text.innerHTML = "Okay, great! It looks like you were able to successfully fix my code! I’m just going to run a quick systems check and then we can get on with the story. Sorry for that interruption. Give me just one moment"
        await new Promise(r => setTimeout(r, 12000));
        text.innerHTML = "Running system diagnostic…"
        await new Promise(r => setTimeout(r, 10000));
        img.setAttribute('src','../resources/surprisedGAC.png');
        text.style.color = 'red';
        text.innerHTML = "Error: Corrupt memory files <br> Force Rebooting the system!"
        await new Promise(r => setTimeout(r, 3000));
        text.style.color = 'black';
        img.style.display ='none';
        document.getElementsByTagName('h1')[0].style.display = 'none';
        document.getElementsByTagName('body')[0].style.backgroundColor = 'black';
        await new Promise(r => setTimeout(r, 7000));
        img.style.display ='block';
        img.setAttribute('src','../resources/sadGAC.png');
        document.getElementsByTagName('h1')[0].style.display = '';
        document.getElementsByTagName('body')[0].style.backgroundColor = 'white';
        text.innerHTML = "Okay, there is good news and bad news. The good news is that all of my systems are operational. The bad news is that all of the memory files I needed to tell you this story have been corrupted. Some bits and pieces are still there, but a lot of things have gone missing. I think maybe I could fix some of them with a little bit of help. We have to get this put back together before we ruin Alexis and Grant’s big day."
        next.style.display = 'block';
        next.innerHTML = 'Next';
        step++;
    }
    else if(step ==2){
        img.setAttribute('src','../resources/neutralGAC.png');
        text.innerHTML = "Let’s see… where do we start? … HERE! I found the first file. Let’s see if you can help me remember what is supposed to be in here."
        step++;
    }
    else if(step == 3){
        window.location.href = "../pages/getToKnow.html";
    }
}