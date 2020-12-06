/**
 * RANDOM SOUP CLASS
 * create a funny matrix like random soup of characters in different colors and forms.
 */
class randomSoup {

    /**
     * default values
     */
    defaults = {
        containerElementId: 'randomSoupContainer',
        sleepMilliseconds: 100,
        maxCycles: 1000,
        enableAudio: true,
        enableFullScreen: false,
        enableFadeOut: false,
        enableFadeOutRotation: false,
        enableRotation: false,
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
            'green',
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
            '1px 1px 2px green',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
            'none',
        ],
        specialProbability: 100000,
        specialCharacters: '*',
        specialColors: [
            'red',
        ],
        specialTextShadows: [
            '1px 1px 2px red',
            'none',
        ],
        specialAudio: [
            'audio/1.mp3',
        ],
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

        // empty the dom container element
        let containerElement = document.getElementById(this.settings.containerElementId);
        containerElement.innerHTML = '';

        if (this.settings.enableFullScreen === true) {
            this.openFullScreen();
        }

        // draw cycle 
        setInterval(this.drawCycle.bind(this), this.settings.sleepMilliseconds);
    };


    openFullScreen() {

        let element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
        }
    }

    closeFullscreen() {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

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
        let opacity;
        let rotate;

        // values for new element
        char = this.randomString(1, this.settings.characters);
        fontSize = this.randomInteger(12, 48);
        fontFamily = this.settings.fontFamilies[this.randomInteger(0, this.settings.fontFamilies.length - 1)];
        textShadow = this.settings.textShadows[this.randomInteger(0, this.settings.textShadows.length - 1)];
        color = this.settings.colors[this.randomInteger(0, this.settings.colors.length - 1)];

        
        
        // overwrite in special cases ...
        if (this.randomInteger(0, this.settings.specialProbability) === 0) {
            char = this.randomString(1, this.settings.specialCharacters);
            fontSize = 280;
            textShadow = this.settings.specialTextShadows[this.randomInteger(0, this.settings.specialTextShadows.length - 1)];
            color = this.settings.specialColors[this.randomInteger(0, this.settings.specialColors.length - 1)];
            if (this.settings.enableAudio === true && this.settings.specialAudio.length > 0) {
                var sound = new Audio(this.settings.specialAudio[this.randomInteger(0, this.settings.specialAudio.length - 1)]);
                sound.play();
            }
        }

        marginTop = this.randomInteger(0, window.innerHeight - fontSize);
        marginLeft = this.randomInteger(0, window.innerWidth - fontSize);

        // set element content
        element.textContent = char;

        // set dom element style
        element.style.marginTop = '' + marginTop + 'px';
        element.style.marginLeft = '' + marginLeft + 'px';
        element.style.fontSize = '' + fontSize + 'px';
        element.style.fontFamily = '' + fontFamily;
        element.style.color = '' + color;
        element.style.position = 'absolute';
        element.style.textShadow = textShadow;

        if (this.settings.enableRotation === true) {
            rotate = this.randomInteger(-180, 180);
            element.style.transform = 'rotate(' + rotate + 'deg)';
        }

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

        // fadeout effect
        if (this.settings.enableFadeOut === true) {
            let elementCount = document.getElementById(this.settings.containerElementId).childNodes.length;
            let self = this;
            document.getElementById(this.settings.containerElementId).childNodes.forEach(function(currentElement, currentIndex, listObj) {
                opacity = 1 / elementCount * currentIndex;
                opacity = opacity.toPrecision(3);
                currentElement.style.opacity = opacity;
                if (self.settings.enableFadeOutRotation === true) {
                    currentElement.style.transform = 'rotate(' + Math.ceil(180 + (opacity * 100)) + 'deg)';
                }
            });
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
