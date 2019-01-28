const wordBank = ["Minnesota","Iowa","Wisconsin","Illinois","Michigan","Ohio","Indiana"];
var guessArr = [];
var randomizer = Math.round(Math.random()*wordBank.length);
var curWord = wordBank[randomizer];

window.onload = init;
document.onkeyup = keyHandler;

function init(){
    var guessMade = document.getElementById('guessesMade');
    var guessRemaining = document.getElementById('guessRemaining');    
    guessMade.innerHTML = "-";
    guessRemaining.innerHTML = "15";
    initWordSet();
}

function keyHandler(event){
    var key = event.key;
    var keyCheck = false;

    for(x in curWord){
        let curLetter = curWord[x].toLowerCase();
        if(key == curLetter){
            correct(key,x);
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

function correct(key,index){
    var curGuess = document.getElementById('curGuess');
    var guessRemaining = document.getElementById('guessRemaining');
    var oldArr = curGuess.innerHTML;
    var newArr = "";
    var winCheck = "";
    // console.log("curword",curWord.length);
    // console.log("place",newArr.length);
    
    for(var z=0;z<oldArr.length;z+=2){
        var otherIndex = z/2;
        var otherLetter = curWord[otherIndex].toLowerCase();
        if(otherLetter == key){
            winCheck += key
            newArr += key;
            newArr += " ";
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
    }

    curGuess.innerHTML = newArr;
    
}

function wrong(key){
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
    } else{
        guessRemaining.innerHTML = "You Lost :(";
    }  
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



