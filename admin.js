
const quizes = JSON.parse(localStorage.getItem('quizes')); 
const selectedQuizId = JSON.parse(localStorage.getItem('selectedQuizId'));


document.querySelector('#create-quiz .btn-submit').addEventListener('click', (e) => {
    e.preventDefault();

    const title = document.getElementById('quiz-title').value.trim();
    const description = document.getElementById('quiz-description').value.trim();
    const difficulty = document.getElementById('quiz-difficulty').value.trim();
    const estimatedTime = parseInt(document.getElementById('estimated-time').value.trim(), 10);

    if (!title || !difficulty || estimatedTime <= 0) {
        alert('Please fill in all required fields with valid data.');
        return;
    }

    const quizes = JSON.parse(localStorage.getItem('quizes')) || [];
    const newQuiz = {
        id: `quiz-${Date.now()}`,
        title,
        description,
        difficulty,
        estimatedTime,
        questionsNum: 0,
        questions: [],
    };

    quizes.push(newQuiz);
    localStorage.setItem('quizes', JSON.stringify(quizes));

    alert('Quiz created successfully!');
    document.querySelector('#create-quiz .form').reset();

    populateQuizDropdown();
});


function loadQuizzes() {
    const quizes = JSON.parse(localStorage.getItem('quizes')) || [];
    const tableBody = document.querySelector('#quiz-management .table tbody');

    tableBody.innerHTML = '';

    quizes.forEach(quiz => {

        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${quiz.title}</td>
            <td>${quiz.difficulty}</td>
            <td>${quiz.questionsNum}</td>
            <td>
                <button class="btn-edit" data-id="${quiz.id}">Edit</button>
                <button class="btn-delete" data-id="${quiz.id}">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

}

document.addEventListener('DOMContentLoaded', loadQuizzes);

/////////////////////////////////////////
////////////////////////////////////////




document.querySelector('#create-questions .btn-submit').addEventListener('click', (e) => {
    e.preventDefault();

    //selected quiz from the dropdown
    const selectedQuizId = document.getElementById('select-quiz').value;

    if (!selectedQuizId) {
        alert('Please select a quiz from the dropdown.');
        return;
    }

    const quizes = JSON.parse(localStorage.getItem('quizes')) || [];
    const quiz = quizes.find(q => q.id === selectedQuizId);

    if (!quiz) {
        alert('Quiz not found. Please select a valid quiz.');
        return;
    }

    const questionType = document.getElementById('question-type').value.trim();
    const questionText = document.getElementById('question-text').value.trim();
    const points = parseInt(document.getElementById('question-points').value.trim(), 10);
    const explanation = document.getElementById('question-explanation').value.trim();

    let newQuestion = { type: questionType, text: questionText, points, explanation };

    
    if (questionType === 'mcq') {
        const options = Array.from(document.querySelectorAll('#mcq-options input'))
            .map(input => input.value.trim())
            .filter(option => option);
        const correctAnswer = document.querySelector('#mcq-options input[placeholder="Correct Answer"]').value.trim();

        if (options.length < 2 || !correctAnswer) {
            alert('Please provide at least 2 options and a correct answer for MCQ.');
            return;
        }

        newQuestion.options = options;
        newQuestion.answer = correctAnswer;
    } else if (questionType === 'boolean') {
        newQuestion.answer = document.querySelector('#boolean-options select').value;
    } else if (questionType === 'text') {
        const acceptedAnswers = document.querySelector('#text-options textarea').value
            .split('\n')
            .map(answer => answer.trim())
            .filter(answer => answer);

        if (!acceptedAnswers.length) {
            alert('Please provide at least one accepted answer.');
            return;
        }

        newQuestion.answer = acceptedAnswers;
    }

    quiz.questions.push(newQuestion);
    quiz.questionsNum = quiz.questions.length;

    localStorage.setItem('quizes', JSON.stringify(quizes));

    alert('Question added successfully!');
    document.querySelector('#create-questions .form').reset();
});


function toggleQuestionInputs() {
    const questionType = document.getElementById('question-type').value;
    const mcqOptions = document.getElementById('mcq-options');
    const booleanOptions = document.getElementById('boolean-options');
    const textOptions = document.getElementById('text-options');

    mcqOptions.classList.add('hidden');
    booleanOptions.classList.add('hidden');
    textOptions.classList.add('hidden');

    if (questionType === 'mcq') {
        mcqOptions.classList.remove('hidden');
    } else if (questionType === 'boolean') {
        booleanOptions.classList.remove('hidden');
    } else if (questionType === 'text') {
        textOptions.classList.remove('hidden');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const questionTypeSelect = document.getElementById('question-type');

    questionTypeSelect.addEventListener('change', (e) => {

        questionTypeSelect.classList.remove('mcq', 'boolean', 'text');

        switch (e.target.value) {
            case 'mcq':
                questionTypeSelect.classList.add('mcq');
                break;
            case 'boolean':
                questionTypeSelect.classList.add('boolean');
                break;
            case 'text':
                questionTypeSelect.classList.add('text');
                break;
        }
    });
});


document.getElementById('question-type').addEventListener('change', toggleQuestionInputs);

document.addEventListener('DOMContentLoaded', toggleQuestionInputs);




function populateQuizDropdown() {
    const quizDropdown = document.getElementById('select-quiz');
    const quizes = JSON.parse(localStorage.getItem('quizes')) || [];

    quizDropdown.innerHTML = '<option value="">Select a quiz</option>';

    quizes.forEach(quiz => {
        const option = document.createElement('option');
        option.value = quiz.id;
        option.textContent = `${quiz.title} (${quiz.difficulty})`;
        quizDropdown.appendChild(option);
    });

    if (!quizes.length) {
        const noQuizOption = document.createElement('option');
        noQuizOption.value = "";
        noQuizOption.textContent = "No quizzes available";
        quizDropdown.appendChild(noQuizOption);
    }
}

document.addEventListener('DOMContentLoaded', populateQuizDropdown);

