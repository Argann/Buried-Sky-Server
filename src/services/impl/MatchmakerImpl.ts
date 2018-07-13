import { provide } from "../../../node_modules/inversify-binding-decorators";
import { PlayerSocket } from "../../models/PlayerSocket";
import { inject } from "../../../node_modules/inversify";
import { LogManagerImpl } from "./LogManagerImpl";
import { Matchmaker } from "../contracts/Matchmaker";
import { LogManager } from "../contracts/LogManager";
import { PlayerState } from "../../models/PlayerState";
import { MatchManagerImpl } from "./MatchManagerImpl";
import { MatchManager } from "../contracts/MatchManager";

@provide(MatchmakerImpl)
export class MatchmakerImpl implements Matchmaker{

    private static _waitingPlayers: Set<PlayerSocket> = new Set();

    constructor(
        @inject(LogManagerImpl) private _logManager: LogManager,
        @inject(MatchManagerImpl) private _matchManager: MatchManager
    ){}

    public addPlayerToQueue(player: PlayerSocket): void {

        if (MatchmakerImpl._waitingPlayers.size > 0) {

            // Si des joueurs sont déjà en attente, on récupère le premier joueur venu
            const opponent: PlayerSocket = MatchmakerImpl._waitingPlayers.values().next().value;

            this._logManager.debug('Matchmaker', `L'adversaire de ${player.username} sera ${opponent.username} !`);

            // On supprime ce joueur de la liste d'attente
            MatchmakerImpl._waitingPlayers.delete(opponent);

            // On change l'état des deux joueurs
            opponent.state = PlayerState.IN_MATCH;
            player.state = PlayerState.IN_MATCH;

            // Puis on crée un nouveau match
            this._matchManager.createMatch(player, opponent);

        } else {

            // Si aucun joueur n'attend, alors on ajoute le joueur à la liste d'attente
            MatchmakerImpl._waitingPlayers.add(player);

            // On change son état courant
            player.state = PlayerState.WAITING;

            this._logManager.debug('Matchmaker', 'Ajout du joueur '+ player.username +'. Nombre de joueur en attente : '+MatchmakerImpl._waitingPlayers.size);
        }
    }

    public removePlayerOfQueue(player: PlayerSocket): void {
        this._logManager.debug('Matchmaker', `Suppression de ${player.username} de la liste des joueurs.`);
        MatchmakerImpl._waitingPlayers.delete(player);
    }



}