/**
 * RANDOM SOUP CLASS
 * create a funny matrix like random soup of characters in different colors and forms.
 */
class Utilities {

    static openFullScreen() 
    {
        let element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) { /* Safari */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE11 */
            element.msRequestFullscreen();
        }
    }

    static closeFullScreen() 
    {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

    static isFullScreen()
    {
        return document.fullscreenElement === null ? false : true;
    }

    static toggleFullScreen()
    {
        Utilities.isFullScreen() ? Utilities.closeFullScreen() : Utilities.openFullScreen();
    }

    /**
     * generates random string
     * @param {*} size number of characters in the result string
     * @param {*} chars characters to include to build random string
     */
    static randomString(size=1, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') 
    {
        let result = '';
        let charsLength = chars.length;
        let i = 0;
        if (!charsLength)
            return result;
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
    static randomInteger(min, max) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    /**
     * get query variable
     * @param {*} variable name of variable
     */
    static getQueryVariable(variable)
    {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }

    static sleep(milliseconds) 
    {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
