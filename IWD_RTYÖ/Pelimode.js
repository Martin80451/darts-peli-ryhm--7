class PeliMode {
  constructor() {
    this.pelinPituus = 0;
    this.lyhytPeli = 301;
    this.pitkaPeli = 501;
  }

  annaPelinPituus(pelinPituus) {
    if (pelinPituus === "l") {
      this.pelinPituus = this.lyhytPeli;
    } else if (pelinPituus === "p") {
      this.pelinPituus = this.pitkaPeli;
    } else {
      console.log("Annettua muoto ei ole olemassa");
    }
    return this.pelinPituus;
  }

  toString() {
    return `Valittu peli pelataan ${this.pelinPituus} pisteestä.`;
  }
}

module.exports = PeliMode;