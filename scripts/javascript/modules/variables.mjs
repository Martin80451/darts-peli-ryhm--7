import { getPlayerCount, gameMode, getSetCount } from "./storage.mjs";

//-------------------INDEX.JS MUUTTUJAT---------------------------//
const numPlayersInput = document.getElementById("numPlayers");
const gameTypeSelect = document.getElementById("gameType");
const setSizeInput = document.getElementById("setSize");

const p1Input = document.getElementById("player1");
const p2Input = document.getElementById("player2");
const p3Input = document.getElementById("player3");
const p4Input = document.getElementById("player4");

const popup = document.getElementById("settingsPopupBackground");
const popupContent = document.getElementById("popupContent");
const continuePopupBtn = document.getElementById("continuePopup");
const closePopupBtn = document.getElementById("closePopup");
const closePopupPlayerChosen = document.getElementById(
  "closePopupPlayerChosen"
);

let names = [];
let playerNamesInGame;
let selectedGameType = null;
let selectedSetSize = null;
let randomizer = false;
const playerSelect = document.getElementById("numPlayers");
const randomizePlayersCheck = document.getElementById("randomizePlayersCheck");

//-------------------SCORECOUNTER.JS MUUTTUJAT---------------------------//
const _storedGameRaw = localStorage.getItem("gameData");
const _storedGameData = _storedGameRaw ? JSON.parse(_storedGameRaw) : null;
//-------------------MUUTTUJAT JA ALUSTUKSET---------------------------//

//Alustetaan pelaajat 1, 2, 3 ja 4
const player1Header = document.getElementById("player1Name");
const player2Header = document.getElementById("player2Name");
const player1Table = document.getElementById("player1Score");
const player2Table = document.getElementById("player2Score");
const player3Header = document.getElementById("player3Name");
const player4Header = document.getElementById("player4Name");
const player3Table = document.getElementById("player3Score");
const player4Table = document.getElementById("player4Score");

//Pelaajien pistemäärien päivitys
const player1wins = document.getElementById("player1wins");
const player2wins = document.getElementById("player2wins");
const player3wins = document.getElementById("player3wins");
const player4wins = document.getElementById("player4wins");

const player3PointsLeft = document.getElementById("player3pointsLeft");
const player4PointsLeft = document.getElementById("player4pointsLeft");

//Kootaan pelaajat ja taulukot listoiksi helpompaa käsittelyä varten
const allPlayers = [player1Header, player2Header, player3Header, player4Header];
const allTables = [player1Table, player2Table, player3Table, player4Table];

const playerCount = getPlayerCount();

//Lisätään aktiiviset pelaajat ja taulukot listoihin
const playerHeaders = allPlayers.slice(0, playerCount);
const playerTables = allTables.slice(0, playerCount);
console.log("Active player headers:", playerHeaders);
console.log("Active player tables:", playerTables);

const players = [];
for (let i = 0; i < playerCount; i++) {
  players.push([]);
}

const scoreInput = document.getElementById("score");
const playerPoints = [0, 0, 0, 0];
const playerLegsWon = [0, 0, 0, 0];
const amountleft = [];
const gameType = gameMode();
for (let i = 0; i < playerCount; i++) {
  amountleft.push(gameType);
}

let turns = 0;
// Aseta aloitus pelaaja, jos on määritetty
if (_storedGameData && _storedGameData.startingPlayer) {
  turns = Number(_storedGameData.startingPlayer) - 1;
}
const currentSet = document.getElementById("set");
let currentSetCount;
changeCurrentSetCount(getSetCount());

//-------------------MUUTTUJAN TILAN KÄSITTELIJÄFUNKTIOT---------------------------//
function nextTurn() {
  turns += 1;
}

function changeRandomizerValue(value) {
  randomizer = value;
}

function setSelectedGameType(value) {
  selectedGameType = value;
}
function setSelectedSetSize(value) {
  selectedSetSize = value;
}
function setNames(value) {
  names = value;
}
function setPlayerNamesInGame(value) {
  playerNamesInGame = value;
}
function changeCurrentSetCount(value) {
  currentSetCount = value;
}
function decrementCurrentSetCount() {
  currentSetCount -= 1;
}

export {
  _storedGameRaw,
  _storedGameData,
  player1Header,
  player2Header,
  player3Header,
  player4Header,
  player1Table,
  player2Table,
  player3Table,
  player4Table,
  player1wins,
  player2wins,
  player3wins,
  player4wins,
  allPlayers,
  allTables,
  playerHeaders,
  playerTables,
  playerCount,
  players,
  scoreInput,
  playerPoints,
  playerLegsWon,
  amountleft,
  gameType,
  turns,
  nextTurn,
  numPlayersInput,
  gameTypeSelect,
  setSizeInput,
  p1Input,
  p2Input,
  p3Input,
  p4Input,
  popup,
  popupContent,
  continuePopupBtn,
  closePopupBtn,
  closePopupPlayerChosen,
  names,
  playerNamesInGame,
  selectedGameType,
  selectedSetSize,
  randomizer,
  playerSelect,
  randomizePlayersCheck,
  changeRandomizerValue,
  setSelectedGameType,
  setSelectedSetSize,
  setNames,
  setPlayerNamesInGame,
  currentSet,
  currentSetCount,
  changeCurrentSetCount,
  decrementCurrentSetCount,
  player3PointsLeft,
  player4PointsLeft,
};
