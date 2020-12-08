/**
 * init input fields
 */

function updateParameterValues() {
    document.getElementById('stripeCount1').value = Math.ceil(window.innerWidth / 20);
    if (document.getElementById('type').value == 'stripe') {
        document.getElementById('maxCycles1').value = Math.ceil(window.innerHeight / 16);
    } else {
        document.getElementById('maxCycles1').value = Math.ceil(window.innerHeight * window.innerWidth / 10000);
    }
}

window.addEventListener('resize', updateParameterValues);
document.getElementById('type').addEventListener('change', updateParameterValues);

updateParameterValues();
