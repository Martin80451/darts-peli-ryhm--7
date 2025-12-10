document.addEventListener("DOMContentLoaded", function () {
  // const startGameBtn = document.getElementById("startGame");
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

  let randomizer = false; //TODO Tämän arvon korvaa/ otetaan main/aloitus sivulta, random checkboxin tilasta.
  document.getElementById("randomizePlayersCheck").checked
    ? (randomizer = true)
    : (randomizer = false);
  const playerSelect = document.getElementById("numPlayers");

  function getPlayerCount(givenPlayerCount) {
    var playerCount = givenPlayerCount; //TODO oletuksena 2 pelaajaa. Tämän arvon olisi tarkoitus saada main/aloitus sivulta.
    console.log(playerCount);
    return playerCount;
  }
  playerSelect.addEventListener("change", (e) => {
    giveNames(e.target.value);
  });
  // giveNames jonka periaate on tulkita aktiivisten pelaajien määrä ja piilottaa tarpeettomat syötekentät
  function giveNames(givenPlayerCount) {
    const count = getPlayerCount(givenPlayerCount);
    p3Input.hidden = count < 3;
    p4Input.hidden = count < 4;
  }

  //PopUp randomaizer logiikka
  function showPopup(playerNum) {
    const popupImg = document.getElementById("popupImg");
    const popupPlayerNum = document.getElementById("popupPlayerNum");
    const overlay = document.getElementById("overlay");

    const images = {
      1: "RTyö_kolikot/KolikkoYks.png",
      2: "RTyö_kolikot/KolikkoKaks.png",
      3: "RTyö_kolikot/KolikkoKolme.png",
      4: "RTyö_kolikot/KolikkoNelja.png",
    };

    popupImg.src = images[playerNum];
    popupPlayerNum.textContent = playerNum;

    overlay.style.display = "flex";
  }

  function closePopup() {
    document.getElementById("overlay").style.display = "none";
  }

  giveNames();
  console.log("after init:", p3Input, p4Input);

  document.getElementById("startGame").addEventListener("click", () => {
    const numPlayers = numPlayersInput.value;
    const gameType = gameTypeSelect.value;
    const setSize = setSizeInput.value;

    const p1name = p1Input.value.trim();
    const p2name = p2Input.value.trim();
    const p3name = p3Input.hidden ? null : p3Input.value.trim();
    const p4name = p4Input.hidden ? null : p4Input.value.trim();

    console.log("Player names:");
    console.log("Player 1:", p1name);
    console.log("Player 2:", p2name);
    console.log("Player 3:", p3name);
    console.log("Player 4:", p4name);

    const names = [p1name, p2name, p3name, p4name];
    const playersInGame = names
      .map((n, i) => (n ? i + 1 : null)) //Loopataan aktiiviset pelaajat ja filtteröidään nullit pois
      .filter((n) => n !== null);
    const playerNamesInGame = names
      .map((n) => (n ? n : null)) //Loopataan aktiiviset pelaajat ja filtteröidään nullit pois
      .filter((n) => n !== null);

    if (randomizer) {
      // Valitsee yhden pelaajan satunnaisesti aktiivisista pelaajista jos randomizer on true
      const startingPlayer =
        playersInGame[Math.floor(Math.random() * playersInGame.length)];
      showPopup(startingPlayer);
    } else {
      //TODO: Muuta tämä osio siten, että se ohjaa pelaajan suoraan peliin ilman popupia.
    }

    console.log("Player names set to:", p1name, p2name, p3name, p4name);

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
        document.getElementById("randomizePlayersCheck").checked ? "Yes" : "No"
      }</p>
      <p><strong>Game Type:</strong> ${gameType}</p>
      <p><strong>Set Size:</strong> ${setSize}</p>
      <p>Are you sure you want to start the game with these settings?</p>
    `;
    popup.style.display = "block";
  });

  // siirtyy scorecounter.html sivulle, (tarvis viellä tapa nimetä pelaajat)
  // TODO: tähän lisäys että tulis joko uusi popup jossa nimetään pelaajat
  continuePopupBtn.addEventListener("click", function () {
    window.location.href = "PelaajatJaKolikot/annaNimet.html";
  });

  closePopupBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // sulkee popupin jos klikkaa sen ulkopuolelle
  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  };
});
