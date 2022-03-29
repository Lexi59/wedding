var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var table = document.getElementById('painting');
var colors = document.getElementById('colorDiv');
var currentColor = "";

localStorage.setItem('page','colors');

img.src = "../resources/neutralGAC.png";
var str = '\\[\\[“^]~-\\^[“[“[\\|^|]]>%@-“[\\]|^[[|\\[^~#{~][““\\^^]“““<%}+$-“][|“\\[\\[“>%${+~[“\\^|~--~<@$+$}+<<~--<#%@*={@+=={$$&>^>*=+$#$=+$}{!<[\\[-*={*}+${=:~“]\\|^~#}=+{++!>\\|^[[|>@+$$={$:<\\\\|^]<%}$=+${=+&>““\\[~@+==!&+$}:>|[\\|-*$!:->:!{!~“^[<#{&--\\^~>&=!~|^>%!>^^|[]“~&:-“\\[-<“^]“|\\^[->|“';
var cells = [];
var index = 0;
text.style.fontSize = 'medium';

//make table
for(var r = 0; r < 17; r++){
    var row = document.createElement('tr');
    var rc = [];
    for(var c = 0; c < 16; c++){
        var cell = document.createElement('td');
        cell.innerText = str[index];
        cell.setAttribute('onclick','changeColor('+r+','+c+')');
        index++;
        rc.push(cell);
        row.appendChild(cell);
    }
    cells.push(rc);
    table.appendChild(row);
}
table.style.fontFamily = "Courier New";

//make colors
function addColor(name){
    var color = document.createElement('img');
    color.setAttribute('onclick', 'setColor("'+name+'")');
    color.classList.add('color');
    color.src = "../resources/"+name + '.png';
    color.setAttribute('id', name);
    colors.appendChild(color);
}

addColor('yellow');
addColor('black');
addColor('orange');
addColor('white');
currentColor = 'yellow';
document.getElementById('yellow').classList.toggle('selectedColor');

function setColor(name){
    var oldColor = document.getElementById(currentColor);
    var newColor = document.getElementById(name);
    oldColor.classList.toggle('selectedColor');
    newColor.classList.toggle('selectedColor');
    currentColor = name;
}

function changeColor(r,c){
    cells[r][c].style.backgroundColor = currentColor;
}

function checkAnswers(){
    var correct = 0;
    for(var r = 0; r < 17; r++){
        for(var c = 0; c < 16; c++){
            if('\\^|“[]*%#@'.indexOf(cells[r][c].innerText) >= 0){
                //Blank or white
                if(cells[r][c].style.backgroundColor == "" || cells[r][c].style.backgroundColor == 'white'){
                    correct++;
                }
                else{
                    cells[r][c].style.backgroundColor = 'red';
                }
            }
            else if ('+$={}'.indexOf(cells[r][c].innerText) >= 0){
                //Yellow
                if(cells[r][c].style.backgroundColor == "yellow"){
                    correct++;
                }
                else{
                    cells[r][c].style.backgroundColor = 'red';
                }
            }
            else if('<~->'.indexOf(cells[r][c].innerText) >= 0){
                //Black
                if(cells[r][c].style.backgroundColor == "black"){
                    correct++;
                }
                else{
                    cells[r][c].style.backgroundColor = 'red';
                }
            }
            else if(":&!".indexOf(cells[r][c].innerText)>=0){
                //Orange
                if(cells[r][c].style.backgroundColor == "orange"){
                    correct++;
                }
                else{
                    cells[r][c].style.backgroundColor = 'red';
                }
            }
        }
    }
    if(correct == (17*16)){
        img.src = "../resources/happyGAC.png";
        text.innerHTML = "Hey! I recognize that shape!"
        colors.innerHTML = "";
        closeHints();
        var wtn = document.createElement('img');
        wtn.src = "../resources/watertownlogo.jpg";
        wtn.style = "width: 50%; margin:auto; display:block";
        colors.appendChild(wtn);
        table.style.display = "none";
        document.getElementById('submit').style.display = 'none';
        next.style.display = 'block';
    }
    else{
        text.innerHTML = "Hmm... that didn't seem to work. I highlighted the errors"
        img.src = "../resources/sadGAC.png";
    }
}

var step = 0;
function nextThing(){
    if(step == 0){
        text.style.fontFamily = 'Garamond';
        text.innerHTML= "Even though Alexis' internship was initially remote, she knew that eventually everyone would go back into the office. So, she needed to be closer to the office for when that happened. So, she decided to move to Watertown. She found a cute 1 bedroom apartment and moved all of her stuff June 1st, 2020. Unfortunately, they didn't go back into the office until April 25th, 2022, but it was nice to be closer to Grant, who also found an apartment in Watertown. They went on vacations together, went jetskiing and kayaking in Lake Pelican, and just enjoyed spending time together and working. They both finished their Master's degrees in 2021 (Grant in May, Alexis in December). And they both continued to work at WAPA as full-time employees.";
        colors.style.display = 'none';
        step++;
    }
    else if(step ==1){
        window.location.href='../pages/wires.html';
    }
}