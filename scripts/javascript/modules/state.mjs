import {
  getPlayerNames,
  getSetCount,
  gameMode,
  getPlayerCount,
} from "./storage.mjs";
import {
  scoreInput,
  turns,
  playerPoints,
  players,
  amountleft,
  playerLegsWon,
  player1wins,
  player2wins,
  player3wins,
  player4wins,
  playerTables,
  playerHeaders,
  nextTurn,
  p3Input,
  p4Input,
  currentSet,
  currentSetCount,
  changeCurrentSetCount,
  decrementCurrentSetCount,
} from "./variables.mjs";

//-------------------INDEX.JS STATE---------------------------//
/**Asettaa pelaaja määrän numPlayers inputissa annetun arvon mukaan.*/
function setPlayerCount(givenPlayerCount) {
  var playerCount = givenPlayerCount;
  return playerCount;
}
/** giveNames jonka periaate on tulkita aktiivisten pelaajien määrä ja piilottaa tarpeettomat syötekentät */
function giveNames(givenPlayerCount) {
  const count = setPlayerCount(givenPlayerCount);
  p3Input.hidden = count < 3;
  p4Input.hidden = count < 4;
}
/** Funktio joka varmistaa että input arvot pysyvät määritellyissä rajoissa */
function enforceValueLimits(inputElement) {
  const max = parseInt(inputElement.max);
  const min = parseInt(inputElement.min);
  if (parseInt(inputElement.value) > max) {
    inputElement.value = max;
  } else if (parseInt(inputElement.value) < min) {
    inputElement.value = min;
  }
}
//-------------------SCORECOUNTER.JS STATE---------------------------//

const playerCount = getPlayerCount();
//Tarkista onko kukaan voittanut peliä
function winnerCheck() {
  const names = getPlayerNames();
  const sets = getSetCount();
  let maxLegs = Math.max(...playerLegsWon);
  let winners = [];
  for (let i = 0; i < playerLegsWon.length; i++) {
    if (playerLegsWon[i] === maxLegs) {
      winners.push(names[i]);
    }
  }
  if (winners.length === 1 && maxLegs === Math.floor(sets / 2) + 1) {
    alert(`Player: ${winners[0]} wins the game!`);
    resetGame(false);
  } else if (winners.length > 1) {
    alert(`It's a tie between: ${winners.join(", ")}`);
    resetGame(false);
  } else {
    resetGame(true);
  }
}

function updateSetSize() {
  decrementCurrentSetCount();
  currentSet.innerText = `Current set: ${currentSetCount}`;
  console.log("Updated set size:", currentSetCount);
  if (currentSetCount === 0) {
    winnerCheck();
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
        ).innerText = `${amountleft[i]}`;
        break;
      case 1:
        document.getElementById(
          "player2pointsLeft"
        ).innerText = `${amountleft[i]}`;
        break;
      case 2:
        document.getElementById(
          "player3pointsLeft"
        ).innerText = `${amountleft[i]}`;
        break;
      case 3:
        document.getElementById(
          "player4pointsLeft"
        ).innerText = `${amountleft[i]}`;
        break;
    }

    //Jos pelaaja pääsee 0:n, hän voittaa legin
    if (amountleft[i] === 0) {
      playerLegsWon[i] += 1;
      resetGame(true); //Nollaa peli, mutta säilyttää voitettujen legien määrän
      alert(
        `Player: ${names[i]} wins the leg! Total legs won: ${playerLegsWon[i]}`
      );
      updateSetSize();
      //Päivitetään näytölle voitettujen legien määrä
      switch (i) {
        case 0:
          player1wins.innerText = `${playerLegsWon[i]}`;
          break;
        case 1:
          player2wins.innerText = `${playerLegsWon[i]}`;
          break;
        case 2:
          player3wins.innerText = `${playerLegsWon[i]}`;
          break;
        case 3:
          player4wins.innerText = `${playerLegsWon[i]}`;
          break;
      }
      winnerCheck(); //Tarkistetaan onko peli voitettu
    }
  }
}
//Nollaa peli
function resetGame(legWon) {
  //Nollaa kaikki pelaajien pisteet ja legit
  let gameLength = gameMode();
  for (let i = 0; i < playerCount; i++) {
    players[i] = [];
    playerPoints[i] = 0;
    playerLegsWon[i] = legWon ? playerLegsWon[i] : 0;
    amountleft[i] = gameLength;
    changeCurrentSetCount(getSetCount());
    currentSet.innerText = `Current set: ${currentSetCount}`;
  }
  console.log(amountleft + " " + playerLegsWon);

  //Päivitetään näytölle ------------HUOM! Tekstit poistettu, jätetty vain numeroarvot -Elisa
  document.getElementById("player1pointsLeft").innerText = ` ${amountleft[0]}`;
  player1wins.innerText = ` ${playerLegsWon[0]}`;
  document.getElementById("player2pointsLeft").innerText = ` ${amountleft[1]}`;
  player2wins.innerText = ` ${playerLegsWon[1]}`;
  document.getElementById("player3pointsLeft").innerText = ` ${amountleft[2]}`;
  player3wins.innerText = ` ${playerLegsWon[2]}`;
  document.getElementById("player4pointsLeft").innerText = ` ${amountleft[3]}`;
  player4wins.innerText = ` ${playerLegsWon[3]}`;

  //Tyhjennetään pistetaulukot
  for (let i = 0; i < playerCount; i++) {
    let table = playerTables[i];
    for (let j = 0; j < table.rows[0].cells.length; j++) {
      table.rows[0].cells[j].innerHTML = "";
    }
  }
}

function addToScore() {
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
  nextTurn();

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

function SetSize() {
  currentSet.innerText = `Current set: ${currentSetCount}`;
  console.log("Set size initialized:", currentSetCount);
}

export { addToScore, resetGame, giveNames, enforceValueLimits };
