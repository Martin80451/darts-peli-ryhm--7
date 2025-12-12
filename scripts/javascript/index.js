document.addEventListener("DOMContentLoaded", function () {
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

  let names = [];
  let playerNamesInGame;
  let selectedGameType = null;
  let selectedSetSize = null;
  let randomizer = false;
  document.getElementById("randomizePlayersCheck").checked
    ? (randomizer = true)
    : (randomizer = false);
  const playerSelect = document.getElementById("numPlayers");

  /**Asettaa pelaaja määrän numPlayers inputissa annetun arvon mukaan.*/
  function getPlayerCount(givenPlayerCount) {
    var playerCount = givenPlayerCount;
    return playerCount;
  }
  // Kutsuu giveNames funktion aina kun pelaaja määrää muutetaan
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
      1: "images/playercoin1.png",
      2: "images/playercoin2.png",
      3: "images/playercoin3.png",
      4: "images/playercoin4.png",
    };

    popupImg.src = images[playerNum];
    popupPlayerNum.textContent = playerNamesInGame[playerNum - 1];

    overlay.style.display = "flex";
  }

  function closePopup() {
    document.getElementById("overlay").style.display = "none";
    window.location.href = "scorecounter.html";
  }

  document
    .getElementById("closePopupPlayerChosen")
    .addEventListener("click", () => closePopup());

  giveNames(2); // Alustaa pelin kahdelle pelaajalle oletuksena

  document.getElementById("startGame").addEventListener("click", () => {
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

    document.getElementById("randomizePlayersCheck").checked
      ? (randomizer = true)
      : (randomizer = false);

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
        document.getElementById("randomizePlayersCheck").checked ? "Yes" : "No"
      }</p>
      <p><strong>Game Type:</strong> ${gameType}</p>
      <p><strong>Set Size:</strong> ${setSize}</p>
      <p>Are you sure you want to start the game with these settings?</p>
    `;
    popup.style.display = "block";
  });

  // siirtyy scorecounter.html sivulle
  continuePopupBtn.addEventListener("click", function () {
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
      showPopup(startingPlayer);
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

//TODO: Pelaajille on pakko antaa nimet ennen pelin aloittamista.
