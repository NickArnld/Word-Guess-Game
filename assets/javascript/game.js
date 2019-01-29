const wordBank = ["Minnesota","Iowa","Wisconsin","Illinois","Michigan","Ohio","Indiana"];
const correctGifs = [
    "https://media.giphy.com/media/26uTqJWUxDMgWc5pu/giphy.gif",
    "https://media.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif",
    "https://media.giphy.com/media/nXxOjZrbnbRxS/giphy.gif",
    "https://media.giphy.com/media/ap6wcjRyi8HoA/giphy.gif",
    "https://media.giphy.com/media/26FPnsRww5DbqoPuM/giphy.gif",
    "https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif",
    "https://media.giphy.com/media/9rnoFO1PP1rZYHFRtW/giphy.gif",

];
const wrongGifs = [
    "https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif",
    "https://media.giphy.com/media/m8eIbBdkJK7Go/giphy.gif",
    "https://media.giphy.com/media/4D7ksFSUtsnvO/giphy.gif",
    "https://media.giphy.com/media/3ohc1h1vy6Gtv4uOLC/giphy.gif",
    "https://media.giphy.com/media/fxgVuoKyZwEOudRXuj/giphy.gif",
    "https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif",
    "https://media.giphy.com/media/wofftnAdDtx4s/giphy.gif",

];
var guessArr = [];
var randomizer = Math.floor(Math.random()*wordBank.length);
var curWord = wordBank[randomizer];

window.onload = init;

document.addEventListener("keyup", keyHandler);

function init(){
    document.getElementById('guessesMade').innerHTML = "-";
    document.getElementById('guessRemaining').innerHTML = "15";
    document.getElementById('resetButton').onclick = reset;
    document.getElementById('mOverRules').onmouseenter = showRules; 
    document.getElementById('mOverRules').onmouseleave = hideRules;  
    initWordSet();
}

function initWordSet(){
    var curGuess = document.getElementById('curGuess');    
    var postString = "";
    console.log(curWord);

    for(x in curWord){
        postString += "_";
        postString += " ";
    }
    
    curGuess.innerHTML = postString;
}

function keyHandler(event){
    var key = event.key;
    var keyCheck = false;
    for(x in curWord){
        let curLetter = curWord[x].toLowerCase();
        if(key == curLetter){
            correct(key);
            keyCheck = true;
            break
        }else{
            continue
        }
    }
    if(!keyCheck){
        wrong(key)
    }    

}

function correct(key){
    var rando = Math.floor(Math.random()*correctGifs.length);    
    var curGuess = document.getElementById('curGuess');
    var guessRemaining = document.getElementById('guessRemaining');
    var oldArr = curGuess.innerHTML;
    var newArr = "";
    var winCheck = "";
    
    for(var z=0;z<oldArr.length;z+=2){
        var otherIndex = z/2;
        var otherLetter = curWord[otherIndex].toLowerCase();
        if(otherLetter == key){
            winCheck += key
            newArr += key;
            newArr += " ";
            document.getElementById('gif').src = correctGifs[rando];
        }else{
            if(oldArr[z] = key){
                winCheck += oldArr[z];
                newArr += oldArr[z];
                newArr += " ";                
            }else{
                newArr += "_";
                newArr += " ";
            }
            
        }
    }

    console.log(winCheck)
    if(winCheck == curWord.toLowerCase()){
        guessRemaining.innerHTML = "You Won!";
        document.getElementById('gif').src = "https://media.giphy.com/media/l0HUnQR733uhm48UM/giphy.gif";
    }

    curGuess.innerHTML = newArr;
    
}

function wrong(key){
    var rando = Math.floor(Math.random()*wrongGifs.length);
    document.getElementById('gif').src = wrongGifs[rando];
    var guessMade = document.getElementById('guessesMade');
    var guessRemaining = document.getElementById('guessRemaining');
    var curNum =  parseInt(guessRemaining.innerHTML);
    var duplicateCheck = false;
    curNum -= 1;    

    for( i in guessArr){
        if(key == guessArr[i]){
            duplicateCheck = true;
            break
        } else {
            continue
        }
    }

    if(!duplicateCheck){
        guessArr.push(key);
        guessMade.innerHTML = guessArr;
    }

    if(curNum > 1){
        guessRemaining.innerHTML = curNum;
        document.getElementById('gif').src = wrongGifs[rando]; 
    } else{
        guessRemaining.innerHTML = "You Lost :(";
        document.getElementById('gif').src = "https://media.giphy.com/media/Uyl1VRmBCPir6/giphy.gif";
        document.removeEventListener("keyup", keyHandler);
    }
     
}

function reset(){
    location.reload();
}

function showRules(){
    // console.log("mouseOver!");
    var h4 = document.createElement("h4");
    var pTag = document.createElement("p");
    var brTag1 = document.createElement("br");
    var brTag2 = document.createElement("br");
    var h4Content = document.createTextNode("Rules:");
    var pContent1 = document.createTextNode("Try to guess the secret word one letter at a time!");
    var pContent2 = document.createTextNode(" Type each letter you guess into your keyboard!");
    var pContent3 = document.createTextNode("You have 15 tries, good luck!");
    h4.appendChild(h4Content);
    pTag.appendChild(pContent1);
    pTag.appendChild(brTag1);
    pTag.appendChild(pContent2);
    pTag.appendChild(brTag2);
    pTag.appendChild(pContent3);
    document.getElementById('rules-div').appendChild(h4);
    document.getElementById('rules-div').appendChild(pTag);
    document.getElementById('mOverRules').style.marginBottom = 0;
}

function hideRules(){
    // console.log("mouseOff!");
    var thisNode = document.getElementById('rules-div');
    while(thisNode.firstChild){
        thisNode.removeChild(thisNode.firstChild);
    }
    document.getElementById('mOverRules').style.marginBottom = '20px';
}
