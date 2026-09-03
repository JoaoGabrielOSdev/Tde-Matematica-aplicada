public class ExemploMath {

    public static void main(String[] args) {

        System.out.println("=== Exemplos com java.lang.Math ===");

        double raiz = Math.sqrt(81);
        System.out.println("Raiz quadrada de 81: " + raiz);

        double potencia = Math.pow(2, 5);
        System.out.println("2 elevado a 5: " + potencia);

        int absoluto = Math.abs(-15);
        System.out.println("Valor absoluto de -15: " + absoluto);

        int maior = Math.max(10, 25);
        int menor = Math.min(10, 25);
        System.out.println("Maior valor entre 10 e 25: " + maior);
        System.out.println("Menor valor entre 10 e 25: " + menor);

        long arredondado = Math.round(7.6);
        System.out.println("7.6 arredondado: " + arredondado);

        double angulo = Math.toRadians(30);
        double seno = Math.sin(angulo);
        double cosseno = Math.cos(angulo);

        System.out.println("Seno de 30 graus: " + seno);
        System.out.println("Cosseno de 30 graus: " + cosseno);

        System.out.println("Valor aproximado de PI: " + Math.PI);
        System.out.println("Valor aproximado de E: " + Math.E);

        double x1 = 2;
        double y1 = 3;
        double x2 = 8;
        double y2 = 11;

        double distancia = Math.sqrt(
                Math.pow(x2 - x1, 2) +
                Math.pow(y2 - y1, 2)
        );

        System.out.println("\n=== Aplicação matemática ===");
        System.out.println("Ponto A: (2, 3)");
        System.out.println("Ponto B: (8, 11)");
        System.out.println("Distância entre os pontos: " + distancia);
    }
}
