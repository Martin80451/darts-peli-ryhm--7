import { getPlayerCount, getPlayerNames } from "./storage.mjs";

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

//Aseta pelimuoto, pitkää(501) vai lyhyttä(301) peliä
function gameMode() {
  // Hae local storagesta pelimoodi
  if (_storedGameData && _storedGameData.gameType) {
    return Number(_storedGameData.gameType);
  }
  // default
  return 301;
}

export { setupPlayerNames, givePlayersScoreboard, gameMode };