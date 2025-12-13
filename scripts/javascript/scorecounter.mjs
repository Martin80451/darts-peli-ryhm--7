import { getPlayerCount, setupPlayerNames, givePlayersScoreboard, gameMode } from "./modules/state.mjs";
import { showPopup, closePopup } from "./modules/popup.mjs";
import { getPlayerCount } from "./modules/storage.mjs";
import { setupPlayerNames, givePlayersScoreboard, gameMode } from "./modules/init.mjs";


const _storedGameRaw = localStorage.getItem("gameData");
const _storedGameData = _storedGameRaw ? JSON.parse(_storedGameRaw) : null;
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

