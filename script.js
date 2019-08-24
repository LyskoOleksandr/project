const button = document.getElementById('button');
const yourName = document.getElementById('yourName');
const question = document.getElementById('yourQuestion');
const answerP = document.getElementById('answer');
const maPrevs = document.getElementById('prevs');
const image = document.getElementById('image');
const table = document.getElementById('results');
let prevResults = [];
let prevAnswer = {};

let ball = {};
ball.allAnswers = ["It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes, definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."];

ball.getAnswer = function (question) {
    let randNum = Math.random();
    let randAnswer = Math.floor(randNum * this.allAnswers.length);
    let answer = this.allAnswers[randAnswer];
    answerP.innerHTML = answer;
}

button.addEventListener('click', function () {
    prevResults.length = 0;
    removeClasses();
    setTimeout(() => {
        image.classList.remove('rotation');    
    }, 2000);

    if (yourName.value !== '' && question.value !== '') {
        ball.randElems(question);
        showprev();
        yourName.value = '';
        question.value = '';
        question.placeholder = 'Your Question';
        yourName.placeholder = 'Your Name';
        console.log(prevResults);
        answerElems(prevResults);
    } else {
        yourName.classList.add('error');
        question.classList.add('error');
        yourName.placeholder = 'Enter Your Name!';
        question.placeholder = 'Enter Your Question!';


    }

})

function removeClasses() {
    question.classList.remove('error');
    yourName.classList.remove('error');
}

ball.randElems = function () {
    image.classList.add('rotation');
    let array = [];
    for (let i = 0; i < 7; i++) {
        ball.getAnswer(question);
        array[i] = answerP.innerHTML;
        prevResults.push(array[i]);
    }
    let  x = array.length - +1;
    prevAnswer = array[x];
}

function showprev() {
    let htmlResult = document.createElement('tr');
    htmlResult.innerHTML = `<td class="nameth">${yourName.value}</td>
    <td class="questionth">${question.value}</td>
    <td class="answerth">${prevAnswer}</td>`;
    table.append(htmlResult);
}

function answerElems(arr){
    let i = 0;
    let timerId = setInterval(function(){
        if (i == 6) {
            clearInterval(timerId);
        }
        answerP.innerHTML = arr[i];
        i++;
    }, 250)
    return arr;
}