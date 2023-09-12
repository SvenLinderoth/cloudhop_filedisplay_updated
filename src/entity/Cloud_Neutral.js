/**
 * Creates a new object.
 *
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Cloud_Neutral entity.
 */
class Cloud_Neutral extends rune.display.Sprite {
//--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
    * Calls the constructor method of the super class.
*/
    constructor(x, y){
        super(x, y, 32, 32, 'cloud_neutral');

        //this.hitbox.debug = true; 
        this.hitbox.set(0, 10, 32, 5)

        this.fallenCloud = false;
        this.fall = false;

        this.fallX = 0;
        this.fallY = .1;

        this.flickStart = false;
    }
    init() {
        super.init();
        this.characterAnimations();
    }
    update(step) {
        super.update(step);
        this.animation.gotoAndPlay('idle');
        this.falling();
    }
    characterAnimations() {
        this.animation.create('idle', [0,1,2,3], 4, true);
    }
    fallenClouds() {
        if (this.fallenCloud) {
            this.flicker.start(2000, 30, function() {
                this.fall = true;
            }, this);
        }
    }
    falling() {
        if (this.fall) {
            this.y += this.fallX + this.fallY;
            this.fallX += this.fallY;
        }
    }
}