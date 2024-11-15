// const quizData = [
//     {
//         "id": "quiz1",
//         "title": "General Knowledge",
//         "questionsNum": 10,
//         "estimatedTime": 20,
//         "difficulty": "Easy",
//         "questions": [
//             {
//                 "type": "mcq",
//                 "text": "What is the capital of France?",
//                 "options": ["Paris", "Rome", "Berlin", "Madrid"],
//                 "answer": "Paris",
//                 "time": 15,
//                 "points": 10
//             },
//             {
//                 "type": "boolean",
//                 "text": "The sky is blue.",
//                 "answer": "True",
//                 "time": 10,
//                 "points": 5
//             },
//             {
//                 "type": "text",
//                 "text": "Who wrote 'Hamlet'?",
//                 "answer": "William Shakespeare",
//                 "time": 20,
//                 "points": 15
//             },
//             {
//                 "type": "mcq",
//                 "text": "Which planet is known as the Red Planet?",
//                 "options": ["Earth", "Mars", "Jupiter", "Saturn"],
//                 "answer": "Mars",
//                 "time": 12,
//                 "points": 10
//             },
//             {
//                 "type": "mcq",
//                 "text": "Which hjh is knowsdfn as the sdfRed Planet?",
//                 "options": ["Earth", "Mars", "Jupiter", "Saturn"],
//                 "answer": "Earth",
//                 "time": 12,
//                 "points": 10
//             }
//         ]
//     },
//     {
//         "id": "quiz2",
//         "title": "Math Quiz",
//         "questionsNum": 5,
//         "estimatedTime": 100,
//         "difficulty": "Medium",
//         "questions": [
//             {
//                 "type": "mcq",
//                 "text": "What is 5 + 3?",
//                 "options": ["5", "6", "7", "8"],
//                 "answer": "8",
//                 "time": 10,
//                 "points": 10
//             },
//             {
//                 "type": "boolean",
//                 "text": "Is 10 a prime number?",
//                 "answer": "False",
//                 "time": 8,
//                 "points": 5
//             },
//             {
//                 "type": "text",
//                 "text": "What is the square root of 64?",
//                 "answer": "8",
//                 "time": 15,
//                 "points": 10
//             },
//             {
//                 "type": "mcq",
//                 "text": "Which is the smallest prime number?",
//                 "options": ["0", "1", "2", "3"],
//                 "answer": "2",
//                 "time": 12,
//                 "points": 10
//             },
//             {
//                 "type": "boolean",
//                 "text": "Is 7 a prime number?",
//                 "answer": "True",
//                 "time": 8,
//                 "points": 5
//             }
//         ]
//     },
//     {
//         "id": "quiz3",
//         "title": "Science Quiz",
//         "questionsNum": 8,
//         "estimatedTime": 120,
//         "difficulty": "Hard",
//         "questions": [
//             {
//                 "type": "mcq",
//                 "text": "What is H2O commonly known as?",
//                 "options": ["Oxygen", "Hydrogen", "Water", "Salt"],
//                 "answer": "Water",
//                 "time": 10,
//                 "points": 10
//             },
//             {
//                 "type": "boolean",
//                 "text": "The Earth is flat.",
//                 "answer": "False",
//                 "time": 5,
//                 "points": 5
//             },
//             {
//                 "type": "text",
//                 "text": "What planet is known as the Earth's twin?",
//                 "answer": "Venus",
//                 "time": 15,
//                 "points": 15
//             },
//             {
//                 "type": "mcq",
//                 "text": "Which gas is most abundant in the Earth's atmosphere?",
//                 "options": ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
//                 "answer": "Nitrogen",
//                 "time": 10,
//                 "points": 10
//             }
//         ]
//     }
// ]

//////////////////////////////
/////////////////////////////
////////////////////////////
const quizes = JSON.parse(localStorage.getItem('quizes'));
const selectedQuizId = JSON.parse(localStorage.getItem('selectedQuizId'));

const selectedQuiz = quizes.find(quiz => quiz.id === selectedQuizId);

let currentQuestionIndex = 0;
let score = 0;
let timerInterval; // Variable to store the timer interval
let remainingTime = selectedQuiz.estimatedTime; // Total time for the quiz
let isExplanationVisible = false;

// Target necessary HTML elements
const wholeContainer = document.querySelector('.qs-container');
const questionContainer = document.querySelector('.qsbox');
const questionText = document.querySelector('.qsbox p'); // For question text
const optionsContainer = document.querySelector('div #mcq'); // For answer options (MCQ)
const booleanContainer = document.querySelector('div #boolean'); // For answer options (Boolean)
const textContainer = document.querySelector('.qs-answer'); // For text answer input
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const questionNumberElement = document.getElementById('question-number');
const nextButton = document.querySelector('.next-btn'); // Next button
const progressBarFill = document.querySelector('.fill');

