import { LogManager } from "../contracts/LogManager";
import { provide } from "inversify-binding-decorators";

@provide(LogManagerImpl)
export class LogManagerImpl implements LogManager {

    clear(): void {
        console.clear();
    }

    debug(classe: String, message: String): void {
        console.debug(`[D] [${classe}]\t${message}`);
    }

    error(classe: String, message: String): void {
        console.error(`[E] [${classe}]\t${message}`);
    }

    helloWorld(): void {
        console.log('Hello World !');
    }

}