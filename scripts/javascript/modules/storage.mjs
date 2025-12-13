import { _storedGameData } from "./variables.mjs";

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
//Aseta pelimuoto, pitkää(501) vai lyhyttä(301) peliä
function gameMode() {
  // Hae local storagesta pelimoodi
  if (_storedGameData && _storedGameData.gameType) {
    return Number(_storedGameData.gameType);
  }
  // default
  return 301;
}

export { getPlayerNames, getPlayerCount, getSetCount, gameMode };