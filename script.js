const currentQuestionNo = document.querySelector("header div p:first-child span");
const currentScore =  document.querySelector("header div p:last-child span");

const currentQuestion = document.querySelector("section h2");
const answerOptions = document.querySelectorAll("section ul li");

const nextQuestionBtn = document.querySelector("section button");

const questionsDataObj = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctOption: "3"
    },
    {
        question: "What is 2 * 2?",
        options: ["4", "22", "44", "1"],
        correctOption: "4"
    },
    {
        question: "What is 2 + sin(0)?",
        options: ["2sin(0)", "1", "cos(0)", "2"],
        correctOption: "2"
    },
    {
        question: "What is the capital of India?",
        options: ["New Delhi", "Vietnam", "Bangalore", "Dholakpur"],
        correctOption: "New Delhi"
    },
    {
        question: "What is the full form of USB?",
        options: ["Unlimited Series Booking", "Universe See Bus", "Universal Serial Bus", "United States Bus"],
        correctOption: "Universal Serial Bus"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Hg", "Pb"],
        correctOption: "Au"
    },
    {
        question: "What is the largest mammal on Earth?",
        options: ["Blue whale", "Fin whale", "Humpback whale", "Sperm whale"],
        correctOption: "Blue whale"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara", "Gobi", "Mojave", "Atacama"],
        correctOption: "Sahara"
    },
    {
        question: "What is the integral of the function f(x) = x^2 + 1 from x = 0 to x = 2?",
        options: ["8/3", "10/3", "12/3", "14/3"],
        correctOption: "10/3"
    },
    {
        question: "What is the limit of the function f(x) = (2x - 3) / (x - 1) as x approaches 1?",
        options: ["2", "3", "4", "undefined"],
        correctOption: "2"
    }
];

let selectedOption = null;
let currentQuestionNoValue = 0;
let currentScoreValue = 0;

let isOptionSelected = false;


answerOptions.forEach(opt => {
    opt.addEventListener("click", () => {
        if(isOptionSelected) return; //If an option is selected, do nothing.

        selectedOption = opt;
        isOptionSelected = true;
        
        // Logic that handles the style on selected options and not selected ones
        if(opt.classList.contains("correct_answer")) {
            opt.style.outline = "2px solid green";
        } else {
            opt.style.outline = "2px solid red";
        }
        for(x of answerOptions) {
            x.disabled = true;
            x.style.cursor = "not-allowed";
        }
    })
})


nextQuestionBtn.addEventListener("click", (e) => {

    e.preventDefault();

    isOptionSelected = false;

    // Next Button should work only if an answer option is selected
    if(selectedOption === null) {
        return;
    }
    
    // Update Question No
    currentQuestionNoValue += 1;
    currentQuestionNo.innerText = currentQuestionNoValue + 1;
    
    // Update the score
    if(selectedOption.classList.contains("correct_answer")) {
        currentScoreValue += 10;
        currentScore.innerText = currentScoreValue;
    }

    // If there is no more questions do this
    console.log(currentQuestionNoValue, questionsDataObj.length)
    if(currentQuestionNoValue === questionsDataObj.length) {
        const containerParent = document.querySelector(".container");
        for(let child of containerParent.children) {
            containerParent.removeChild(child);
        }
        containerParent.innerHTML = `
            <h2>Final Score: ${currentScoreValue}/${questionsDataObj.length * 10}</h2>
            <button>Restart</button>
        `;
        
        containerParent.style.alignItems ="center";
        containerParent.style.justifyContent = "space-around";
        // Restart the quiz
        containerParent.children[1].addEventListener("click", event => {
            event.preventDefault();
            window.location.reload();
        })
        return;
    }

    // Load the next question
    currentQuestion.innerText = questionsDataObj[currentQuestionNoValue].question;
    console.log(currentQuestion.innerText);
    // Load the options and set the correct option
    for(let i = 0; i < 4; i++) {

        answerOptions[i].disabled = false;
        answerOptions[i].style.cursor = "auto";

        answerOptions[i].innerText = questionsDataObj[currentQuestionNoValue].options[i];
        
        answerOptions[i].style.outline = "";

        if(answerOptions[i].innerText === questionsDataObj[currentQuestionNoValue].correctOption) {
            answerOptions[i].classList.add("correct_answer");
        } else {
            answerOptions[i].classList.remove("correct_answer");
        }
    }

    console.log(answerOptions);

    // After loading the question/clicking next, clear the values 
    selectedOption = null;
})

