import 'reflect-metadata';
import { SocketManagerImpl } from "./services/impl/SocketManagerImpl";
import { InversifyInitImpl } from "./services/impl/InversifyInitImpl";
import { InversifyInit } from "./services/contracts/InversifyInit";
import { Container } from "inversify";
import { SocketManager } from "./services/contracts/SocketManager";
import { LogManagerImpl } from './services/impl/LogManagerImpl';
import { LogManager } from './services/contracts/LogManager';

/**
 * Classe de gestion de l'application globale.
 */
class App {

    /**
     * Fonction d'initialisation de l'application
     */
    public static init(): void {

        // Initialisation du moteur d'injection de dépendance
        InversifyInitImpl.init();

        // Effacement de la console
        const lm: LogManager = InversifyInitImpl.getFromContainer(LogManagerImpl);
        lm.clear();

        // Récupération du SocketManager, et initialisation
        const sm: SocketManager = InversifyInitImpl.getFromContainer(SocketManagerImpl);
        sm.init();
    }

}

App.init();
