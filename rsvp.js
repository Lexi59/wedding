//DATABASE STUFF
const firebaseConfig = {
    apiKey: "AIzaSyC0AxSvOWol96nd1QNaSUBnx5ryWVTPLb8",
    authDomain: "weddingrsvp-eee57.firebaseapp.com",
    projectId: "weddingrsvp-eee57",
    storageBucket: "weddingrsvp-eee57.appspot.com",
    messagingSenderId: "436661962453",
    appId: "1:436661962453:web:ed2a60e971f2237915445c",
    measurementId: "G-Q8WZBMKE4F"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
var rsvps = db.collection("rsvps");

async function updateFamily(familyNum, attending, num, diet, comment){
    try{
        var found = false;
        entries.forEach(e => {
            var dat = e.data();
            if(dat.familyNum == familyNum){
                found = true;
                rsvps.doc(e.id).update({attending, num, diet, comment, filledOut:true});
            }
        })
        if(!found){
            console.error("No matching entry found");
        }
    } catch(error){
        console.error("Error adding entry");
    }
}

async function updateEntry(firstName, lastName, attending, num=0, diet='', comment=''){
    try{
        var found = false;
        entries.forEach(async e => {
            var dat = e.data();
            if(dat.firstName == firstName.toLowerCase().trim() && dat.lastName == lastName.toLowerCase().trim()){
                found = true;
                await updateFamily(dat.familyNum, attending, num, diet, comment);
            }
        })
        if(!found){
            console.error("No matching entry found");
        }
    } catch(error){
        console.error("Error adding entry");
    }
}

async function findInvite(firstName, lastName){
    try{
        var found = false;
        entries.forEach(async e => {
            var dat = e.data();
            if(dat.firstName == firstName && dat.lastName == lastName){
                found = true;
                document.getElementById('RSVPFormSection').style.display = "none";
                document.getElementById('RSVPCardSection').style.display = "";
                var names = await getFamilyMembers(dat.familyNum);
                document.getElementById('inviteForLine').textContent = "Invite For " + names;
                window.scrollTo(0, 0);
                if(!dat.filledOut && !existing){
                    document.getElementById('alreadyFilledOut').style.display = 'none';
                }
                else if (dat.filledOut && !existing){
                    fillExisting(dat);
                    existing = true;
                }
            }
        })
        if(!found){
            console.error("No matching entry found");
            document.getElementById('errorFindingInvite').style.display = '';
        }
    } catch(error){
        console.error("Error adding entry");
    }
}

function fillExisting(dat){
    document.querySelector('#numAttending input').value = dat.num;
        document.querySelector('#dietComments textarea').value = dat.diet;
        document.querySelector('#otherComments textarea').value = dat.comment;
        if(dat.attending){
            rsvpButton('accept');
        }
        else{
            rsvpButton('reject');
        }
    existing = true;
}

async function getFamilyMembers(familyNum){
    try{
        var found = false;
        var str = [];
        entries.forEach(e => {
            var dat = e.data();
            if(dat.familyNum == familyNum){
                found = true;
                str.push(titleCase(dat.firstName) + ' ' + titleCase(dat.lastName));
                if(dat.filledOut){
                    fillExisting(dat);
                }
            }
        })
        if(!found){
            console.error("No matching entry found");
        }
        else{
            console.log(str);
            return str.join(',');
        }
    } catch(error){
        console.error("Error adding entry");
    }
}

async function getRSVPs(){
    try{
        var resp = [];
        var completedFamilies = [];
        entries.forEach(e => {
            var dat = e.data();
            if(completedFamilies.indexOf(dat.familyNum) < 0){
               if(dat.filledOut){
                   resp.push(dat.familyNum + "," + dat.num +"," + dat.diet + "," + dat.comment);
               }
               else{
                    resp.push(dat.familyNum + ",," + dat.diet + "," + dat.comment);
               }
               completedFamilies.push(dat.familyNum);
            }
        })
        console.log(resp.join('\n'));
    } catch(error){
        console.error("Error adding entry");
    }
}

var firstName, lastName;
var existing = false;
var notComingText = "​We are sorry you can't make it! You will be missed. But thank you so much for all of your love and support over the years.";
var comingText = "We are so excited you are coming to celebrate our special day with us! If plans change or you need other accommodations, please reach out!";

var findInviteForm = document.getElementById('findInvitationForm');
var thankYouText = document.getElementById('thankYouText');
var entries;

//for now, until ready for RSVPs
form.style.display = "none";
document.getElementById('rsvpMessage').textContent = "Thank you to everyone who came to celebrate with us!"

//document.getElementById('RSVPFormSection').style.display = "none";
document.getElementById('RSVPCardSection').style.display = "none";
document.getElementById('thankYouNote').style.display = 'none';
document.getElementById('errorFindingInvite').style.display = 'none';

window.onload = async function onload() {
    entries = await rsvps.get();
    findInviteForm.addEventListener('submit', (e)=>{
        var val = document.getElementById('rsvpName').value.trim();
        firstName = val.split(' ')[0].toLowerCase().trim();
        var spaceIndex = val.indexOf(' ');
        lastName = val.substr(spaceIndex).replace(/\s/g,'').toLowerCase().trim();
        findInvite(firstName, lastName);
    });

    realRSVPForm.addEventListener('submit', (e)=>{
        var dietComments, numAttending, otherComments;
        var error = false;
        if(document.querySelector('#numAttending input').required)
        {
            numAttending = parseInt(document.querySelector('#numAttending input').value.trim());
            if(isNaN(numAttending) || numAttending < 0 || numAttending > 10){
                alert("Please enter a number between 0 and 10");
                error = true;
            }
            else{
                dietComments = document.querySelector('#dietComments textarea').value.trim();
            }
        }
        else{
            numAttending = 0;
            dietComments = '';
        }
        if(!error){
            otherComments = document.querySelector('#otherComments textarea').value.trim();
            console.log({numAttending,dietComments,otherComments});
            var attending = document.querySelector('#numAttending input').required?'Yes':'No';
            var subjectStr = "New RSVP!"
            var bodyStr = "<h1> New RSVP for " + titleCase(firstName) + ' ' + titleCase(lastName) + '</h1>';
            if(attending == 'Yes'){
                bodyStr += '<h2> Attending: Yes</h2><h3>Number of people: ' + numAttending + '</h3><p><strong>Diet Restrictions: </strong>'+dietComments +'</p>'
            }
            else{
                bodyStr+='<h2> Attending: No'
            }
            bodyStr+='<p><strong>Comments: </strong>' + otherComments + "</p>"

            Email.send({
                SecureToken : "0a28d0cd-6773-4360-a33c-b40f6d18a751",
                To : 'ga.carlson2022@gmail.com',
                From : "trip9919@gmail.com",
                Subject : subjectStr,
                Body : bodyStr
            })
            updateEntry(firstName, lastName, document.querySelector('#numAttending input').required, numAttending, dietComments, otherComments);
            document.getElementById('RSVPCardSection').style.display = "none";
            document.getElementById('thankYouNote').style.display = '';
            if(document.querySelector('#numAttending input').required){
                thankYouText.textContent = comingText;
            }
            else{thankYouText.textContent = notComingText;}
        }

    })
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

function rsvpButton(id){
    if(id == 'reject'){
        if(document.getElementById('reject').classList.contains('u-black')){
            document.getElementById('reject').classList.remove('u-black');
        }
        document.getElementById('accept').classList.add('u-black');
        document.getElementById('numAttending').style.display = 'none';
        document.getElementById('dietComments').style.display = 'none';
        document.querySelector('#numAttending input').required = false;
    }
    else if(id == 'accept'){
        if(document.getElementById('accept').classList.contains('u-black')){
            document.getElementById('accept').classList.remove('u-black');
        }
        document.getElementById('reject').classList.add('u-black');
        document.getElementById('numAttending').style.display = '';
        document.getElementById('dietComments').style.display = '';
        document.querySelector('#numAttending input').required = true;
    }
}
