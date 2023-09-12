/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * ShellShield entity.
 */
class ShellShield extends rune.display.Sprite {
//--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
    * Calls the constructor method of the super class.
*/
    constructor(x, y){
        super(x, y, 32, 32, 'shellshield');
    }
    init() {
        super.init();
        this.addAnimations();
        this.animation.gotoAndPlay('idle');
    }
    update(step) {
        super.update(step);
    }
    addAnimations() {
        this.animation.create('idle', [0,1,2], 3, true);
    }
}