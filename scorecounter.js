
function getPlayerCount() {
    var playerCount = 4; //TODO oletuksena 2 pelaajaa. Tämän arvon olisi tarkoitus saada main/aloitus sivulta..
    return playerCount;
}

// givePlayersScoreboard jonka periaate on tulkita aktiivisten pelaajien määrä ja piilottaa tarpeettomat pistetaulukot
function givePlayersScoreboard() {
    const count = getPlayerCount();
    //piilota pelaajien nimiet
    player3Header.hidden = count < 3;
    player4Header.hidden = count < 4;
    //piilota pelaajien pistetaulukot
    player4Table.style.display = count < 4 ? "none" : "flex";
    player3Table.style.display = count < 3 ? "none" : "flex";
}

const playerCount = getPlayerCount();
const players = [];
for (let i = 0; i < playerCount; i++) {
  players.push([]);
}
const scoreInput = document.getElementById("score");
//Pelaajat 1 ja 2
const player1Header = document.getElementById("player1Name");
const player2Header = document.getElementById("player2Name");
const player1Table = document.getElementById("player1Score");
const player2Table = document.getElementById("player2Score");
//Pelaajat 3 ja 4
const player3Header = document.getElementById("player3Name");
const player4Header = document.getElementById("player4Name");
const player3Table = document.getElementById("player3Score");
const player4Table = document.getElementById("player4Score");
givePlayersScoreboard();

//Kootaan pelaajat ja taulukot listoiksi helpompaa käsittelyä varten
const allPlayers = [player1Header, player2Header, player3Header, player4Header];
const allTables = [player1Table, player2Table, player3Table, player4Table];

//Lisätään aktiiviset pelaajat ja taulukot listoihin
const playerHeaders = allPlayers.slice(0, playerCount);
const playerTables = allTables.slice(0, playerCount);
console.log("Active player headers:", playerHeaders);
console.log("Active player tables:", playerTables);
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

  for (let i = 0; i < otherHeaders.length; i++) {
    otherHeaders[i].classList.remove("activeBorder");
    otherHeaders[i].classList.add("noBorder");
  }
  //Lisätään pisteet taulukkoon horisontaalisesti
  for (let j = 0; j < table.rows[0].cells.length; j++) {
    table.rows[0].cells[j].innerHTML = newestTenPoints[j]
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
