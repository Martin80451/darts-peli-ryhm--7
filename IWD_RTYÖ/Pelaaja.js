class Pelaaja {
  constructor(nimi, pisteet) {
    this.pelaajaNimi = nimi;
    this.pelaajanPisteet = pisteet;
  }

  getPelaajaNimi() {
    return this.pelaajaNimi;
  }

  toString() {
    return `${this.pelaajaNimi} (${this.pelaajanPisteet} pistettä)`;
  }
}

module.exports = Pelaaja;
