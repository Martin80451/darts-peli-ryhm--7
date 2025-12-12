
function getPlayerNames() {
    var playerNames = ["Thomas", "Elisa", "Martin", "Eetu"]; //TODO Otetaan nimet main/aloitus sivulta...
    return playerNames;
}
function getPlayerCount() {
    var playerCount = 3; //TODO oletuksena 2 pelaajaa. Tämän arvon olisi tarkoitus saada main/aloitus sivulta..
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
    player3wins.style.display = count < 3 ? "none" : "flex";
    player4wins.style.display = count < 4 ? "none" : "flex";
    //piilota pelaajien pistetaulukot
    player4Table.style.display = count < 4 ? "none" : "flex";
    player3Table.style.display = count < 3 ? "none" : "flex";
}


//-------------------MUUTTUJAT JA ALUSTUKSET---------------------------//

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
gameMode(); //TODO: Muuta alkupisteet dynaamisesti aloitusnäytöltä
for (let i = 0; i < playerCount; i++) {
  amountleft.push(gameMode());
}
//Pelaajien pistemäärien päivitys
const player1wins = document.getElementById("player1wins");
const player2wins = document.getElementById("player2wins");
const player3wins = document.getElementById("player3wins");
const player4wins = document.getElementById("player4wins");
setupPlayerNames();
givePlayersScoreboard();

//Nollaa pisteet button
const resetScoresButton = document.getElementById("resetGame"); //<-------------------------------------NOLLAA PISTEET BUTTON
 resetScoresButton.addEventListener("click", () => {
  resetGame();
});

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

//Aseta pelimuoto, pitkää(501) vai lyhyttä(301) peliä
function gameMode(){
  let short = true;  //TODO: Muuta alkupisteet dynaamisesti aloitusnäytöltä
  let selectedMode;

  let gamemodeShort = 1;
  let gamemodeLong = 501;

  if (short){
    selectedMode = gamemodeShort;
  }
  else{
    selectedMode = gamemodeLong;
  }
  return selectedMode;
}


//Tarkista onko kukaan voittanut peliä
function winnerCheck() { //TODO: kokeile tuleeko pelaaja nimet oikein erien ja pelin loputtua
  const names = getPlayerNames();
  for (let i = 0; i < playerCount; i++) {
    if (playerLegsWon[i] >= 3) { //TODO: Muuta voittoon tarvittavien legien määrä dynaamisesti aloitusnäytöltä
      alert(`Player: ${names[i]} wins the game!`);
      resetGame();
    }
  }
}
//Pelaajien pistemäärät ja jäljellä olevat pisteet
function playerPointsUpdate() {
  const gameLenght = gameMode();
  const names = getPlayerNames();
  //Lasketaan pelaajien pistemäärät ja vähennetään ne aloituspisteistä.
  for (let i = 0; i < playerCount; i++) {
    playerPoints[i] = players[i].reduce((a, b) => Number(a) + Number(b), 0);
    console.log(`Player ${i + 1} points: ${playerPoints[i]}`);
    amountleft[i] = gameLenght - playerPoints[i];
    console.log(`Player ${i + 1} amount left: ${amountleft[i]}`);
    //Päivitetään näytölle jäljellä olevat pisteet
    switch (i) {
      case 0: 
      document.getElementById("player1pointsLeft").innerText = `points left: ${amountleft[i]}`; 
      break;
      case 1: 
      document.getElementById("player2pointsLeft").innerText = `points left: ${amountleft[i]}`; 
      break;
      case 2: 
      document.getElementById("player3pointsLeft").innerText = `points left: ${amountleft[i]}`; 
      break;
      case 3: 
      document.getElementById("player4pointsLeft").innerText = `points left: ${amountleft[i]}`; 
      break;
    }

    //Jos pelaaja pääsee 0:n, hän voittaa legin
    if (amountleft[i] === 0) {
      playerLegsWon[i] += 1;
      amountleft.splice(i,0, gameLenght);
      players[i] = []; //Tyhjennetään pelaajan piste lista seuraavaa legiä varten
      winnerCheck(); //Tarkistetaan onko peli voitettu
      alert(`Player: ${names[i]} wins the leg! Total legs won: ${playerLegsWon[i]}`);
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

//----------------Painikkeet----------------//
//Nollaa peli
function resetGame() {
  //Nollaa kaikki pelaajien pisteet ja legit
  let gameLenght = gameMode();
  for (let i = 0; i < playerCount; i++) {
    players[i] = [];
    playerPoints[i] = 0;
    playerLegsWon[i] = 0;
    amountleft[i] = gameLenght;
    //Päivitetään näytölle
    switch (i) {
      case 0: 
        document.getElementById("player1pointsLeft").innerText = `points left: ${amountleft[i]}`;
        player1wins.innerText = `legs won: ${playerLegsWon[i]}`; 
        break;
      case 1: 
        document.getElementById("player2pointsLeft").innerText = `points left: ${amountleft[i]}`;
        player2wins.innerText = `legs won: ${playerLegsWon[i]}`; 
        break;
      case 2: 
        document.getElementById("player3pointsLeft").innerText = `points left: ${amountleft[i]}`;
        player3wins.innerText = `legs won: ${playerLegsWon[i]}`; 
        break;
      case 3: 
        document.getElementById("player4pointsLeft").innerText = `points left: ${amountleft[i]}`;
        player4wins.innerText = `legs won: ${playerLegsWon[i]}`; 
        break;
    }
  }
  //Tyhjennetään pistetaulukot
  for (let i = 0; i < playerCount; i++) {
    let table = decidePlayer(playerTables);
    for (let j = 0; j < table.rows[0].cells.length; j++) {
      table.rows[0].cells[j].innerHTML = "";
    }
  }
}
//Ohittaa vanhan formin, submit toiminon. Nyt painetaan enteriä pisteen syötön jälkeen.
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

//-------------------PISTEIDEN LISÄYS JA VUORON VAIHTO---------------------------//

function addToScore(e) {
  console.log(scoreInput.value);
  let player = decidePlayer(players);
  let header = decidePlayer(playerHeaders);
  let table = decidePlayer(playerTables);
  player.unshift(scoreInput.value);
  let newestTenPoints = player.slice(0, 11);
  header.classList.add("activeBorder");
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

