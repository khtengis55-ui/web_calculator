const display = document.getElementById('display');

function appendValue(value) {
  if (value === '.' && display.value.includes('.'))
    return;
}
if (display.value === '0' && value !== '.') {
    display.value = value;
    } else {
        display.value += value;
}
function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    display.value = display.value.slice(0, -1) || '0';
}
function calculate() {
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}