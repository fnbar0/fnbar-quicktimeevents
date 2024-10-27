let key = '';
let firstKey = '';
let secondKey = '';
let clicksNeeded = 0;
let clicksCount = 0;
let timeLimit = 0;
let timer;
let keyPressed = false;
let firstKeyPressed = false;
let secondKeyPressed = false;
let speed = 0;

const tapQTEContainer = document.getElementById('TapQTE');
const circleElement = document.getElementById('circleTap');
const circleSVG = document.querySelector('circle');
const glow = document.getElementById('glow');
const keyElement = document.getElementById('key');
const holdQTEContainer = document.getElementById('HoldQTE');
const DoubleKeyQTEContainer = document.getElementById('DoubleKeyQTE');
const firstKeyElement = document.getElementsByClassName('firstDoubleKey')[0];
const secondKeyElement = document.getElementsByClassName('secondDoubleKey')[0];
const firstKeyGlow = document.getElementsByClassName('firstKeyGlow')[0];
const secondKeyGlow = document.getElementsByClassName('secondKeyGlow')[0];
const holdKeyElement = document.getElementById('holdKey');
const stop1 = document.querySelector('#GradientColor stop[offset="0%"]');
const stop2 = document.querySelector('#GradientColor stop[offset="100%"]');

window.addEventListener('message', function (event) {
    let { type, key: eventKey, clickAmount, timeout, speed: eventSpeed, secondKey: secondEventKey } = event.data;
    if (type === 'startTapQTE' && eventKey) {
        key = eventKey.toUpperCase();
        clicksNeeded = clickAmount || 10;
        timeLimit = timeout || 10000;
        startTapQTE();
    } else if (type === 'startHoldQTE' && eventKey) {
        key = eventKey.toUpperCase();
        timeLimit = timeout || 10000;
        speed = eventSpeed;
        startHoldQTE();
    } else if (type === 'startDoubleKeyQTE' && eventKey && secondEventKey) {
        firstKey = eventKey.toUpperCase();
        secondKey = secondEventKey.toUpperCase();    
        timeLimit = timeout || 10000;
        startDoubleKeyQTE();
    }
});

function startTapQTE() {
    resetTapQTEState();
    keyElement.innerHTML = key;
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyRelease);
    timer = setTimeout(failTapQTE, timeLimit);
}

function startHoldQTE() {
    resetHoldQTEState();
    holdKeyElement.innerHTML = key;
    document.addEventListener('keydown', handleKeyHold);
    circleSVG.style.strokeDashoffset = 449;
    timer = setTimeout(failHoldQTE, timeLimit);
}

function startDoubleKeyQTE() {
    resetDoubleKeyQTEState();
    firstKeyElement.innerHTML = firstKey;
    secondKeyElement.innerHTML = secondKey;
    document.addEventListener('keydown', handleDoubleKeyPress);
    document.addEventListener('keyup', handleDoubleKeyRelease);
    timer = setTimeout(failDoubleKeyQTE, timeLimit);
}

function handleKeyHold(event) {
    if (event.key.toUpperCase() === key) {
        circleSVG.style.strokeDashoffset = Number(circleSVG.style.strokeDashoffset) - speed;
        if (Number(circleSVG.style.strokeDashoffset) <= 0) successHoldQTE();
    }
}

function handleDoubleKeyPress(event) {
    if (event.key.toUpperCase() === firstKey) {
        firstKeyGlow.style.opacity = 1;
        firstKeyGlow.style.backgroundColor = 'rgba(0, 255, 0, 0.973)';
        firstKeyGlow.classList.add('fadeIn');
        firstKeyPressed = true;
    } else if (event.key.toUpperCase() === secondKey) {
        secondKeyGlow.style.opacity = 1;
        secondKeyGlow.style.backgroundColor = 'rgba(0, 255, 0, 0.973)';
        secondKeyGlow.classList.add('fadeIn');
        secondKeyPressed = true;
    }
    if (firstKeyPressed && secondKeyPressed) successDoubleKeyQTE();
}

function handleDoubleKeyRelease(event) {
    if (event.key.toUpperCase() === firstKey) {
        // hideElementWithAnimation(firstKeyGlow)
        firstKeyGlow.classList.add('fadeOut');
        firstKeyGlow.addEventListener('animationend', () => {
            firstKeyGlow.classList.remove('fadeOut');
            firstKeyGlow.style.opacity = 0;
        })
        firstKeyGlow.classList.remove('fadeIn');
        firstKeyPressed = false;
    } else if (event.key.toUpperCase() === secondKey) {
        // hideElementWithAnimation(secondKeyGlow)
        secondKeyGlow.classList.add('fadeOut');
        secondKeyGlow.addEventListener('animationend', () => {
            secondKeyGlow.classList.remove('fadeOut');
            secondKeyGlow.style.opacity = 0;
        })
        secondKeyGlow.classList.remove('fadeIn');
        secondKeyPressed = false;
    }
}

