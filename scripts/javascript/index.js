import {
  randomizer,
  randomizePlayersCheck,
  closePopupBtn,
  closePopupPlayerChosen,
  playerSelect,
  continuePopupBtn,
  popup,
  changeRandomizerValue,
} from "./modules/variables.mjs";
import { initializeGameSettings, startGame } from "./modules/init.mjs";
import { giveNames, enforceValueLimits } from "./modules/state.mjs";
import { closePopupMain } from "./modules/popup.mjs";

document.addEventListener("DOMContentLoaded", function () {
  randomizePlayersCheck.checked
    ? changeRandomizerValue(true)
    : changeRandomizerValue(false);
  document
    .getElementById("setSize")
    .addEventListener("input", (e) => enforceValueLimits(e.target));

  // Kutsuu giveNames funktion aina kun pelaajamäärää muutetaan
  playerSelect.addEventListener("change", (e) => {
    giveNames(e.target.value);
  });
  closePopupPlayerChosen.addEventListener("click", () => closePopupMain());
  giveNames(2); // Alustaa pelin kahdelle pelaajalle oletuksena

  // Avaa pelin asetukset -popupin Start Game napista ja asettaa pelin tiedot
  document
    .getElementById("startGame")
    .addEventListener("click", initializeGameSettings);

  // Siirtyy scorecounter.html sivulle
  continuePopupBtn.addEventListener("click", startGame);

  // Sulkee pelin asetukset -popupin Close-napista
  closePopupBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // Sulkee pelin asetukset -popupin jos klikkaa sen ulkopuolelle
  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  };
});
