/**
 * Creates a new object.
 *
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game_Over scene.
 */
class Game_Over extends rune.scene.Scene {
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
     * Calls the constructor method of the super class.
    */
    constructor(score) {
        super();

        this.m_menu = null;

        this.score = score;

        this.sentHighScore = false;
        this.new_highscore = false;

        this.add_highscore_inputs = false; 

        this.nameInput = [];

        this.deactivate_arrows = false;
    }
    init() {
        super.init();
        //this.application.highscores.clear();

        this.m_menu = new rune.ui.VTMenu();
        this.m_menu.onSelect(this.selectMenuOption, this);
        this.m_menu.add('Play Again');
        this.m_menu.add('Highscore');
        this.m_menu.add('Main Menu');

        this.m_menu.center = this.cameras.getCameraAt(0).viewport.center;


        //add if sats om highscore, adda istället displayen av namn val, sen visa meny stage
        //om inte highscore, adda direkt menu till stage
        this.alphabet = ['A','B','C','D','E','F','G','H','I','J','K',
        'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

        this.firstLetter = new rune.text.BitmapField(this.alphabet[0]);
        this.secondLetter = new rune.text.BitmapField(this.alphabet[0]);
        this.thirdLetter = new rune.text.BitmapField(this.alphabet[0]);
        
        var camera = this.cameras.getCameraAt(0);

        this.firstLetter.center = camera.center;
        this.firstLetter.x = this.firstLetter.x;
        this.secondLetter.center = camera.center;
        this.secondLetter.x = this.secondLetter.x + 75;
        this.thirdLetter.center = camera.center;
        this.thirdLetter.x = this.thirdLetter.x + 150;

        this.add_first = true;
        this.first_index = 0;
        this.add_second = false;
        this.second_index = 0;
        this.add_third = false;
        this.third_index = 0;

        this.text = new rune.text.BitmapField("NEW HIGHSCORE! Choose alias below");
        this.text.center = this.cameras.getCameraAt(0).viewport.center;
        this.text.y = this.text.y - 50;
        this.text.width = 450;

        this.arrow_indicators = new rune.display.Graphic(
            this.firstLetter.x - 12,
            this.firstLetter.y - 12,
            32,   
            32,
            'arrow_indicators'
        );

        var test_highscore = this.application.highscores.test(this.score);
        if (test_highscore > -1 && test_highscore < 5) {
            this.stage.addChild(this.firstLetter);
            this.stage.addChild(this.secondLetter);
            this.stage.addChild(this.thirdLetter);
            
            this.stage.addChild(this.arrow_indicators);
            this.stage.addChild(this.text);
            this.add_highscore_inputs = true; 
        } else {
            this.stage.addChild(this.m_menu);
        }
        //change to sad game over music
        this.background_music = this.application.sounds.music.get('main_menu_cloudhop', false);
        this.background_music.volume = .5;
        this.background_music.loop = true;
        this.background_music.play();

        this.sound = this.application.sounds.sound.get('blipSelect', true);
        this.sound.volume = .7;
        this.sound_select = this.application.sounds.sound.get('menu_select', true);

    }
    
    update(step) {
        super.update(step); 
        if (this.add_highscore_inputs) {
            this.updateHighscoreInput(step);
        } else {
            this.updateInput(step);
        }

        if (this.add_highscore_inputs) {
            this.stage.addChild(this.arrow_indicators);
        }

        if (this.add_first && !this.deactivate_arrows) {
            this.arrow_indicators.x = (this.firstLetter.x - 12);
            this.arrow_indicators.y = (this.firstLetter.y - 12);
        } else if (this.add_second && !this.deactivate_arrows) {
                this.arrow_indicators.x = (this.secondLetter.x - 12);
                this.arrow_indicators.y = (this.secondLetter.y - 12);
            } else if (this.add_third && !this.deactivate_arrows) {
                this.arrow_indicators.x = (this.thirdLetter.x - 12);
                this.arrow_indicators.y = (this.thirdLetter.y - 12);
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
            case 'Play Again':
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
    updateHighscoreInput(step) {
        if (this.keyboard.justPressed('UP') || this.keyboard.justPressed('W') || this.gamepads.justPressed(12)) {
            var index = 0;
            //first letter
            if (this.add_first && this.first_index < 25) {
                index = this.first_index + 1;
                this.firstLetter.text = this.alphabet[index];
                this.first_index = index;
            } else if (this.add_first){
                this.first_index = 0;
                this.firstLetter.text = this.alphabet[this.first_index];
            }
            //second letter
            if (this.add_second && this.second_index < 25) {
                index = this.second_index + 1;
                this.secondLetter.text = this.alphabet[index];
                this.second_index = index;
            } else if (this.add_second) {
                this.second_index = 0;
                this.secondLetter.text = this.alphabet[this.second_index];
            }
            //third letter
            if (this.add_third && this.third_index < 25) {
                index = this.third_index + 1;
                this.thirdLetter.text = this.alphabet[index];
                this.third_index = index;
            } else if (this.add_third) {
                this.third_index = 0;
                this.thirdLetter.text = this.alphabet[this.third_index];
            }
            this.sound.play();
        } 

        if( this.keyboard.justPressed('DOWN') || this.keyboard.justPressed('S') || this.gamepads.justPressed(13)) {
            var index = 0;
            //first letter
            if (this.add_first && this.first_index > 0) {
                index = this.first_index - 1;
                this.firstLetter.text = this.alphabet[index];
                this.first_index = index;
            } else if (this.add_first) {
                this.first_index = 25;
                this.firstLetter.text = this.alphabet[this.first_index];
            }
            //second letter
            if (this.add_second && this.second_index > 0) {
                index = this.second_index - 1;
                this.secondLetter.text = this.alphabet[index];
                this.second_index = index;
            } else if (this.add_second) {
                this.second_index = 25;
                this.secondLetter.text = this.alphabet[this.second_index];
            }
            //third letter
            if (this.add_third && this.third_index > 0) {
                index = this.third_index - 1;
                this.thirdLetter.text = this.alphabet[index];
                this.third_index = index;
            } else if (this.add_third) {
                this.third_index = 25;
                this.thirdLetter.text = this.alphabet[this.third_index];
            }
            this.sound.play();
        } 

        if( this.keyboard.justPressed('ENTER') || this.keyboard.justPressed('SPACE') || this.gamepads.justPressed(1)) {
            if (this.add_first) {
                this.add_first = false;
                this.add_second = true;
                //save value from first letter
                this.nameInput.push(this.firstLetter);
                this.add_third = false;
            } else if (this.add_second) {
                this.add_first = false;
                this.add_second = false;
                //save value from second letter
                this.nameInput.push(this.secondLetter);
                this.add_third = true;
            }  else if (this.add_third) {
                this.deactivate_arrows = true;
                //save value from third letter
                this.nameInput.push(this.thirdLetter);
                //send highscore
                this.newHighScore();
            }
            this.sound_select.play();
        } 
        if( this.keyboard.justPressed('BACKSPACE') || this.keyboard.justPressed('LEFT') || this.gamepads.justPressed(0)) {
            if (this.add_first) {
                //remove value from second letter
                // Removing the last object from the array
                this.nameInput.pop();
                this.add_first = true;
                this.add_second = false;
                this.add_third = false;
            } 
            if (this.add_second) {
                //remove value from second letter and back
                this.nameInput.pop();
                this.add_first = true;
                this.add_second = false;
                this.add_third = false;
            }  else if (this.add_third) {
                //remove value from third letter and go back
                this.nameInput.pop();
                this.add_first = false;
                this.add_second = true;
                this.add_third = false;
            }
            this.sound_select.play();
        } 
    }
    newHighScore() {
        var add_name = '';

        for (var i = 0; i < this.nameInput.length; i++) {
            add_name += this.nameInput[i].m_text;
        }
        //send highscore
        this.application.highscores.send(this.score, add_name);

        //reset to menu inputs i update
        this.add_highscore_inputs = false;
        
        //add menu to stage & null letters and text
        this.stage.removeChild(this.firstLetter);
        this.stage.removeChild(this.secondLetter);
        this.stage.removeChild(this.thirdLetter);
        this.stage.removeChild(this.text);
        this.stage.removeChild(this.arrow_indicators);

        this.firstLetter = null;
        this.secondLetter = null;
        this.thirdLetter = null;
        this.text = null;
        this.arrow_indicators = null;

        //re add menu to stage
        this.stage.addChild(this.m_menu);
    }
}
Cloud_hop.scene.Game_Over = Game_Over;