const playerCount = 4;
const players = [];
for (let i = 0; i < playerCount; i++) {
    players.push([]);
}
const scoreInput = document.getElementById("score");
let turns = 0;

function addToScore(e) {
    console.log(scoreInput.value);
    let player = decidePlayer();
    player.unshift(scoreInput.value);
    turns++;
    console.log(players);
    e.preventDefault();
}

// Not scalable yet
function decidePlayer() {
    switch (turns % playerCount) {
        case 0:
            return players[0];
        case 1:
            return players[1];
        case 2:
            return players[2];
        case 3:
            return players[3];
    }
}

const form = document.getElementById("newScoreInput");
form?.addEventListener("submit", addToScore);
