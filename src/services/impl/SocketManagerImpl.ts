import { SocketManager } from "../contracts/SocketManager";
import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { LogManager } from "../contracts/LogManager";
import { LogManagerImpl } from "./LogManagerImpl";
import express from "express";
import { Server } from 'http';
import { Route } from "../../routes/contracts/route";
import { RHelloWorld } from "../../routes/impl/helloWorld.route";
import { InversifyInitImpl } from "./InversifyInitImpl";
import socketIO from 'socket.io';
import { RDisconnect } from "../../routes/impl/disconnect.route";
import { RConnection } from "../../routes/impl/connection.route";
import ROUTES from '../../routes/ROUTES';
import { PlayerSocket } from "../../models/PlayerSocket";

/**
 * Classe de gestion du socket issu de Socket.io
 */
@provide(SocketManagerImpl)
export class SocketManagerImpl implements SocketManager {

    private _logManager: LogManager;
    private _app: any;
    private _server: any;
    private _io: socketIO.Server;


    constructor(
        @inject(LogManagerImpl) logManager: LogManagerImpl
    ) {
        this._logManager = logManager;
    }

    /**
     * Fonction d'initialisation du manager.
     */
    init(): void {
        this._logManager.debug('SocketManager', 'Initialisation du Socket Manager');

        this._app = express();
        this._server = new Server(this._app);

        this._io = socketIO(this._server);

        this.registerRoutes();

        this._server.listen(3000, () => this._logManager.debug('SocketManager', 'Serveur écoutant sur le port 3000'));
    }

    registerRoutes(): void {
        this._io.on('connection', (socket: PlayerSocket) => {

            const rconnect: RConnection = InversifyInitImpl.getFromContainer(ROUTES.connectionRoute);
            rconnect.onCall(socket);

            ROUTES.routes
                .map(route => InversifyInitImpl.getFromContainer(route))
                .forEach((r: Route) => {
                    this._logManager.debug('SocketManager', `Inscription de la route \`${r.getRegisteredName()}\` `);

                    socket.on(r.getRegisteredName(), (data: any) => r.onCall(socket, data))
                });
        })
    }

}