// update parameters
function updateParameterValues() {
    document.getElementById('stripeCount1').value = Math.ceil(window.innerWidth / 100);
    document.getElementById('maxCycles1').value = Math.ceil(window.innerHeight * window.innerWidth / 50000);
}

// update parameters
window.addEventListener('resize', updateParameterValues);
updateParameterValues();
