 const canvas = document.getElementById("visualizationCanvas");
        const ctx = canvas.getContext("2d");

        // Graph data: nodes and edges
        const nodes = [
            { id: 0, x: 100, y: 200 },
            { id: 1, x: 200, y: 100 },
            { id: 2, x: 200, y: 300 },
            { id: 3, x: 300, y: 100 },
            { id: 4, x: 300, y: 300 },
            { id: 5, x: 400, y: 200 },
        ];

        const edges = [
            { from: 0, to: 1 },
            { from: 0, to: 2 },
            { from: 1, to: 3 },
            { from: 2, to: 4 },
            { from: 3, to: 5 },
            { from: 4, to: 5 },
        ];

        // Colors for each level
        const levelColors = ["blue", "green", "orange", "purple", "red", "brown"];
        const visitedColors = {}; // To store permanent colors for visited nodes

        // Function to draw nodes
        function drawNode(node, color = "blue") {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.fillText(node.id, node.x - 5, node.y + 5);
        }

        // Function to draw edges
        function drawEdge(edge) {
            const fromNode = nodes[edge.from];
            const toNode = nodes[edge.to];
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();
        }

        // Function to clear canvas
        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Draw the entire graph
        function drawGraph() {
            clearCanvas();
            edges.forEach(drawEdge);
            nodes.forEach(node => {
                const color = visitedColors[node.id] || "blue";
                drawNode(node, color);
            });
        }

        // BFS algorithm with visualization and level coloring
        async function bfs(startNode) {
            const visited = new Set();
            const queue = [[startNode, 0]];  // Queue stores nodes with their levels
            visited.add(startNode);

            // Clear and update node list
            const nodeList = document.getElementById("nodeList");
            nodeList.innerHTML = "";

            while (queue.length > 0) {
                const [currentNode, level] = queue.shift();
                const color = levelColors[level % levelColors.length];
                visitedColors[currentNode] = color; // Store color for permanent use
                drawGraph();
                drawNode(nodes[currentNode], color);

                // Append to node list with color for visualization
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.style.color = color;
                listItem.innerText = `Node ${currentNode} (Level ${level})`;
                nodeList.appendChild(listItem);

                await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for visualization

                // Explore neighbors
                edges.forEach(edge => {
                    if (edge.from === currentNode && !visited.has(edge.to)) {
                        queue.push([edge.to, level + 1]);
                        visited.add(edge.to);
                    }
                    if (edge.to === currentNode && !visited.has(edge.from)) {
                        queue.push([edge.from, level + 1]);
                        visited.add(edge.from);
                    }
                });
            }
        }

        // Start BFS Visualization
        function startBFS() {
            const startNode = parseInt(document.getElementById("startNode").value);
            if (isNaN(startNode) || startNode < 0 || startNode >= nodes.length) {
                alert("Please enter a valid start node between 0 and 5.");
                return;
            }
            drawGraph();
            bfs(startNode); // Start BFS from user-selected node
        }

        // Initial graph rendering
        drawGraph();
