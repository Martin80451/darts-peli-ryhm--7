import { resetGame } from "./state.mjs";

const openpopupButton = document.getElementById("changeSettings");
const closePopupButton = document.getElementById("closeButton");

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
export { showPopup, closePopup, openpopupButton, closePopupButton };
