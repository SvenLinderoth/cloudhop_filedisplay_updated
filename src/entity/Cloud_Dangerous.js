/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Cloud_Dangerous entity.
 */
class Cloud_Dangerous extends rune.display.Sprite {
//--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
    * Calls the constructor method of the super class.
*/
    constructor(x, y){
        super(x, y, 32, 32, 'cloud_dangerous');

        //this.speed = 1;
    }
    init() {
        super.init();
        this.characterAnimations();
        //this.hitbox.set(0,0,32,32)
        //this.hitbox.debug = true;
    }
    update(step) {
        super.update(step);
        this.animation.gotoAndPlay('idle');
    }
    characterAnimations() {
        this.animation.create('idle', [0,1,2,3,4,5], 6, true);
    }
    speedUp(speed) {
        this.x -= speed;
    }
}