//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
Cloud_hop.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "com.linderoth",
        app: "Cloud_hop",
        build: "0.0.0",
        scene: Cloud_hop.scene.Menu,
        resources: Cloud_hop.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 30,
        debug: false
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Cloud_hop.system.Main.prototype = Object.create(rune.system.Application.prototype);
Cloud_hop.system.Main.prototype.constructor = Cloud_hop.system.Main;