// Initialize the quiz and start the timer
function initializeQuiz() {
    loadQuestion();
    startQuizTimer(); // Start the timer for the entire quiz
}

// Load the current question
function loadQuestion() {
    const question = selectedQuiz.questions[currentQuestionIndex];

    questionContainer.style.background = "";
    questionText.style.cssText = "";
    
    // Set question text, question number, and timer
    questionText.textContent = question.text;
    isExplanationVisible = false; // Reset explanation visibility
    nextButton.style.display = "none"; 
    questionNumberElement.textContent = `${currentQuestionIndex + 1}/${selectedQuiz.questions.length}`;
    
    // Update score display
    scoreElement.textContent = `${score} points`;

    // Clear previous options and text input
    optionsContainer.innerHTML = "";
    booleanContainer.innerHTML = "";
    textContainer.innerHTML = "";

    // Display options based on question type
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

                // Apply the correct or incorrect style
                optionElement.style.backgroundColor = isCorrect ? '#07bf82' : '#f32e2e'

                // Disable further clicks
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

                // Apply the correct or incorrect style
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

            // Apply the background color based on correctness
            const textInput = document.querySelector('#text-input');
            textInput.style.backgroundColor = isCorrect ? '#07bf82' : '#f32e2e';

            // Disable further submissions
            textInput.disabled = true
            submitButton.disabled = true;
        });
    
    }

    updateProgressBar();
}

// Start the countdown timer for the entire quiz
function startQuizTimer() {
    timerElement.textContent = `${remainingTime}s`; // Set initial time display

    timerInterval = setInterval(() => {
        remainingTime--;
        timerElement.textContent = `${remainingTime}s`;
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            const finalMessage = `Time is UP`;
            showCustomAlert(finalMessage);

            endQuiz(); // End the quiz if time runs out
        }
    }, 1000);
}

function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
}

// Check the answer, update score if correct, and return correctness
let correctAnswers = 0; // New counter to track correct answers

function checkAnswer(selectedOption) {
    const question = selectedQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedOption === question.answer;

    // Update score and correct answers count if the answer is correct
    if (isCorrect) {
        score += question.points;
        correctAnswers++;
    }

    // Display the explanation in the question text holder
    questionText.textContent = question.explanation || "No explanation provided.";
    questionContainer.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)' ;
    questionText.style.cssText = 'color: #fff; font-weight: bold;';
    isExplanationVisible = true; // Set the explanation visibility flag

    // Stop the timer while the explanation is visible
    clearInterval(timerInterval);
    
    // Show the next button to allow the user to proceed
    nextButton.style.display = "block";

    return isCorrect;
}

nextButton.addEventListener('click', () => {
    if (isExplanationVisible) {
    
        if (currentQuestionIndex < selectedQuiz.questions.length) {
            loadQuestion(); // Load the next question
            startQuizTimer(); // Restart the timer for the quiz
        } else {
            endQuiz(); // End the quiz if no more questions remain
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
            showCustomAlert("Time is UP!"); // Show alert message if time runs out
            endQuiz();
        }
    }, 1000);
}

// Function to handle going to the next question
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

    // Set the custom message
    alertMessage.textContent = message;

    // Show the modal
    alertModal.style.display = "flex";

    // Add event listener to close the modal
    document.getElementById('alert-ok-button').addEventListener('click', () => {
        alertModal.style.display = "none";
    });
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval); // Stop the timer

    // Calculate success percentage based on the correct answers
    const totalQuestions = selectedQuiz.questions.length;
    const successRate = Math.round((correctAnswers / totalQuestions) * 100);

    // Populate results data
    document.querySelector('#final-score span').textContent = `${score} points`;
    document.querySelector('#correct-answers span').textContent = `${correctAnswers} / ${totalQuestions}`;
    document.querySelector('#success-rate span').textContent = `${successRate}%`;
    document.querySelector('#total-time span').textContent = `${selectedQuiz.estimatedTime - remainingTime} seconds`;

    // Hide the quiz container and show the results
    wholeContainer.style.display = "none";
    document.getElementById('results').style.display = "flex";

    // Set up replay button
    const replayButton = document.getElementById('replay-button');
    replayButton.removeEventListener('click', resetQuiz); // Avoid adding multiple listeners
    replayButton.addEventListener('click', resetQuiz);
}

function resetQuiz() {
    // Reset quiz data
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0; // Reset correct answers counter
    remainingTime = selectedQuiz.estimatedTime;

    // Hide results and show quiz container
    document.getElementById('results').style.display = "none";
    wholeContainer.style.display = "block";

    // Restart quiz
    loadQuestion();
    startQuizTimer();
}


// Add an event listener for the Next Button once
nextButton.addEventListener('click', goToNextQuestion);

// Start the quiz on page load
initializeQuiz();


