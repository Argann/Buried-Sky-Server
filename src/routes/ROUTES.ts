import { RConnection } from "./impl/connection.route";
import { RDisconnect } from "./impl/disconnect.route";
import { RHelloWorld } from "./impl/helloWorld.route";
import { RLogin } from "./impl/login.route";

export default {
    'connectionRoute': RConnection,
    'routes': [
        RDisconnect,
        RHelloWorld,
        RLogin
    ]
}