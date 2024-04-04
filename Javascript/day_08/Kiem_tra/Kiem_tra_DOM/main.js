const quizes = [
    {
        id: 1,
        question: "1 + 1 = ?",
        answers: [1, 2, 3, 4],
    },
    {
        id: 2,
        question: "2 + 2 = ?",
        answers: [2, 3, 4, 5],
    },
    {
        id: 3,
        question: "3 + 3 = ?",
        answers: [3, 4, 5, 6],
    },
];
const quizCotainter= document.querySelector(".quiz-container")
const btnRandom = document.getElementById("btn");
btnRandom.addEventListener("click", ()=>{
    quizes.forEach((quiz,index) =>{
        const randomBtn = document.querySelectorAll(`.quiz-answer-item input[name="${quiz.id}"]`);
        console.log(randomBtn)
        const randomIndex = Math.floor(Math.random() * randomBtn.length);
        randomBtn[randomIndex].checked = true;
    })
})

const renderQuizes =(quizes)=>{
     let quizHtml =""
    quizes.forEach(quiz=>{
        let answerHtml=""
     quiz.answers.forEach((answer,index)=> {
        answerHtml+=`
        <div class="quiz-answer-item">
        <input type="radio" name="${quiz.id}" id="${quiz.id}">
        <label id="${quiz.id}">${answer}</label>
        </div>`
     });
        quizHtml+=`
        <div class="quiz-item">
            <h3>Câu ${quiz.id} : ${quiz.question}</h3>
            <div class="quiz-answer">
                ${answerHtml}
                </div>
            </div>
        </div>
        `
        quizCotainter.innerHTML=quizHtml
     })
}
renderQuizes(quizes)


