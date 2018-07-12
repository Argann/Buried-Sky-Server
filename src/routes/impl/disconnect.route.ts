import { Route } from "../contracts/route";
import { inject } from "../../../node_modules/inversify";
import { LogManagerImpl } from "../../services/impl/LogManagerImpl";
import { LogManager } from "../../services/contracts/LogManager";
import { provide } from "../../../node_modules/inversify-binding-decorators";
import socketIO from 'socket.io';
import { PlayerSocket } from "../../models/PlayerSocket";
import { PlayerState } from "../../models/PlayerState";
import { MatchmakerImpl } from "../../services/impl/MatchmakerImpl";
import { Matchmaker } from "../../services/contracts/Matchmaker";

@provide(RDisconnect)
export class RDisconnect implements Route {

    private _registeredName: string = 'disconnect';

    constructor(
        @inject(LogManagerImpl) private _logManager: LogManager,
        @inject(MatchmakerImpl) private _matchmaker: Matchmaker
    ){}

    getRegisteredName(): string {
        return this._registeredName;
    }
    
    onCall(socket: PlayerSocket, reason: string): void {
        this._logManager.debug('RDisconnect', `Le client ${socket.id} vient de se déconnecter : ${reason}`);

        if (socket.state === PlayerState.WAITING) {
            this._matchmaker.removePlayerOfQueue(socket);
        }

    }


}