import socketIO from 'socket.io';
import { PlayerState } from './PlayerState';

export interface PlayerSocket extends socketIO.Socket {

    username: string;

    state: PlayerState;

    currentMatch: string;
    
}