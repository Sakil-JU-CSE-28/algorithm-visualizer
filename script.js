// Select DOM elements
const canvas = document.getElementById('visualization-canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const algorithmSelect = document.getElementById('algorithm-select');

let array = [];
let isPaused = false;
let animationId;

// Initialize canvas size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Generate a random array for visualization
function generateArray(size = 50) {
    array = Array.from({ length: size }, () => Math.floor(Math.random() * canvas.height));
    drawArray();
}

// Draw the array as bars
function drawArray() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / array.length;

    array.forEach((value, index) => {
        ctx.fillStyle = '#007bff';
        ctx.fillRect(index * barWidth, canvas.height - value, barWidth - 2, value);
    });
}

// Bubble Sort Visualization
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (isPaused) return;
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
                drawArray();
                await new Promise(resolve => setTimeout(resolve, 50)); // Animation delay
            }
        }
    }
}

// Event Listeners
startButton.addEventListener('click', () => {
    isPaused = false;
    const selectedAlgorithm = algorithmSelect.value;
    if (selectedAlgorithm === 'bubbleSort') {
        bubbleSort();
    }
    // Add cases for other algorithms here
});

pauseButton.addEventListener('click', () => {
    isPaused = true;
});

resetButton.addEventListener('click', () => {
    isPaused = true;
    generateArray();
});

// Initialize
generateArray();
