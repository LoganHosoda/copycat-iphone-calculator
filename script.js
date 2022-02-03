/* ========== Selectors ========== */

const display = document.querySelector("p.digits");
const clearButton = document.querySelector("#clear");

/* ========== Global Variables ========== */

let currentDisplay = "0";
let previousDisplay = "0";

let addIsClicked = false;
let subIsClicked = false;
let multIsClicked = false;
let divIsClicked = false;
let clearIsClicked = false;

/* ========== Functionality ========== */

function updateDisplay(newNumber) {

    // If decimal is clicked
    if (newNumber == "." && currentDisplay.includes('.')) { return; }
    else if (newNumber == "." && currentDisplay == "0") {
        currentDisplay += newNumber.toString(); } 
    // If clear is clicked
    else if (newNumber == "C") { 
        clear();
        clearIsClicked = true; }
    // If +/- is clicked
    else if (newNumber == "+/-") {
        parseInt(currentDisplay);
        currentDisplay *= -1;
        toString(currentDisplay); }
    // When % is clicked, divide by 100 
    else if (newNumber == "%") {
        let tempNum = parseFloat(currentDisplay);
        tempNum /= 100;
        currentDisplay = tempNum.toString(); }
    // If numbers are clicked
    else if (currentDisplay == "0" && !(currentDisplay.length >= 8)) {
        currentDisplay = newNumber.toString(); } 
    else if (!(currentDisplay.length >= 8)) {
            currentDisplay += newNumber.toString(); }

    // Ensure digits do not expand beyond the size of the screen
    if (currentDisplay.length >= 8) {
        let newDisplay = currentDisplay.slice(0, 8);
        currentDisplay = newDisplay; }

    // Changes "AC" to "C" if the screen is no longer clear
    if (currentDisplay == '0' && previousDisplay == '0') {
        clearButton.textContent = 'AC';
    } else if (currentDisplay != '0') {
        clearButton.textContent = 'C';
    } else if (clearIsClicked) {
        clearButton.textContent = 'AC';
        clearIsClicked = false;
    } else {
        clearButton.textContent = 'C';
    }
    // Applies currentDisplay to the calculator
    display.textContent = currentDisplay;
    
}

function buttonClicked(button) {
    clearIsClicked = false;
    switch (button) {
        case 'add':
            addIsClicked = true;
            subIsClicked = false;
            multIsClicked = false;
            divIsClicked = false;
            previousDisplay = currentDisplay;
            clear();
            break;
        case 'sub':
            addIsClicked = false;
            subIsClicked = true;
            multIsClicked = false;
            divIsClicked = false;
            previousDisplay = currentDisplay;
            clear();
            break;
        case 'mult':
            addIsClicked = false;
            subIsClicked = false;
            multIsClicked = true;
            divIsClicked = false;
            previousDisplay = currentDisplay;
            clear();
            break;
        case 'div':
            addIsClicked = false;
            subIsClicked = false;
            multIsClicked = false;
            divIsClicked = true;
            previousDisplay = currentDisplay;
            clear();
            break;
    }
}

function solve() {
    switch (true) {
        case addIsClicked:
            sum = addition();
            clear();
            updateDisplay(sum);
            previousDisplay = currentDisplay;
            break;
        case subIsClicked:
            sum = subtraction();
            clear();
            updateDisplay(sum);
            previousDisplay = currentDisplay;
            break;
        case multIsClicked:
            sum = multiply();
            clear();
            updateDisplay(sum);
            previousDisplay = currentDisplay;
            break;
        case divIsClicked:
            sum = divide();
            clear();
            updateDisplay(sum);
            previousDisplay = currentDisplay;
            break;
    }
}

function clear() {
    // Zeroes current display value, but returns when math
    // operators are clicked instead of calling updateDisplay()
    if (addIsClicked || subIsClicked || multIsClicked || divIsClicked) {
        currentDisplay = "0";
        return; }
    // Clears current display, maintains last saved display
    if (clearButton.textContent == "C") {
        currentDisplay = "0";
        updateDisplay("0"); }
    // Clears current display and deletes saved data
    else if (clearButton.textContent == "AC") {
        previousDisplay = "0";
        currentDisplay = "0";
        updateDisplay("0"); }
}

/* ========== Basic Arithmetic ========== */

function addition () {
    let cur = parseFloat(currentDisplay);
    let prev = parseFloat(previousDisplay);
    let sum = prev + cur; 
    return sum.toString(); }
function subtraction () {
    let cur = parseFloat(currentDisplay);
    let prev = parseFloat(previousDisplay);
    let sum = prev - cur; 
    return sum.toString(); }
function multiply () {
    let cur = parseFloat(currentDisplay);
    let prev = parseFloat(previousDisplay);
    let sum = prev * cur; 
    return sum.toString(); }
function divide () {
    let cur = parseFloat(currentDisplay);
    let prev = parseFloat(previousDisplay);
    let sum;
    if (cur == 0) {return "Error"; } 
    else { sum = prev / cur; }
    return sum.toString(); }