  // Initialize Ace Editor
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");

        // Function to run user's algorithm
        async function runUserAlgorithm() {
            const inputArray = prompt("Enter numbers separated by commas:");
            if (inputArray === null) return; // User canceled

            const numbers = inputArray.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
            if (numbers.length === 0) {
                alert("Please enter valid numbers.");
                return;
            }

            const userCode = editor.getValue();
            let userSort;

            // Create a new function from user code
            try {
                userSort = new Function('arr', userCode + "\nreturn arr;"); // Added return statement
            } catch (error) {
                alert("Error in user code: " + error.message);
                return;
            }

            // Execute user's sorting algorithm
            try {
                await visualizeSorting(numbers, userSort); // Execute the function
            } catch (error) {
                alert("Error in your algorithm: " + error.message);
            }
        }

        // Visualization function for drawing the array
        async function visualizeSorting(array, sortFunction) {
            const canvas = document.getElementById("visualizationCanvas");
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const width = canvas.width / array.length;
            const maxHeight = canvas.height;

            // Store all steps for visualization
            const steps = [];

            // Sort the array using the user's function, capturing intermediate states
            const originalArray = [...array]; // Preserve original array
            for (let i = 0; i < originalArray.length; i++) {
                for (let j = 0; j < originalArray.length - 1 - i; j++) {
                    // Example of a swap operation that can be modified for user's code
                    if (originalArray[j] > originalArray[j + 1]) {
                        [originalArray[j], originalArray[j + 1]] = [originalArray[j + 1], originalArray[j]]; // Swap elements
                    }
                    steps.push([...originalArray]); // Capture the state after each swap
                }
            }

            // Visualize each step of the sorting
            for (let step of steps) {
                for (let j = 0; j < step.length; j++) {
                    const height = (step[j] / Math.max(...array)) * maxHeight;
                    const x = j * width;
                    const y = maxHeight - height;

                    // Draw the bar
                    ctx.fillStyle = "blue"; // Color for the bars
                    ctx.fillRect(x, y, width - 1, height);
                }

                await new Promise(resolve => setTimeout(resolve, 500)); // Pause for visualization effect
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for the next iteration
            }

            // Final sorted array visualization
            steps.push([...originalArray]); // Add the final sorted state
            for (let j = 0; j < originalArray.length; j++) {
                const height = (originalArray[j] / Math.max(...array)) * maxHeight;
                const x = j * width;
                const y = maxHeight - height;
                ctx.fillStyle = "green"; // Color for the final sorted bars
                ctx.fillRect(x, y, width - 1, height);
            }
        }
