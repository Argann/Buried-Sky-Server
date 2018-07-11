import 'reflect-metadata';
import { SocketManagerImpl } from "./services/impl/SocketManagerImpl";
import { InversifyInitImpl } from "./services/impl/InversifyInitImpl";
import { InversifyInit } from "./services/contracts/InversifyInit";
import { Container } from "inversify";
import { SocketManager } from "./services/contracts/SocketManager";

/**
 * Classe de gestion de l'application globale.
 */
class App {

    public static init(): void {
        const inv: InversifyInit = new InversifyInitImpl();
        const c: Container = inv.init();
        const sm: SocketManager = c.get<SocketManagerImpl>(SocketManagerImpl);
        sm.init();
    }

}

App.init();
