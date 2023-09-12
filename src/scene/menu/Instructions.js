/**
 * Creates a new object.
 *
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Instructions scene.
 */
class Instructions extends rune.scene.Scene {
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
            'howtoplay'
        );
        this.stage.addChild(this.bg);

        this.m_menu = new rune.ui.VTMenu();
        this.m_menu.onSelect(this.selectMenuOption, this);
        this.m_menu.add('Start Game');
        this.m_menu.add('Highscore');
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

        //add a flickering cloud sprite on position next to text falls
        //
        this.flick = false;
        this.flick_cloud = new Cloud_Neutral(295, 75);
        this.stage.addChild(this.flick_cloud);
        this.flick_cloud.flicker.start(1000, 30, function() {
            this.flick = true;
        }, this);

    }

    update(step) {
        super.update(step); 
        this.updateInput(step);

        if (this.flick) {
            this.flick = false;
            this.flick_cloud.flicker.start(1000, 30, function() {
                this.flick = true;
            }, this);
        }
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

            case 'Highscore': 
                this.application.scenes.load([new Cloud_hop.scene.HighScore()]);
                break;
            
            case 'Main Menu':
                this.application.scenes.load([new Cloud_hop.scene.Menu()]);
                break;
        }
    }
}
Cloud_hop.scene.Instructions = Instructions;