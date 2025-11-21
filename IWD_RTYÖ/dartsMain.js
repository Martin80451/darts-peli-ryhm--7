async function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function kysy(question) {
        return new Promise(resolve => readline.question(question, resolve));
    }

    const LisaaPelaaja = require('./lisaaPelaaja');
    const PeliMode = require('./Pelimode');

    const peli = new LisaaPelaaja();

    let i = 0;
    while (i < 2) {
        const lisääUusi = await kysy("Anna pelaajan nimi: ");
        peli.lisaaUusipelaaja(lisääUusi, 0);
        i++;
    }

    console.log(peli.getKaikkiPelaajat());
    peli.haePelaaja();

    const valitsePelimode = new PeliMode();

    valitsePelimode.annaPelinPituus("l");
    console.log("\n*Lyhyt pelimuoto*\n" + valitsePelimode.toString());

    valitsePelimode.annaPelinPituus("p");
    console.log("\n*Pitkä pelimuoto*\n" + valitsePelimode.toString());

    readline.close();
}

main();