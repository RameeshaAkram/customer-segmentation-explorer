// ============================================================
//  MAIN APPLICATION - Customer Segmentation Explorer
// ============================================================

// ---------- State ----------
let customerData = []; // Array of { Age, AnnualIncome, SpendingScore }
let currentX = 'Annual Income (k$)';
let currentY = 'Spending Score (1-100)';
let currentK = 5;

// Chart instances
let scatterChart = null;
let barChart = null;

// ---------- DOM Refs ----------
const fileInput = document.getElementById('csvUpload');
const fileStatus = document.getElementById('fileStatus');
const controls = document.getElementById('controls');
const chartGrid = document.getElementById('chartGrid');
const statsRow = document.getElementById('statsRow');
const legendFooter = document.getElementById('legendFooter');
const emptyState = document.getElementById('emptyState');

const xSelect = document.getElementById('xVar');
const ySelect = document.getElementById('yVar');
const clusterSlider = document.getElementById('clusterSlider');
const clusterLabel = document.getElementById('clusterLabel');
const clusterCountDisplay = document.getElementById('clusterCountDisplay');
const totalCustomers = document.getElementById('totalCustomers');
const largestCluster = document.getElementById('largestCluster');
const rowCount = document.getElementById('rowCount');
const resetBtn = document.getElementById('resetBtn');

// ---------- K-Means Implementation ----------
function kMeans(data, k, maxIter = 50) {
    if (k > data.length) k = data.length;
    if (k < 1) return { labels: new Array(data.length).fill(0), centroids: [] };

    // Initialize centroids (random points)
    const centroids = [];
    const usedIndices = new Set();
    while (centroids.length < k) {
        const idx = Math.floor(Math.random() * data.length);
        if (!usedIndices.has(idx)) {
            usedIndices.add(idx);
            centroids.push({ x: data[idx].x, y: data[idx].y });
        }
    }

    let labels = new Array(data.length).fill(0);
    let changed = true;
    let iter = 0;

    while (changed && iter < maxIter) {
        changed = false;
        iter++;

        // Assign each point to nearest centroid
        for (let i = 0; i < data.length; i++) {
            const p = data[i];
            let minDist = Infinity;
            let bestCluster = 0;
            for (let c = 0; c < centroids.length; c++) {
                const dx = p.x - centroids[c].x;
                const dy = p.y - centroids[c].y;
                const dist = dx * dx + dy * dy;
                if (dist < minDist) {
                    minDist = dist;
                    bestCluster = c;
                }
            }
            if (labels[i] !== bestCluster) {
                changed = true;
                labels[i] = bestCluster;
            }
        }

        // Update centroids
        const sums = centroids.map(() => ({ x: 0, y: 0, count: 0 }));
        for (let i = 0; i < data.length; i++) {
            const c = labels[i];
            sums[c].x += data[i].x;
            sums[c].y += data[i].y;
            sums[c].count += 1;
        }
        for (let c = 0; c < centroids.length; c++) {
            if (sums[c].count > 0) {
                centroids[c].x = sums[c].x / sums[c].count;
                centroids[c].y = sums[c].y / sums[c].count;
            } else {
                // Reinitialize empty centroid
                const idx = Math.floor(Math.random() * data.length);
                centroids[c].x = data[idx].x;
                centroids[c].y = data[idx].y;
            }
        }
    }
    return { labels, centroids };
}

