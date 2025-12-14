import { getPlayerCount, getPlayerNames } from "./storage.mjs";
import {
  player1Header,
  player2Header,
  player3Header,
  player4Header,
  player3wins,
  player4wins,
  player3Table,
  player4Table,
  numPlayersInput,
  gameTypeSelect,
  setSizeInput,
  selectedGameType,
  selectedSetSize,
  p1Input,
  p2Input,
  p3Input,
  p4Input,
  randomizer,
  playerNamesInGame,
  randomizePlayersCheck,
  popup,
  names,
} from "./variables.mjs";
import { showPopupMain } from "./popup.mjs";

//-------------------INDEX.JS---------------------------//

function initializeGameSettings() {
  const numPlayers = numPlayersInput.value;
  const gameType = gameTypeSelect.value;
  const setSize = setSizeInput.value;

  // Tallentaa valitut asetukset muuttujiin
  selectedGameType = gameType;
  selectedSetSize = setSize;

  const p1name = p1Input.value.trim();
  const p2name = p2Input.value.trim();
  const p3name = p3Input.hidden ? null : p3Input.value.trim();
  const p4name = p4Input.hidden ? null : p4Input.value.trim();

  randomizePlayersCheck.checked ? (randomizer = true) : (randomizer = false);

  names = [p1name, p2name, p3name, p4name];
  playerNamesInGame = names
    .map((n) => (n ? n : null)) //Loopataan aktiiviset pelaajat ja filtteröidään nullit pois
    .filter((n) => n !== null);

  // popupin sisältö
  popupContent.innerHTML = `
      <h2>Confirm Game Settings?</h2>
      <p><strong>Number of Players:</strong> ${numPlayers}</p>
      <p><strong>Player names: ${
        playerNamesInGame.length == 2
          ? playerNamesInGame.join(" & ")
          : playerNamesInGame.join(", ")
      }</strong> </p>
      <p><strong>Randomize First Player:</strong> ${
        randomizePlayersCheck.checked ? "Yes" : "No"
      }</p>
      <p><strong>Game Type:</strong> ${gameType}</p>
      <p><strong>Set Size:</strong> ${setSize}</p>
      <p>Are you sure you want to start the game with these settings?</p>
    `;
  popup.style.display = "block";
}

function startGame() {
  const playersInGame = names
    .map((n, i) => (n ? i + 1 : null)) //Loopataan aktiiviset pelaajat ja filtteröidään nullit pois
    .filter((n) => n !== null);
  if (randomizer) {
    // Valitsee yhden pelaajan satunnaisesti aktiivisista pelaajista jos randomizer on true
    popup.style.display = "none";
    const startingPlayer =
      playersInGame[Math.floor(Math.random() * playersInGame.length)];
    // Tallentaa peliasetukset local storageen
    const gameData = {
      names: playerNamesInGame,
      gameType: selectedGameType,
      setSize: selectedSetSize,
      startingPlayer: startingPlayer,
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
    showPopupMain(startingPlayer);
  } else {
    // Jos randomizer on false, asettaa ensimmäisen pelaajan aloittajaksi
    popup.style.display = "none";
    const startingPlayer = playersInGame[0];
    const gameData = {
      names: playerNamesInGame,
      gameType: selectedGameType,
      setSize: selectedSetSize,
      startingPlayer: startingPlayer,
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
    window.location.href = "scorecounter.html";
  }
}

//-------------------SCORECOUNTER.JS---------------------------//

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

export {
  setupPlayerNames,
  givePlayersScoreboard,
  initializeGameSettings,
  startGame,
};
