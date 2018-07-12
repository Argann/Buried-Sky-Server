import { InversifyInit } from "../contracts/InversifyInit";
import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

export class InversifyInitImpl implements InversifyInit {

    public static container: Container;

    /**
     * Fonction permettant de récupérer l'instance d'une classe définie
     * dans le conteneur de l'IoC
     * @param className Classe dont il faut récupérer l'instance
     */
    public static getFromContainer(className: any): any {
        if (className) {
            return InversifyInitImpl.container.get(className);
        } else {
            throw new Error('InversifyNotInitialised : You must initialize Inversify before calling GetFromContainer.');
        }
    }

    /**
     * Fonction permettant d'initialiser le moteur d'injection de dépendance
     */
    public static init() {
        InversifyInitImpl.container = new Container();
        InversifyInitImpl.container.load(buildProviderModule());
    }

}