// ---------- Build Scatter Chart ----------
function buildScatter(data, labels, centroids, xKey, yKey) {
    const ctx = document.getElementById('scatterChart').getContext('2d');

    // Group data by cluster
    const clusters = {};
    for (let i = 0; i < labels.length; i++) {
        const c = labels[i];
        if (!clusters[c]) clusters[c] = [];
        clusters[c].push({ x: data[i][xKey], y: data[i][yKey] });
    }

    const clusterKeys = Object.keys(clusters).map(Number).sort((a, b) => a - b);
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#9467bd', '#d62728', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

    // Find largest, middle, smallest
    const sizes = clusterKeys.map(k => clusters[k].length);
    const sorted = [...sizes].sort((a, b) => b - a);
    const largestSize = sorted[0] || 0;
    const smallestSize = sorted[sorted.length - 1] || 0;
    const middleSize = sorted.length >= 3 ? sorted[1] : (sorted[0] || 0);

    const datasets = clusterKeys.map((k, idx) => {
        const size = clusters[k].length;
        let color = colors[idx % colors.length];
        if (size === largestSize && largestSize > 0) color = '#1f77b4';
        else if (size === smallestSize && smallestSize > 0 && size !== largestSize) color = '#ff7f0e';
        else if (size === middleSize && middleSize > 0 && size !== largestSize && size !== smallestSize)
            color = '#2ca02c';
        else color = '#9467bd';

        return {
            label: `Cluster ${k+1} (${size})`,
            data: clusters[k],
            backgroundColor: color,
            borderColor: color,
            pointRadius: 5,
            pointHoverRadius: 8,
            borderWidth: 0.5,
        };
    });

    // Add centroids
    datasets.push({
        label: 'Centroids',
        data: centroids.map(c => ({ x: c.x, y: c.y })),
        backgroundColor: '#000000',
        borderColor: '#000000',
        pointRadius: 8,
        pointHoverRadius: 11,
        pointStyle: 'cross',
        borderWidth: 2,
        pointBorderColor: '#111',
        pointBackgroundColor: '#111',
    });

    const config = {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label === 'Centroids') {
                                return `Centroid: (${context.raw.x.toFixed(1)}, ${context.raw.y.toFixed(1)})`;
                            }
                            return `${context.dataset.label} · (${context.raw.x}, ${context.raw.y})`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: xKey, font: { weight: 'bold' } },
                    min: 0,
                },
                y: {
                    title: { display: true, text: yKey, font: { weight: 'bold' } },
                    min: 0,
                }
            }
        }
    };

    if (scatterChart) scatterChart.destroy();
    scatterChart = new Chart(ctx, config);
}

