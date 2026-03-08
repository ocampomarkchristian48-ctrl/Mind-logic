let language = "en";
let player = "";
let score = 0;
let current = 0;
let maxQuestions = 5;

let questions = [
{q_en:"P AND Q when P=true Q=true", q_tl:"P AT Q kapag P=true Q=true", a:true},
{q_en:"P AND Q when P=true Q=false", q_tl:"P AT Q kapag P=true Q=false", a:false},
{q_en:"P OR Q when P=false Q=true", q_tl:"P O Q kapag P=false Q=true", a:true},
{q_en:"NOT P when P=true", q_tl:"HINDI P kapag P=true", a:false},
{q_en:"P OR Q when P=false Q=false", q_tl:"P O Q kapag P=false Q=false", a:false},
{q_en:"NOT P when P=false", q_tl:"HINDI P kapag P=false", a:true},
{q_en:"P AND Q when both true", q_tl:"P AT Q kapag parehong true", a:true},
{q_en:"P OR Q when both false", q_tl:"P O Q kapag parehong false", a:false},
{q_en:"NOT true", q_tl:"HINDI true", a:false},
{q_en:"NOT false", q_tl:"HINDI false", a:true}
];

function showLanguage(){
document.getElementById("home").classList.add("hidden");
document.getElementById("language").classList.remove("hidden");
}

function setLanguage(lang){
language = lang;

document.getElementById("language").classList.add("hidden");
document.getElementById("player").classList.remove("hidden");
}

function showDifficulty(){
player = document.getElementById("playerName").value;

document.getElementById("player").classList.add("hidden");
document.getElementById("difficulty").classList.remove("hidden");
}

function startGame(level){

if(level=="easy") maxQuestions = 5;
if(level=="normal") maxQuestions = 7;
if(level=="hard") maxQuestions = 10;

document.getElementById("difficulty").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");

document.getElementById("welcome").innerText = "Player: "+player;

loadQuestion();
}

function loadQuestion(){

let q = questions[current];

if(language=="en")
document.getElementById("question").innerText = q.q_en;
else
document.getElementById("question").innerText = q.q_tl;

}

function answer(choice){

if(choice == questions[current].a){
score++;
document.getElementById("score").innerText = score;
}

current++;

document.getElementById("number").innerText = current+1;

if(current >= maxQuestions){
alert("Game Over! Score: "+score);
location.reload();
}

loadQuestion();
}
