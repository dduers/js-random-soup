/**
 * RANDOM SOUP CLASS
 * create a funny matrix like random soup of characters in different colors and forms.
 */
class randomSoup {

    /**
     * default values
     */
    defaults = {
        sleepMilliseconds: 1000,
        fontFamilies: [
            'Arial',
            'Times',
            'Courier',
        ],
        colors: [
            '#00FF00',
            '#33FF33',
            '#FFFFFF',
            '#CCCCCC',
            '#999999',
            '#666666',
            '#333333',
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

        // if max cycles are not reached
        if (this.counter < this.settings.maxCycles) {

            // values for new element
            let char = this.randomString();
            let fontSize = this.randomInteger(12, 48);
            let marginTop = this.randomInteger(0, window.innerHeight);
            let marginLeft = this.randomInteger(0, window.innerWidth);
            let fontFamily = this.settings.fontFamilies[this.randomInteger(0, this.settings.fontFamilies.length - 1)];
            let color = this.settings.colors[this.randomInteger(0, this.settings.colors.length - 1)];

            // create dom element
            let element = document.createElement('span');

            // set dom element style
            element.style.marginTop = '' + marginTop + 'px';
            element.style.marginLeft = '' + marginLeft + 'px';
            element.style.fontSize = '' + fontSize + 'px';
            element.style.fontFamily = '' + fontFamily + 'px';
            element.style.color = '' + color;
            element.style.position = 'absolute';

            // set element content
            element.textContent = char;

            // append element to container
            document.getElementById(this.settings.containerElementId).append(element);

            // increment counter
            this.counter++;

        // begin cleaning up, when max cycles are reached
        } else {

            // remove oldest element
            let element = document.getElementsByTagName('span')[0];
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

// create random soup instance
let randomSoup1 = new randomSoup({
    sleepMilliseconds: 1000,
});
