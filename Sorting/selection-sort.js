  const canvas = document.getElementById("visualizationCanvas");
        const ctx = canvas.getContext("2d");

        let array = []; // Initial empty array

        // Function to draw the array as bars on the canvas
        function drawArray() {
            const barWidth = canvas.width / array.length;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing

            for (let i = 0; i < array.length; i++) {
                const barHeight = (array[i] / Math.max(...array)) * canvas.height; // Normalize bar height based on max value
                ctx.fillStyle = 'blue';
                ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
                ctx.fillStyle = 'white';
                ctx.fillText(array[i], i * barWidth + barWidth / 4, canvas.height - barHeight - 10);
            }
        }

        // Function to swap two elements in the array and play voice notification
        function swapElements(i, j) {
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements

            // Play voice notification
            const utterance = new SpeechSynthesisUtterance(`Swapping ${array[i]} and ${array[j]}`);
            speechSynthesis.speak(utterance);

            drawArray(); // Redraw the array after swap
        }

        // Function to perform the selection sort algorithm with visualization
        async function selectionSort() {
            for (let i = 0; i < array.length - 1; i++) {
                let minIndex = i;

                // Find the minimum element in the unsorted part of the array
                for (let j = i + 1; j < array.length; j++) {
                    if (array[j] < array[minIndex]) {
                        minIndex = j;
                    }
                }

                // If minIndex is not i, swap the elements and update the display
                if (minIndex !== i) {
                    swapElements(i, minIndex);
                }

                // Add delay to visualize the sorting process
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // Final sorted array display
            drawArray();
        }

        // Start Selection Sort Visualization
        function startSelectionSort() {
            const userInput = document.getElementById("userInput").value;
            // Parse the user input into an array of numbers
            array = userInput.split(',').map(num => parseInt(num.trim(), 10));

            if (array.some(isNaN)) {
                alert("Please enter a valid comma-separated list of numbers.");
                return;
            }

            drawArray(); // Initial drawing of the array
            selectionSort(); // Start the sorting process
        }

        // Reset the graph to initial state
        function resetGraph() {
            document.getElementById("userInput").value = ''; // Clear the input field
            array = []; // Clear the array
            drawArray(); // Redraw empty graph
        }

        // Initial empty graph rendering
        drawArray();
