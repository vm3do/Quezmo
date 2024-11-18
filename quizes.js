const quizes = JSON.parse(localStorage.getItem('quizes'));
const selectedQuizId = JSON.parse(localStorage.getItem('selectedQuizId'));

const selectedQuiz = quizes.find(quiz => quiz.id === selectedQuizId);

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let remainingTime = selectedQuiz.estimatedTime;
let isExplanationVisible = false;


const wholeContainer = document.querySelector('.qs-container');
const questionContainer = document.querySelector('.qsbox');
const questionText = document.querySelector('.qsbox p');
const optionsContainer = document.querySelector('div #mcq');
const booleanContainer = document.querySelector('div #boolean');
const textContainer = document.querySelector('.qs-answer');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const questionNumberElement = document.getElementById('question-number');
const nextButton = document.querySelector('.next-btn');
const progressBarFill = document.querySelector('.fill');


function initializeQuiz() {
    loadQuestion();
    startQuizTimer();
}

// Load the current question
function loadQuestion() {
    const question = selectedQuiz.questions[currentQuestionIndex];

    questionContainer.style.background = "";
    questionText.style.cssText = "";
    

    questionText.textContent = question.text;
    isExplanationVisible = false;
    nextButton.style.display = "none"; 
    questionNumberElement.textContent = `${currentQuestionIndex + 1}/${selectedQuiz.questions.length}`;
    
    scoreElement.textContent = `${score} points`;

    optionsContainer.innerHTML = "";
    booleanContainer.innerHTML = "";
    textContainer.innerHTML = "";

    if (question.type === 'mcq') {
        optionsContainer.innerHTML = `
            <div data-number="1"><p>${question.options[0]}</p></div>
            <div data-number="2"><p>${question.options[1]}</p></div>
            <div data-number="3"><p>${question.options[2]}</p></div>
            <div data-number="4"><p>${question.options[3]}</p></div>
        `;
        
        const optionElements = document.querySelectorAll('#mcq div');
        optionElements.forEach(optionElement => {
            optionElement.addEventListener('click', () => {
                const selectedOption = optionElement.textContent.trim();
                const isCorrect = checkAnswer(selectedOption);

                optionElement.style.backgroundColor = isCorrect ? '#07bf82' : '#f32e2e'

                optionElements.forEach(element => {
                    element.style.pointerEvents = "none";
                });
            });
        });

    } else if (question.type === 'boolean') {
        booleanContainer.innerHTML = `
            <div data-number="1"><p>True</p></div>
            <div data-number="2"><p>False</p></div>
        `;
        
        const booleanElements = document.querySelectorAll('#boolean div');
        booleanElements.forEach(booleanElement => {
            booleanElement.addEventListener('click', () => {
                const selectedOption = booleanElement.textContent.trim();
                const isCorrect = checkAnswer(selectedOption);

                booleanElement.style.backgroundColor = isCorrect ? '#07bf82' : '#f32e2e'

                // Disable further clicks
                booleanElements.forEach(element => {
                    element.style.pointerEvents = "none";
                });
            });
        });

    } else if (question.type === 'text') {
        textContainer.innerHTML = `
            <textarea placeholder="Your Answer" id="text-input"></textarea>
            <button class="submit-text">Submit</button>
        `;
        
        const submitButton = document.querySelector('.submit-text');
        submitButton.addEventListener('click', () => {
            const userAnswer = document.querySelector('#text-input').value.trim();
            const isCorrect = checkAnswer(userAnswer);

            const textInput = document.querySelector('#text-input');
            textInput.style.backgroundColor = isCorrect ? '#07bf82' : '#f32e2e';

            textInput.disabled = true
            submitButton.disabled = true;
        });
    
    }

    updateProgressBar();
}

function startQuizTimer() {
    timerElement.textContent = `${remainingTime}s`;

    timerInterval = setInterval(() => {
        remainingTime--;
        timerElement.textContent = `${remainingTime}s`;
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            const finalMessage = `Time is UP`;
            showCustomAlert(finalMessage);

            endQuiz();
        }
    }, 1000);
}

function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
}

let correctAnswers = 0;

function checkAnswer(selectedOption) {
    const question = selectedQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedOption === question.answer;

    if (isCorrect) {
        score += question.points;
        correctAnswers++;
    }

    questionText.textContent = question.explanation || "No explanation provided.";
    questionContainer.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)' ;
    questionText.style.cssText = 'color: #fff; font-weight: bold;';
    isExplanationVisible = true;

    clearInterval(timerInterval);
    
    nextButton.style.display = "block";

    return isCorrect;
}

nextButton.addEventListener('click', () => {
    if (isExplanationVisible) {
    
        if (currentQuestionIndex < selectedQuiz.questions.length) {
            loadQuestion(); // Load the next question
            startQuizTimer(); // Restart the timer for the quiz
        } else {
            endQuiz();
        }
    }
});

function startQuizTimer() {
    timerElement.textContent = `${remainingTime}s`;

    timerInterval = setInterval(() => {
        remainingTime--;
        timerElement.textContent = `${remainingTime}s`;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            showCustomAlert("Time is UP!");
            endQuiz();
        }
    }, 1000);
}

function goToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuiz.questions.length) {
        loadQuestion();
    } else {
        const finalMessage = `Quiz completed! Good Job`;
        showCustomAlert(finalMessage);
        endQuiz();
    }
}

function showCustomAlert(message) {
    const alertModal = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    alertMessage.textContent = message;

    alertModal.style.display = "flex";

    document.getElementById('alert-ok-button').addEventListener('click', () => {
        alertModal.style.display = "none";
    });
}

function endQuiz() {
    clearInterval(timerInterval);

    // Calculate success percentage based on the correct answers
    const totalQuestions = selectedQuiz.questions.length;
    const successRate = Math.round((correctAnswers / totalQuestions) * 100);

    // results data
    document.querySelector('#final-score span').textContent = `${score} points`;
    document.querySelector('#correct-answers span').textContent = `${correctAnswers} / ${totalQuestions}`;
    document.querySelector('#success-rate span').textContent = `${successRate}%`;
    document.querySelector('#total-time span').textContent = `${selectedQuiz.estimatedTime - remainingTime} seconds`;

    // Hide the quiz container and show the results
    wholeContainer.style.display = "none";
    document.getElementById('results').style.display = "flex";

    const replayButton = document.getElementById('replay-button');
    replayButton.removeEventListener('click', resetQuiz); // Avoid adding multiple listeners
    replayButton.addEventListener('click', resetQuiz);
}

function resetQuiz() {
    // Reset quiz data
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    remainingTime = selectedQuiz.estimatedTime;

    document.getElementById('results').style.display = "none";
    wholeContainer.style.display = "block";

    loadQuestion();
    startQuizTimer();
}


nextButton.addEventListener('click', goToNextQuestion);

initializeQuiz();


