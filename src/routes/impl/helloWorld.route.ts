import { Route } from "../contracts/route";
import { inject } from "../../../node_modules/inversify";
import { LogManagerImpl } from "../../services/impl/LogManagerImpl";
import { LogManager } from "../../services/contracts/LogManager";
import { provide } from "../../../node_modules/inversify-binding-decorators";
import socketIO from 'socket.io';
import { PlayerSocket } from "../../models/PlayerSocket";
import { PlayerState } from "../../models/PlayerState";

@provide(RHelloWorld)
export class RHelloWorld implements Route {

    private _logManager: LogManager;
    private _registeredName: string = 'helloWorld';

    constructor(
        @inject(LogManagerImpl) logManager: LogManager
    ){
        this._logManager = logManager;
    }

    getRegisteredName(): string {
        return this._registeredName;
    }
    
    onCall(socket: PlayerSocket, message: string): void {

        if (socket.state !== PlayerState.LOGGED) {
            this._logManager.error('RHelloWorld', `Le socket ${socket.id} tente d'envoyer un message sans être identifié`);
        } else {
            this._logManager.debug('RHelloWorld', `${socket.username} envoi le message '${message}' ! `);
        }

    }


}