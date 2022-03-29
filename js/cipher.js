var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var form = document.getElementById('cipherForm');

localStorage.setItem('page','cipher');

var currRotation = [0,0,0,0];
text.style.fontSize = 'medium';
img.src = '../resources/neutralGAC.png';

function rotate(id){
    var cipherWheel = document.getElementById(id);
    cipherWheel.style.transform = "rotate(90deg)";
    if(id == 'outerLayer'){
        currRotation[0] += 13.8;
        cipherWheel.style.transform = "rotate("+currRotation[0]+"deg)";
    }
    else if(id == 'secondLayer'){
        currRotation[1] += 13.8;
        cipherWheel.style.transform = "rotate("+currRotation[1]+"deg)";
    }
    else if (id == 'thirdLayer'){
        currRotation[2] += 13.8;
        cipherWheel.style.transform = "rotate("+currRotation[2]+"deg)";
    }
    else if (id == 'innerLayer'){
        currRotation[3] += 13.8;
        cipherWheel.style.transform = "rotate("+currRotation[3]+"deg)";
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(document.getElementById('answer').value.trim().toUpperCase() == "HERMAN"){
        img.src = '../resources/happyGAC.png';
        closeHints();
        text.innerHTML = "Oh yeah! Lake Herman! Let me try that."
        document.getElementById('cipherContainer').style.display = 'none';
        form.style.display = 'none';
        next.style.display = 'block';
    }
    else{
        document.getElementById('answer').value = "";
        img.src = "../resources/sadGAC.png";
        text.innerHTML = "Hmm.. that didn't work.";
    }
});

var step = 0;
function nextThing(){
    if(step == 0){
        text.style.fontFamily = 'Garamond';
        text.style.fontSize = 'medium';
        text.innerHTML = "Alexis and Grant have a lot of really good memories at Lake Herman. They went there on their first date and came back lots of times while they were dating to get away from their roommates and their homework. They liked to sit and talk in the car, parked by the beach. <br> One night Alexis and Grant were sitting out by the lake, enjoying each others company and Alexis was stressed out about something, which was pretty normal. Grant was talking her through it and telling her that it would all be fine. After he calmed her down and she was feeling better Grant said 'I've been trying to think about how to explain how much you mean to me and all I can come up with is I love you.' Alexis felt her heart swell in her chest and a bunch of blood rush to her cheeks as she said 'I love you too' back to him. They both smiled and spent the rest of the night excited about what the future might hold. (They sat in this exact spot right after they got engaged too, but we aren't there yet)."
        step++;
    }
    else if (step == 1){
        window.location.href = "../pages/doors.html";
    }    
}