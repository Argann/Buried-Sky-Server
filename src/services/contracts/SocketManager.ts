export interface SocketManager {
    
    /**
     * Fonction d'initialisation du SocketManager
     */
    init(): void;

    /**
     * Fonction d'inscription des routes
     */
    registerRoutes(): void;
}