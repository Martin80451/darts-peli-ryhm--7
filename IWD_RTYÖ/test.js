// Simple non-interactive tests for the darts modules
const LisaaPelaaja = require('./lisaaPelaaja');
const PeliMode = require('./Pelimode');

// Test player addition
const peli = new LisaaPelaaja();
peli.lisaaUusipelaaja('Alice', 0);
peli.lisaaUusipelaaja('Bob', 0);
const names = peli.getKaikkiPelaajat().map(p => p.getPelaajaNimi());
if (names.length !== 2 || names[0] !== 'Alice' || names[1] !== 'Bob') {
  console.error('Player addition failed', names);
  process.exit(1);
}

// Test PeliMode
const pm = new PeliMode();
pm.annaPelinPituus('l');
if (pm.pelinPituus !== 301) {
  console.error('PeliMode short failed', pm.pelinPituus);
  process.exit(1);
}
pm.annaPelinPituus('p');
if (pm.pelinPituus !== 501) {
  console.error('PeliMode long failed', pm.pelinPituus);
  process.exit(1);
}

console.log('All tests passed');
