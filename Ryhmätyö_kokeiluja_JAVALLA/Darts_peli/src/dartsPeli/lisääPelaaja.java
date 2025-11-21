package dartsPeli;

import java.util.ArrayList;

import java.util.Scanner;


public class lisääPelaaja {

    private Object pelaaja;

    ArrayList<Pelaaja> kaikkiPelaajat = new ArrayList<Pelaaja>();


    public void lisääUusipelaaja(String nimi, int pisteet){
        pelaaja = new Pelaaja(nimi, pisteet);
        kaikkiPelaajat.add((Pelaaja) pelaaja);
    }

    public ArrayList<Pelaaja> getKaikkiPelaajat() {
        return kaikkiPelaajat;
    }

    public Pelaaja haePelaaja() {
        System.out.print("Syötä pelaajan nimi: ");
        Scanner etsiPelaaja = new Scanner(System.in);
        String nimi = etsiPelaaja.nextLine();

        for (Pelaaja p : kaikkiPelaajat) {
            if (p.getPelaajaNimi().equals(nimi)) {
                System.out.println("Löytyi: " + p);
                return p;
            }
        }

        System.out.println("Pelaajaa ei löytynyt.");
        return null;
    }

    @Override
    public String toString() {
        return "pelaaja " + this.pelaaja;
    }
}