function handleKeyPress(event) {
    if (event.key.toUpperCase() === key && !keyPressed) {
        keyPressed = true;
        clicksCount++;
        animateKey();
        if (clicksCount >= clicksNeeded) successTapQTE();
    }
}

function handleKeyRelease(event) {
    if (event.key.toUpperCase() === key) keyPressed = false;
}

function animateKey() {
    keyElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        keyElement.style.transform = 'scale(1)';
    }, 100);
}

function successTapQTE() {
    cleanUpTapQTE();
    glow.style.backgroundColor = 'rgba(0, 255, 0, 0.973)';
    glow.classList.add('fadeIn');
    hideElement(circleElement);
    postResult('TapQTEResult', true);
}

function failTapQTE() {
    cleanUpTapQTE();
    glow.style.backgroundColor = 'rgba(255, 0, 0, 0.973)';
    glow.classList.add('fadeIn');
    hideElement(circleElement);
    postResult('TapQTEResult', false);
}

function successHoldQTE() {
    cleanUpHoldQTE();
    setGradientColors('#32CD32', '#90EE90');
    postResult('HoldQTEResult', true);
}

function failHoldQTE() {
    cleanUpHoldQTE();
    setGradientColors('#FF3131', '#FF0000');
    postResult('HoldQTEResult', false);
}

function successDoubleKeyQTE() {
    cleanUpDoubleKeyQTE();
    postResult('DoubleKeyQTEResult', true);
}

function failDoubleKeyQTE() {
    firstKeyGlow.style.backgroundColor = 'rgba(255, 0, 0, 0.973)';
    secondKeyGlow.style.backgroundColor = 'rgba(255, 0, 0, 0.973)';
    firstKeyGlow.style.opacity = 1;
    secondKeyGlow.style.opacity = 1;
    cleanUpDoubleKeyQTE();
    postResult('DoubleKeyQTEResult', false);
}

function resetTapQTEState() {
    tapQTEContainer.style.display = 'block';
    circleElement.style.display = 'block';
    glow.style.opacity = 0;
    glow.classList.remove('fadeIn');
    clicksCount = 0;
}

function resetHoldQTEState() {
    holdQTEContainer.style.display = 'block';
    setGradientColors('#0096FF', '#6495ED');
}

function resetDoubleKeyQTEState() {
    firstKeyPressed = false;
    secondKeyPressed = false;
    DoubleKeyQTEContainer.classList.remove('fadeOut');
    firstKeyGlow.style.opacity = 0;
    firstKeyGlow.classList.remove('fadeIn');
    secondKeyGlow.style.opacity = 0;
    secondKeyGlow.classList.remove('fadeIn');
    DoubleKeyQTEContainer.style.display = 'flex';
}

function cleanUpTapQTE() {
    clearTimeout(timer);
    document.removeEventListener('keydown', handleKeyPress);
    document.removeEventListener('keyup', handleKeyRelease);
    setTimeout(() => {
        hideElementWithAnimation(tapQTEContainer);
    }, 1000);
}

function cleanUpHoldQTE() {
    clearTimeout(timer);
    document.removeEventListener('keydown', handleKeyHold);
    setTimeout(() => {
        hideElementWithAnimation(holdQTEContainer);
    }, 1000);
}

function cleanUpDoubleKeyQTE() {
    clearTimeout(timer);
    document.removeEventListener('keydown', handleDoubleKeyPress);
    document.removeEventListener('keyup', handleDoubleKeyRelease);
    firstKeyPressed = false;
    secondKeyPressed = false;
    setTimeout(() => {
        hideElementWithAnimation(DoubleKeyQTEContainer);
    }, 1000);
}

function setGradientColors(color1, color2) {
    stop1.setAttribute('stop-color', color1);
    stop2.setAttribute('stop-color', color2);
}

function hideElement(element) {
    element.style.display = 'none';
}

function hideElementWithAnimation(element) {
    element.classList.add('fadeOut');
    element.addEventListener('animationend', () => {
        element.classList.remove('fadeOut');
        element.style.display = 'none';
    }, { once: true });
}

function postResult(resultType, success) {
    $.post(`https://${GetParentResourceName()}/${resultType}`, JSON.stringify({ success }));
}
