import { InversifyInit } from "../contracts/InversifyInit";
import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

export class InversifyInitImpl implements InversifyInit {

    public init(): Container {
        const container = new Container();
        container.load(buildProviderModule());
        return container;
    }

}