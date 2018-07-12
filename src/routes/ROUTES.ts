import { RConnection } from "./impl/connection.route";
import { RDisconnect } from "./impl/disconnect.route";
import { RHelloWorld } from "./impl/helloWorld.route";
import { RLogin } from "./impl/login.route";
import { RMatchmakingCancel } from "./impl/matchmaking_cancel.route";
import { RMatchmakingSearch } from "./impl/matchmaking_search.route";

export default {
    'connectionRoute': RConnection,
    'routes': [
        RDisconnect,
        RHelloWorld,
        RLogin,
        RMatchmakingCancel,
        RMatchmakingSearch
    ]
}