const canvas = document.getElementById("visualizationCanvas");
        const ctx = canvas.getContext("2d");

        // Graph data: nodes and weighted edges
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

        // Function to draw nodes
        function drawNode(node, color = "blue") {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "white";
            ctx.fillText(node.id, node.x - 5, node.y + 5);
        }

        // Function to draw edges with weights
        function drawEdge(edge) {
            const fromNode = nodes[edge.from];
            const toNode = nodes[edge.to];
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
            ctx.stroke();

            // Draw weight label
            ctx.fillStyle = "black";
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            ctx.fillText(edge.weight, midX, midY);
        }

        // Function to clear canvas
        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        // Draw the entire graph
        function drawGraph() {
            clearCanvas();
            edges.forEach(drawEdge);
            nodes.forEach(node => drawNode(node));
        }

        // Dijkstra's algorithm with visualization
        async function dijkstra(startNode) {
            const distances = Array(nodes.length).fill(Infinity);
            distances[startNode] = 0;
            const visited = new Set();
            const nodeList = document.getElementById("nodeList");
            nodeList.innerHTML = "";

            while (visited.size < nodes.length) {
                let currentNode = -1;
                let currentDistance = Infinity;

                // Find the unvisited node with the smallest distance
                distances.forEach((dist, node) => {
                    if (!visited.has(node) && dist < currentDistance) {
                        currentNode = node;
                        currentDistance = dist;
                    }
                });

                if (currentNode === -1) break; // All reachable nodes visited

                // Mark current node as visited
                visited.add(currentNode);
                drawGraph();

                // Color current node as being processed (green)
                drawNode(nodes[currentNode], "green");

                // Update node list with shortest path
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.innerText = `Node ${currentNode}: Distance ${currentDistance}`;
                nodeList.appendChild(listItem);

                await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for visualization

                // Update distances to neighboring nodes
                edges.forEach(edge => {
                    if ((edge.from === currentNode && !visited.has(edge.to)) ||
                        (edge.to === currentNode && !visited.has(edge.from))) {
                        const neighbor = edge.from === currentNode ? edge.to : edge.from;
                        const newDist = currentDistance + edge.weight;
                        
                        if (newDist < distances[neighbor]) {
                            distances[neighbor] = newDist;

                            // Color neighboring node as being updated (yellow)
                            drawGraph();
                            drawNode(nodes[neighbor], "yellow");
                        }
                    }
                });

                // Mark current node as fully processed (red)
                drawGraph();
                drawNode(nodes[currentNode], "red");
                await new Promise(resolve => setTimeout(resolve, 500)); // Short delay for visualization
            }
        }

        // Start Dijkstra's Visualization
        function startDijkstra() {
            const startNode = parseInt(document.getElementById("startNode").value);
            if (isNaN(startNode) || startNode < 0 || startNode >= nodes.length) {
                alert("Please enter a valid start node between 0 and 5.");
                return;
            }
            drawGraph();
            dijkstra(startNode); // Start Dijkstra's from user-selected node
        }

        // Initial graph rendering
        drawGraph();
