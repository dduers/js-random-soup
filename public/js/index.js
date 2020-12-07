/**
 * init input fields
 */
window.addEventListener('resize', function(event) {
    document.getElementById('stripeCount1').value = Math.ceil(window.innerWidth / 20);
    document.getElementById('maxCycles1').value = Math.ceil(window.innerHeight / 16);
    document.getElementById('maxCycles2').value = Math.ceil(window.innerHeight * window.innerWidth / 10000);
});

document.getElementById('stripeCount1').value = Math.ceil(window.innerWidth / 20);
document.getElementById('maxCycles1').value = Math.ceil(window.innerHeight / 16);
document.getElementById('maxCycles2').value = Math.ceil(window.innerHeight * window.innerWidth / 10000);
