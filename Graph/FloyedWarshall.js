        const canvas = document.getElementById("visualizationCanvas");
        const ctx = canvas.getContext("2d");

        const nodes = [
            { id: 0, x: 100, y: 200 },
            { id: 1, x: 200, y: 100 },
            { id: 2, x: 200, y: 300 },
            { id: 3, x: 300, y: 100 },
            { id: 4, x: 300, y: 300 },
            { id: 5, x: 400, y: 200 },
        ];

        const edges = [
            { from: 0, to: 1, weight: 2 },
            { from: 0, to: 2, weight: 4 },
            { from: 1, to: 3, weight: 7 },
            { from: 2, to: 4, weight: 3 },
            { from: 3, to: 5, weight: 1 },
            { from: 4, to: 5, weight: 5 },
        ];

        const distances = Array.from({ length: nodes.length }, () => Array(nodes.length).fill(Infinity));

        // Initialize distances
        edges.forEach(edge => {
            distances[edge.from][edge.to] = edge.weight;
            distances[edge.to][edge.from] = edge.weight; // If undirected graph
        });

        for (let i = 0; i < nodes.length; i++) {
            distances[i][i] = 0;
        }

        // Function to draw nodes and edges
        function drawGraph() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            edges.forEach(edge => drawEdge(edge));
            nodes.forEach(node => drawNode(node));
        }

        function drawNode(node) {
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.fillText(node.id, node.x - 5, node.y + 5);
        }

        function drawEdge(edge) {
            const fromNode = nodes[edge.from];
            const toNode = nodes[edge.to];
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            ctx.fillText(edge.weight, midX, midY);
        }

        // Update the matrix display
        function updateMatrixDisplay() {
            const matrixDiv = document.getElementById("matrix");
            matrixDiv.innerHTML = ""; // Clear the current matrix

            distances.forEach(row => {
                row.forEach(value => {
                    const cell = document.createElement("div");
                    cell.className = "matrix-cell";
                    cell.textContent = value === Infinity ? "∞" : value;
                    matrixDiv.appendChild(cell);
                });
            });
        }

        // Floyd-Warshall Algorithm
        async function floydWarshall() {
            for (let k = 0; k < nodes.length; k++) {
                for (let i = 0; i < nodes.length; i++) {
                    for (let j = 0; j < nodes.length; j++) {
                        if (distances[i][j] > distances[i][k] + distances[k][j]) {
                            distances[i][j] = distances[i][k] + distances[k][j];
                            updateMatrixDisplay(); // Update matrix after each change
                            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
                        }
                    }
                }
            }
        }

        function runFloydWarshall() {
            drawGraph();
            updateMatrixDisplay();
            floydWarshall();
        }

        drawGraph(); // Initial render of the graph
