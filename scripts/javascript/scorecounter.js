import { scoreInput } from "./modules/variables.mjs";
import { setupPlayerNames, givePlayersScoreboard } from "./modules/init.mjs";
import { addToScore } from "./modules/state.mjs";
import {
  openpopupButton,
  showPopup,
  closePopupButton,
  closePopup,
} from "./modules/popup.mjs";

setupPlayerNames();
givePlayersScoreboard();

openpopupButton.addEventListener("click", () => {
  showPopup();
});

closePopupButton.addEventListener("click", () => {
  closePopup();
});

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
        "Annettu pistemäärä ylittää heito vuoron maksimipistemäärän (180). Yritä uudelleen."
      );
    }
  }
});
