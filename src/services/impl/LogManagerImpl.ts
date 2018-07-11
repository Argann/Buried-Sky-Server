import { LogManager } from "../contracts/LogManager";
import { provide } from "inversify-binding-decorators";

@provide(LogManagerImpl)
export class LogManagerImpl implements LogManager {

    debug(classe: String, message: String): void {
        console.debug(`[${classe}] ${message}`);
    }

    helloworld(): void {
        console.log('Hello World !');
    }

}