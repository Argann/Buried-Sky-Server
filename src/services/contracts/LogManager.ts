/**
 * Classe permettant la gestion des logs au sein de l'application
 */
export interface LogManager {

    /**
     * Fonction permettant un simple affichage de debug du message 'Hello World!'
     */
    helloWorld(): void;

    /**
     * Fonction effaçant le contenu de la console
     */
    clear(): void;

    /**
     * Fonction permettant d'afficher un message de debug
     * @param classe Nom de la classe voulant afficher le debug
     * @param message Message à afficher dans le debug
     */
    debug(classe: String, message: String): void;

    /**
     * Fonction permettant d'afficher un message d'erreur
     * @param classe Nom de la classe voulant afficher l'erreur
     * @param message Message à afficher dans l'erreur
     */
    error(classe: String, message: String): void;

}