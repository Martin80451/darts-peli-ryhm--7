const _storedGameRaw = localStorage.getItem("gameData");
const _storedGameData = _storedGameRaw ? JSON.parse(_storedGameRaw) : null;

function getPlayerNames() {
  if (
    _storedGameData &&
    Array.isArray(_storedGameData.names) &&
    _storedGameData.names.length > 0
  ) {
    return _storedGameData.names;
  }
  var playerNames = ["Thomas", "Elisa", "Martin", "Eetu"]; //TODO Otetaan nimet main/aloitus sivulta...
  return playerNames;
}
function getPlayerCount() {
  if (_storedGameData && Array.isArray(_storedGameData.names)) {
    return _storedGameData.names.length;
  }
  var playerCount = 2; // default arvo, jos ei löydy local storagesta
  return playerCount;
}
function getSetCount() {
  if (_storedGameData && _storedGameData.setSize) {
    return Number(_storedGameData.setSize);
  }
  return 3; // default arvo, jos ei löydy local storagesta
}
// setupPlayerNames, jonka periaate on tulkita aktiivisten pelaajien määrä ja lisätä heidän nimensä nimikenttiin
function setupPlayerNames() {
  //Hae pelaajien nimet ja lyhennä ne alkukirjaimiksi
  const count = getPlayerCount();
  const names = getPlayerNames();
  const initials = names.map((name) => name[0].toUpperCase());

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
  player3wins.style.display = count < 3 ? "none" : "flex";
  player4wins.style.display = count < 4 ? "none" : "flex";
  //piilota pelaajien pistetaulukot
  player4Table.style.display = count < 4 ? "none" : "flex";
  player3Table.style.display = count < 3 ? "none" : "flex";
}

//-------------------MUUTTUJAT JA ALUSTUKSET---------------------------//

const openpopupButton = document.getElementById("changeSettings");
openpopupButton.addEventListener("click", () => {
  showPopup();
});

const playerCount = getPlayerCount();
const players = [];
for (let i = 0; i < playerCount; i++) {
  players.push([]);
}
//Alustetaan pelaajat 1, 2, 3 ja 4
const player1Header = document.getElementById("player1Name");
const player2Header = document.getElementById("player2Name");
const player1Table = document.getElementById("player1Score");
const player2Table = document.getElementById("player2Score");
const player3Header = document.getElementById("player3Name");
const player4Header = document.getElementById("player4Name");
const player3Table = document.getElementById("player3Score");
const player4Table = document.getElementById("player4Score");

const scoreInput = document.getElementById("score");
let playerPoints = [0, 0, 0, 0];
let playerLegsWon = [0, 0, 0, 0];
let amountleft = [];
const gameType = gameMode();
for (let i = 0; i < playerCount; i++) {
  amountleft.push(gameType);
}
//Pelaajien pistemäärien päivitys
const player1wins = document.getElementById("player1wins");
const player2wins = document.getElementById("player2wins");
const player3wins = document.getElementById("player3wins");
const player4wins = document.getElementById("player4wins");
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
// Aseta aloitus pelaaja, jos on määritetty
if (_storedGameData && _storedGameData.startingPlayer) {
  turns = Number(_storedGameData.startingPlayer) - 1;
}

//-------------------PISTEIDEN JA LEGIEN KERÄYS JA NIIDEN TALLETUS NÄYTÖLLE---------------------------//

//Aseta pelimuoto, pitkää(501) vai lyhyttä(301) peliä
function gameMode() {
  // Hae local storagesta pelimoodi
  if (_storedGameData && _storedGameData.gameType) {
    return Number(_storedGameData.gameType);
  }
  // default
  return 301;
}

//Tarkista onko kukaan voittanut peliä
function winnerCheck() {
  //TODO: kokeile tuleeko pelaaja nimet oikein erien ja pelin loputtua
  const names = getPlayerNames();
  const sets = getSetCount();
  for (let i = 0; i < playerCount; i++) {
    if (playerLegsWon[i] >= Math.floor(sets / 2) + 1) {
      //TODO: Muuta voittoon tarvittavien legien määrä dynaamisesti aloitusnäytöltä
      alert(`Player: ${names[i]} wins the game!`);
      resetGame(false);
    }
  }
}
//Pelaajien pistemäärät ja jäljellä olevat pisteet
function playerPointsUpdate() {
  const gameLength = gameMode();
  const names = getPlayerNames();
  //Lasketaan pelaajien pistemäärät ja vähennetään ne aloituspisteistä.
  for (let i = 0; i < playerCount; i++) {
    let points = players[i].reduce((a, b) => Number(a) + Number(b), 0);
    playerPoints[i] = points;

    //Jos pelaajan pisteet menevät miinukselle
    if (playerPoints[i] > gameLength) {
      alert(
        `Player: ${names[i]} has exceeded the score! Score reset to previous amount.`
      );
      players[i].shift();
      //Päivitetään pelaajan pisteet uudelleen
      let points = players[i].reduce((a, b) => Number(a) + Number(b), 0);
      playerPoints[i] = points;
      continue;
    }

    console.log(`Player ${i + 1} points: ${playerPoints[i]}`);
    amountleft[i] = gameLength - playerPoints[i];
    console.log(`Player ${i + 1} amount left: ${amountleft[i]}`);
    //Päivitetään näytölle jäljellä olevat pisteet
    switch (i) {
      case 0:
        document.getElementById(
          "player1pointsLeft"
        ).innerText = `points left: ${amountleft[i]}`;
        break;
      case 1:
        document.getElementById(
          "player2pointsLeft"
        ).innerText = `points left: ${amountleft[i]}`;
        break;
      case 2:
        document.getElementById(
          "player3pointsLeft"
        ).innerText = `points left: ${amountleft[i]}`;
        break;
      case 3:
        document.getElementById(
          "player4pointsLeft"
        ).innerText = `points left: ${amountleft[i]}`;
        break;
    }

    //Jos pelaaja pääsee 0:n, hän voittaa legin
    if (amountleft[i] === 0) {
      playerLegsWon[i] += 1;
      resetGame(true); //Nollaa peli, mutta säilyttää voitettujen legien määrän
      alert(
        `Player: ${names[i]} wins the leg! Total legs won: ${playerLegsWon[i]}`
      );
      //Päivitetään näytölle voitettujen legien määrä
      switch (i) {
        case 0:
          player1wins.innerText = `legs won: ${playerLegsWon[i]}`;
          break;
        case 1:
          player2wins.innerText = `legs won: ${playerLegsWon[i]}`;
          break;
        case 2:
          player3wins.innerText = `legs won: ${playerLegsWon[i]}`;
          break;
        case 3:
          player4wins.innerText = `legs won: ${playerLegsWon[i]}`;
          break;
      }
      winnerCheck(); //Tarkistetaan onko peli voitettu
    }
  }
}

