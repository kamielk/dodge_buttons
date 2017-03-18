import Button from 'button';
import Mouse from 'mouse';

class Page {
    constructor(gridwidth, gridheight) {
        this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        this.gridheight = gridheight;
        this.gridwidth = gridwidth;
        this.xscale = this.width / gridwidth;
        this.yscale = this.height / gridheight;
    }

    rasterize(){
        this.grid = [];
        for(var i = 0; i<gridheight ; i++){
            this.grid[i] = [];
            for(var j = 0; j<gridwidth ; j++){
                this.grid[i][j] = [];
            }
        }

        const buttons = document.getElementsByTagName("button");

        // placing the buttons in the grid
        buttons.forEach((button) => {
            const buttonPos = getOffsetRect(button);
            const gridPos = getGridPosition(buttonPos);
            this.grid[gridPos.y][gridPos.x].push(
                new Button(x, y, button.offsetHeight, button.offsetWidth)
            );
        });
    }

    move(fromPoint, button){

    }

    getGridPosition(point){
        const gridX = Math.floor(point.x / xscale);
        const gridY = Math.floor(point.y / yscale);
        return {x: gridX, y: gridY};
    }

    scan(mouse){
        const gridPos = getGridPosition(mouse.position);
        const minX = gridPos.x > 0 ? gridPos.x - 1 : 0;
        const minY = gridPos.y > 0 ? gridPos.y - 1 : 0;
        const maxX = gridPos.x < this.gridheight ? gridPos.x + 1 : this.gridHeight;
        const maxY = gridPos.y < this.gridheight ? gridPos.x + 1 : this.gridHeight;

        const checkForMove = (button) => {
            if(mouse.isInRangeOf(button)){
                move(gridPos, button);
            }
        };

        for(var y = minY; i < maxY ; i++){
            for(var x = minX; j < maxX ; j++){
                this.grid[y][x].forEach(checkForMove);
            }
        }
    }

    /**
    * Source: http://javascript.info/tutorial/coordinates
    */
    getOffsetRect(elem) {
        // (1)
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docElem = document.documentElement;

        // (2)
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        // (3)
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        // (4)
        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { x: Math.round(top), y: Math.round(left) };
    }

}