// ---------- Build Bar Chart ----------
function buildBarChart(labels) {
    const ctx = document.getElementById('barChart').getContext('2d');

    const clusterCounts = {};
    for (let i = 0; i < labels.length; i++) {
        const c = labels[i];
        clusterCounts[c] = (clusterCounts[c] || 0) + 1;
    }
    const clusterKeys = Object.keys(clusterCounts).map(Number).sort((a, b) => a - b);
    const counts = clusterKeys.map(k => clusterCounts[k]);

    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#9467bd', '#d62728', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

    const sorted = [...counts].sort((a, b) => b - a);
    const largestSize = sorted[0] || 0;
    const smallestSize = sorted[sorted.length - 1] || 0;
    const middleSize = sorted.length >= 3 ? sorted[1] : (sorted[0] || 0);

    const bgColors = counts.map((size) => {
        if (size === largestSize && largestSize > 0) return '#1f77b4';
        else if (size === smallestSize && smallestSize > 0 && size !== largestSize) return '#ff7f0e';
        else if (size === middleSize && middleSize > 0 && size !== largestSize && size !== smallestSize)
            return '#2ca02c';
        return '#9467bd';
    });

    const config = {
        type: 'bar',
        data: {
            labels: clusterKeys.map(k => `Cluster ${k+1}`),
            datasets: [{
                label: 'Customers',
                data: counts,
                backgroundColor: bgColors,
                borderColor: bgColors,
                borderWidth: 1,
                borderRadius: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const val = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                            return `${val} customers (${pct}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Customers', font: { weight: 'bold' } }
                },
                x: {
                    title: { display: true, text: 'Cluster', font: { weight: 'bold' } }
                }
            }
        }
    };

    if (barChart) barChart.destroy();
    barChart = new Chart(ctx, config);
}

// ---------- Update Everything ----------
function update() {
    if (customerData.length === 0) return;

    const xKey = xSelect.value;
    const yKey = ySelect.value;
    const k = parseInt(clusterSlider.value, 10);
    currentX = xKey;
    currentY = yKey;
    currentK = k;

    // Prepare data for k-means
    const points = customerData.map(d => ({
        x: parseFloat(d[xKey]) || 0,
        y: parseFloat(d[yKey]) || 0
    }));

    // Run k-means
    const result = kMeans(points, k);
    const { labels, centroids } = result;

    // Update stats
    const total = customerData.length;
    totalCustomers.textContent = total;
    rowCount.textContent = total;

    const clusterCounts = {};
    for (let i = 0; i < labels.length; i++) {
        const c = labels[i];
        clusterCounts[c] = (clusterCounts[c] || 0) + 1;
    }
    const counts = Object.values(clusterCounts);
    const maxCount = counts.length ? Math.max(...counts) : 0;
    const maxPct = total > 0 ? ((maxCount / total) * 100).toFixed(0) : 0;
    largestCluster.textContent = maxCount > 0 ? `${maxCount} (${maxPct}%)` : '—';
    clusterCountDisplay.textContent = k;
    clusterLabel.textContent = k;

    // Build charts
    buildScatter(customerData, labels, centroids, xKey, yKey);
    buildBarChart(labels);
}

// ---------- Load CSV ----------
function loadCSV(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const csv = e.target.result;

        // Parse CSV
        const result = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            trimHeaders: true,
        });

        if (result.errors.length > 0) {
            fileStatus.innerHTML = `<span style="color:#dc2626;">❌ Error parsing CSV. Please check the format.</span>`;
            return;
        }

        // Map data
        const rows = result.data.filter(row => {
            const hasAge = row['Age'] !== undefined && row['Age'] !== '';
            const hasIncome = row['Annual Income (k$)'] !== undefined && row['Annual Income (k$)'] !== '';
            const hasSpending = row['Spending Score (1-100)'] !== undefined && row['Spending Score (1-100)'] !== '';
            return hasAge && hasIncome && hasSpending;
        });

        if (rows.length === 0) {
            fileStatus.innerHTML =
                `<span style="color:#dc2626;">❌ No valid data found. Expected columns: Age, Annual Income (k$), Spending Score (1-100)</span>`;
            return;
        }

        customerData = rows.map(row => ({
            'Age': parseFloat(row['Age']),
            'Annual Income (k$)': parseFloat(row['Annual Income (k$)']),
            'Spending Score (1-100)': parseFloat(row['Spending Score (1-100)']),
        }));

        // Update UI
        fileStatus.innerHTML = `<span class="loaded">✅ Loaded ${customerData.length} customers from ${file.name}</span>`;

        // Show all sections
        controls.classList.remove('hidden');
        chartGrid.classList.remove('hidden');
        statsRow.classList.remove('hidden');
        legendFooter.classList.remove('hidden');
        emptyState.classList.add('hidden');

        // Update x/y dropdowns with available columns
        const columns = Object.keys(customerData[0]);
        updateDropdownOptions(columns);

        // Initial render
        update();
    };

    reader.onerror = function() {
        fileStatus.innerHTML = `<span style="color:#dc2626;">❌ Error reading file.</span>`;
    };

    reader.readAsText(file);
}

function updateDropdownOptions(columns) {
    const selects = [xSelect, ySelect];
    selects.forEach(select => {
        const currentVal = select.value;
        select.innerHTML = '';
        columns.forEach(col => {
            const option = document.createElement('option');
            option.value = col;
            option.textContent = col;
            select.appendChild(option);
        });
        if (columns.includes(currentVal)) {
            select.value = currentVal;
        }
    });
    if (columns.includes('Annual Income (k$)')) xSelect.value = 'Annual Income (k$)';
    if (columns.includes('Spending Score (1-100)')) ySelect.value = 'Spending Score (1-100)';
}

// ---------- Event Bindings ----------
fileInput.addEventListener('change', function(e) {
    if (this.files && this.files.length > 0) {
        loadCSV(this.files[0]);
    }
});

xSelect.addEventListener('change', update);
ySelect.addEventListener('change', update);

clusterSlider.addEventListener('input', function() {
    clusterLabel.textContent = this.value;
    update();
});

resetBtn.addEventListener('click', function() {
    if (customerData.length === 0) return;
    const columns = Object.keys(customerData[0]);
    if (columns.includes('Annual Income (k$)')) xSelect.value = 'Annual Income (k$)';
    if (columns.includes('Spending Score (1-100)')) ySelect.value = 'Spending Score (1-100)';
    clusterSlider.value = '5';
    clusterLabel.textContent = '5';
    update();
});

// ---------- Drag & Drop Support ----------
const uploadSection = document.getElementById('uploadSection');

uploadSection.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.borderColor = '#3b82f6';
    this.style.background = '#eef4ff';
});

uploadSection.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.style.borderColor = '#c5d6e8';
    this.style.background = '#f7faff';
});

uploadSection.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.borderColor = '#c5d6e8';
    this.style.background = '#f7faff';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        loadCSV(files[0]);
    }
});

console.log('🚀 Customer Segmentation Explorer ready!');
console.log('📊 Upload a CSV file to get started.');
console.log('📁 Expected columns: Age, Annual Income (k$), Spending Score (1-100)');