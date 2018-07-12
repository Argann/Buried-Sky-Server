import { Route } from "../contracts/route";
import { inject } from "../../../node_modules/inversify";
import { LogManagerImpl } from "../../services/impl/LogManagerImpl";
import { LogManager } from "../../services/contracts/LogManager";
import { provide } from "../../../node_modules/inversify-binding-decorators";
import socketIO from 'socket.io';
import { PlayerSocket } from "../../models/PlayerSocket";
import { PlayerState } from "../../models/PlayerState";

@provide(RConnection)
export class RConnection implements Route {

    private _logManager: LogManager;
    private _registeredName: string = 'connection';

    constructor(
        @inject(LogManagerImpl) logManager: LogManager
    ){
        this._logManager = logManager;
    }

    getRegisteredName(): string {
        return this._registeredName;
    }
    
    onCall(socket: PlayerSocket): void {
        this._logManager.debug('RConnection', `Le client ${socket.id} vient de se connecter.`);
        socket.username = 'NONAME';
        socket.state = PlayerState.CONNECTED;
    }


}