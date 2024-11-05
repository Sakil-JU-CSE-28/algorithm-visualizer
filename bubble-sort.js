let canvas = document.getElementById("visualizationCanvas");
let ctx = canvas.getContext("2d");
let numbers = [];
let isSorting = false;
let speed = 5;
let interval;

// Function to start the bubble sort visualization
function startVisualization() {
    const input = document.getElementById("inputArray").value;
    if (input.trim() === "") {
        alert("Please enter some numbers.");
        return;
    }

    // Convert the input string into an array of numbers
    numbers = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    if (numbers.length === 0) {
        alert("Please enter valid numbers.");
        return;
    }

    isSorting = true;
    const arrayLength = numbers.length;

    // Reset the visualization on the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawArray(numbers);

    // Create a copy of the array to sort
    let arr = [...numbers];

    let i = 0;
    let j = 0;

    interval = setInterval(() => {
        if (i < arrayLength) {
            if (j < arrayLength - i - 1) {
                if (arr[j] > arr[j + 1]) {
                    // Swap the elements
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    // Redraw the array after swapping
                    drawArray(arr, j, j + 1);
                }
                j++;
            } else {
                j = 0;
                i++;
            }
        } else {
            clearInterval(interval);
            isSorting = false;
        }
    }, 1000 / speed); // Adjust speed of sorting
}

// Function to draw the array on the canvas
function drawArray(array, highlightIndex1 = -1, highlightIndex2 = -1) {
    const width = canvas.width / array.length;
    const maxHeight = canvas.height;

    // Find the absolute maximum value in the array
    const maxAbsValue = Math.max(...array.map(Math.abs));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    array.forEach((value, index) => {
        // Calculate height based on the absolute value of the element
        const height = (Math.abs(value) / maxAbsValue) * maxHeight;
        const x = index * width;
        const y = maxHeight - height;

        // Set color based on whether the bar is being compared or swapped
        if (index === highlightIndex1 || index === highlightIndex2) {
            ctx.fillStyle = "red"; // Highlight color for current comparison
        } else {
            ctx.fillStyle = "blue"; // Normal color
        }
        ctx.fillRect(x, y, width - 1, height);

        // Draw the value of the array above the corresponding bar
        ctx.fillStyle = "black"; // Color for the text
        ctx.fillText(value, x + (width / 2) - 10, y - 5); // Position text above the bar for positive values

        // Draw negative values below the bar
        if (value < 0) {
            ctx.fillText(value, x + (width / 2) - 10, maxHeight - (height + 10)); // Position text below the bar for negative values
        }
    });

    // Label the highest value on the graph
    const maxIndex = array.indexOf(Math.max(...array));
    const maxValue = array[maxIndex];
    const maxHeightPosition = (Math.abs(maxValue) / maxAbsValue) * maxHeight;
    ctx.fillStyle = "green"; // Color for the max value label
    ctx.fillText(maxValue, maxIndex * width + (width / 2) - 10, maxHeight - maxHeightPosition - 10); // Position above the bar
}

// Function to pause the visualization
function pauseVisualization() {
    if (isSorting) {
        clearInterval(interval);
        isSorting = false;
    }
}

// Function to reset the visualization
function resetVisualization() {
    clearInterval(interval);
    isSorting = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to update the speed
function updateSpeed(value) {
    speed = value;
    if (isSorting) {
        clearInterval(interval);
        startVisualization(); // Restart visualization with the new speed
    }
}
