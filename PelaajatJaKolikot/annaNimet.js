
let randomizer = false; //TODO Tämän arvon korvaa/ otetaan main/aloitus sivulta, random checkboxin tilasta.
const randomizePlayersCheck = document.getElementById("randomizePlayersCheck").checked ? randomizer = true : randomizer = false;


function getPlayerCount() {
    var playerCount = 3; //TODO oletuksena 2 pelaajaa. Tämän arvon olisi tarkoitus saada main/aloitus sivulta.
    return playerCount;
}

// giveNames jonka periaate on tulkita aktiivisten pelaajien määrä ja piilottaa tarpeettomat syötekentät
function giveNames() {
    const count = getPlayerCount();
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

function initialize() {
    p1Input = document.getElementById('player1');
    p2Input = document.getElementById('player2');
    p3Input = document.getElementById('player3');
    p4Input = document.getElementById('player4');

    giveNames();
    console.log('after init:', p3Input, p4Input);

    document.getElementById('startGame').addEventListener('click', () => {
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
            .map((n, i) => n ? i + 1 : null) //Loopataan aktiiviset pelaajat ja filtteröidään nullit pois
            .filter(n => n !== null);

        if (randomizer) {
            // Valitsee yhden pelaajan satunnaisesti aktiivisista pelaajista jos randomizer on true
            const startingPlayer = playersInGame[Math.floor(Math.random() * playersInGame.length)];
            showPopup(startingPlayer);
        } else {
        //TODO: Muuta tämä osio siten, että se ohjaa pelaajan suoraan peliin ilman popupia.
        }

        console.log('Player names set to:', p1name, p2name, p3name, p4name);
    });

};

window.addEventListener('load', initialize);