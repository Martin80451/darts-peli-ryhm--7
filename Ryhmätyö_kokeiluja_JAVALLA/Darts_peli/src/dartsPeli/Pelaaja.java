package dartsPeli;



public class Pelaaja {

    private String pelaajaNimi;
    private int pelaajanPisteet;

    public Pelaaja(String nimi, int pisteet){
        this.pelaajaNimi = nimi;
        this.pelaajanPisteet = pisteet;
    }

    public String getPelaajaNimi() {
        return pelaajaNimi;
    }


    @Override
    public String toString() {
        return pelaajaNimi + " (" + pelaajanPisteet + " pistettä)";
    }
}
