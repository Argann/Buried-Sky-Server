import { MatchManager } from "../contracts/MatchManager";
import { provide } from "../../../node_modules/inversify-binding-decorators";
import { PlayerSocket } from "../../models/PlayerSocket";
import { Match } from "../../models/Match";
import crypto from 'crypto';
import { MatchState } from "../../models/MatchState";
import { inject } from "../../../node_modules/inversify";
import { LogManagerImpl } from "./LogManagerImpl";
import { LogManager } from "../contracts/LogManager";

@provide(MatchManagerImpl)
export class MatchManagerImpl implements MatchManager {

    private static _matches: Map<string, Match> = new Map();

    constructor (
        @inject(LogManagerImpl) private _logManager: LogManager
    ) {}

    public createMatch(player1: PlayerSocket, player2: PlayerSocket): string{
        
        // Définition d'une clé unique pour le match
        let id = crypto.randomBytes(15).toString('hex');
        while (MatchManagerImpl._matches.has(id)) {
            id = crypto.randomBytes(15).toString('hex');
        };

        // Création d'un nouveau match
        const match = new Match();
        match.id = id;
        match.player1 = player1;
        match.player2 = player2;
        match.state = MatchState.WAITING_FOR_PLAYERS;

        // Sauvegarde du match
        MatchManagerImpl._matches.set(id, match);

        this._logManager.debug('MatchManager', `Création du match '${id}' opposant ${player1.username} à ${player2.username}`);

        // Retour de l'identifiant du match
        return id;
    };

    
    public getMatch(id: string): Match {
        
        // Récupération du match
        const m = MatchManagerImpl._matches.get(id);

        // Si le match n'existe pas
        if (!m) {
            this._logManager.error('MatchManager', `Tentative de récupération d'un match inexistant (id: '${id}').`);
        }
        
        this._logManager.debug('MatchManager', `Récupération du match '${id}'.`);
        return m;
    };

}