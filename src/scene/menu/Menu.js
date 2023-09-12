/**
 * Creates a new object.
 *
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Menu scene.
 */
class Menu extends rune.scene.Scene {
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

        this.bg = new rune.display.Graphic(
            0,
            0,
            400,
            225,
            'cloudhopText'
        );
        this.stage.addChild(this.bg);

        this.m_menu = new rune.ui.VTMenu();
        this.m_menu.onSelect(this.selectMenuOption, this);
        this.m_menu.add('Start');
        this.m_menu.add('Highscore');
        this.m_menu.add('How to Play');

        this.m_menu.center = this.cameras.getCameraAt(0).viewport.center;

        this.stage.addChild(this.m_menu);

        this.background_music = this.application.sounds.music.get('main_menu_cloudhop', false);
        this.background_music.volume = .5;
        this.background_music.loop = true;
        this.background_music.play();

        this.sound = this.application.sounds.sound.get('blipSelect', true);
        this.sound.volume = .7;
        this.sound_select = this.application.sounds.sound.get('menu_select', true);
        

        var top_score = this.application.highscores.get(0);

        this.text = new rune.text.BitmapField("Highscore: " + top_score.name + ', ' + top_score.score);
        this.text.center = this.cameras.getCameraAt(0).viewport.center;
        this.text.y = this.text.y + 80;
        this.text.x = this.text.x - 120;
        this.stage.addChild(this.text);

        this.cc_text = new rune.text.BitmapField("Music by Clement Panchout");
        this.cc_text.center = this.cameras.getCameraAt(0).viewport.center;
        this.cc_text.y = this.cc_text.y + 100;
        this.cc_text.x = this.cc_text.x - 120;
        this.cc_text.width = 500;
        this.stage.addChild(this.cc_text);
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
            case 'Start':
                this.application.scenes.load([new Cloud_hop.scene.Game()]);
                break;

            case 'Highscore': 
                this.application.scenes.load([new Cloud_hop.scene.HighScore()]);
                break;
            
            case 'How to Play':
                this.application.scenes.load([new Cloud_hop.scene.Instructions()]);
                break;

        }
    }
}
Cloud_hop.scene.Menu = Menu;