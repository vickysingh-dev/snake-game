const board = document.querySelector(".board");
const result = document.querySelector(".result");
const score = document.querySelector(".score");

CELL_COUNT = 400;
NO_OF_ROWS = 20;
NO_OF_COLS = 20;

let points = 0;

// ====================== laying down the cells ===========================

for (i = 0; i < CELL_COUNT; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("cell");
    board.appendChild(newDiv);
}

const cell = document.querySelectorAll(".cell");

// ==================== setting snake initial body =======================

const snake = []; // contains snake position

const snakeInitial = CELL_COUNT / 2 + NO_OF_COLS / 2;
console.log(snakeInitial);

snake.push(snakeInitial);
snake.push(snakeInitial - 1);
snake.push(snakeInitial - 2);
snake.push(snakeInitial - 3);

snake.forEach((item) => {
    cell[item].classList.add("snake");
});

let snakeLastTail;

// ===================== setting board borders =========================

const borderCellIndex = [];

cell.forEach((item, index) => {
    if (index < NO_OF_COLS) {
        item.classList.add("border");
        borderCellIndex.push(index);
    } else if (index % NO_OF_ROWS === 0) {
        item.classList.add("border");
        borderCellIndex.push(index);
    } else if (index % NO_OF_ROWS === NO_OF_COLS - 1) {
        item.classList.add("border");
        borderCellIndex.push(index);
    } else if (index >= cell.length - NO_OF_COLS) {
        item.classList.add("border");
        borderCellIndex.push(index);
    }
});

const borderCells = document.querySelectorAll(".border");

// =================== directing snake's movement =========================

document.addEventListener("keydown", setDirection);

function setDirection(e) {
    let direction = board.getAttribute("data-direction");
    switch (e.key) {
        case "ArrowLeft":
            if (!direction) {
                board.setAttribute("data-direction", "right");
            }
            if (direction == "right") {
            } else {
                board.setAttribute("data-direction", "left");
            }
            break;
        case "ArrowUp":
            if (direction == "down") {
            } else {
                board.setAttribute("data-direction", "up");
            }
            break;
        case "ArrowRight":
            if (direction == "left") {
            } else {
                board.setAttribute("data-direction", "right");
            }
            break;
        case "ArrowDown":
            if (direction == "up") {
            } else {
                board.setAttribute("data-direction", "down");
            }
            break;
    }
    startGame();
}

let timeOutArray = [];

function startGame() {
    timeOutArray.push(setTimeout(movement, 500));
}

let lastDirection = "unset";

function movement() {
    if (foodIndex == undefined) {
        layingFood();
    }
    let direction = board.getAttribute("data-direction");
    let spare;
    let spare_2;
    if (direction == "right") {
        for (i = 0; i < snake.length; i++) {
            if (i == 0) {
                spare = snake[i];
                cell[snake[i]].classList.remove("snake");
                snake[i] += 1;
                cell[snake[i]].classList.add("snake");
            } else {
                cell[snake[i]].classList.remove("snake");
                spare_2 = snake[i];
                snake[i] = spare;
                spare = spare_2;
                cell[snake[i]].classList.add("snake");
                snakeLastTail = spare;
            }
        }
    } else if (direction == "left") {
        for (i = 0; i < snake.length; i++) {
            if (i == 0) {
                spare = snake[i];
                cell[snake[i]].classList.remove("snake");
                snake[i] -= 1;
                cell[snake[i]].classList.add("snake");
            } else {
                cell[snake[i]].classList.remove("snake");
                spare_2 = snake[i];
                snake[i] = spare;
                spare = spare_2;
                cell[snake[i]].classList.add("snake");
                snakeLastTail = spare;
            }
        }
    } else if (direction == "up") {
        for (i = 0; i < snake.length; i++) {
            if (i == 0) {
                spare = snake[i];
                cell[snake[i]].classList.remove("snake");
                snake[i] -= NO_OF_COLS;
                cell[snake[i]].classList.add("snake");
            } else {
                cell[snake[i]].classList.remove("snake");
                spare_2 = snake[i];
                snake[i] = spare;
                spare = spare_2;
                cell[snake[i]].classList.add("snake");
                snakeLastTail = spare;
            }
        }
    } else if (direction == "down") {
        for (i = 0; i < snake.length; i++) {
            if (i == 0) {
                spare = snake[i];
                cell[snake[i]].classList.remove("snake");
                snake[i] += NO_OF_COLS;
                cell[snake[i]].classList.add("snake");
            } else {
                cell[snake[i]].classList.remove("snake");
                spare_2 = snake[i];
                snake[i] = spare;
                spare = spare_2;
                cell[snake[i]].classList.add("snake");
                snakeLastTail = spare;
            }
        }
    }
    if (cell[snake[0]].classList.contains("food")) {
        snake.push(snakeLastTail);
        foodCell.classList.remove("food");
        layingFood();
        points += 5;
    }
    if (borderCellIndex.indexOf(snake[0]) > -1) {
        endGame();
    } else if (snake.slice(1).includes(snake[0])) {
        endGame();
    } else {
        timeOutArray.forEach((item) => clearTimeout(item));
        timeOutArray = [];
        startGame();
    }
}

// feeding the snake

let foodIndex;
let foodCell;

function layingFood() {
    const emptyCells = document.querySelectorAll(
        ".cell:not(.snake):not(.border)"
    );
    function foodIndexfunction() {
        return Math.floor(Math.random() * emptyCells.length);
    }
    foodIndex = foodIndexfunction();
    foodCell = emptyCells[foodIndex];
    foodCell.classList.add("food");
}

function endGame() {
    document.removeEventListener("keydown", startGame);
    window.clearTimeout(movement);
    result.style.display = "flex";
    score.textContent = points;
    document.querySelector(".try-again").addEventListener("click", newGame);
}

function newGame() {
    window.location.reload();
}
