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

@provide(RMatchmakingCancel)
export class RMatchmakingCancel implements Route {

    private _registeredName: string = 'matchmaking_cancel';

    constructor(
        @inject(LogManagerImpl) private _logManager: LogManager,
        @inject(MatchmakerImpl) private _matchmaker: Matchmaker
    ){
    }

    getRegisteredName(): string {
        return this._registeredName;
    }
    
    onCall(socket: PlayerSocket): void {

        if (socket.state !== PlayerState.WAITING) {
            this._logManager.error('RMatchmakingCancel', `Le socket ${socket.id} tente d'annuler un matchmaking sans être en attente.`);
        } else {
            this._logManager.debug('RMatchmakingCancel', `${socket.username} n'est plus en attente !`);
            this._matchmaker.removePlayerOfQueue(socket);
            socket.state = PlayerState.LOGGED;
        }

    }


}