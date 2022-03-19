var slider = document.getElementById("slider");
var webCamElement = document.getElementById("webCam");
var canvasElement = document.getElementById("canvas");
var webcam = new Webcam(webCamElement, "user", canvasElement);
var buttonMulti = document.getElementById("m");
var buttonGrey = document.getElementById("g");
var buttonRB = document.getElementById("rb");
var buttonRG = document.getElementById("rg");
var buttonBG = document.getElementById("bg");
var buttonSingle = document.getElementById("s");
var buttonSym = document.getElementById("sym");
var buttonNum = document.getElementById("num");
var buttonLet = document.getElementById("let");
var buttonCirc = document.getElementById("circ");
var buttonDrk = document.getElementById("drk");
var buttonLgt = document.getElementById("lgt");
var buttonIntense = document.getElementById("intense");
var buttonInverse = document.getElementById("inverse");
var buttonInfared = document.getElementById("infared");
var mode1 = "m";
var mode2 = "s";
var col = null;
var method = null;
var w = 605;
var h = 340;
webcam.start();

buttonMulti.onclick = function() {
    mode1 = "m";
}
buttonGrey.onclick = function() {
    mode1 = "g";
}
buttonRB.onclick = function() {
    mode1 = "rb";
}
buttonRG.onclick = function() {
    mode1 = "rg";
}
buttonBG.onclick = function() {
    mode1 = "bg";
}
buttonSingle.onclick = function() {
    mode1 = "s";
}
buttonInverse.onclick = function() {
    mode1 = "inv";
}
buttonIntense.onclick = function() {
    mode1 = "i";
}
buttonInfared.onclick = function() {
    mode1 = "infa";
}

buttonSym.onclick = function() {
    mode2 = "s";
}
buttonNum.onclick = function() {
    mode2 = "n";
}
buttonLet.onclick = function() {
    mode2 = "l";
}
buttonCirc.onclick = function() {
    mode2 = "c";
}
buttonDrk.onclick = function() {
    mode2 = "d";
}
buttonLgt.onclick = function() {
    mode2 = "g";
}


class Cell {
    constructor(x, y, symbol, color) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

function screenShot() {
    var ctx = canvasElement.getContext("2d");
    var image = new Image();
    image.onload = function() {
        ctx.drawImage(image, 0, 0);
    };
    image.src = webcam.snap();
    pixels = ctx.getImageData(0, 0, w, h);
    console.log(pixels)

    newImg = [];
    for (let i = 0; i < h; i += 27 - slider.valueAsNumber) {
        for (let j = 0; j < w; j += 27 - slider.valueAsNumber) {
            const posx = j * 4;
            const posy = i * 4;
            const pos = posy * w + posx;

            const red = pixels.data[pos];
            const green = pixels.data[pos+1]
            const blue = pixels.data[pos+2]

            if (pixels.data[pos + 3] > 128) {
                const colTot = (red + green + blue) / 3;
                if (mode1 == "m") {
                    col = "rgb(" + red + ", " + green + ", " +  blue + ")";
                }
                else if (mode1 == "infa") {
                    if (colTot > 128) {
                        col = "rgb(" + red / 5 + ", " + 0 + ", " +  blue + ")";
                    }
                    else {
                        col = "rgb(" + red * 10 + ", " + 0 + ", " +  blue * 2 + ")";
                    }
                }
                else if (mode1 == "inv") {
                    col = "rgb(" + green + ", " + blue + ", " +  red + ")";
                }
                else if (mode1 == "i") {
                    col = "rgb(" + red * 5 + ", " + green * 5 + ", " +  blue * 5 + ")";
                }
                else if (mode1 == "s") {
                    col = "black";
                }
                else if (mode1 == "rb") {
                    col = "rgb(" + red + ", " + 0 + ", " +  blue + ")";
                }
                else if (mode1 == "rg") {
                    col = "rgb(" + red + ", " + green + ", " +  0 + ")";
                }
                else if (mode1 == "bg") {
                    col = "rgb(" + 0 + ", " + green + ", " +  blue + ")";
                }
                else {
                    col = "rgb(" + colTot + ", " + colTot + ", " + colTot + ")";
                }

                if (mode2 == "s") {
                    method = symbol(colTot);
                }
                else if (mode2 == "n") {
                    method = number(colTot);
                }
                else if (mode2 == "c") {
                    method = circle(colTot);
                }
                else if (mode2 == "d") {
                    method = darkDot(colTot);
                }
                else if (mode2 == "g") {
                    method = lightDot(colTot);
                }
                else {
                    method = letter(colTot);
                }
                newImg.push(new Cell(j, i, method, col));
            }
        }
    }
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    amt = 0;
    for (let i = 0; i < newImg.length; i++) {
        newImg[i].draw(ctx);
    }
}

function symbol(total) {
    if (total < 20) {
        return "!";
    }
    else if (total < 40) {
        return "@";
    }
    else if (total < 60) {
        return "#";
    }
    else if (total < 80) {
        return "$";
    }
    else if (total < 100) {
        return "%";
    }
    else if (total < 120) {
        return "^";
    }
    else if (total < 140) {
        return "&";
    }
    else if (total < 160) {
        return "*";
    }
    else if (total < 180) {
        return "?";
    }
    else if (total < 200) {
        return "+";
    }
    else if (total < 220) {
        return "}";
    }
    else if (total < 240) {
        return "{";
    }
    else {
        return "|";
    }
}

function number(total) {
    if (total < 20) {
        return "1";
    }
    else if (total < 40) {
        return "2";
    }
    else if (total < 60) {
        return "3";
    }
    else if (total < 80) {
        return "4";
    }
    else if (total < 100) {
        return "5";
    }
    else if (total < 120) {
        return "6";
    }
    else if (total < 140) {
        return "7";
    }
    else if (total < 160) {
        return "8";
    }
    else if (total < 180) {
        return "9";
    }
    else if (total < 200) {
        return "0";
    }
    else if (total < 220) {
        return "-";
    }
    else if (total < 240) {
        return "+";
    }
    else {
        return "=";
    }
}

function letter(total) {
    if (total < 20) {
        return "A";
    }
    else if (total < 40) {
        return "W";
    }
    else if (total < 60) {
        return "Q";
    }
    else if (total < 80) {
        return "R";
    }
    else if (total < 100) {
        return "K";
    }
    else if (total < 120) {
        return "M";
    }
    else if (total < 140) {
        return "B";
    }
    else if (total < 160) {
        return "T";
    }
    else if (total < 180) {
        return "Y";
    }
    else if (total < 200) {
        return "Z";
    }
    else if (total < 220) {
        return "G";
    }
    else if (total < 240) {
        return "H";
    }
    else {
        return "X";
    }
}

function circle(total) {
    if (total < 85) {
        return "o";
    }
    else if (total < 170) {
        return "0";
    }
    else {
        return "O";
    }
}

function darkDot(total) {
    if (total >= 100) {
        return ".";
    }
    else {
        return "";
    }
}

function lightDot(total) {
    if (total < 100) {
        return "*";
    }
    else {
        return "";
    }
}

var intervalID = window.setInterval(myCallback, 1);

function myCallback() {
    screenShot();
}
