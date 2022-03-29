var img = document.getElementById('GAC');
var text = document.getElementById('text');
var form = document.getElementById('origamiForm');
var next = document.getElementById('next');

img.setAttribute('src','../resources/neutralGAC.png');
localStorage.setItem('page','origami');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(document.getElementById('answer').value.trim().toUpperCase() == 'HOLA'){
        next.style.display = 'block';
        img.setAttribute('src','../resources/happyGAC.png')
        closeHints();
        text.innerHTML = "Oh yeah! Alexis had to get her Spanish binder. I'll try using that to fix this file."
        form.style.display = 'none';
        document.getElementById('swan').style.display = 'none';
    }
    else{
        img.setAttribute('src','../resources/sadGAC.png');
        text.innerHTML = "Hmm.. that didn't seem to work."
    }
});

var step = 1;
function nextThing(){
    text.style.fontFamily = 'Garamond';
    text.style.fontSize = 'medium';
    if(step == 1){
    text.innerHTML = "Grant was a youth soccer coach in Madison and there were going to be games in Mitchell, so he asked Alexis if she wanted to go. Alexis needed to go home to get her Spanish binder from high school to help her with her classes and she wanted to spend more time with Grant, so she agreed. They had a great time the whole ride there and Alexis had a blast watching Grant work with the little kids. He always did such a great job. During the lunch break, Grant took Alexis back to her parents' house to get her binder. He asked if he should come in with her and she said it was up to him. He decided to come. That's when he met her parents and even one set of her grandparents. Embarrassingly, Alexis' grandma told Grant that she was planning on coming to the soccer fields to see who Alexis kept saying nice things about. Alexis quickly got them out of there. <br> Later that night, Grant was dropping Alexis off in her dorm room and he went in to kiss her on the cheek, but she completely misread the situation and turned her head. It was their first kiss! Alexis was super embarrassed, but Grant didn't seem to mind."
    step++;
    }
    else if (step == 2){
        window.location.href = '../pages/quote.html'
    }
}