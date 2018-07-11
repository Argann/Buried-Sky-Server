import { Container } from "inversify";

export interface InversifyInit {

    /**
     * Fonction permettant d'initialiser Inversify, et de récupérer son conteneur.
     * @returns Le conteneur Inversify de l'application
     */
    init(): Container;
}