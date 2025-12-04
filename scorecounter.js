const playerCount = 4;
const players = [];
for (let i = 0; i < playerCount; i++) {
  players.push([]);
}
const scoreInput = document.getElementById("score");
const player1Header = document.getElementById("player1Name");
const player2Header = document.getElementById("player2Name");
const player3Header = document.getElementById("player3Name");
const player4Header = document.getElementById("player4Name");
const playerHeaders = [
  player1Header,
  player2Header,
  player3Header,
  player4Header,
];
let turns = 0;

function addToScore(e) {
  console.log(scoreInput.value);
  let player = decidePlayer(players);
  let header = decidePlayer(playerHeaders);
  player.unshift(scoreInput.value);
  header.classList.add("activeBorder");
  header.classList.remove("noBorder");
  const otherHeaders = playerHeaders.filter((h) => h !== header);
  for (let i = 0; i < playerHeaders.length; i++) {
    otherHeaders[0].classList.remove("activeBorder");
    otherHeaders[0].classList.add("noBorder");
  }
  turns++;
  console.log(players);
  e.preventDefault();
}

function decidePlayer(content) {
  switch (turns % playerCount) {
    case 0:
      return content[0];
    case 1:
      return content[1];
    case 2:
      return content[2];
    case 3:
      return content[3];
  }
}

const form = document.getElementById("newScoreInput");
form?.addEventListener("submit", addToScore);
