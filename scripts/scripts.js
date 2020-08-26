/*
* This game is intended to find the repeated image from a bunch of different 18 ones.
* there are a bunch of random images that suddenly appear on screen, and only one of
* those images are repeated. The player has 20 seconds to find, as soon as possible,
* the duplicated imagen and click it.

*Version 0
*Original Author: Ariel Laurella.
*Last Updated: 2020-08-26
*/


var image_quatity = 57;
var countDownDuration = 20;
var maxScorePerRound = 100;
var numberOfRounds = 10;
var penalty = 20;

var sizes = ["100","75","50"];
var angles = ["0","90","180","270"];
var usedList;
var table1Equal;
var table2Equal;
var baseNameRepeated;
var currentScore;
var currentRound;
var timeLeft;
var timer;
var result = false;
var gameStarted = false;
var failSound = new Audio('./sounds/failSound.mp3');
var winSound = new Audio('./sounds/winSound.mp3');
var gameOverSound = new Audio('./sounds/gameOverSound.mp3');
var startGameSound = new Audio('./sounds/startGameSound.mp3');


//Start the game.
function start()
{
  hideDiv("divMessage");
  startGameSound.play();
  currentScore = 0;
  currentRound = 0;
  gameStarted = true;
  document.getElementById("start").value = "Reset";
  document.getElementById("score").innerHTML = currentScore;
  document.getElementById("timeLeft").innerHTML = countDownDuration;
  if (timer != null) clearInterval(timer);
  startRound();
   
}

//finish the game
function finish()
{
  if (timer != null) clearInterval(timer);
  gameStarted = false;
  document.getElementById("start").value = "Start";
  document.getElementById("message").innerHTML = "GAME OVER";
  showDiv("divMessage");
  gameOverSound.play();
}


//startRound starts a new round of 20 seconds to choose duplicated image. 
function startRound()
{
  if (!gameStarted) return;
  if (currentRound < numberOfRounds)
  { 
    currentRound = currentRound + 1;
    document.getElementById("round").innerHTML = currentRound;
    fillEachTable(0);
    fillEachTable(1);
    timeLeft = countDownDuration;
    if (timer != null) clearInterval(timer);
    timer = setInterval(function() {
       
        document.getElementById("timeLeft").innerHTML = timeLeft;

        timeLeft = timeLeft - 1;

        if (timeLeft < 0) {
            clearInterval(timer);
            document.getElementById("timeLeft").innerHTML = "0";
            failSound.play();
            startRound();
        }
    }, 1000);
  }
  else
  {
    finish();
  }
}


//checkRepeated checks if incoming id from clicked image match one of the repeated images.
//if clicked the right one, increment score according to the left time. 
//if clicked the wrong one, decrement score by penalty variable. 
function checkRepeated(id)
{
  if (timeLeft > 0 && gameStarted)
  {
    result = (id == "img"+table1Equal || id == "img"+ (table2Equal+9));
    if (result)
    {
      winSound.play();
      currentScore = currentScore + maxScorePerRound * timeLeft / countDownDuration;
      
    }
    else
    {
      failSound.play();
      timeLeft = 0;

      if (currentScore > penalty)
        currentScore = currentScore - penalty;
      else
        currentScore = 0;

    }
    document.getElementById("score").innerHTML = currentScore;
    startRound();
  }

}


//fillEachTable choose 18 random images to show (9 to table 0 and 9 to table 1). 
function fillEachTable(numTable)
{

  var baseFileName;
  var size;
  var angle;
  var fileNumber;
  var i;
  
  if (numTable == 0)
  {
    usedList = [];
    table1Equal = getRandom(9) + 1;
    table2Equal = getRandom(9) + 1;
    baseNameRepeated = String(getRandom(image_quatity)).padStart(2, '0');
    usedList[usedList.length] = baseNameRepeated;
  }

  for (i = 1; i < 10; i++) {
    
    while(usedList.length < image_quatity && !(numTable == 0 && i == table1Equal) && !(numTable == 1 && i == table2Equal))
    {
      baseFileName = String(getRandom(image_quatity)).padStart(2, '0');
       if (!usedList.includes(baseFileName))
       {
        usedList[usedList.length] = baseFileName;
        break;
       }
 
    }
    size = getRandomSize();
    angle = getRandomAngle();
    if( (numTable == 0 && i == table1Equal) || (numTable == 1 && i == table2Equal) )
      {
        document.getElementById("img"+(i+(numTable*9))).src = "./images/" + baseNameRepeated + ".png";
      }
      else
      {
        document.getElementById("img"+(i+(numTable*9))).src = "./images/" + baseFileName + ".png";
      }

    document.getElementById("img"+(i+(numTable*9))).height = size;
    document.getElementById("img"+(i+(numTable*9))).width = size;
    document.getElementById("img"+(i+(numTable*9))).style.transform = "rotate("+ angle + "deg)";
  }

}


//getRandom return a rando number between 0 and num parameter.
function getRandom(num)
{
    return  Math.floor(num*Math.random());
}
    
function getRandomSize()
{
  return  sizes[getRandom(sizes.length)];
}
    
function getRandomAngle()
{
  return  angles[getRandom(angles.length)];
}
    

//hideDiv and showDiv are entended to hide or show a div element.
function hideDiv(divId)
{
    document.getElementById(divId).style.display = "none";
}

function showDiv(divId)
{
  document.getElementById(divId).style.display = "block";
}




