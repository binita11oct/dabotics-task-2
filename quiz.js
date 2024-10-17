const questions = [
    {
        question: "What does CPU stand for?",
        answers: ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Peripheral Unit"],
        correct: 0
    },
    {
        question: "Which language is primarily used for web development?",
        answers: ["Python", "Java", "HTML", "C++"],
        correct: 2
    },
    {
        question: "What is the main function of RAM?",
        answers: ["Store data permanently", "Temporary data storage", "Run applications", "Manage input devices"],
        correct: 1
    },
    {
        question: "Which company developed the Windows operating system?",
        answers: ["Apple", "IBM", "Microsoft", "Google"],
        correct: 2
    },
    {
        question: "What does HTTP stand for?",
        answers: ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "HighText Transfer Protocol", "HyperText Transport Protocol"],
        correct: 0
    },
    {
        question: "What is the most widely used operating system in the world?",
        answers: ["Windows", "Linux", "MacOS", "Android"],
        correct: 0
    },
    {
        question: "What is an IP address?",
        answers: ["Internet Protocol address", "Internet Process address", "Internal Protocol address", "Internal Process address"],
        correct: 0
    },
    {
        question: "What does GUI stand for?",
        answers: ["Graphical User Interface", "Graphical Unified Interface", "General User Interface", "Global User Interface"],
        correct: 0
    },
    {
        question: "Which of the following is a type of malware?",
        answers: ["Antivirus", "Spyware", "Firewall", "Router"],
        correct: 1
    },
    {
        question: "What does SSD stand for?",
        answers: ["Solid State Drive", "Standard State Drive", "Super Speed Drive", "Solid Speed Drive"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
const threshold = 3;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const resultMessage = document.getElementById('result-message');
const giftMessage = document.getElementById('gift-message');
const restartButton = document.getElementById('restart-button');
const celebration = document.getElementById('celebration');

function startQuiz() 
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    resultElement.classList.add('hidden');
    celebration.classList.add('hidden');
    showQuestion();
}

function showQuestion() 
{
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index, button));
        answersElement.appendChild(button);
    });
}

function selectAnswer(selectedIndex, button) 
{
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;

    button.classList.add('selected');

    if (selectedIndex === correctIndex) 
        {
        score++;
        button.classList.add('correct');
        showCelebration(); 
    } 
    else 
    {
       
        answersElement.querySelectorAll('button')[correctIndex].classList.add('correct');
        button.classList.add('wrong');
    }

    nextButton.classList.remove('hidden');
}

function showCelebration() {
    celebration.classList.remove('hidden');
    celebration.style.display = "block"; 
    celebration.textContent = "🎉 Awesome! 🎉"; 
    setTimeout(() => {
        celebration.style.display = "none"; 
    }, 2000);
}


nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) 
        {
        showQuestion();
        nextButton.classList.add('hidden');
    } 
    else 
    {
        showResult();
    }
});

function showResult() 
{
    questionElement.classList.add('hidden');
    answersElement.classList.add('hidden');
    nextButton.classList.add('hidden');
    resultElement.classList.remove('hidden');

    resultMessage.textContent = score >= threshold ? "Congratulations, you win!" : "Sorry, you lose.";
    giftMessage.textContent = score >= threshold ? "🎉 Here's a special gift for you!" : "😢 Better luck next time!";
}

restartButton.addEventListener('click', startQuiz);

startQuiz();