//----------------Painikkeet----------------//
//Nollaa peli
function resetGame(legWon) {
  //Nollaa kaikki pelaajien pisteet ja legit
  let gameLength = gameMode();
  for (let i = 0; i < playerCount; i++) {
    players[i] = [];
    playerPoints[i] = 0;
    playerLegsWon[i] = legWon ? playerLegsWon[i] : 0;
    amountleft[i] = gameLength;
    //Päivitetään näytölle
    document.getElementById(
      "player1pointsLeft"
    ).innerText = `points left: ${amountleft[i]}`;
    player1wins.innerText = `legs won: ${playerLegsWon[i]}`;
    document.getElementById(
      "player2pointsLeft"
    ).innerText = `points left: ${amountleft[i]}`;
    player2wins.innerText = `legs won: ${playerLegsWon[i]}`;
    document.getElementById(
      "player3pointsLeft"
    ).innerText = `points left: ${amountleft[i]}`;
    player3wins.innerText = `legs won: ${playerLegsWon[i]}`;
    document.getElementById(
      "player4pointsLeft"
    ).innerText = `points left: ${amountleft[i]}`;
    player4wins.innerText = `legs won: ${playerLegsWon[i]}`;
  }

  //Tyhjennetään pistetaulukot
  for (let i = 0; i < playerCount; i++) {
    let table = playerTables[i];
    for (let j = 0; j < table.rows[0].cells.length; j++) {
      table.rows[0].cells[j].innerHTML = "";
    }
  }
}
//Ohittaa vanhan formin, submit toiminon. Nyt painetaan enteriä pisteen syötön jälkeen.
scoreInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (scoreInput.value === "" || isNaN(scoreInput.value)) {
      alert("Syötä pistemäärä numerona.");
      return;
    }

    if (scoreInput.value <= 180) {
      //Maksimipistemäärä yhdellä heitto vuorolla on 180
      addToScore();
    } else {
      alert(
        "Anettu pistemäärä ylittää heito vuoron maksimipistemäärän (180). Yritä uudelleen."
      );
    }
  }
});

//-------------------PISTEIDEN LISÄYS JA VUORON VAIHTO---------------------------//

function addToScore(e) {
  console.log(scoreInput.value);
  let player = decidePlayer(players);
  //let header = decidePlayer(playerHeaders);
  let table = decidePlayer(playerTables);
  player.unshift(scoreInput.value);
  let newestTenPoints = player.slice(0, 11);

  //Lisätään pisteet taulukkoon horisontaalisesti
  for (let j = 0; j < table.rows[0].cells.length; j++) {
    table.rows[0].cells[j].innerHTML = newestTenPoints[j]
      ? newestTenPoints[j]
      : "";
  }

  playerPointsUpdate();
  turns++;

  updatePlayerHighlight();
}

//Uusi funktio pelaajan vuoro highlighteille
function updatePlayerHighlight() {
  let header = decidePlayer(playerHeaders);
  header.classList.add("activeBorder");
  header.classList.remove("noBorder");
  let otherHeaders = playerHeaders.filter((h) => h !== header);
  //Poistetaan vanha highlight muilta pelaajilta
  for (let i = 0; i < otherHeaders.length; i++) {
    otherHeaders[i].classList.remove("activeBorder");
    otherHeaders[i].classList.add("noBorder");
  }
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

//PopUp randomaizer logiikka
function showPopup() {
  const overlay = document.getElementById("overlay");

  //Nollaa pisteet button
  const resetScoresButton = document.getElementById("resetGame"); //<-------------------------------------NOLLAA PISTEET BUTTON
  resetScoresButton.addEventListener("click", () => {
    resetGame(false);
    closePopup();
  });
  const returnMainmenuButton = document.getElementById("mainmenu"); //<-------------------------------------RETURN TO MAIN MENU BUTTON
  returnMainmenuButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  overlay.style.display = "flex";
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
}
