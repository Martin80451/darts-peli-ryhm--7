
function getPlayerNames() {
    var playerNames = ["Thomas", "Elisa", "Martin", "Eetu"]; //TODO Otetaan nimet main/aloitus sivulta...
    return playerNames;
}


function getPlayerCount() {
    var playerCount = 4; //TODO oletuksena 2 pelaajaa. Tämän arvon olisi tarkoitus saada main/aloitus sivulta..
    return playerCount;
}

// setupPlayerNames, jonka periaate on tulkita aktiivisten pelaajien määrä ja lisätä heidän nimensä nimikenttiin
function setupPlayerNames() {
    //Hae pelaajien nimet ja lyhennä ne alkukirjaimiksi
    const count = getPlayerCount();
    const names = getPlayerNames();
    const initials = names.map(name => name[0].toUpperCase());

    //Aseta pelaajien nimet näkyviin
    player1Header.innerText = initials[0];
    player2Header.innerText = initials[1];
    if (count >= 3) {
        player3Header.innerText = initials[2];
    }
    if (count === 4) {
        player4Header.innerText = initials[3];
    }
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
//Ohittaa vanhan formin, subit toiminon. Uudessa ratkaisussa painetaan enteriä pisteen syötön jälkeen.
scoreInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if(scoreInput.value === "" || isNaN(scoreInput.value)){
      alert("Syötä pistemäärä numerona.");
      return;
    }

    if(scoreInput.value <= 180){ //Maksimipistemäärä yhdellä heitto vuorolla on 180
      addToScore();
    }
    else{
      alert("Anettu pistemäärä ylittää heito vuoron maksimipistemäärän (180). Yritä uudelleen.");
    }
    
  }
});

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
setupPlayerNames();
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

//-------------------PISTEIDEN JA LEGIEN KERÄYS JA NIIDEN TALLETUS NÄYTÖLLE---------------------------//

//Pelaajien pistemäärien päivitys
const player1wins = document.getElementById("player1wins");
const player2wins = document.getElementById("player2wins");
const player3wins = document.getElementById("player3wins");
const player4wins = document.getElementById("player4wins");

let playerPoints = [0, 0, 0, 0];
let playerLegsWon = [0, 0, 0, 0];
let amountleft = [501, 501, 501, 501]; //TODO: Muuta alkupisteet dynaamisesti aloitusnäytöltä
function playerPointsUpdate() {
  //Lasketaan pelaajien pistemäärät ja vähennetään ne aloituspisteistä.
  for (let i = 0; i < playerCount; i++) {
    playerPoints[i] = players[i].reduce((a, b) => Number(a) + Number(b), 0);
    console.log(`Player ${i + 1} points: ${playerPoints[i]}`);
    amountleft[i] = 501 - playerPoints[i];
    console.log(`Player ${i + 1} amount left: ${amountleft[i]}`);
    //Päivitetään näytölle jäljellä olevat pisteet
    switch (i) {
      case 0: document.getElementById("player1pointsLeft").innerText = `points left: ${amountleft[i]}`; break;
      case 1: document.getElementById("player2pointsLeft").innerText = `points left: ${amountleft[i]}`; break;
      case 2: document.getElementById("player3pointsLeft").innerText = `points left: ${amountleft[i]}`; break;
      case 3: document.getElementById("player4pointsLeft").innerText = `points left: ${amountleft[i]}`; break;
    }

    //Jos pelaaja pääsee 0:n, hän voittaa legin
    if (amountleft[i] === 0) {
      playerLegsWon[i] += 1;
      amountleft.splice(i,0, 501);
      players[i] = []; //Tyhjennetään pelaajan piste lista seuraavaa legiä varten
      alert(`Player ${i + 1} wins the leg! Total legs won: ${playerLegsWon[i]}`);
      //Päivitetään näytölle voitettujen legien määrä
      switch (i) {
        case 0: player1wins.innerText = `legs won: ${playerLegsWon[i]}`; break;
        case 1: player2wins.innerText = `legs won: ${playerLegsWon[i]}`; break;
        case 2: player3wins.innerText = `legs won: ${playerLegsWon[i]}`; break;
        case 3: player4wins.innerText = `legs won: ${playerLegsWon[i]}`; break;
      }
    }
  }

}

function addToScore(e) {
  console.log(scoreInput.value);
  let player = decidePlayer(players);
  let header = decidePlayer(playerHeaders);
  let table = decidePlayer(playerTables);
  player.unshift(scoreInput.value);
  let newestTenPoints = player.slice(0, 11);
  header.classList.add("activeBorder");
  console.log(header);
  playerPointsUpdate();
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
  console.log(players, "T urns:", newestTenPoints);
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

