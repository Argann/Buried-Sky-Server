import { SocketManager } from "../contracts/SocketManager";
import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { LogManager } from "../contracts/LogManager";
import { LogManagerImpl } from "./LogManagerImpl";

@provide(SocketManagerImpl)
export class SocketManagerImpl implements SocketManager {

    private _logManager: LogManager;

    constructor(
        @inject(LogManagerImpl) logManager: LogManagerImpl
    ) {
        this._logManager = logManager;
    }

    init(): void {
        this._logManager.debug('SocketManager', 'Initialisation du Socket Manager');
    }

}