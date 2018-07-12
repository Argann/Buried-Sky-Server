import { provide } from "../../../node_modules/inversify-binding-decorators";
import { PlayerSocket } from "../../models/PlayerSocket";
import { LogManager } from "./LogManager";
import { inject } from "../../../node_modules/inversify";
import { LogManagerImpl } from "../impl/LogManagerImpl";

/**
 * Classe de gestion du Matchmaking
 */
export interface Matchmaker {

    /**
     * Ajoute un joueur dans la liste des joueurs en l'attente d'adversaires
     * @param player Joueur à ajouter
     */
    addPlayerToQueue(player: PlayerSocket): void;

    /**
     * Force le retrait d'un joueur de la liste des joueurs en attente d'adversaires.
     * @param player Joueur à retirer
     */
    removePlayerOfQueue(player: PlayerSocket): void;

}