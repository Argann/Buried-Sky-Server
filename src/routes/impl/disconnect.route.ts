import { Route } from "../contracts/route";
import { inject } from "../../../node_modules/inversify";
import { LogManagerImpl } from "../../services/impl/LogManagerImpl";
import { LogManager } from "../../services/contracts/LogManager";
import { provide } from "../../../node_modules/inversify-binding-decorators";
import socketIO from 'socket.io';
import { PlayerSocket } from "../../models/PlayerSocket";

@provide(RDisconnect)
export class RDisconnect implements Route {

    private _logManager: LogManager;
    private _registeredName: string = 'disconnect';

    constructor(
        @inject(LogManagerImpl) logManager: LogManager
    ){
        this._logManager = logManager;
    }

    getRegisteredName(): string {
        return this._registeredName;
    }
    
    onCall(socket: PlayerSocket, reason: string): void {
        this._logManager.debug('RDisconnect', `Le client ${socket.id} vient de se déconnecter : ${reason}`);
    }


}