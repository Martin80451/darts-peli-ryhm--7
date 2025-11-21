package dartsPeli;

public class peliMode {

    private int pelinPituus;
    private int pitkäPeli = 501;
    private int lyhytPeli = 301;



    public int annaPelinPituus(String pelinPituus){
     if (pelinPituus.equals("l")){
         this.pelinPituus = lyhytPeli;
     } else if (pelinPituus.equals("p")) {
         this.pelinPituus = pitkäPeli;
     } else {
         System.out.println("Annettua muoto ei ole olemassa");
     }
    return this.pelinPituus;
    }

    public String toString() {
        return "Valittu peli pelataan " + this.pelinPituus + " pisteestä.";
    }
}
