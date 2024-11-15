       // JavaScript for Kruskal's algorithm and visualization logic goes here
        // For example:
       // Get the canvas context
const canvas = document.getElementById('visualizationCanvas');
const ctx = canvas.getContext('2d');

// Graph data and union-find structure
let edges = [];
let nodes = [];
let parent = [];
let rank = [];

// Function to initialize the graph (nodes and edges)
function initializeGraph() {
    nodes = [0, 1, 2, 3, 4]; // Example nodes, can be changed based on requirement
    edges = [
        { u: 0, v: 1, weight: 2 },
        { u: 0, v: 3, weight: 6 },
        { u: 1, v: 2, weight: 3 },
        { u: 1, v: 3, weight: 8 },
        { u: 1, v: 4, weight: 5 },
        { u: 2, v: 4, weight: 7 },
        { u: 3, v: 4, weight: 9 }
    ];
    
    // Initialize union-find structures
    for (let i = 0; i < nodes.length; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
    
    edges.sort((a, b) => a.weight - b.weight); // Sort edges by weight
}

// Function to find the root of a node (with path compression)
function find(node) {
    if (parent[node] !== node) {
        parent[node] = find(parent[node]);
    }
    return parent[node];
}

// Function to union two sets (by rank)
function union(node1, node2) {
    let root1 = find(node1);
    let root2 = find(node2);
    
    if (root1 !== root2) {
        if (rank[root1] > rank[root2]) {
            parent[root2] = root1;
        } else if (rank[root1] < rank[root2]) {
            parent[root1] = root2;
        } else {
            parent[root2] = root1;
            rank[root1]++;
        }
    }
}

// Function to draw nodes on the canvas
function drawNodes() {
    const positions = [
        { x: 100, y: 100 },
        { x: 200, y: 50 },
        { x: 300, y: 100 },
        { x: 150, y: 200 },
        { x: 250, y: 200 }
    ];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    
    nodes.forEach((node, index) => {
        const pos = positions[index];
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'lightblue';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(node, pos.x, pos.y + 6);
    });
}

// Function to draw edges on the canvas
function drawEdge(edge, color) {
    const positions = [
        { x: 100, y: 100 },
        { x: 200, y: 50 },
        { x: 300, y: 100 },
        { x: 150, y: 200 },
        { x: 250, y: 200 }
    ];

    const posU = positions[edge.u];
    const posV = positions[edge.v];

    ctx.beginPath();
    ctx.moveTo(posU.x, posU.y);
    ctx.lineTo(posV.x, posV.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw the weight of the edge
    const midX = (posU.x + posV.x) / 2;
    const midY = (posU.y + posV.y) / 2;
    ctx.fillStyle = 'black';
    ctx.fillText(edge.weight, midX, midY - 5);
}

// Function to visualize Kruskal's algorithm step-by-step
async function startKruskalAlgorithm() {
    initializeGraph();
    drawNodes();

    // MST will store the edges in the minimum spanning tree
    let mst = [];
    for (let edge of edges) {
        // Highlight the edge being considered in yellow
        drawEdge(edge, 'yellow');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause to visualize

        const rootU = find(edge.u);
        const rootV = find(edge.v);

        if (rootU !== rootV) {
            // Edge does not form a cycle; add to MST
            union(edge.u, edge.v);
            mst.push(edge);
            drawEdge(edge, 'green'); // MST edge in green
        } else {
            // Edge discarded due to cycle formation
            drawEdge(edge, 'red');
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause to visualize
    }

    // Display the result of the MST in the console
    console.log("Edges in MST:", mst);
}

// Initialize graph on page load
initializeGraph();
drawNodes();
