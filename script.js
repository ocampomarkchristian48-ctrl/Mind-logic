let language = "en";
let player = "";
let difficulty = "";
let score = 0;
let currentQuestion = 0;
let maxQuestions = 5;
let timer = 30;
let timerInterval;

// Questions
let easyQuestions = [
{question:"If P = true and Q = true, what is P ∧ Q?", choices:["True","False"], answer:"True"},
{question:"If P = true and Q = false, what is P ∧ Q?", choices:["True","False"], answer:"False"},
{question:"If P = false and Q = true, what is P ∨ Q?", choices:["True","False"], answer:"True"},
{question:"If P = true, what is ¬P?", choices:["True","False"], answer:"False"},
{question:"If P = false and Q = false, what is P ∨ Q?", choices:["True","False"], answer:"False"}
];

let normalQuestions = [
{question:"If P = true and Q = false, what is P → Q?", choices:["True","False"], answer:"False"},
{question:"If P = false and Q = true, what is P → Q?", choices:["True","False"], answer:"True"},
{question:"If P = true and Q = false, what is P ∨ Q?", choices:["True","False"], answer:"True"},
{question:"If P = false, what is ¬P?", choices:["True","False"], answer:"True"},
{question:"What does ∀ mean in predicate logic?", choices:["All","Some","None"], answer:"All"},
{question:"What does ∃ mean?", choices:["All","There exists","None"], answer:"There exists"},
{question:"Translate: 'All students study'", choices:["∀x Student(x) → Study(x)","∃x Student(x) → Study(x)","∀x Student(x) ∧ Study(x)"], answer:"∀x Student(x) → Study(x)"}
];

let hardQuestions = [
{question:"What does ∀x P(x) mean?", choices:["P is true for all x","P is true for some x","P is false"], answer:"P is true for all x"},
{question:"What does ∃x P(x) mean?", choices:["P is true for at least one x","P is true for all x","P is false"], answer:"P is true for at least one x"},
{question:"Translate: 'There exists a student who likes math'", choices:["∃x Student(x) ∧ LikesMath(x)","∀x Student(x) ∧ LikesMath(x)","∀x Student(x) → Study(x)"], answer:"∃x Student(x) ∧ LikesMath(x)"},
{question:"In Loves(x,y), what is the predicate?", choices:["Loves","x","y"], answer:"Loves"},
{question:"In Friend(x,y), what are x and y?", choices:["Variables","Predicates","Constants"], answer:"Variables"},
{question:"Translate: 'All dogs are animals'", choices:["∀x Dog(x) → Animal(x)","∃x Dog(x) → Animal(x)","∀x Dog(x) ∧ Animal(x)"], answer:"∀x Dog(x) → Animal(x)"},
{question:"What does ¬∃x P(x) mean?", choices:["No x satisfies P","All x satisfy P","Some x satisfy P"], answer:"No x satisfies P"},
{question:"What does ∀x ∃y Loves(x,y) mean?", choices:["Everyone loves someone","Someone loves everyone","No one loves"], answer:"Everyone loves someone"},
{question:"What is the quantifier in ∀x Human(x)?", choices:["∀","Human","x"], answer:"∀"},
{question:"Translate: 'Some students are programmers'", choices:["∃x Student(x) ∧ Programmer(x)","∀x Student(x) ∧ Programmer(x)","∀x Student(x) → Programmer(x)"], answer:"∃x Student(x) ∧ Programmer(x)"}
];

// MENU LOGIC
function showLanguage(){
document.getElementById("startScreen").classList.add("hidden");
document.getElementById("languageScreen").classList.remove("hidden");
}

function setLanguage(lang){
language = lang;
document.getElementById("languageScreen").classList.add("hidden");
document.getElementById("nameScreen").classList.remove("hidden");
}

function showDifficulty(){
player = document.getElementById("playerName").value;
if(player.trim() === "") { alert("Please enter your name!"); return; }
document.getElementById("nameScreen").classList.add("hidden");
document.getElementById("difficultyScreen").classList.remove("hidden");
}

// START GAME
function startGame(level){
difficulty = level;

if(level=="easy"){questions = easyQuestions; maxQuestions=5;}
if(level=="normal"){questions = normalQuestions; maxQuestions=7;}
if(level=="hard"){questions = hardQuestions; maxQuestions=10;}

questions = questions.sort(()=> Math.random()-0.5); // randomize
score = 0;
currentQuestion=0;
timer=30;

document.getElementById("difficultyScreen").classList.add("hidden");
document.getElementById("gameScreen").classList.remove("hidden");
document.getElementById("welcome").innerText = "Player: "+player;

loadQuestion();
startTimer();
}

// LOAD QUESTION
function loadQuestion(){
document.getElementById("number").innerText = currentQuestion+1;
document.getElementById("score").innerText = score;

let q = questions[currentQuestion];
document.getElementById("question").innerText = q.question;

let choicesDiv = document.getElementById("choices");
choicesDiv.innerHTML="";
for(let i=0;i<q.choices.length;i++){
    let btn = document.createElement("button");
    btn.innerText = q.choices[i];
    btn.classList.add("neonBtn");
    btn.onclick = ()=>answer(i);
    choicesDiv.appendChild(btn);
}
}

// TIMER
function startTimer(){
clearInterval(timerInterval);
timer = 30;
document.getElementById("timer").innerText = timer;
timerInterval = setInterval(()=>{
    timer--;
    document.getElementById("timer").innerText = timer;
    if(timer<=0){
        clearInterval(timerInterval);
        alert("Time's up!");
        nextQuestion();
    }
},1000);
}

// ANSWER
function answer(choice){
clearInterval(timerInterval);
let q = questions[currentQuestion];
let selected = q.choices[choice];

if(selected === q.answer){
    score++;
}

nextQuestion();
}

// NEXT QUESTION
function nextQuestion(){
currentQuestion++;
if(currentQuestion>=maxQuestions){
    showResult();
}else{
    loadQuestion();
    startTimer();
}
}

// SHOW RESULT
function showResult(){
document.getElementById("gameScreen").classList.add("hidden");
document.getElementById("resultScreen").classList.remove("hidden");

let totalQuestions = maxQuestions;
let percent = (score/totalQuestions)*100;

document.getElementById("finalScore").innerText = 
"Total Score: "+score+" / "+totalQuestions+" ("+percent.toFixed(0)+"%)";

document.getElementById("playerResult").innerText = 
"Player: "+player;

// Rating
let ratingText="";
if(percent>=90) ratingText="Excellent 🏆";
else if(percent>=78) ratingText="Good 👍";
else ratingText="Try Again 🔁";

let ratingEl = document.createElement("p");
ratingEl.innerText="Rating: "+ratingText;
ratingEl.classList.add("neon");
document.getElementById("resultScreen").appendChild(ratingEl);

// Replay logic
if(percent<78){
    setTimeout(()=>{ alert("Score below passing! Replay the game."); restartGame(); },1000);
}
}

// RESTART
function restartGame(){
location.reload();
}
