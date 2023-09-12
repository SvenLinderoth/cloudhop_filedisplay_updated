/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Background entity.
 */
class Background extends rune.display.Sprite {
//--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
    * Calls the constructor method of the super class.
*/
    constructor(x, y, width, height, url){
        super(x, y, width, height, url);
    }
    init() {
        super.init();
        //this.bgAnimations();
    }
    update(step) {
        super.update(step);
        this.x -= .15;
    }
    // bgAnimations() {
    //     //this.animation.create('sleepyCloud_idle', [0,1,2,3,4,5,6], 7, true);
    // }
}