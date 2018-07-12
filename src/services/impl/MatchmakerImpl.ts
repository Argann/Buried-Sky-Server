import { provide } from "../../../node_modules/inversify-binding-decorators";
import { PlayerSocket } from "../../models/PlayerSocket";
import { inject } from "../../../node_modules/inversify";
import { LogManagerImpl } from "./LogManagerImpl";
import { Matchmaker } from "../contracts/Matchmaker";
import { LogManager } from "../contracts/LogManager";
import { PlayerState } from "../../models/PlayerState";

@provide(MatchmakerImpl)
export class MatchmakerImpl implements Matchmaker{

    private static _waitingPlayers: Set<PlayerSocket> = new Set();

    constructor(
        @inject(LogManagerImpl) private _logManager: LogManager
    ){}

    public addPlayerToQueue(player: PlayerSocket): void {
        if (MatchmakerImpl._waitingPlayers.size > 0) {

            const opponent: PlayerSocket = MatchmakerImpl._waitingPlayers.values().next().value;

            MatchmakerImpl._waitingPlayers.delete(opponent);

            opponent.state = PlayerState.IN_MATCH;
            player.state = PlayerState.IN_MATCH;

            this._logManager.debug('Matchmaker', `Lancement du match entre ${player.username} et ${opponent.username}`);
        } else {
            MatchmakerImpl._waitingPlayers.add(player);

            player.state = PlayerState.WAITING;

            this._logManager.debug('Matchmaker', 'Ajout du joueur '+ player.username +'. Nombre de joueur en attente : '+MatchmakerImpl._waitingPlayers.size);
        }
    }

    public removePlayerOfQueue(player: PlayerSocket): void {
        this._logManager.debug('Matchmaker', `Suppression de ${player.username} de la liste des joueurs.`);
        MatchmakerImpl._waitingPlayers.delete(player);
    }



}