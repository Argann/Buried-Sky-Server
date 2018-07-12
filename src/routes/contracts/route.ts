import socketIO from 'socket.io';
import { PlayerSocket } from '../../models/PlayerSocket';

/**
 * Une `route` correspond généralement à un comportement spécifique à
 * appliquer lors de la réception d'un message particulier
 */
export interface Route {
    
    /**
     * Fonction retournant le nom de la route.
     * Ce nom doit être exactement le même que le nom du message 
     * devant déclencher le callback 
     */
    getRegisteredName(): string;

    /**
     * Fonction appelée lors de la réception du message cible
     */
    onCall(socket: PlayerSocket, data?: any): void;

}