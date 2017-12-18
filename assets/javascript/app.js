var timer = 0;
var intervalId;
var correctAnswers = 0;
var incorrectAnswers = 0;
var missedAnswers = 0;
var currentQuestion = 0;
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
    var currentQuestionObject = spaceQuiz[currentQuestion];
    $("#questionsDiv").html("<p>" + currentQuestionObject.question + "</p>");
    //Autopopulate the 4 answer buttons with the possible answers
    for (i = 0; i < currentQuestionObject.answerArray.length; i++) {
      $(".button[value='" + i + "']").html(currentQuestionObject.answerArray[i]);
    }
  }

	function gameResults() {
		clearInterval(intervalId);
		$(".answer-result-div").fadeOut(700);
		$(".game-over-div").fadeIn(700);
		$(".game-stats").html("<u>Right Answers:</u> " + correctAnswers +
		"<br><u>Wrong Answers:</u> " + incorrectAnswers +
		"<br><u>Missed Answers:</u> " + missedAnswers);
		if(correctAnswers > (incorrectAnswers + missedAnswers)){
			$(".game-result").text("YOU WIN");
		} else {
			$(".game-result").text("YOU LOSE");
		}
	}

  function playGame() {
    // hide the start game button
    $(".start-game").css("display", "none");
    // show the game play background div
    $(".game-play-background").fadeIn(2000);
    //show the questions div
    $(".questions-div").fadeIn(2000);
    newQuestion();
    $(".answer-button").on("click", function() {
      var currentButton = $(this).text();
      clearInterval(intervalId);
      $(".questions-div").fadeOut(700);
      $(".answer-result-div").fadeIn(700);
      //show image and space fact
      $(".result-image").attr("src", spaceQuiz[currentQuestion].answerImg);
      $(".result-fact").text(spaceQuiz[currentQuestion].bonusFact);

      if (currentButton === spaceQuiz[currentQuestion].correctAnswer) {
        correctAnswers++;
        $(".answer-result").text("Correct!");
      } else {
        incorrectAnswers++;
        $(".answer-result").html("Wrong!<br>The correct answer is: " + spaceQuiz[currentQuestion].correctAnswer);
      }
      currentQuestion++;
      console.log(currentQuestion);
    });
  };

  // establish what happens on button clicks
  $(".start-game").on("click", playGame);
  $("#playAgain").on("click", function() {
    location.reload();
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
