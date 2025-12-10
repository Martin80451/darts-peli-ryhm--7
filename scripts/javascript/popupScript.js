document.addEventListener('DOMContentLoaded', function () {
  const startGameBtn = document.getElementById('startGame');
  const numPlayersInput = document.getElementById('numPlayers');
  const gameTypeSelect = document.getElementById('gameType');
  const setSizeInput = document.getElementById('setSize');

  const popup = document.getElementById('settingsPopupBackground');
  const popupContent = document.getElementById('popupContent');
  const continuePopupBtn = document.getElementById('continuePopup');
  const closePopupBtn = document.getElementById('closePopup');

  startGameBtn.addEventListener('click', function () {
    const numPlayers = numPlayersInput.value;
    const gameType = gameTypeSelect.value;
    const setSize = setSizeInput.value;

    // popupin sisältö
    popupContent.innerHTML = `
      <h2>Confirm Game Settings?</h2>
      <p><strong>Number of Players:</strong> ${numPlayers}</p>
      <p><strong>Randomize First Player:</strong> ${document.getElementById('randomizePlayersCheck').checked ? 'Yes' : 'No'}</p>
      <p><strong>Game Type:</strong> ${gameType}</p>
      <p><strong>Set Size:</strong> ${setSize}</p>
      <p>Are you sure you want to start the game with these settings?</p>
    `;
    popup.style.display = 'block';
  });

  // siirtyy scorecounter.html sivulle, (tarvis viellä tapa nimetä pelaajat)
  // TODO: tähän lisäys että tulis joko uusi popup jossa nimetään pelaajat
  continuePopupBtn.addEventListener('click', function () {
    window.location.href = 'PelaajatJaKolikot/annaNimet.html';
  });

  closePopupBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });

  // sulkee popupin jos klikkaa sen ulkopuolelle
  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = 'none';
    }
  };
});
