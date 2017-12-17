


$(document).ready(function () {
var timer = 0;
var intervalId;
var correctAnswers = 0;
var incorrectAnswers = 0;
var missedAnswers = 0;
var currentQuestion = 0;
var spaceQuiz = [
	{question: "Which bee is coolest?",
   correctAnswer: "Space Bee",
   answerArray: ["Queen bee", "Beyonce", "Space Bee"]
   },
   {question: "How many stars are there?",
   correctAnswer: "Nine",
   answerArray: ["One", "Nine", "Billion"]
   },
	 {question: "Do you love me?",
   correctAnswer: "Nine",
   answerArray: ["One", "Nine", "Billion"]
   }
];

function countDown() {
	if(timer > 0) {
	timer--;
  $("#countDown").text("Time Left: " + timer);
  } else {
//if the timer reaches zero, change the timesUp boolean to false (to trigger a new question later on)
	missedAnswers++;
	currentQuestion++;
	newQuestion();
 }
};

//function to display a new question
function newQuestion() {
	//set the timer to 30 seconds
	timer = 30;
	//start the countdown clock
	intervalId = setInterval(countDown, 1000);
	//hide the answer div
	$(".answer-div").css("display", "none");
  var currentQuestionObject = spaceQuiz[currentQuestion];
  $("#questionsDiv").html("<p>" + currentQuestionObject.question +"</p>");
  //Autopopulate the 4 answer buttons with the possible answers
  for(i=0; i < currentQuestionObject.answerArray.length; i++){
    $(".button[value='"+i+"']").html(currentQuestionObject.answerArray[i]);
  }
}

function playGame(){
// hide the start game button
	$(".start-game").css("display", "none");
//show the questions div
	$(".questions-div").css("display", "block");
	newQuestion();
	$(".answer-button").on("click", function(){
	  var currentButton = $(this).text();
		clearInterval(intervalId);
		$(".questions-div").css("display", "none");
		$(".answer-result-div").css("display", "block");
	  if (currentButton === spaceQuiz[currentQuestion].correctAnswer){
			correctAnswers++;
			$(".answer-result").text("Correct!");
			//show image and space fact
	  } else {
	    incorrectAnswers++;
			$(".answer-result").text("Wrong!");
			//show image and space fact
	  }
		currentQuestion++;
		});
	};

	if(currentQuestion > spaceQuiz.length -1){
		clearInterval(intervalId);
		$(".game-stats").html("<b>Right Answers:</b> " + correctAnswers +
		"<br><b>Wrong Answers:</b> " + incorrectAnswers +
		"<br><b>Missed Answers:</b> " + missedAnswers);
	}


// establish what happens on button clicks
$(".start-game").on("click", playGame);
$("#playAgain").on("click", function(){
	location.reload();
});
$("#nextQuestion").on("click", function(){
	$(".questions-div").css("display", "block");
	$(".answer-result-div").css("display", "none");
	newQuestion();
});
});
