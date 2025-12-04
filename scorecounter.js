const playerCount = 2;
const players = [];
for (let i = 0; i < playerCount; i++) {
  players.push([]);
}
const scoreInput = document.getElementById("score");
const player1Header = document.getElementById("player1Name");
const player2Header = document.getElementById("player2Name");
const player1Table = document.getElementById("player1Score");
const player2Table = document.getElementById("player2Score");
const playerHeaders = [player1Header, player2Header];
const playerTables = [player1Table, player2Table];
let turns = 0;

function addToScore(e) {
  console.log(scoreInput.value);
  let player = decidePlayer(players);
  let header = decidePlayer(playerHeaders);
  let table = decidePlayer(playerTables);
  player.unshift(scoreInput.value);
  let newestTenPoints = player.slice(0, 11);
  header.classList.add("activeBorder");
  header.classList.remove("noBorder");
  let otherHeaders = playerHeaders.filter((h) => h !== header);
  for (let i = 0; i < playerHeaders.length; i++) {
    otherHeaders[0].classList.remove("activeBorder");
    otherHeaders[0].classList.add("noBorder");
  }

  for (let j = 0; j < table.rows.length; j++) {
    table.rows[j].cells[0].innerHTML = newestTenPoints[j]
      ? newestTenPoints[j]
      : "";
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
