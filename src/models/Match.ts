import { PlayerSocket } from "./PlayerSocket";
import { MatchState } from "./MatchState";

export class Match {

    private _player1: PlayerSocket;
    private _player2: PlayerSocket;

    private _id: string;

    private _state: MatchState;
    
    public get player1() : PlayerSocket {
        return this._player1;
    }

    
    public set player1(v : PlayerSocket) {
        this._player1 = v;
    }
    
    public get player2() : PlayerSocket {
        return this._player2;
    }

    
    public set player2(v : PlayerSocket) {
        this._player2 = v;
    }

    
    public get id() : string {
        return this._id;
    }

    
    public set id(v : string) {
        this._id = v;
    }

    
    public get state() : MatchState {
        return this._state;
    }

    
    public set state(v : MatchState) {
        this._state = v;
    }
    
    
    
    

}