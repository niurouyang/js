class Point{

    constructor(private _x?: number, private _y?:number){
    }

    draw() {
        console.log('x: '+ this._x + ', y: '+this._y);
    }

    get x() {
        return this._x;
    }

    set x(value){
        if (value<0)
            throw new Error("Value can't be less than 0");
        this._x =value;
    }
}

let point = new Point();
let x =point._x;
point._x = 10;
point.draw();