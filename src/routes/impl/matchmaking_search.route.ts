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

@provide(RMatchmakingSearch)
export class RMatchmakingSearch implements Route {

    private _registeredName: string = 'matchmaking_search';

    constructor(
        @inject(LogManagerImpl) private _logManager: LogManager,
        @inject(MatchmakerImpl) private _matchmaker: Matchmaker
    ){
    }

    getRegisteredName(): string {
        return this._registeredName;
    }
    
    onCall(socket: PlayerSocket): void {

        if (socket.state !== PlayerState.LOGGED) {
            this._logManager.error('RMatchmakingSearch', `Le socket ${socket.id} veut chercher un match dans un état invalide.`);
        } else {
            this._logManager.debug('RMatchmakingSearch', `${socket.username} est en attente de match !`);
            this._matchmaker.addPlayerToQueue(socket);
        }

    }


}