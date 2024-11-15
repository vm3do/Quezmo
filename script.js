const quizData = JSON.parse(localStorage.getItem('quizes'));

function quizes() {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    quizData.forEach((quiz) => {

        container.innerHTML += `
            <div class="card" id="${quiz.id}">
                <div class="title">
                    <p>${quiz.title}</p>
                </div>
                <div class="info">
                    <p class="qs-num">${quiz.questionsNum} questions</p>
                    <p class="qs-time">${quiz.estimatedTime} sec</p>
                    <p class="qs-level">${quiz.difficulty}</p>
                </div>
                <div>
                    <button class="btn" data-quiz="${quiz.id}">Play</button>
                </div>
            </div>
        `;
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const quizId = event.target.getAttribute('data-quiz');
            localStorage.setItem('selectedQuizId', JSON.stringify(quizId));
            window.location.href = 'quiz.html';
        });
    });
}

quizes();






