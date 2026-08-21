# 🧩 Customer Segmentation Explorer

> An interactive web application for exploring customer data and discovering meaningful customer segments using **K-Means clustering**.

![License](https://img.shields.io/badge/License-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

---

## 🌟 Overview

**Customer Segmentation Explorer** is an interactive data visualization tool that allows users to upload customer datasets and explore customer segments using the **K-Means clustering algorithm**.

Users can select different numeric attributes, adjust the number of clusters, and instantly visualize how customers are grouped based on their characteristics.

The project is designed to make clustering and customer segmentation easier to understand through interactive charts and real-time statistics.

---

## ✨ Features

* 📂 **CSV Upload**
  Upload your own customer dataset using drag-and-drop or file selection.

* 🔢 **Interactive Clustering**
  Adjust the number of clusters from **2 to 10** and see the results update dynamically.

* 📊 **Dual Visualization**
  Explore your data through:

  * Scatter plot
  * Cluster distribution bar chart

* 🎯 **Flexible Axes**
  Choose any numeric column for the X and Y axes.

* 🎨 **Smart Cluster Color Coding**
  Clusters are visually distinguished based on their relative size.

* ✖️ **Cluster Centers**
  Centroids are displayed as black crosses on the scatter plot.

* 📈 **Real-Time Statistics**
  Instantly view:

  * Total number of customers
  * Number of clusters
  * Largest cluster size

* ⚡ **Client-Side Processing**
  All clustering and visualization happens directly in the browser.

---

## 🖼️ Preview

Add a screenshot of your project here:

```text
assets/
└── screenshot.png
```

Then display it using:

```markdown
![Customer Segmentation Explorer Preview](assets/screenshot.png)
```

---

## 🛠️ Built With

* **HTML5** — Application structure
* **CSS3** — Responsive styling with Flexbox and Grid
* **JavaScript (ES6+)** — Application logic
* **Chart.js** — Interactive data visualizations
* **Papa Parse** — CSV parsing
* **Custom K-Means Implementation** — Customer clustering

---

## 📁 Project Structure

```text
customer-segmentation-explorer/
│
├── index.html                 # Main HTML file
│
├── css/
│   └── style.css              # Application styles
│
├── js/
│   └── app.js                 # Application logic and K-Means algorithm
│
├── data/
│   └── Mall_Customers.csv     # Sample dataset
│
├── assets/
│   ├── screenshot.png         # Project preview
│   └── favicon.ico            # Browser icon
│
├── docs/
│   ├── algorithm.md           # K-Means algorithm explanation
│   └── user-guide.md          # User guide
│
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/RameeshaAkram/customer-segmentation-explorer.git
```

### 2. Navigate to the Project Directory

```bash
cd customer-segmentation-explorer
```

### 3. Open the Application

Open the `index.html` file in your preferred web browser.

That's it! 🎉

You can now upload a CSV file and start exploring customer segments.

---

## 📊 Dataset Format

Your CSV file should contain numeric columns that can be used for clustering and visualization.

Example:

| Age | Annual Income (k$) | Spending Score (1-100) |
| --- | ------------------ | ---------------------- |
| 19  | 15                 | 39                     |
| 21  | 15                 | 81                     |
| 20  | 16                 | 6                      |
| 23  | 16                 | 77                     |

### Recommended Columns

* **Age** — Customer age
* **Annual Income (k$)** — Customer annual income
* **Spending Score (1-100)** — Customer spending behavior

You can use the popular **Mall Customers Dataset** or upload your own customer dataset.

> **Note:** The application works best when your dataset contains multiple numeric columns.

---

## 🧠 How K-Means Clustering Works

K-Means is an unsupervised machine learning algorithm that groups similar data points into clusters.

### Step 1 — Initialize Centroids

The algorithm randomly selects **K initial cluster centers**, also known as centroids.

### Step 2 — Assign Data Points

Each customer is assigned to the nearest centroid based on the distance between the data point and the centroid.

### Step 3 — Recalculate Centroids

The centroid of each cluster is recalculated using the mean position of all data points assigned to that cluster.

### Step 4 — Repeat

Steps 2 and 3 are repeated until the cluster assignments stabilize or the algorithm reaches its stopping condition.

```text
Initialize Centroids
        ↓
Assign Points to Nearest Cluster
        ↓
Recalculate Cluster Centers
        ↓
Repeat Until Stable
```

---

## 📈 Understanding the Visualizations

### 🔵 Scatter Plot

The scatter plot helps visualize the relationship between two selected customer attributes.

* Each **dot** represents a customer.
* The **X-axis** represents the selected attribute.
* The **Y-axis** represents the selected attribute.
* Colors indicate **cluster membership**.
* **✕ markers** represent cluster centroids.

This makes it easier to identify patterns and groups within the customer data.

---

### 📊 Cluster Distribution Bar Chart

The bar chart shows how customers are distributed across the generated clusters.

* Each bar represents a cluster.
* The height of the bar represents the number of customers.
* Bar colors match the corresponding clusters in the scatter plot.

---

## 🎯 Example Use Cases

This project can be used to explore customer groups based on:

* 💰 Income and spending behavior
* 👥 Age and purchasing patterns
* 🛍️ Customer engagement
* 📈 Customer behavior analysis
* 🎯 Marketing segmentation

For example, a business could identify groups such as:

* **High-income, high-spending customers**
* **High-income, low-spending customers**
* **Young customers with high spending scores**
* **Budget-conscious customers**

---

## 🔮 Future Improvements

* [ ] Export clustering results as CSV
* [ ] Add additional clustering algorithms

  * DBSCAN
  * Hierarchical Clustering
* [ ] Add a dark mode toggle
* [ ] Create a detailed cluster statistics panel
* [ ] Add animated K-Means iterations
* [ ] Improve mobile responsiveness
* [ ] Add dataset validation and error handling
* [ ] Allow users to download generated charts

---

## 🤝 Contributing

Contributions are welcome and appreciated! 🎉

To contribute:

1. **Fork** the repository.
2. Create a new feature branch:

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes:

```bash
git commit -m "Add amazing feature"
```

4. Push your branch:

```bash
git push origin feature/amazing-feature
```

5. Open a **Pull Request**.

---

## 📝 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

## 🙏 Acknowledgments

Special thanks to:

* Kaggle for providing customer datasets
* Chart.js for powerful and interactive visualizations
* Papa Parse for simple CSV parsing
* The open-source community for learning resources and inspiration

---

## 📞 Contact

**Rameesha Akram**

GitHub: [@RameeshaAkram](https://github.com/RameeshaAkram)

### 🔗 Project Repository

[Customer Segmentation Explorer](https://github.com/RameeshaAkram/customer-segmentation-explorer)

---

<p align="center">
  Made with ❤️ using HTML, CSS, and JavaScript
</p>
