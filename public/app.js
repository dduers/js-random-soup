/**
 * RANDOM SOUP CLASS
 * create a funny matrix like random soup of characters in different colors and forms.
 */
class randomSoup {

    /**
     * default values
     */
    defaults = {
        sleepMilliseconds: 100,
        fontFamilies: [
            'Arial',
            'Times',
            'Courier',
        ],
        characters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/*-=()&\*ç+°§?^![]$£{}àéèüöä|¢¬#@¦',
        colors: [
            '#00FF00',
            '#33FF33',
            '#FFFFFF',
            '#CCCCCC',
            '#999999',
            '#666666',
            '#333333',
        ],
        textShadows: [
            '1px 1px 2px #FFFFFF',
            '1px 1px 2px #00FF00',
            '1px 1px 2px #33FF33',
            '1px 1px 2px #FFFFFF',
            '1px 1px 2px #CCCCCC',
            '1px 1px 2px #999999',
            '1px 1px 2px #666666',
            '1px 1px 2px #333333',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
        ],
        specialCharacters: '*',
        specialColors: [
            'red',
            'gold',
        ],
        specialTextShadows: [
            '1px 1px 2px red',
            '1px 1px 2px gold',
            'none',
            'none',
        ],
        containerElementId: 'randomSoupContainer',
        maxCycles: 1000,
    };

    /**
     * final settings
     */
    settings = {};

    counter = 0;

    /**
     * class constructor
     * @param {*} options overwrite default settings
     */
    constructor(options) {

        // merge options and defaults to settings
        this.settings = Object.assign({}, this.defaults, options);

        // draw cycle 
        setInterval(this.drawCycle.bind(this), this.settings.sleepMilliseconds);
    };

    /**
     * one draw cycle
     */
    drawCycle() {

        // create dom element
        let element = document.createElement('span');

        // element styles and content
        let char;
        let fontSize;
        let marginTop;
        let marginLeft;
        let fontFamily;
        let textShadow;
        let color;

        // values for new element
        char = this.randomString(1, this.settings.characters);
        fontSize = this.randomInteger(12, 48);
        marginTop = this.randomInteger(0, window.innerHeight);
        marginLeft = this.randomInteger(0, window.innerWidth);
        fontFamily = this.settings.fontFamilies[this.randomInteger(0, this.settings.fontFamilies.length - 1)];
        textShadow = this.settings.textShadows[this.randomInteger(0, this.settings.textShadows.length - 1)];
        color = this.settings.colors[this.randomInteger(0, this.settings.colors.length - 1)];
        
        // overwrite in special cases ...
        if (this.randomInteger(0, this.maxCycles) === this.maxCycles) {
            char = this.randomString(1, this.settings.specialCharacters);
            fontSize = 200;
            textShadow = this.settings.specialTextShadows[this.randomInteger(0, this.settings.specialTextShadows.length - 1)];
            color = this.settings.specialColors[this.randomInteger(0, this.settings.specialColors.length - 1)];
        }

        // set element content
        element.textContent = char;

        // set dom element style
        element.style.marginTop = '' + marginTop + 'px';
        element.style.marginLeft = '' + marginLeft + 'px';
        element.style.fontSize = '' + fontSize + 'px';
        element.style.fontFamily = '' + fontFamily + 'px';
        element.style.color = '' + color;
        element.style.position = 'absolute';
        element.style.textShadow = textShadow;

        // append element to container
        document.getElementById(this.settings.containerElementId).append(element);

        // increment counter
        this.counter++;

        // begin cleaning up, when max cycles are reached
        if (this.counter > this.settings.maxCycles) {

            // remove oldest element
            element = document.getElementsByTagName('span')[0];
            element.remove();

            // decrement counter
            this.counter--;
        }
    }

    /**
     * generates random string
     * @param {*} size number of characters in the result string
     * @param {*} chars characters to include to build random string
     */
    randomString(size=1, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {

        let result = '';
        let charsLength = chars.length;
        let i = 0;

        for (i = 0; i < size; i++) {
            result += chars[this.randomInteger(0, charsLength - 1)];
        }

        return result;
    };

    /**
     * create random integer
     * @param {*} min minimum value
     * @param {*} max maximum value
     */
    randomInteger(min, max) {

        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
}

/**
 * create random soup instance with custom options
 */
let randomSoup1 = new randomSoup({
    sleepMilliseconds: 1000,
    maxCycles: 3,
});
