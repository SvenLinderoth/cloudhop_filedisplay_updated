//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
Cloud_hop.scene.Game = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);

    // score private
    var score = 0;
    //set and return score
    this.setScore = function (points) {
        score += points;
    }
    this.getScore = function () {
        return score;
    }
    //this.application.sounds finns överallt
    this.playSoundItem = function () {
        var coin_effect = this.application.sounds.sound.get('pickupCoin', false);
        coin_effect.volume = .5;
        coin_effect.play();
    }
    //this.application.sounds finns överallt
    this.playGameOver = function () {
        var gameover = this.application.sounds.sound.get('game_over', false);
        gameover.play();
    }
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Cloud_hop.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
Cloud_hop.scene.Game.prototype.constructor = Cloud_hop.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
Cloud_hop.scene.Game.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    //--------------------------------------------------------------
    this.text = new rune.text.BitmapField("Score: " + this.getScore());
    this.text.autoSize = true;
    //--------------------------------------------------------------
    //player obj
    //--------------------------------------------------------------
    this.player = new Character(75, 75, 32, 32, 'renthy');
    this.generator = new Generator_StageOne(this.player.minJump, this.player.maxJump);
    //--------------------------------------------------------------
    //background
    //--------------------------------------------------------------
    this.background = new Background(
        -200,
        -200,
        1280,
        720,
        'background_night_2'
    )
    this.stage.addChild(this.background);
    //--------------------------------------------------------------
    //Grass bottom of background
    //--------------------------------------------------------------
    this.grassGroup = new rune.display.DisplayGroup(this.stage);
    this.grass = new rune.display.Graphic(
        this.background.x,
        this.background.y + this.background.height,
        1280,
        200,
        'grass2'
    );
    this.grassGroup.addMember(this.grass);
    //--------------------------------------------------------------
    //candy group
    //--------------------------------------------------------------
    this.candyGroup = new rune.display.DisplayGroup(this.stage);
   //--------------------------------------------------------------
    //shield group
    //--------------------------------------------------------------
    this.shieldGroup = new rune.display.DisplayGroup(this.stage);
    //--------------------------------------------------------------
    //enemy cloud
    //--------------------------------------------------------------
    // this.enemy = new Cloud_Dangerous(
    //     (this.background.x + this.background.width),
    //     this.generator.randomY()
    // );
    this.enemyGroup = new rune.display.DisplayGroup(this.stage);
    //this.enemyGroup.addMember(this.enemy);
    //--------------------------------------------------------------
    //cloud neutral into cloudgroup (use this.cloud methods)
    //--------------------------------------------------------------
    this.cloud = new Cloud_Neutral((this.previousCloudX = 75), 92);
    //--------------------------------------------------------------
    //CLOUD GROUP NEUTRALS; PLAYER CAN MOVE ON
    //--------------------------------------------------------------
    this.cloudGroup = new rune.display.DisplayGroup(this.stage);
    this.cloudGroup.addMember(this.cloud);
    //--------------------------------------------------------------
    //player obj add to stage
    this.stage.addChild(this.player);
    //--------------------------------------------------------------
    //camera on player
    this.cameras.getCameraAt(0).targets.add(this.player);
    //--------------------------------------------------------------
    //music on music (master, music, sound)
    this.music_bg = this.application.sounds.music.get('music_cloudhop', false);
    this.music_bg.volume = .5;
    this.music_bg.loop = true;
    this.music_bg.play();

    this.timer = this.timers.create({
        duration: this.generator.randomDuration(),
        repeat: 0,  
        onComplete: function () {
            this.generator.getEnemy(this.cameras.getCameraAt(0));
            this.timer.m_paused = true;
        },
        scope: this,
    }, true);

    this.indicators = new rune.display.DisplayGroup(this.stage);

    this.enemyTimer = this.timers.create({
        duration: 0,
        repeat: 0,
        onComplete: function () {
            this.enemyTimer.m_paused = true; 
        },
    },true);

    this.sleepyClouds = new rune.display.DisplayGroup(this.stage);
    this.sleepy_cloud = new SleepyCloud(this.cameras.getCameraAt(0).viewport.x + this.cameras.getCameraAt(0).viewport.width, -45, 'sleepyCloud');
    this.sleepyClouds.addMember(this.sleepy_cloud);
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Cloud_hop.scene.Game.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    //--------------------------------------------------------------
    //Background 
    //--------------------------------------------------------------
    var camera = this.cameras.getCameraAt(0);
    var background = this.background;
    if (camera.viewport.x + camera.viewport.width >= background.previousX + background.width) {
            var newX = background.previousX + background.width - 20;
            var newY = background.y;
            var newBackground = new Background(
                newX,
                newY,
                1280,
                720,
                'background_night_2'
            );
            this.stage.addChild(newBackground);
            this.background = newBackground;
    }
    //sleepyclouds
    this.sleepyClouds.forEachMember(function(s_c) {
        this.stage.addChild(s_c);
        if (s_c.x + s_c.width < camera.viewport.x) {
            s_c.dispose();
        }
    },this);
    if (this.sleepyClouds.getMembers().length < 1) {
        var sleep = new SleepyCloud(
            this.background.x + this.background.width,
            this.generator.randomY() - 100,
            'sleepyCloud'
        );
        this.sleepyClouds.addMember(sleep);
    };

    this.grassGroup.forEachMember(function(g) {
        this.stage.addChild(g);
        if (g.x + g.width < camera.viewport.x) {
            g.dispose();
        }
    },this);
    if (this.grassGroup.getMembers().length < 2) {
        var grass = new rune.display.Graphic(
            this.background.x + this.background.width,
            this.background.y + this.background.height,
            1280,   
            200,
            'grass2'
        );
        this.grassGroup.addMember(grass);
    };
    //--------------------------------------------------------------
    //re render spelare annars går den bakom nästa bakgrund
    //--------------------------------------------------------------
    this.stage.removeChild(this.player);
    this.stage.addChild(this.player);
    //--------------------------------------------------------------
    this.text.dispose();
    this.text = new rune.text.BitmapField("Score: " + this.getScore());
    this.text.top = camera.viewport.top + 15;
    this.text.left = camera.viewport.left + 20;
    this.stage.addChild(this.text);
    
    if (this.timer.paused) {
        this.timer = this.timers.create({
            duration: this.generator.randomDuration(),
            repeat: 0,  
            onComplete: function () {
                var enemy = this.generator.getEnemy(this.cameras.getCameraAt(0));
                this.timer.m_paused = true;
                this.enemyGroup.addMember(enemy);
            },
            scope: this,
        }, true);
    }
    //--------------------------------------------------------------
    //ENEMY GROUP; RENDER
    //--------------------------------------------------------------
    this.enemyGroup.forEachMember(function(e) {
        this.stage.addChild(e);
        e.speedUp(1);
        if (e.x > camera.viewport.x + camera.viewport.width) {
            this.timers.create({
                duration: 2000,
                repeat: 0,  
                onStart: function () {
                    this.indicator = new rune.display.Sprite(
                        (camera.viewport.x + camera.viewport.width - 30),
                        e.y,
                        16, 16, 
                        'danger'
                     );
                     if (this.indicators.getMembers().length < 1) {
                        this.indicators.addMember(this.indicator);
                     }
                },
                onComplete: function () {
                    this.indicators.forEachMember(function(i) {
                        this.indicators.removeMember(i);
                        i.dispose();
                    },this);
                },
                scope: this,
            }, true);
        }  
        else if (e.x < camera.viewport.x) {
            this.enemyGroup.removeMember(e);
            e.dispose();
        }  
    },this);

    this.indicators.forEachMember(function(i) {
        i.x = camera.viewport.x + camera.viewport.width - 30;
        this.stage.addChild(i);
    },this);
    //--------------------------------------------------------------
    //ENEMY HIT CHECK
    //--------------------------------------------------------------
    if (this.player.hitTestGroup(this.enemyGroup)) {
        if (!this.player.shield) {
            this.player.effects('hit');  
            this.gameOver();
        } else {
            this.player.effects('hit');  
            //new player without shield after flicker (this.player.gotHit)
            this.timers.create({
                duration: 2000,
                repeat: 0,  
                onComplete: function () {
                    var x = this.player.x;
                    var y = this.player.y;
                    this.cameras.getCameraAt(0).targets.remove(this.player);
                    this.player.dispose();
                    this.player = new Character(x, y, 32, 32, 'renthy');
                    this.cameras.getCameraAt(0).targets.add(this.player);
                },
                scope: this,
            }, true);
        }
    };
    //--------------------------------------------------------------
    //cloud gen, candy generate
    //--------------------------------------------------------------
    if (this.cloudGroup.getMembers().length < 10) {
        var cloud = new Cloud_Neutral(this.previousCloudX = (this.previousCloudX + this.generator.randomX()), this.generator.randomY());
        if (this.generator.fallenCloud()) {
            cloud.fallenCloud = true;
        } else cloud.fallenCloud = false;
        //candy, x, y, value (standard candy = 1)
        //tar alla clouds x och y, och centrerar en godis på toppen av molnet
        if (!this.generator.getItem(this.player.shield)) {
            var candy = new Candy((cloud.x + 6), (cloud.y - 10), 1);
            this.candyGroup.addMember(candy);
        } else {
            var shield = new ShellShield((cloud.x + 1), (cloud.y - 15));
            this.shieldGroup.addMember(shield);
        }
        this.cloudGroup.addMember(cloud);
    } 
    //render clouds on stage
    this.cloudGroup.forEachMember(function(c) {
        if (this.getScore() > 30) {
                c.fallenCloud = true;
        }
        this.stage.addChild(c);

        if (this.player.hitTestObject(c) && c.fallenCloud)  {
            if (!c.flickStart) {
                this.timers.create({
                    duration: 2000,
                    repeat: 0, 
                    onStart: function () {
                        c.flickStart = true;
                        c.fallenClouds();
                    },
                    // onComplete: function () {
                    // },
                    scope: this,
                }, true);
            }
        }
        if (c.x < camera.viewport.x) {
            c.dispose();
        }
    }, this);
    //render potential shield objects on stage
    //hittest to shield
        this.shieldGroup.forEachMember(function(s) {
            this.stage.addChild(s);
            if (s.x < camera.viewport.x) {
                s.dispose();
            }
            if (this.player.hitTestObject(s)) {
                if (!this.player.shield) {
                    //this.player.shield = true;
                    s.dispose();
                    //play sound for powerup 
                    this.player.power_up.play();
                    //new instance character with shell
                    var x = this.player.x;
                    var y = this.player.y;
                    this.cameras.getCameraAt(0).targets.remove(this.player);
                    this.player.dispose();
                    this.player = new Character(x, y, 32, 32, 'renthy_shell');
                    this.player.shield = true;
                    this.cameras.getCameraAt(0).targets.add(this.player);
                }
                else {
                    this.player.shield = true;
                    s.dispose();
                    //play sound for powerup 
                    this.player.power_up.play();
                    //play other sound for points maybe ?
                    //bonus points already shielded
                    this.setScore(3);
                }
            };
        }, this);
    //render candies on stage
        this.candyGroup.forEachMember(function(c) {
            this.stage.addChild(c);
            if (this.player.hitTestObject(c)) { 
                this.setScore(c.value);
                //ta bort aktuell candy som tas
                c.value = 0;
                c.dispose();
                c = null;
                this.playSoundItem();
            }
        }, this);   
    //--------------------------------------------------------------
    //hittest clouds
    //--------------------------------------------------------------
    if (this.player.hitTestGroup(this.cloudGroup)) {
        this.player.isJumping = false;
    } else {
        this.player.isJumping = true;
    }
    //--------------------------------------------------------------
    //Y position fallen to grass
    //--------------------------------------------------------------
    if (this.player.y > 580) {
        this.gameOver();
    }
    //--------------------------------------------------------------
    //--------------------------------------------------------------
};
Cloud_hop.scene.Game.prototype.gameOver = function() {
    this.timers.create({
        duration: 1500,
        repeat: 0, 

        onStart: function () {
            //score
            //take away movvable methods in player object
            this.player.m_dead = true;

            var score = this.getScore();
            this.music_bg.stop();
            //this.playGameOver();
            var camera = this.cameras.getCameraAt(0);
            this.text.dispose();
            this.text = new rune.text.BitmapField("Game Over! Score: " + score);
            this.text.center = camera.viewport.center;
            this.text.y = this.text.y - 30;
            this.stage.addChild(this.text);
            this.player.gravity = 0;

            this.playGameOver();
        },
        onComplete: function () {
        //change to game over scene
            this.application.scenes.load([new Cloud_hop.scene.Game_Over(this.getScore())]);
        },
        scope: this,
    }, true);
};

