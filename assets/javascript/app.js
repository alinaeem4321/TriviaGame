var triviaQuestions = [
// question 1
        {
            question: "How big is the sun?",
            answerList: ["432,288 miles", "553,211 miles", "732.983 miles"],
            "answer": 0
        },
        // question 2
        {
            question: "How long would it take a space shuttle (going 5 miles per second) to travel a light year?",
            answerList: ["37,200 years", "20,320 years", "60,730 years"],
            "answer": 0
        },
        // question 3
        {
            question: "What did Pluto get reclassified to in 2005?",
            answerList: ["A moon", "A minor planet", "A dwarf planet"],
            "answer": 2
        },
        // question 4
        {
            question: "Which two planets in the solar system do not have moons?",
            answerList: ["Saturn and Pluto", "Uranus and Mars", "Venus and Mercury"],
            "answer": 2
        },
        // question 5
        {
            question: "What does NASA stand for?",
            answerList: ["National Aeronautics and Space Administration", "National Astronauts and Space Aerodynamics", "National Astrophysics and Space Admiration"],
            "answer": 0
        },
        // question 6
        {
            question: "Scientists estimate that the univers is _________ years old.",
            answerList: ["30.18 billion", "13.82 billion", "2 billion"],
            "answer": 1
        },
        // question 7
        {
            question: "How many years does it take for the Sun to travel around the galaxy?",
            answerList: ["103 million years", "225 million years", "34 billion years"],
            "answer": 1
        },
        // question 8
        {
            question: "What are Saturn's rings made of?",
            answerList: ["star dust and comet debris", "sulfur and sand", "ice and rock"],
            "answer": 2
        },
        // question 9
        {
            question: "Unidentified type of matter that does not emit or interact with light?",
            answerList: ["dark matter", "gravity", "orbiting matter"],
            "answer": 0
        },
        // question 10
        {
            question: "The golden record is ____________",
            answerList: ["The planet made up of the most gold", "a record compiled by Carl Sagan for the Voyager", "the furthest humans have traveled away from Earth"],
            "answer": 1
        }
];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
