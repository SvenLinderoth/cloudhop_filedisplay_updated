/**
 * Creates a new object.
 *
 *
 * @class
 * @classdesc
 * 
 * Generator_StageOne entity.
 */
class Generator_StageOne {
//--------------------------------------------------------------------------
// Constructor
//--------------------------------------------------------------------------
    constructor(minJump, maxJump) {
        this.minJump = minJump;
        this.maxJump = maxJump;

        this.maxEnemies = 1;

        this.shieldOdds = 10;
        this.fallenCloudOdds = 3;
    }
    init() {
        //
    }
    randomX() {
        var max = this.maxJump;
        var min = this.minJump + 20;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    randomY() {
        var max = 0;
        var min = 100;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    randomDuration() {
        const duration = [7000, 8000, 9000, 10000, 11000, 12000];
        const arrInd = Math.floor(Math.random() * duration.length);
  
        return duration[arrInd];
    }
    getEnemy(camera) {
        var enemy = new Cloud_Dangerous(
            (camera.viewport.x + camera.viewport.width + 200),
            this.randomY()
        );
        return enemy;
    }
    //see if player has shield active, or randomise if shield should be generated
    getItem(players_shield) {
        if (Math.floor(Math.random() * this.shieldOdds) === 0 && players_shield === false) {
            return true;
          } else {
            return false;
          }
    }
    fallenCloud() {
        if (Math.floor(Math.random() * this.fallenCloudOdds) === 0) {
            return true;
          } else {
            return false;
          }
    }
}