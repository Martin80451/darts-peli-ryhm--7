const playerCount = 4;
const players = [];
for (let i = 0; i < playerCount; i++) {
    players.push([]);
}
const scoreInput = document.getElementById("score");
let turns = 0;

function addToScore(e) {
    console.log(scoreInput.value);
    turns++;
    e.preventDefault();
}


const form = document.getElementById("newScoreInput");
form?.addEventListener("submit", addToScore);
