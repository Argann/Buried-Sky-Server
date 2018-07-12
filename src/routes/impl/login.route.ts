import { Route } from "../contracts/route";
import { inject } from "../../../node_modules/inversify";
import { LogManagerImpl } from "../../services/impl/LogManagerImpl";
import { LogManager } from "../../services/contracts/LogManager";
import { provide } from "../../../node_modules/inversify-binding-decorators";
import socketIO from 'socket.io';
import { PlayerSocket } from "../../models/PlayerSocket";
import { PlayerState } from "../../models/PlayerState";

@provide(RLogin)
export class RLogin implements Route {

    private _logManager: LogManager;
    private _registeredName: string = 'login';

    constructor(
        @inject(LogManagerImpl) logManager: LogManager
    ){
        this._logManager = logManager;
    }

    getRegisteredName(): string {
        return this._registeredName;
    }
    
    onCall(socket: PlayerSocket, nom: string): void {
        this._logManager.debug('RLogin', `Le socket ${socket.id} porte désormais le nom '${nom}' ! `);
        socket.username = nom;
        socket.state = PlayerState.LOGGED;
    }


}