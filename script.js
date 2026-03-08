let player="", score=0, currentQuestion=0, maxQuestions=5, timer=30, timerInterval, tickInterval, stage="easy", allQuestions=[];

// Sounds
function playSound(type){
    if(type==="click") document.getElementById("clickSound")?.play();
    if(type==="correct") document.getElementById("correctSound").play();
    if(type==="wrong") document.getElementById("wrongSound").play();
    if(type==="tick") document.getElementById("tickSound").play().catch(()=>{});
    if(type==="theme") document.getElementById("themeSound").play().catch(()=>{});
}

// Start
function startGame(){
    document.getElementById("instructionsScreen").classList.add("hidden");
    document.getElementById("nameScreen").classList.remove("hidden");
}

// Start Easy Mode
function startEasy(){
    player=document.getElementById("playerName").value;
    if(player.trim()===""){ alert("Enter your name!"); return; }
    playSound("theme"); // play theme music agad
    stage="easy";
    allQuestions=easyQuestions.sort(()=>Math.random()-0.5);
    score=0; currentQuestion=0;
    maxQuestions=allQuestions.length;
    showGameScreen();
    loadQuestion();
    startTimer();
}

// Show Game Screen
function showGameScreen(){
    document.getElementById("nameScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");
    document.getElementById("welcome").innerText="Player: "+player;
    document.getElementById("stageLabel").innerText = stage.toUpperCase();
    document.getElementById("maxQuestions").innerText = maxQuestions;
}

// Load Question
function loadQuestion(){
    document.getElementById("number").innerText=currentQuestion+1;
    document.getElementById("score").innerText=score;
    let q=allQuestions[currentQuestion];
    document.getElementById("question").innerText=q.question;
    let choicesDiv=document.getElementById("choices");
    choicesDiv.innerHTML="";
    q.choices.forEach((c,i)=>{
        let btn=document.createElement("button");
        btn.innerText=c;
        btn.classList.add("neonBtn");
        btn.onclick=()=>answer(i);
        choicesDiv.appendChild(btn);
    });
}

// Timer with tick sound
function startTimer(){
    clearInterval(timerInterval); clearInterval(tickInterval);
    timer=30; document.getElementById("timer").innerText=timer;
    tickInterval=setInterval(()=>{ playSound("tick"); },1000);
    timerInterval=setInterval(()=>{
        timer--;
        document.getElementById("timer").innerText=timer;
        if(timer<=0){ clearInterval(timerInterval); clearInterval(tickInterval); alert("Time's up!"); nextQuestion(); }
    },1000);
}

// Answer
function answer(choice){
    playSound("click");
    clearInterval(timerInterval); clearInterval(tickInterval);
    let q=allQuestions[currentQuestion];
    let selected=q.choices[choice];
    if(selected===q.answer){ score++; playSound("correct"); }
    else{ playSound("wrong"); }
    nextQuestion();
}

// Next Question / Stage
function nextQuestion(){
    currentQuestion++;
    if(currentQuestion>=maxQuestions){ nextStage(); }
    else{ loadQuestion(); startTimer(); }
}

function nextStage(){
    if(stage=="easy"){ stage="normal"; allQuestions=normalQuestions.sort(()=>Math.random()-0.5); maxQuestions=allQuestions.length; }
    else if(stage=="normal"){ stage="hard"; allQuestions=hardQuestions.sort(()=>Math.random()-0.5); maxQuestions=allQuestions.length; }
    else{ showFinalResult(); return; }
    score=0; currentQuestion=0;
    showGameScreen();
    loadQuestion();
    startTimer();
}

// Final Result
function showFinalResult(){
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.remove("hidden");
    let percent=(score/maxQuestions)*100;
    document.getElementById("finalScore").innerText="Total Score: "+score+" / "+maxQuestions+" ("+percent.toFixed(0)+"%)";
    document.getElementById("playerResult").innerText="Player: "+player;
    let ratingText="";
    if(percent>=90) ratingText="Excellent 🏆";
    else if(percent>=78) ratingText="Good 👍";
    else ratingText="Try Again 🔁";
    let ratingEl=document.createElement("p");
    ratingEl.innerText="Rating: "+ratingText;
    ratingEl.classList.add("neon");
    document.getElementById("resultScreen").appendChild(ratingEl);
    if(percent<78){ setTimeout(()=>{ alert("Score below passing! Replay the game."); location.reload(); },1000);}
}

// --- Sample Questions ---
const easyQuestions=[{question:"If P = true and Q = true, what is P ∧ Q?", choices:["True","False"], answer:"True"},
{question:"If P = true and Q = false, what is P ∧ Q?", choices:["True","False"], answer:"False"},
{question:"If P = false and Q = true, what is P ∨ Q?", choices:["True","False"], answer:"True"},
{question:"If P = true, what is ¬P?", choices:["True","False"], answer:"False"},
{question:"If P = false and Q = false, what is P ∨ Q?", choices:["True","False"], answer:"False"}];

const normalQuestions=[{question:"If P = true and Q = false, what is P → Q?", choices:["True","False"], answer:"False"},
{question:"If P = false and Q = true, what is P → Q?", choices:["True","False"], answer:"True"},
{question:"If P = true and Q = false, what is P ∨ Q?", choices:["True","False"], answer:"True"},
{question:"If P = false, what is ¬P?", choices:["True","False"], answer:"True"},
{question:"What does ∀ mean in predicate logic?", choices:["All","Some","None"], answer:"All"},
{question:"What does ∃ mean?", choices:["All","There exists","None"], answer:"There exists"},
{question:"Translate: 'All students study'", choices:["∀x Student(x) → Study(x)","∃x Student(x) → Study(x)","∀x Student(x) ∧ Study(x)"], answer:"∀x Student(x) → Study(x)"}];

const hardQuestions=[{question:"What does ∀x P(x) mean?", choices:["P is true for all x","P is true for some x","P is false"], answer:"P is true for all x"},
{question:"What does ∃x P(x) mean?", choices:["P is true for at least one x","P is true for all x","P is false"], answer:"P is true for at least one x"},
{question:"Translate: 'There exists a student who likes math'", choices:["∃x Student(x) ∧ LikesMath(x)","∀x Student(x) ∧ LikesMath(x)","∀x Student(x) → Study(x)"], answer:"∃x Student(x) ∧ LikesMath(x)"},
{question:"In Loves(x,y), what is the predicate?", choices:["Loves","x","y"], answer:"Loves"},
{question:"In Friend(x,y), what are x and y?", choices:["Variables","Predicates","Constants"], answer:"Variables"},
{question:"Translate: 'All dogs are animals'", choices:["∀x Dog(x) → Animal(x)","∃x Dog(x) → Animal(x)","∀x Dog(x) ∧ Animal(x)"], answer:"∀x Dog(x) → Animal(x)"},
{question:"What does ¬∃x P(x) mean?", choices:["No x satisfies P","All x satisfy P","Some x satisfy P"], answer:"No x satisfies P"},
{question:"What does ∀x ∃y Loves(x,y) mean?", choices:["Everyone loves someone","Someone loves everyone","No one loves"], answer:"Everyone loves someone"},
{question:"What is the quantifier in ∀x Human(x)?", choices:["∀","Human","x"], answer:"∀"},
{question:"Translate: 'Some students are programmers'", choices:["∃x Student(x) ∧ Programmer(x)","∀x Student(x) ∧ Programmer(x)","∀x Student(x) → Programmer(x)"], answer:"∃x Student(x) ∧ Programmer(x)"}];
