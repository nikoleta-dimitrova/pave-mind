export let questionsArray = [
    {
        questionText: "I feel emotionally drained from my work.",
        answer: undefined,
        category: 1,
        id: 1
    },
    {
        questionText: "I feel used up at the end of the workday.",
        answer: undefined,
        category: 1,
        id: 2
    },
    {
        questionText: "I feel tired when I get up in the morning and have to face another day on the job.",
        answer: undefined,
        category: 1,
        id: 3
    },
    {
        questionText: "Working all day is really a strain for me.",
        answer: undefined,
        category: 1,
        id: 4
    },
    {
        questionText: "I feel burned out from my work.",
        answer: undefined,
        category: 1,
        id: 5
    },
    {
        questionText: "I can effectively solve the problems that arise in my work.",
        answer: undefined,
        category: 2,
        id: 6
    },
    {
        questionText: "I feel I am making an effective contribution to what this organization does.",
        answer: undefined,
        category: 2,
        id: 7
    },
    {
        questionText: "In my opinion, I am good at my job.",
        answer: undefined,
        category: 2,
        id: 8
    },
    {
        questionText: "I feel exhilarated when I accomplish something at work.",
        answer: undefined,
        category: 2,
        id: 9
    },
    {
        questionText: "I have accomplished many worthwhile things in this job.",
        answer: undefined,
        category: 2,
        id: 10
    },
    {
        questionText: "At my work, I feel confident that I am effective at getting things done.",
        answer: undefined,
        category: 2,
        id: 11
    },
    {
        questionText: "I have become less interested in my work since I started this job.",
        answer: undefined,
        category: 3,
        id: 12
    },
    {
        questionText: "I have become less enthusiastic about my work.",
        answer: undefined,
        category: 3,
        id: 13
    },
    {
        questionText: "I just want to do my job and not be bothered.",
        answer: undefined,
        category: 3,
        id: 14
    },
    {
        questionText: "I have become more cynical about whether my work contributes anything.",
        answer: undefined,
        category: 3,
        id: 15
    },
    {
        questionText: "I doubt the significance of my work.",
        answer: undefined,
        category: 3,
        id: 16
    },
]

export let resultArray = [
    {
        category: 1,
        result: 0
    },
    {
        category: 2,
        result: 0
    },
    {
        category: 3,
        result: 0
    }
]

export function answerQuestion(question) {
    const answeredQuestion = questionsArray.find(q => q.id === question.id);

    answeredQuestion.answer = question.answer;
}

export function submitForm() {
    try {
        validateForm();
        const questionArrayCat1 = questionsArray.filter(question => question.category === 1);
        const questionArrayCat2 = questionsArray.filter(question => question.category === 2);
        const questionArrayCat3 = questionsArray.filter(question => question.category === 3);

        calculateResult(questionArrayCat1);
        calculateResult(questionArrayCat2);
        calculateResult(questionArrayCat3);
    } catch (error) {
        console.log(error);
    }
}

export function validateForm() {
    questionsArray.forEach(question => {
        if (!question.answer) {
            throw new Error("question with id " + question.id + " not answered");
        }
    })
}

export function calculateResult(questionArrayCat) {
    let foundResultCategory = resultArray.find(result => result.category === questionArrayCat[0].category);
    questionArrayCat.forEach(question => {
        foundResultCategory.result += question.answer*1 
    })
}

export function resetResult() {
    resultArray.forEach(result => result.result = 0);
}