import * as questionService from "./questions.service.js";

const questionsFormContainer = document.querySelector("#questionContainer");

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
        const resultsArrayContainer = document.createElement("div");
            resultContainer = document.createElement("p");
            if (questionService.resultArray[0].result > 17 || questionService.resultArray[2].result > 17 || questionService.resultArray[1].result < 22) {
            resultContainer.innerText = `Result for category burnout`
            resultsArrayContainer.appendChild(resultContainer);
        } else  {
            resultContainer.innerText = `Result for category no burnout`
            resultsArrayContainer.appendChild(resultContainer);
        }
        questionsFormContainer.appendChild(resultsArrayContainer);
    }

    submitButton.innerText = "Submit";

    return submitButton;
}

createQuestionsForm();