//Add chooseable highscore name in game over instead -
//
// Cloud_hop.scene.Game.prototype.getName = function() { 
//     //generating an alias
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     var charactersLength = characters.length;
//     var counter = 0;
//     var length = 3;
//     var name = '';
//     while (counter < length) {
//         name += characters.charAt(Math.floor(Math.random() * charactersLength));
//         counter += 1;
//     }
//     return name;
// }

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
Cloud_hop.scene.Game.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);

    //nullar kända komplexa datatyper för att underlätta skräpsamlarens jobb
    //calla egna dispose metoder = felmeddelande i rune length, kanske tas bort för snabbt av skräpsamlaren?
    this.generator = null;
    this.timer = null;
    this.background = null;
    this.enemyTimer = null;
    this.text = null;
    this.player = null;
    this.music_bg = null;
    
    //nulla och disposear varje objekt tillhörande grupper, samt nulla referens till grupp
    this.grassGroup.forEachMember(function(c) {
        c.dispose();
        c = null;
    },this);
    this.grassGroup = null;

    this.candyGroup.forEachMember(function(c) {
        c.dispose();
        c = null;
    },this);
    this.candyGroup = null;

    this.shieldGroup.forEachMember(function(c) {
        c.dispose();
        c = null;
    },this);
    this.shieldGroup = null;

    this.enemyGroup.forEachMember(function(c) {
        c.dispose();
        c = null;
    },this);
    this.enemyGroup = null;

    this.cloudGroup.forEachMember(function(c) {
        c.dispose();
        c = null;
    },this);
    this.cloudGroup = null;

    this.indicators.forEachMember(function(c) {
        c.dispose();
        c = null;
    },this);
    this.indicators = null;

    this.sleepyClouds.forEachMember(function(c) {
        c.dispose();
        c = null;
    },this);
    this.sleepyClouds = null;
};



