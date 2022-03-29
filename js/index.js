/* Wedding Puzzles
To Do: 
-------------------
[]

Color Codes:
-------------------
Red- #A90A15 (169,10,21)
Purple - #9B3D68 (155, 61, 104)
Green - #A7C67E (167, 198, 126)
Pink - #F8C2BD (248, 194, 189)
Gold - #FAA928 (250, 169, 40)
*/

let startTime = new Date(2022, 2, 13, 17,22);
var checkTime;

function indexPage(){
	console.log('in here');
	//check if they can play yet every second.
	checkTime = setInterval(checkStartTime, 1000);

	if (localStorage.getItem('page') != undefined){
		window.location.href = "../pages/" + localStorage.getItem('page') + ".html";
	}
}

function checkStartTime(){
	//make sure they are allowed to play
	var now = new Date();
	var seconds = Math.floor((startTime - now)/1000);
	var minutes = Math.floor(seconds/60);
	var hours = Math.floor(minutes/60);
	var days = Math.floor(hours/24);

	if(!updateTimer(days, hours, minutes, seconds))
	{
		clearInterval(checkTime);
		document.querySelector('#timer').textContent = "";
		var btn = document.createElement('button');
		btn.setAttribute('onclick', "window.location.href='pages/intro.html'");
		btn.classList = 'btn btn-primary'
		btn.textContent = "Let's go!"
		document.querySelector('#timer').appendChild(btn);
	}
}

function updateTimer(days, hours, minutes, seconds){
	var timerParagraph = document.querySelector('#timer');
	if(days > 0){
		timerParagraph.textContent = days + " days " + hours.toString().padStart(2,'0') + ":" + (minutes-hours*60).toString().padStart(20,'0') + ":" + (seconds-minutes*60).toString().padStart(2, '0');
		return true;
	}
	else if (seconds > 0){
		timerParagraph.textContent = hours.toString().padStart(2,'0') + ":" + (minutes-hours*60).toString().padStart(2,'0') + ":" + (seconds-minutes*60).toString().padStart(2,'0');
		return true;
	}
	else{
		return false;
	}
}


var hints = {
	'cipher': ["Try tapping on the rings of letters to make them move (you might have to zoom in)","There might be a clue about how to set the rings to the right orientatation and what message to decode in the book.","Set the biggest ring to L, the next smallest to A, the next to K, the next to E. Then, read the message 'olythu' by looking up 'o' in the outer ring and writing down what lines up with o in the inner most ring"],
	'colors': ["It's like a paint by number, pick the color that matches the symbol and tap to fill in","I think there might be a sticky note in the book that tells you which colors are which symbols","'+$={}' are Yellow'<~->' are Black '*%#@' are White ':&!'are Orange. It makes a star shape, keep trying!"],
	'doors': ["There is a page in the journal with all the rules for which door to pick","Sometimes the colors look a little different, but the only options are red, blue, yellow, white, green, and brown.","Orange and Grey are not choices. The order is 4,4,2,3,1,2,3,2,3,6,1,1"],
	'getToKnow': ["These options look like they might be answers to some questions... but what questions?","I think there was a page of questions in the book. Hopefully the answers are hidden in the other pages.","The answer is Right, Down, Down, Right, Left, Left, Up, Right"],
	'introPuzzle': ["I think Alexis may have written down a draft of this code somewhere.","Coding is tricky.  You have to be really detail oriented. Make sure the capitalization matches and all the symbols are there.","The answers are: 12, learningRate, continue()"],
	'key': ["I think you might have to put these events in order","I think I remember there being a timeline in the journal","They met, dated, kissed, said I love you, went on vacation, moved to Watertown, Grant proposed, closed on their first house, and now the wedding!"],
	'knob': ["I think these might be their favorite things","All the answers are in the journal if you look hard enough. Don't be afraid to use Google to find out what certain things look like","The answers are: Right, Down, Up, Left, Down, Up, Left, Left, Down"],
	'maze': ["I think the pink spaces are safe. Only if we knew which other spaces were pink...","I think there are other pictures like this in the journal. Maybe if we combine them?","Up 4, Left 4, Down 4, Left 3, Up 5, Left 2, Up 2, Right 5, Up 2, Left 5"],
	'origami': ["It looks like... an origami crane? Maybe we need to fold something?","I think there is a page in the journal with some lines for where to fold. Fold so the lines are on the inside of the crease and only fold on full lines.","It should show you the word 'hola' if you did it right."],
	'quote': ["These phrases look familiar. I think Grant and Alexis say them a lot.","Maybe check in the text messages. The highlighted letters might make a message","'good', 'unfortunately','about', 'see', makes the message 'guts'"],
	'soccerBall': ["I think you have to match the dates with the event. Just tap once on each, the line will draw.","Not everything has a match, just match what you can.","There are 3 matches: Met -> 8-18-17, Engaged -> 8-11-21, Dating -> 9-18-17"],
	'truths': ["I wonder if the green and red mean anything? Right and wrong maybe?","I think it's a true false puzzle. Red for false.","There are only 4 that are false, they only spent 1 day in the Bahamas, they didn't get to go kayaking, they did not buy matching T-shirts, and they didn't see anyone they knew."],
	'wires': ["It looks like connecting something? Make sure to use the right color","I think maybe the journal pages have the answers here","They go by date order, with the color of the heading, to the icon in the background: (Red, 1, first aid), (Purple, 2, clock), (Pink, 3, ship), (Green, 4, house)"], 
	'wordle': ["This looks like the 'wordle' game","I think the rules are in the journal. Watch out for double letters","Alexis was a cheerleader. Let's try CHEER"]
}
var currHint = 0; 
var hintNames = ["first", "second", "third"];
function showHint(){
	if(currHint < 3){
		var show = confirm("Are you sure you want your " + hintNames[currHint] + " hint?");
		if(show){
			var p = document.createElement('p');
			p.textContent = (currHint+1) + ': ' + hints[localStorage.getItem('page')][currHint];
			p.style.fontSize = 'xx-small'
			p.classList.add('currentHint');
			p.style.padding = 0;
			p.style.margin = "0.5%";
			var curr = document.getElementsByClassName('currentHint');
			if(curr.length > 0){curr[0].remove();}
			document.getElementById('hintDiv').appendChild(p);
			document.getElementById('helpBtn').style = "margin: 1%; display: inline-block: width: 5%; float:right;"
			currHint++;
		}
	}
}
function closeHints(){
	var curr = document.getElementsByClassName('currentHint');
			if(curr.length > 0){curr[0].remove();}
	document.getElementById('helpBtn').disabled = true;
}