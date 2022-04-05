
var gSequence = [];
var gtrackSequence = 1;
var gIsStart = false
var gLevel = 16

// init the game
function init(NumberSequence, elInput) {
    gSequence = createBoard(NumberSequence)
    gtrackSequence = 1
    gIsStart = false
    renderTable(gSequence)
    gLevel = (elInput.defaultValue) ? +elInput.defaultValue : 16
    document.getElementById('myBtn').innerText = 'Play'
}

// create Suffle Array in MODEL
function createBoard(num) {
    var arr = []
    var isShuffled = false
    while (!isShuffled) {
        var randomNum = getRandomIntInclusive(1, num)
        //debugger
        if (!arr.includes(randomNum)) {
            arr.push(randomNum)
        } else if (arr.length === num) {
            isShuffled = true
            return arr
        }
    }
}

// create Table in DOM
function renderTable(sequence) {
    var elTbody = document.querySelector('.board')
    var srtHTML = '<tr>'
    var sqrt = Math.sqrt(sequence.length)
    for (var i = 0; i < sequence.length; i++) {
        if ((i + 1) % sqrt === 0) srtHTML += `<td onclick="cellClicked(${i}, this)" >${sequence[i]}</td></tr><tr>`
        else srtHTML += `<td onclick="cellClicked(${i}, this)" >${sequence[i]}</td>`
    }
    elTbody.innerHTML = srtHTML + '</tr>'
}

// when clicked
function cellClicked(clickedNum, elCell) {
    if (!gIsStart) return
    if (gSequence[clickedNum] === gtrackSequence) {
        elCell.classList.add('rightBtn')
        gtrackSequence++
    }
}

function manageButton(elbtn) {
    //debugger
    if (elbtn.innerText === 'Play') {
        disabled(true)
        showTime(elbtn)
        gIsStart = true
        elbtn.innerText = 'Restart'
    } else if (elbtn.innerText === 'Restart') {
        gIsStart = false
        elbtn.innerText = 'Play'
        document.getElementById("gameTime").innerHTML = 'Time: 0.000'
        gtrackSequence = gSequence.length
    }
}

function disabled(boolean) {
    document.getElementById("myBtn").disabled = boolean
    document.getElementById("inputEasy").disabled = boolean;
    document.getElementById("inputHard").disabled = boolean;
    document.getElementById("inputExtream").disabled = boolean;
}

// show game time
function showTime(elbtn) {
    // Update the count down every 1 second
    gIsStart = true
    elbtn.innerText = 'Restart'
    var start = Date.now();
    var currTime = 0

    var interval = setInterval(function () {
        currTime = ((Date.now() - start)) / 1000
        document.getElementById("gameTime").innerHTML = 'Time: ' + currTime.toFixed(3);

        if (gtrackSequence > gSequence.length) {
            clearInterval(interval)
            disabled(false)
            gIsStart = false
            gtrackSequence = 1
        }
    }, 200);
}

// random number 
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}