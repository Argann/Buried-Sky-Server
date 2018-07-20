/**
 * Classe définissant 
 */
export class Map {

    
    private _width : number;
    public get width() : number {
        return this._width;
    }
    public set width(v : number) {
        this._width = v;
    }
    
    
    private _height : number;
    public get height() : number {
        return this._height;
    }
    public set height(v : number) {
        this._height = v;
    }
    
    
    private _units : Array<any>;
    public get units() : Array<any> {
        return this._units;
    }
    public set units(v : Array<any>) {
        this._units = v;
    }

    
    private _obstacles : Array<any>;
    public get obstacles() : Array<any> {
        return this._obstacles;
    }
    public set obstacles(v : Array<any>) {
        this._obstacles = v;
    }

}