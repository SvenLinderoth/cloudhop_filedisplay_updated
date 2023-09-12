/**
 * Creates a new object.
 *
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * HighScore scene.
 */
class HighScore extends rune.scene.Scene {
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
     * Calls the constructor method of the super class.
    */
    constructor() {
        super();

        this.m_menu = null;
    }

    init() {
        super.init();
       
        this.m_menu = new rune.ui.VTMenu();
        this.m_menu.onSelect(this.selectMenuOption, this);
        this.m_menu.add('Start Game');
        this.m_menu.add('How to Play');
        this.m_menu.add('Main Menu');

        this.m_menu.center = this.cameras.getCameraAt(0).viewport.center;
        this.m_menu.x -= 130;
        this.m_menu.y -= 60;
        this.stage.addChild(this.m_menu);
      
        //change to instructions music
        this.background_music = this.application.sounds.music.get('main_menu_cloudhop', false);
        this.background_music.volume = .5;
        this.background_music.loop = true;
        this.background_music.play();

        this.sound = this.application.sounds.sound.get('blipSelect', true);
        this.sound.volume = .7;
        this.sound_select = this.application.sounds.sound.get('menu_select', true);

    //----------------------------------------------------------------
    //HIGH SCORE 
    //----------------------------------------------------------------
        var top_score = this.application.highscores.get(0);
        var second_score = this.application.highscores.get(1);
        var third_score = this.application.highscores.get(2);
        var fourth_score = this.application.highscores.get(3);
        var last_score = this.application.highscores.get(4);

        var highscore_posX = 30;

        this.msg_1 = '1st Place: ' + String(top_score.name) + ', ' + String(top_score.score);
        this.msg_2 = '2nd Place: ' + String(second_score.name) + ', ' + String(second_score.score);
        this.msg_3 =  '3d Place: ' + String(third_score.name) + ', ' + String(third_score.score);
        this.msg_4 =  '4th Place: ' + String(fourth_score.name) + ', ' + String(fourth_score.score);
        this.msg_5 =  '5th Place: ' + String(last_score.name) + ', ' + String(last_score.score);

        this.text = new rune.text.BitmapField(this.msg_1);
        this.text.center = this.cameras.getCameraAt(0).viewport.center;
        this.text.y -= 40;
        this.text.x += highscore_posX;
        this.stage.addChild(this.text);

        this.text = new rune.text.BitmapField(this.msg_2);
        this.text.center = this.cameras.getCameraAt(0).viewport.center;
        this.text.y -= 20;
        this.text.x += highscore_posX;
        this.stage.addChild(this.text);

        this.text = new rune.text.BitmapField(this.msg_3);
        this.text.center = this.cameras.getCameraAt(0).viewport.center;
        //this.text.y -= 0;
        this.text.x += highscore_posX;
        this.stage.addChild(this.text);

        this.text = new rune.text.BitmapField(this.msg_4);
        this.text.center = this.cameras.getCameraAt(0).viewport.center;
        this.text.y += 20;
        this.text.x += highscore_posX;
        this.stage.addChild(this.text);

        this.text = new rune.text.BitmapField(this.msg_5);
        this.text.center = this.cameras.getCameraAt(0).viewport.center;
        this.text.y += 40;
        this.text.x += highscore_posX;
        this.stage.addChild(this.text);

        this.text = new rune.text.BitmapField('Highscores');
        this.text.center = this.cameras.getCameraAt(0).viewport.center;
        this.text.y -= 70;
        this.text.x += highscore_posX;
        this.stage.addChild(this.text);
    //----------------------------------------------------------------
    //END SCORE 
    //----------------------------------------------------------------
    }

    update(step) {
        super.update(step); 
        this.updateInput(step);
    }

    dispose() {
        super.dispose();
    }

    updateInput(step) {
        if (this.keyboard.justPressed('UP') || this.keyboard.justPressed('W') || this.gamepads.justPressed(12)) {
            this.m_menu.up();
            this.sound.play();
        } 

        if( this.keyboard.justPressed('DOWN') || this.keyboard.justPressed('S') || this.gamepads.justPressed(13)) {
            this.m_menu.down();
            this.sound.play();
        } 

        if( this.keyboard.justPressed('ENTER') || this.keyboard.justPressed('SPACE') || this.gamepads.justPressed(1)) {
            this.m_menu.select();
            this.sound_select.play();
        } 

    }

    selectMenuOption(options) {
        switch (options.text) {
            case 'Start Game':
                this.application.scenes.load([new Cloud_hop.scene.Game()]);
                break;

            case 'How to Play': 
            this.application.scenes.load([new Cloud_hop.scene.Instructions()]);
                break;
            
            case 'Main Menu':
                this.application.scenes.load([new Cloud_hop.scene.Menu()]);
                break;
       
        }
    }
}
Cloud_hop.scene.HighScore = HighScore;