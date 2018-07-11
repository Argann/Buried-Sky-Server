/**
 * Classe permettant la gestion des logs au sein de l'application
 */
export interface LogManager {

    /**
     * Fonction permettant un simple affichage de debug du message 'Hello World!'
     */
    helloworld(): void;

    /**
     * Fonction permettant d'afficher un message de debug
     * @param classe Nom de la classe voulant afficher le debug
     * @param message Message à afficher dans le debug
     */
    debug(classe: String, message: String): void;

}