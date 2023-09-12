/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * SleepyCloud entity.
 */
class SleepyCloud extends rune.display.Sprite {
//--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
    * Calls the constructor method of the super class.
*/
    constructor(x, y, img){
        super(x, y, 64, 64, img);
    }
    init() {
        super.init();
        this.characterAnimations();
    }
    update(step) {
        super.update(step);
        this.animation.gotoAndPlay('idle');

        this.x -= .4;
    }
    characterAnimations() {
        this.animation.create('idle', [3,4,5,6,3,3,3,3,0,0,0,0,0,0,1,1,3], 10, true);
    }
}