var img = document.getElementById('GAC');
var text = document.getElementById('text');
var next = document.getElementById('next');
var maze = document.getElementById('maze');

img.src = '../resources/neutralGAC.png';
localStorage.setItem('page','maze');

var coords = [[0,2],[0,4],[2,2],[2,5],[3,0],[5,2],[6,9],[7,2],[7,5],[9,2],[9,3],[9,9]];

var table = [];

for(var r = 0; r < 10; r++){
    var row = document.createElement('tr');
    var tRow = [];
    for(var c = 0; c < 10; c++){
        var cell = document.createElement('td');
        cell.innerHTML = "&nbsp"
        if(r == 0 && c > 5){cell.classList.add("invalid");}
        if(r == 1 && c != 5){cell.classList.add("invalid");}
        if(r == 2 && c > 5){cell.classList.add("invalid");}
        if(r == 3 && c != 0){cell.classList.add("invalid");}
        if(r == 4 && c > 2){cell.classList.add("invalid");}
        if(r == 5 && c != 2 && c < 5){cell.classList.add("invalid");}
        if((r == 6 || r == 7 || r == 8) && c != 2 && c != 5 && c != 9) {cell.classList.add("invalid");}
        if(r == 9 && c != 9 && (c < 2 || c > 5)){cell.classList.add('invalid');}
        row.appendChild(cell);
        tRow.push(cell);
    }
    table.push(tRow);
    maze.appendChild(row);
}

for(var i = 0; i < coords.length; i++){
    table[coords[i][0]][coords[i][1]].style.backgroundColor = "#F8C2BD";
}

var currLoc = [9,9];
table[9][9].innerHTML = "&#9899";

function move(dir){
    table[currLoc[0]][currLoc[1]].innerHTML = "&nbsp";
    if(dir == 'up'){
        currLoc[0]--;
    }
    else if (dir == 'down'){
        currLoc[0]++;
    }
    else if (dir == 'left'){
        currLoc[1]--;
    }
    else if (dir == 'right'){
        currLoc[1]++;
    }
    if(!checkValidPos()){
        currLoc = [9,9];
    }
    if(currLoc[0] == 0 && currLoc[1] == 0){
        img.src = "../resources/happyGAC.png";
        closeHints();
        text.innerHTML = "Wow, that was a lot of navigating. Wait, that gives me an idea!";
        next.style.display = "block";
        maze.style.display = 'none';
        document.getElementById('directionButtonDiv').style.display = "none";
    }
    table[currLoc[0]][currLoc[1]].innerHTML = "&#9899";
}
function checkValidPos(){
    return table[currLoc[0]] && table[currLoc[1]] && !table[currLoc[0]][currLoc[1]].classList.contains('invalid')
}

var step = 0;
function nextThing(){
    if(step == 0){
        text.style.fontFamily = 'Garamond';
        text.style.fontSize = 'medium';
        text.innerHTML = "They graduated college in May of 2020. Alexis with Bachelor's degrees in Computer Science and Math and Grant with a Bachelor's degree in Computer Information Systems and an Associates degree in Buisness Administration. But they didn't get to celebrate their graduation because COVID was running the world. They had to navigate through a lot of challenges. They barely got to see each other, no one could really go out and they had to figure out next steps in life. Both of them decided to pursue Master's degrees, but they still needed a plan for the summer.";
        step++;
    }
    else if (step == 1){
        window.location.href = '../pages/knobs.html'
    }
}