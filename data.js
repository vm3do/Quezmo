const quizzData = [
    {
        "id": "quiz1",
        "title": "General Knowledge",
        "questionsNum": 5,
        "estimatedTime": 30,
        "difficulty": "Easy",
        "questions": [
            {
                "type": "mcq",
                "text": "What is the capital of France?",
                "options": ["Paris", "Rome", "Berlin", "Madrid"],
                "answer": "Paris",
                "explanation": "Paris is the capital and largest city of France, known for its art, fashion, and culture.",
                "time": 15,
                "points": 10
            },
            {
                "type": "boolean",
                "text": "The Earth is round.",
                "answer": "True",
                "explanation": "The Earth is roughly spherical, confirmed by space exploration and scientific observation.",
                "time": 10,
                "points": 5
            },
            {
                "type": "text",
                "text": "Who wrote 'Hamlet'?",
                "answer": "William Shakespeare",
                "explanation": "'Hamlet' is a famous tragedy written by William Shakespeare.",
                "time": 20,
                "points": 15
            },
            {
                "type": "mcq",
                "text": "Which planet is known as the Red Planet?",
                "options": ["Earth", "Mars", "Jupiter", "Saturn"],
                "answer": "Mars",
                "explanation": "Mars appears red due to iron oxide on its surface.",
                "time": 12,
                "points": 10
            },
            {
                "type": "mcq",
                "text": "Which ocean is the largest?",
                "options": ["Atlantic", "Indian", "Arctic", "Pacific"],
                "answer": "Pacific",
                "explanation": "The Pacific Ocean is the largest and deepest ocean on Earth.",
                "time": 15,
                "points": 10
            }
        ]
    },
    {
        "id": "quiz2",
        "title": "Math Quiz",
        "questionsNum": 5,
        "estimatedTime": 45,
        "difficulty": "Medium",
        "questions": [
            {
                "type": "mcq",
                "text": "What is 7 + 8?",
                "options": ["14", "15", "16", "13"],
                "answer": "15",
                "explanation": "7 plus 8 equals 15. Basic addition.",
                "time": 10,
                "points": 10
            },
            {
                "type": "boolean",
                "text": "The number 5 is a prime number.",
                "answer": "True",
                "explanation": "A prime number has only two divisors: 1 and itself. 5 is prime.",
                "time": 8,
                "points": 5
            },
            {
                "type": "text",
                "text": "What is the square root of 64?",
                "answer": "8",
                "explanation": "8 x 8 equals 64, so the square root of 64 is 8.",
                "time": 15,
                "points": 10
            },
            {
                "type": "mcq",
                "text": "Which is the smallest prime number?",
                "options": ["0", "1", "2", "3"],
                "answer": "2",
                "explanation": "2 is the smallest prime, divisible only by 1 and itself.",
                "time": 12,
                "points": 10
            },
            {
                "type": "boolean",
                "text": "Is 100 an even number?",
                "answer": "True",
                "explanation": "100 is even because it’s divisible by 2.",
                "time": 5,
                "points": 5
            }
        ]
    },
    {
        "id": "quiz3",
        "title": "Science Quiz",
        "questionsNum": 5,
        "estimatedTime": 60,
        "difficulty": "Hard",
        "questions": [
            {
                "type": "mcq",
                "text": "What is H2O commonly known as?",
                "options": ["Oxygen", "Hydrogen", "Water", "Salt"],
                "answer": "Water",
                "explanation": "H2O is the chemical formula for water.",
                "time": 10,
                "points": 10
            },
            {
                "type": "boolean",
                "text": "The Earth revolves around the Sun.",
                "answer": "True",
                "explanation": "Earth orbits the Sun due to gravity.",
                "time": 10,
                "points": 5
            },
            {
                "type": "text",
                "text": "What is the powerhouse of the cell?",
                "answer": "Mitochondria",
                "explanation": "Mitochondria generate energy for the cell, hence called the powerhouse.",
                "time": 15,
                "points": 15
            },
            {
                "type": "mcq",
                "text": "Which planet is known as Earth’s twin?",
                "options": ["Mars", "Venus", "Jupiter", "Mercury"],
                "answer": "Venus",
                "explanation": "Venus is called Earth’s twin because of its similar size and proximity.",
                "time": 12,
                "points": 10
            },
            {
                "type": "mcq",
                "text": "Which element has atomic number 1?",
                "options": ["Helium", "Oxygen", "Hydrogen", "Nitrogen"],
                "answer": "Hydrogen",
                "explanation": "Hydrogen has an atomic number of 1 and is the first element.",
                "time": 8,
                "points": 10
            }
        ]
    },
    {
        "id": "quiz4",
        "title": "History Quiz",
        "questionsNum": 5,
        "estimatedTime": 50,
        "difficulty": "Medium",
        "questions": [
            {
                "type": "mcq",
                "text": "Who was the first President of the United States?",
                "options": ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"],
                "answer": "George Washington",
                "explanation": "George Washington was the first President of the United States, serving from 1789 to 1797.",
                "time": 12,
                "points": 10
            },
            {
                "type": "boolean",
                "text": "The Roman Empire fell in 476 AD.",
                "answer": "True",
                "explanation": "The traditional date for the fall of the Roman Empire is 476 AD.",
                "time": 8,
                "points": 5
            },
            {
                "type": "text",
                "text": "Who discovered America?",
                "answer": "Christopher Columbus",
                "explanation": "In 1492, Christopher Columbus landed in the Americas, marking European awareness of the continent.",
                "time": 20,
                "points": 15
            },
            {
                "type": "mcq",
                "text": "Where did the Renaissance begin?",
                "options": ["France", "Italy", "England", "Spain"],
                "answer": "Italy",
                "explanation": "The Renaissance, a period of renewed interest in art and learning, began in Italy in the 14th century.",
                "time": 15,
                "points": 10
            },
            {
                "type": "mcq",
                "text": "Who was known as the 'Maid of Orléans'?",
                "options": ["Marie Curie", "Joan of Arc", "Eleanor of Aquitaine", "Catherine de' Medici"],
                "answer": "Joan of Arc",
                "explanation": "Joan of Arc, a French heroine, is often referred to as the 'Maid of Orléans'.",
                "time": 10,
                "points": 10
            }
        ]
    },
    {
        "id": "quiz5",
        "title": "Geography Quiz",
        "questionsNum": 5,
        "estimatedTime": 40,
        "difficulty": "Easy",
        "questions": [
            {
                "type": "mcq",
                "text": "Which is the largest continent?",
                "options": ["Africa", "Asia", "Europe", "Antarctica"],
                "answer": "Asia",
                "explanation": "Asia is the largest continent by both area and population.",
                "time": 10,
                "points": 10
            },
            {
                "type": "boolean",
                "text": "Australia is a continent and a country.",
                "answer": "True",
                "explanation": "Australia is both a continent and a country, known for its unique biodiversity.",
                "time": 8,
                "points": 5
            },
            {
                "type": "text",
                "text": "Which country has the most people?",
                "answer": "China",
                "explanation": "China has the highest population in the world, followed by India.",
                "time": 15,
                "points": 10
            },
            {
                "type": "mcq",
                "text": "Which desert is the largest?",
                "options": ["Sahara", "Gobi", "Kalahari", "Arabian"],
                "answer": "Sahara",
                "explanation": "The Sahara is the largest hot desert, covering much of North Africa.",
                "time": 12,
                "points": 10
            },
            {
                "type": "mcq",
                "text": "Which country has the largest area?",
                "options": ["USA", "China", "Russia", "Canada"],
                "answer": "Russia",
                "explanation": "Russia is the largest country in the world by land area.",
                "time": 15,
                "points": 10
            }
        ]
    }
];

localStorage.setItem("quizes", JSON.stringify(quizzData));