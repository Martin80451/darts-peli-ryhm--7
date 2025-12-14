import { resetGame } from "./state.mjs";
import { playerNamesInGame } from "./variables.mjs";

const openpopupButton = document.getElementById("changeSettings");
const closePopupButton = document.getElementById("closeButton");

//-------------------INDEX.JS POPUPS---------------------------//

//PopUp randomaizer logiikka
function showPopupMain(playerNum) {
  const popupImg = document.getElementById("popupImg");
  const popupPlayerNum = document.getElementById("popupPlayerNum");
  const overlay = document.getElementById("overlay");

  const images = {
    1: "images/playercoin1.png",
    2: "images/playercoin2.png",
    3: "images/playercoin3.png",
    4: "images/playercoin4.png",
  };

  popupImg.src = images[playerNum];
  popupPlayerNum.textContent = playerNamesInGame[playerNum - 1];

  overlay.style.display = "flex";
}

function closePopupMain() {
  document.getElementById("overlay").style.display = "none";
  window.location.href = "scorecounter.html";
}

//-------------------SCORECOUNTER.JS POPUPS---------------------------//

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
export {
  showPopup,
  closePopup,
  openpopupButton,
  closePopupButton,
  showPopupMain,
  closePopupMain,
};
