let body = document.querySelector("body");
let level = document.querySelector("h3");
let playground = document.querySelector(".playground");
let boxes = document.querySelectorAll(".box");
let helpBtn = document.querySelector(".help");
let resetBtn = document.querySelector(".reset");
let outerBox = document.querySelector(".outerBox");
let box5 = document.querySelector("#box5");
let box6 = document.querySelector("#box6");
let box7 = document.querySelector("#box7");
let box8 = document.querySelector("#box8");
let box9 = document.querySelector("#box9");
let scoreBoard = document.querySelector("td");


let started = false;
let memArr = [];
let userArr = [];
let levelNum = 0;

let num = 0;
let clicks = 0; //this will count the user clicks
let score = 0;

playground.addEventListener('click', 
    (event) => {
       if(started) {
        if(event.target.className == 'box'){
            userFlash(event.target);
            clicks++;

            userArr.push(event.target.id);
            checker();
        }
       }
        
    }
)
function userFlash (box){
    box.classList.add("userFlash");

    setTimeout(() => {
        box.classList.remove("userFlash");
    }, 200)
}
function checker(){
    if(userArr[(clicks-1)] != memArr[(clicks-1)]){
        //we have lost the game
        level.innerText = `You have lost the game, Your score is ${score}`;
        scoreBoard.innerText = 0;
        started = false;
        userArr = [];
        memArr = [];
        clicks = 0;
        num = 0;
        score = 0;

        body.classList.add('gameOver');
        setTimeout(() => {
        body.classList.remove('gameOver');
        },500);

        levelNum = 1;
        levelReset(); //for resetting to initial level
    }else {
        num++;
    }

    if (num == memArr.length && num != 0){
        // user clicked all the boxes in correct manner
        score += 10;
        scoreBoard.innerText = `${score}`;
        userArr = []
        clicks = 0;
        num = 0
        setTimeout(selectBox, 500);
    }
}

body.addEventListener('keydown', () => {
    if(started == false){
        started = true;
        selectBox();
    }
})
function selectBox(){
    level.innerText = `level ${levelNum}`; //intially -> 0
    levelNum++; //0 -> 1
    checkLevel (levelNum); //to upgrade level
    valueGenerator (levelNum); //to generate random values
}
function flashRandom(randomVal){
     boxes[randomVal].classList.add('memFlash');
     setTimeout(() => {
        boxes[randomVal].classList.remove('memFlash');
     },[250]) //250ms
}
helpBtn.addEventListener('click', () => {
    let initialText = level.innerText;
     
    level.innerText = `Memory array is ${memArr}`;

    setTimeout(() => {
        level.innerText = initialText;
    },2000);
})
function checkLevel(levelNum){
    if( levelNum == 6){
        box5.classList.remove('hide');
        box6.classList.remove('hide');

        playground.classList.add('playground2');
    }
    if( levelNum == 11){
        box7.classList.remove('hide');
        box8.classList.remove('hide');
        box9.classList.remove('hide');
    }
}
function levelReset(){
        box5.classList.add('hide');
        box6.classList.add('hide');

        playground.classList.remove('playground2');
        box7.classList.add('hide');
        box8.classList.add('hide');
        box9.classList.add('hide');
}
resetBtn.addEventListener('click',() => {
    levelNum = 1;
    level.innerText = `level ${levelNum}`;
    scoreBoard.innerText = 0;
    started = false;
    userArr = [];
    memArr = [];
    clicks = 0;
    num = 0;
    score = 0;

    body.classList.add('newGame');
    setTimeout(() => {
    body.classList.remove('newGame');
    },500);
    levelReset();
})
function valueGenerator (levelNum){
    let randomVal;
    if(levelNum != 6 && levelNum != 11){
        randomVal = Math.floor((Math.random ()*4));
        flashRandom(randomVal);
    }
    else if (levelNum == 6){
        randomVal = Math.floor((Math.random ()*6));
    flashRandom(randomVal);
    }
    else{
        randomVal = Math.floor((Math.random ()*9));
        flashRandom(randomVal);
    }
        memArr.push(boxes[randomVal].id);

}
