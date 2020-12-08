/**
 * init input fields
 */

let utilities = new randomUtilities();


function updateParameterValues() {
    document.getElementById('stripeCount1').value = Math.ceil(window.innerWidth / 20);
    if (document.getElementById('type').value == 'stripe') {
        document.getElementById('maxCycles1').value = Math.ceil(window.innerHeight / 16);
    } else {
        document.getElementById('maxCycles1').value = Math.ceil(window.innerHeight * window.innerWidth / 10000);
    }
}

/*
let form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    let enableFullScreen = document.getElementById('enableFullScreen').value == 1 ? true : false;
    if (enableFullScreen === true) {
        utilities.openFullScreen();
    }
});
*/

window.addEventListener('resize', updateParameterValues);
document.getElementById('type').addEventListener('change', updateParameterValues);

updateParameterValues();
