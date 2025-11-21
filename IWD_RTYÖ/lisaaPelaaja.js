const Pelaaja = require('./Pelaaja');

class LisaaPelaaja {
  constructor() {
    this.kaikkiPelaajat = [];
    this.pelaaja = null;
  }

  lisaaUusipelaaja(nimi, pisteet) {
    this.pelaaja = new Pelaaja(nimi, pisteet);
    this.kaikkiPelaajat.push(this.pelaaja);
  }

  getKaikkiPelaajat() {
    return this.kaikkiPelaajat;
  }

  async haePelaaja() {
    const nimi = await this.prompt("Syötä pelaajan nimi: ");

    for (const p of this.kaikkiPelaajat) {
      if (p.getPelaajaNimi().toLowerCase() === nimi.toLowerCase()) {
        console.log("Löytyi: " + p.toString());
        return p;
      }
    }

    console.log("Pelaajaa ei löytynyt.");
    return null;
  }

  prompt(question) {
    return new Promise((resolve) => {
      const rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  toString() {
    return "pelaaja " + this.pelaaja;
  }
}

module.exports = LisaaPelaaja;
