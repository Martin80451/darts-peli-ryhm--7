package dartsPeli;

import java.util.Scanner;

public class dartsMain {
    public static void main(String[] args) {

        //Lisää pelaajat ja hae pelaaja(t).
        Scanner main = new Scanner(System.in);

        lisääPelaaja peli = new lisääPelaaja();

        int i = 0;
        while (i < 2) {
            System.out.println("Anna pelaajan nimi: ");
            String lisääUusi = main.nextLine();
            peli.lisääUusipelaaja(lisääUusi, 0);
            i++;
        }
        System.out.println(peli.getKaikkiPelaajat());
        peli.haePelaaja();


        //Valitse pelin pituus ("l" = lyhyt/301p, "p" = pitkä/501p)
        peliMode valitsePelimode = new peliMode();


        //"l" = lyhyt/301p
        valitsePelimode.annaPelinPituus("l");
        System.out.println("\n*Lyhyt pelimuoto*\n" + valitsePelimode);
        //"p" = pitkä/501p
        valitsePelimode.annaPelinPituus("p");
        System.out.println("\n*Pitkä pelimuoto*\n" + valitsePelimode);
    }
}
