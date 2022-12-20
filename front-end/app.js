import * as questionService from "./questions.service.js";

const questionsFormContainer = document.querySelector("#questionContainer");
let popUpVisible = false;
const popup = document.getElementById("popup-blur");
const closePopup = document.getElementById("community-popup-close");
const popUpContent = document.querySelector(".home-popup-content");


export function createQuestionsForm() {
    const questionsContainer = createQuestion();
    const submitButton = createSubmitButton();
    questionsFormContainer.appendChild(questionsContainer);
    questionsFormContainer.appendChild(submitButton);
}

export function createRadioButton(value, question) {
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = question.id;
    radioButton.value = value + 1;
    radioButton.onclick = () => {
        question.answer = radioButton.value
        questionService.answerQuestion(question);
    };
    radioButton.id = "test-button-radio";

    return radioButton;
}
export function createQuestion() {
    const questionsContainer = document.createElement("div");
    questionsContainer.id = "test-question-body";
    questionService.questionsArray.forEach(question => {

        const questionText = document.createElement("p");
        questionText.id = "test-questions-text";
        questionText.innerHTML = question.questionText;

        const radioButtonsContainer = document.createElement("div");
        radioButtonsContainer.id = "test-button-radio-container";
        for (let i = 0; i < 7; i++) {
            const radioButton = createRadioButton(i, question);
            radioButtonsContainer.appendChild(radioButton)
        }

        const questionContainer = document.createElement("div");
        questionContainer.id = "test-questions-container";
        // questionContainer.id = question.id;
        questionContainer.appendChild(questionText);
        questionContainer.appendChild(radioButtonsContainer);
        questionsContainer.appendChild(questionContainer);
    })

    return questionsContainer
}

export const togglePopup = () => {
    popUpVisible = !popUpVisible;
    if (popUpVisible) {
        popup.style.display = "block";
    }
    else {
        popup.style.display = "none";
    }
}

export function createSubmitButton() {
    const submitButton = document.createElement("button");
    submitButton.classList.add("primary-button");
    submitButton.id = "test-button-submit";

    submitButton.onclick = () => {
        questionService.submitForm();
        let resultContainer = document.querySelector("#resultContainer");
        if (resultContainer) {
            resultContainer.remove()
        }
        let buttonResult = document.querySelector("#resultContainer");
        if (buttonResult) {
            buttonResult.remove()
        }

        const resultsArrayContainer = document.createElement("div");
        resultContainer = document.createElement("p");
        resultContainer.classList.add("submit-popup-text");
        buttonResult = document.createElement("a");
        buttonResult.classList.add("tips-read-more");
        buttonResult.id = "test-button-result-navigation";
        const forwardArrow = document.createElement("span");
        forwardArrow.classList.add('home-big-btn-arrow');
        forwardArrow.setAttribute('id', 'home-articles-arrow');

        const popupImg = document.createElement('img');
        popupImg.src = "./Assets/Images/wave-popup-blue.svg";
        popupImg.classList.add("home-popup-wave");

        if (questionService.resultArray[0].result > 17 || questionService.resultArray[2].result > 17 || questionService.resultArray[1].result < 22) {
            resultContainer.innerText = "You may have burnout. If you feel that stress is affecting your life or you suspect you may be undergoing burnout, do not delay speaking to a health-care professional. Only a psychologist or therapist can make a reliable diagnosis of burnout. Need more help?";
            resultsArrayContainer.appendChild(resultContainer);
            buttonResult.innerHTML = "Go to Tips&Tricks";
            buttonResult.href = "./tips-and-tricks.html"
            resultsArrayContainer.appendChild(buttonResult);
        } else {
            resultContainer.innerText = "You may not have burnout. If you feel that stress is affecting your life or you suspect you may be undergoing burnout, do not delay speaking to a health-care professional. Only a psychologist or therapist can make a reliable diagnosis of burnout. Still want to keep yourself informed?";
            resultsArrayContainer.appendChild(resultContainer);
            buttonResult.innerHTML = "Go to Articles";
            buttonResult.href = "./articles.html"
            resultsArrayContainer.appendChild(buttonResult);
        }
        togglePopup()
        resultsArrayContainer.appendChild(forwardArrow)
        popUpContent.innerHTML = "";
        popUpContent.append(popupImg, resultsArrayContainer);

        questionService.resultArray[0].result = 0;
        questionService.resultArray[1].result = 0;
        questionService.resultArray[2].result = 0;
    }

    submitButton.innerText = "Submit";

    return submitButton;
}

createQuestionsForm();
closePopup.addEventListener('click', togglePopup)