const canvas = document.getElementById("visualizationCanvas");
const ctx = canvas.getContext("2d");
let isRunning = false;
let speed = 5;
let array = [30, 100, 60, 10, 80, 40, 90, 70, 20, 50];

function renderArray(array) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    array.forEach((value, index) => {
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(index * 20, canvas.height - value, 18, value);
    });
}

function bubbleSortVisualize(array) {
    let i = 0;
    let j = 0;
    const interval = setInterval(() => {
        if (!isRunning) {
            clearInterval(interval);
            return;
        }
        if (i < array.length) {
            if (j < array.length - i - 1) {
                if (array[j] > array[j + 1]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    renderArray(array);
                }
                j++;
            } else {
                j = 0;
                i++;
            }
        } else {
            clearInterval(interval);
            isRunning = false;
        }
    }, 500 / speed);
}

function startVisualization() {
    if (!isRunning) {
        isRunning = true;
        bubbleSortVisualize(array);
    }
}

function pauseVisualization() {
    isRunning = false;
}

function resetVisualization() {
    isRunning = false;
    array = [30, 100, 60, 10, 80, 40, 90, 70, 20, 50];
    renderArray(array);
}

function updateSpeed(value) {
    speed = value;
}

// Initial render
renderArray(array);
