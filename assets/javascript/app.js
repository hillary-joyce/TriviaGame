
var timer = 5;
var intervalId
var timesUp = false;
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
	 {question: "How many stars are there?",
   correctAnswer: "Nine",
   answerArray: ["One", "Nine", "Billion"]
   },
	 {question: "How many stars are there?",
   correctAnswer: "Nine",
   answerArray: ["One", "Nine", "Billion"]
   },
	 {question: "How many stars are there?",
   correctAnswer: "Nine",
   answerArray: ["One", "Nine", "Billion"]
   },
	 {question: "How many stars are there?",
   correctAnswer: "Nine",
   answerArray: ["One", "Nine", "Billion"]
   },
	 {question: "How many stars are there?",
   correctAnswer: "Nine",
   answerArray: ["One", "Nine", "Billion"]
   },
]

// set up a countdown that goes from 30 to 0
function countDown() {
	if(timer > 0) {
	timer--;
  $("#countDown").text("Time Left: " + timer);
  } else {
//if the timer reaches zero, change the timesUp boolean to false (to trigger a new question later on)
	timesUp = true;
	console.log(timesUp);
	}

}

function newQuestion() {
	timer = 5;
  clearInterval(intervalId);
	intervalId = setInterval(countDown, 1000);
  var currentQuestionObject = spaceQuiz[currentQuestion];
  $("#questionsDiv").html("<p>" + currentQuestionObject.question +"</p>");

  //Autopopulate the 4 answer buttons with the possible answers
  for(i=0; i < currentQuestionObject.answerArray.length; i++){
    $(".button[value='"+i+"']").html(currentQuestionObject.answerArray[i]);
  }
}

function playGame(){
	newQuestion();
	console.log(timesUp);
	$(".button").on("click", function(){
	  var currentButton = $(this).text();

	  if (currentButton === spaceQuiz[currentQuestion].correctAnswer){
			correctAnswers++
			console.log(spaceQuiz[currentQuestion].correctAnswer);
	  } else {
	    incorrectAnswers++;
			console.log(timer);
	  }

		currentQuestion++;
	  newQuestion();
	})
	console.log(timesUp);
	if (timesUp === true) {
		console.log(timesUp);
		console.log('timesup');
	}
};


$("#button").on("click", playGame);
