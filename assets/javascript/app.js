var timer = 0;
var intervalId;
var correctAnswers = 0;
var incorrectAnswers = 0;
var missedAnswers = 0;
var currentQuestion = 0;
var gameOver = false;
var spaceQuiz = [{
    question: "What is the closest star system to the Solar System?",
    correctAnswer: "Proxima Centauri",
    answerArray: ["Polaris", "Proxima Centauri", "Sirius", "Alpha Orionis"],
    answerImg: "assets/images/proxima.gif",
    bonusFact: "Proxima Centauri is a red dwarf about 4.25 light-years from the Sun in the constellation of Centaurus."
  },
  {
    question: "What is the largest planet in our Solar System?",
    correctAnswer: "Jupiter",
    answerArray: ["Saturn", "Neptune", "Jupiter", "Venus"],
    answerImg: "assets/images/jupiter.gif",
    bonusFact: "The Great Red Spot is the most noticeable feature on Jupiter's surface — a storm about two to three times larger than planet Earth."
  },
  {
    question: "Which NASA space flight was the last manned mission to the moon?",
    correctAnswer: "Apollo 17",
    answerArray: ["Apollo 17", "Apollo 11", "Apollo 13", "Apollo 18"],
    answerImg: "assets/images/astronauts.gif",
    bonusFact: "On December 11, 1972 Apollo 17 Lunar Module Pilot Harrison H. Schmitt and Commander Eugene A. Cernan, landed on the moon's Taurus-Littrow region in the Lunar Module."
  },
  {
    question: "How old is the universe?",
    correctAnswer: "13.8 Billion Years",
    answerArray: ["102.7 Billion Years", "1 Billion Years", "6.5 Billion Years", "13.8 Billion Years"],
    answerImg: "assets/images/universe.gif",
    bonusFact: "In comparison, the solar system is only about 4.6 billion years old."
  },
  {
    question: "Which is NOT a type of star?",
    correctAnswer: "Green Elf",
    answerArray: ["Red Supergiant", "Blue Giant", "Green Elf", "White Dwarf"],
    answerImg: "assets/images/supernova.gif",
    bonusFact: "The largest known star, UY Scuti, is about 1,708 times larger than our Sun"
  },
  {
    question: "The Milky Way Galaxy is what type of galaxy?",
    correctAnswer: "Spiral",
    answerArray: ["Eliptical", "Spiral", "Regular", "Irregular"],
    answerImg: "assets/images/galaxy.gif",
    bonusFact: "The Milky Way contains over 200 billion stars, and enough dust and gas to make billions more."
  }
];

$(document).ready(function() {
  // Fade in the title and the 'start game' button
  setTimeout(function() {
    $(".space-trivia-title").fadeIn(2000);
  }, 500);
  setTimeout(function() {
    $(".start-game").fadeIn(2000);
  }, 2000);


  //Set up functions for the javascript to use
  function reset() {
    timer = 0;
    intervalId;
    correctAnswers = 0;
    incorrectAnswers = 0;
    missedAnswers = 0;
    currentQuestion = 0;
    gameOver = false;
    $(".game-over-div").fadeOut(700);
    $(".questions-div").fadeIn(2000);
  }

  function countDown() {
    if (timer > 0) {
      timer--;
      $("#countDown").text("Time Left: " + timer);
    } else {
      //if the timer reaches zero, change the timesUp boolean to false (to trigger a new question later on)
      missedAnswers++;
      currentQuestion++;
      if (currentQuestion > spaceQuiz.length - 1) {
        gameResults();
      } else {
        newQuestion();
      }
    }
  };

  //function to display a new question
  function newQuestion() {
    //set the timer to 30 seconds
    timer = 30;
    //start the countdown clock
    intervalId = setInterval(countDown, 1000);
    //hide the answer div
    $(".answer-div").fadeOut(700);
    // create a variable called "current Question" that stores the question we're currently on
    var currentQuestionObject = spaceQuiz[currentQuestion];
    //set the questions div html to the question associated with our currentQuestion
    $("#questionsDiv").html("<p>" + currentQuestionObject.question + "</p>");
    //Autopopulate the 4 answer buttons with the possible answers
    for (i = 0; i < currentQuestionObject.answerArray.length; i++) {
      $(".button[value='" + i + "']").html(currentQuestionObject.answerArray[i]);
    }
  }


  // function to run when an answer button is clicked
  function answerClicked() {
    //set the variable current button to the text
    var currentButton = $(this).text();
    //stop the countdown clock
    clearInterval(intervalId);
    //set the correct image gif and space fact for which question we're on
    $(".result-image").attr("src", spaceQuiz[currentQuestion].answerImg);
    $(".result-fact").text(spaceQuiz[currentQuestion].bonusFact);
    //fade out the question div
    $(".questions-div").fadeOut(700);
    //fade in the results div
    $(".answer-result-div").fadeIn(700);
    //if the button pressed text matches the correct answer
    if (currentButton === spaceQuiz[currentQuestion].correctAnswer) {
      //add one to correct answers
      correctAnswers++;
      //let the user know they were correct
      $(".answer-result").text("Correct!");
    } else {
      //add one to incorrect answers
      incorrectAnswers++;
      //let the user know they were incorrect and show them the right answer
      $(".answer-result").html("Wrong!<br>The correct answer is: " + spaceQuiz[currentQuestion].correctAnswer);
    }
    //add one to current question
    currentQuestion++;
    console.log(currentQuestion);
  };


  // function to display the game results at the end fo the game

  function gameResults() {
    //stop the countdown clock
    console.log(gameOver);
    clearInterval(intervalId);
    gameOver = true;
    console.log(gameOver);
    //hide the answer result div
    $(".answer-result-div").fadeOut(700);
    // fade in the game over div
    $(".game-over-div").fadeIn(700);
    //populate the game stats div with information on right, wrong, and missed answers
    $(".game-stats").html("<u>Right Answers:</u> " + correctAnswers +
      "<br><u>Wrong Answers:</u> " + incorrectAnswers +
      "<br><u>Missed Answers:</u> " + missedAnswers);
    //if the number of correct answers is greater than missed and incorrect answers...
    if (correctAnswers > (incorrectAnswers + missedAnswers)) {
      //...you win the game
      $(".game-result").text("YOU WIN");
    } else {
      //otherwise, you lose
      $(".game-result").text("YOU LOSE");
    }
  }

  function playGame() {

    //run the "new question" function
    if(gameOver === false){
    newQuestion();
    //when an answer button is clicked
    $(".answer-button").click(answerClicked);
  };
};

  // establish what happens on button clicks
  $(".start-game").on("click", function() {
    // hide the start game button
    $(".start-game").css("display", "none");
    // show the game play background div
    $(".game-play-background").fadeIn(2000);
    //show the questions div
    $(".questions-div").fadeIn(2000);

    playGame();
  });
  $("#playAgain").on("click", function() {
    reset();
  });
  $("#nextQuestion").on("click", function() {
    // if all questions have been answered
    if (currentQuestion > spaceQuiz.length - 1) {
      gameResults();
    } else {
      $(".questions-div").fadeIn(700);
      $(".answer-result-div").fadeOut(700);
      newQuestion();
    };
  });
});
