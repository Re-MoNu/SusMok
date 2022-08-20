let $canvas = document.getElementById("board");
let ctx = $canvas.getContext('2d');
let turnDisplay = document.getElementById("turn");
let game = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
let RedTurn = false;
let ix, iy;

let sel = 0;
let gameover = false;

function drawBoard() {
    ctx.lineWidth = 1;
    for (ix = 0; ix < 5; ix++) {
        for (iy = 0; iy < 5; iy++) {

            ctx.beginPath();
            ctx.arc(ix * 100 + 80, iy * 100 + 80, 40, 0, Math.PI * 2);
            // console.log(ix, iy, game[ix][iy], sel);

            switch (game[iy][ix]) {
                case 0:
                    ctx.fillStyle = "dodgerblue";
                    break;

                case 1:
                    ctx.fillStyle = "yellow";
                    break;

                case 2:
                    ctx.fillStyle = "red";
                    break;

                default:
                    alert("Error");
            }

            ctx.fill();

            ctx.closePath();

        }
    }
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.arc((sel + 1) * 100 - 20, 480, 35, 0, Math.PI * 2);
    ctx.strokeStyle = "lightblue";
    ctx.stroke();
    ctx.closePath();
}

function phys(params) {

}

let rightPressed = false;
let leftPressed = false;
let downPressed = false;
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) { //left 37, right 39
    // // console.log(e.keyCode);
    // if (e.keyCode == 39) {
    //     rightPressed = true;
    // } else if (e.keyCode == 37) {
    //     leftPressed = true;
    // }
    if (e.keyCode == 32) {
        downPressed = true;
    }
}

function keyUp(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

let repeat = setInterval(phys, 20);

function phys() {
    drawBoard();
    if (rightPressed && sel < 4) {
        sel++;
        rightPressed = false;
    } else if (leftPressed && sel > 0) {
        sel--;
        leftPressed = false;
    }

    if (downPressed) {
        downPressed = false;
        for (i = 4; i >= 0; i--) {
            if (game[i][sel] == 0) {

                if (RedTurn) RedTurn = false;
                else RedTurn = true;
                switch (RedTurn) {
                    case true:
                        game[i][sel] = 2;
                        turnDisplay.innerText = "Yellow's Turn!";
                        if (winCheck(i, sel, 2)) {
                            drawBoard();
                            turnDisplay.innerText = "Red Wins!";
                            clearInterval(repeat);
                        }
                        winCheck(i, sel, 2);
                        break;
                    case false:
                        game[i][sel] = 1;
                        turnDisplay.innerText = "Red's Turn!";
                        if (winCheck(i, sel, 1)) {
                            drawBoard();
                            turnDisplay.innerText = "Yellow Wins!";
                            clearInterval(repeat);
                        }
                        break;
                }
                break;
            }
        }
    }
}

function winCheck(x, y, c) {
    let i, check = true;
    for (i = 1; i < 4; i++) {
        if (game[x + i][y] != c) {
            check = false;
            break;
        }
    }
    if (check) return true;
    check = true;
    for (i = 1; i < 4; i++) {
        if (game[x - i][y] != c) {
            check = false;
            break;
        }
    }
    if (check) return true;
    check = true;
    for (i = 1; i < 4; i++) {
        if (game[x][y + i] != c) {
            check = false;
            break;
        }
    }
    if (check) return true;
    check = true;
    for (i = 1; i < 4; i++) {
        if (game[x][y - i] != c) {
            check = false;
            break;
        }
    }
    return check;
}

function displayHelp() {
    alert("좌우 화살표 키로 커서를 옮기세요!");
    alert("스페이스바를 누르면 공이 떨어집니다!");
    alert("세로 혹은 가로로 4줄을 만들면 승리!")
}