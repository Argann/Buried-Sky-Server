import { PlayerSocket } from "../../models/PlayerSocket";
import { Match } from "../../models/Match";

/**
 * Classe gérant la liste des match en cours
 */
export interface MatchManager {

    /**
     * Crée un match faisant s'affronter le joueur 1 et le joueur 2
     * @param player1 Joueur 1
     * @param player2 Joueur 2
     * @returns Retourne l'identifiant du match créé
     */
    createMatch(player1: PlayerSocket, player2: PlayerSocket): string;

    /**
     * Permet de récupérer un match ayant un identifiant particulier
     * @param id Identifiant du match à récupérer
     * @example const m: Match = mm.getMatch('abc123');
     */
    getMatch(id: string): Match;

}