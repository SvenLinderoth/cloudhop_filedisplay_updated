/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Candy entity.
 */
class Candy extends rune.display.Sprite {
//--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
    * Calls the constructor method of the super class.
*/
    constructor(x, y, value){
        super(x, y, 16, 16, 'lollipopv1');
        this.value = value;
    }
    init() {
        super.init();
        this.characterAnimations();
    }
    update(step) {
        super.update(step);
        this.animation.gotoAndPlay('idle');
    }
    //defines objects animations
    characterAnimations() {
        this.animation.create('idle', [0,1,2,3], 4, true);
    }
}