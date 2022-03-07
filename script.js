//html elements
const btn = document.querySelector('#btn');
btn.innerHTML = "S T A R T";
const scoreEl = document.querySelector('#scoreEl');
const highscoreEl = document.querySelector('#highscoreEl');
var gameOverTxtHolder = document.querySelector('#gameOverTxtHolder');
var gameOverTxt = document.querySelector('#gameOverTxt');

function newSlide(num){
    var slider = document.createElement("div");    
    slider.setAttribute("class","slider animate");
    slider.setAttribute("id","slider"+num);
    slider.style.background = '#7b7162';
    slider.style.border = '3px solid #5c4033';
    slider.style.width = 100 + "px";
    slider.style.height = 20 + "px";
    slider.style.position = "absolute";
    slider.style.bottom = (20 * (num - 1)) + "px";
    document.getElementById("game").append(slider);
}

for(var i = 25; i > 0; i--){
    newSlide(i);
}

var style = getComputedStyle(document.body); //getting body style
//getting score and highscore variables
var slideWidth = parseInt(style.getPropertyValue("--width"));
var score = -1;
var counter = 1;
var saveKey = "best";
var scoreString = localStorage.getItem(saveKey);
var best;
if(scoreString == null){
    best = 5;
}
else{
    best = parseInt(scoreString);
}
highscoreEl.innerHTML = best;

function stopSliding(slider){
    var sliderCurrent = document.getElementById("slider".concat(slider));
    var sliderAbove = document.getElementById("slider".concat(slider+1));

    if(slider == 1){
        var sliderBelow = sliderCurrent;
    }
    else{
        var sliderBelow = document.getElementById("slider".concat(slider-1));
    }

    //getting the properties of slider
    var left = window.getComputedStyle(sliderCurrent).getPropertyValue("left");
    sliderCurrent.classList.remove("animate");
    sliderCurrent.style.left = left;
    var width = parseFloat(window.getComputedStyle(sliderCurrent).getPropertyValue("width"));
    var leftBelow = parseFloat(window.getComputedStyle(sliderBelow).getPropertyValue("left"));    
    left = parseFloat(left);
    var difference = left - leftBelow;
    var absDifference = Math.abs(difference);

    //Game Over
    if(difference > width || difference < (- width)) {
        gameOver();
        return;
    }

    //score increases
    score++;
    scoreEl.innerHTML = (score + 1);
    if((score + 1) > best){
        best = score + 1;
        localStorage.setItem(saveKey, best);
    }
    highscoreEl.innerHTML = best;

    //sets the left property of the slider accordingly
    if(difference > 0){
        left = left + absDifference;
    }
    else{
        left = left - difference;
        sliderCurrent.style.left = left.toString().concat("px");
    }

    //setting the current and above slider's width
    var offset = (width - absDifference).toString().concat("px");
    sliderCurrent.style.width = offset;
    sliderAbove.style.width = offset;
    sliderAbove.style.visibility = "visible";

    //it sets the motion of the above slider to move according to the width left of the slider element
    slideWidth = slideWidth + absDifference;
    document.documentElement.style.setProperty('--width',slideWidth+"px");
}

//game over function
function gameOver(){
    btn.innerHTML = "R E S T A R T";
    gameOverTxtHolder.style.display = 'block';
    if((score + 1) == 25){
        gameOverTxt.innerHTML = "!! YOU WIN !!";
    }
    else{
        gameOverTxt.innerHTML = "< YOU LOST >";
    }
}

//start game button
btn.addEventListener('click', () => {
    //make the first slider visible
    if(btn.innerHTML == "S T A R T"){
        document.getElementById('instructions').style.display = 'none';
        document.getElementById('slider1').style.visibility = 'visible';
        btn.innerHTML = "S T O P";
    }
    //restart
    else if(btn.innerHTML == "R E S T A R T"){
        location.reload();
    }
    else{
        stopSliding(counter);
        counter++;
    }
});