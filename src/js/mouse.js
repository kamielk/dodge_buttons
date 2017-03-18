import Button from 'button';

class Mouse {
    constructor(radius) {
        this.radius = radius;
        setPosition(0,0);
    }

    isInRangeOf(button){
        /**
        * (x - center_x)^2 + (y - center_y)^2 < radius^2
        * '<'  --> in circle
        * '==' --> on circle
        * '>'  --> outside circle
        */
        const x = button.x;
        const y = button.y;
        return (x-this.x)*(x-this.x)+(y-this.y)*(y-this.y)<=this.radius*this.radius;
    }
    
    setPosition(x, y){
        this.position = {x: x, y: y};
    }
}
