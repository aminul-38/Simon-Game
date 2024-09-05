let gameRunning = false;
let buttonSequence = [];
let nextButtonIndex = -1;
let nextButtonToBePressed = -1;
let screenWidth = screen.width;

// This function will add a new button in buttonSequence
function generateNextButton() {
  var number = Math.floor(Math.random() * 4) + 1;
  buttonSequence.push(number);

  buttonPressed(checkButtonColor(number));
}

// This function set which button should be pressed by the player according to the buttonSequence
function nextButton() {
  if (nextButtonIndex < buttonSequence.length - 1) {
    nextButtonIndex++;
    nextButtonToBePressed = buttonSequence[nextButtonIndex];
  } else if (nextButtonIndex === buttonSequence.length - 1) {
    nextButtonIndex = 0;
    nextButtonToBePressed = buttonSequence[nextButtonIndex];
  }
}

// This function play a audio according to the given file name
function soundPlay(audioName) {
  var tune = new Audio("sounds/" + audioName + ".mp3");
  tune.play();
}

// This function return color name for corresponding number
function checkButtonColor(number) {
  if (number == 1) return "green";
  else if (number == 2) return "red";
  else if (number == 3) return "yellow";
  else return "blue";
}

function setDefult() {
  gameRunning = false;
  buttonSequence = [];
  nextButtonIndex = -1;
  nextButtonToBePressed = -1;
}

// This function animate a button when it is pressed and play a sound for that button
function buttonPressed(buttonColor) {
  soundPlay(buttonColor);

  $("." + buttonColor).addClass("clicked");
  setTimeout(() => {
    $("." + buttonColor).removeClass("clicked");
  }, 200);

  // Alternative for setTimeout() in jquery
  /*   $("." + buttonColor)
    .delay(500)
    .queue(function (next) {
      $(this).removeClass("clicked");
      next();
    }); */
}

// This function generate an alert when player pressed a wrong button
function wrongButtonPressed() {
  soundPlay("wrong");
  $("body").addClass("gameOver");
  setTimeout(() => {
    $("body").removeClass("gameOver");
  }, 200);
}

// EventListener for keypress event
$("body").keypress(function () {
  if (gameRunning === false) {
    gameRunning = true;
    generateNextButton();
    nextButton();

    $("h1").text("Level 1");
  }
});

// EventListener for button click
$(".button").click(function (event) {
  var pressedButtonColor = $(this).attr("class");
  pressedButtonColor = pressedButtonColor.substring(7);
  console.log(pressedButtonColor);

  if (gameRunning === false) {
    wrongButtonPressed();
  }

  if (gameRunning === true) {
    if (pressedButtonColor === checkButtonColor(nextButtonToBePressed)) {
      if (nextButtonIndex === buttonSequence.length - 1) {
        $("h1").text("Level " + (buttonSequence.length + 1));
        nextButton();
        setTimeout(generateNextButton, 1000);
      } else {
        nextButton();
      }
    } else {
      setDefult();
      if (screenWidth <= 480) {
        $("h1").text("Game Over, Tap Here to Restart");
      } else {
        $("h1").text("Game Over, Press any key to Restart");
      }
      wrongButtonPressed();
    }
  }

  buttonPressed(pressedButtonColor);
});

/* code only for mobile device */

if (screenWidth <= 480) {
  $("h1").text("Tap Here to Start");
}

$("h1").on("click", function () {
  if (gameRunning === false && screenWidth <= 480) {
    gameRunning = true;
    generateNextButton();
    nextButton();

    $("h1").text("Level 1");
  }
});
