# 📘 User Guide

Welcome to the **Customer Segmentation Explorer**! 🎉

This guide explains how to upload your data, configure the clustering options, understand the visualizations, and interpret your results.

---

# 🚀 Getting Started

## 1️⃣ Upload Your Data

The application allows you to upload a customer dataset in **CSV format**.

### Option 1: Click to Upload

1. Click the **📁 Upload CSV File** button.
2. Select a CSV file from your computer.
3. Wait for the dataset to load.

### Option 2: Drag and Drop

1. Drag your CSV file from your computer.
2. Drop it into the upload area.
3. The application will automatically process the file.

Once the data is loaded successfully, the clustering controls and visualizations will become available.

---

# 📊 Dataset Requirements

Your CSV file should contain:

* A header row
* Numeric columns for analysis
* Valid numeric values in the columns you want to use

Example:

| Age | Annual Income (k$) | Spending Score (1-100) |
| --- | ------------------ | ---------------------- |
| 19  | 15                 | 39                     |
| 21  | 15                 | 81                     |
| 20  | 16                 | 6                      |
| 23  | 16                 | 77                     |

### Recommended Columns

The application works especially well with customer data such as:

* 👤 **Age**
* 💰 **Annual Income**
* 🛍️ **Spending Score**
* 📦 Purchase Frequency
* 💳 Average Transaction Value

> **Tip:** The more relevant and clean your numeric data is, the easier it will be to discover meaningful patterns.

---

# 🔍 Exploring Your Data

After uploading a dataset, you can explore it using several interactive components.

The application provides:

* 📈 **Scatter Plot** — Visualizes individual customers
* 📊 **Bar Chart** — Shows the size of each cluster
* 📌 **Cluster Statistics** — Summarizes the clustering results
* 🎛️ **Interactive Controls** — Allows you to adjust clustering and axes

---

# 🎯 Adjusting the Number of Clusters

Use the cluster slider to choose how many customer segments you want to create.

The available range is:

```text
2 → 10 clusters
```

### Moving the Slider

* Move the slider **left** to create fewer clusters.
* Move the slider **right** to create more clusters.

The charts should update automatically when the number of clusters changes.

### Example

```text
K = 2  → Broad customer groups
K = 3  → Basic segmentation
K = 5  → More detailed segmentation
K = 10 → Highly granular groups
```

> 💡 Start with `K = 5`, then experiment with different values to see which segmentation provides the most useful interpretation.

---

# 📐 Changing the X and Y Axes

Use the dropdown menus to select which numeric columns appear on the scatter plot.

For example:

### X-Axis

```text
Annual Income
```

### Y-Axis

```text
Spending Score
```

This combination can help visualize relationships between income and customer spending behavior.

You can experiment with different combinations.

### Recommended Combinations

| X-Axis        | Y-Axis         | Possible Insight                |
| ------------- | -------------- | ------------------------------- |
| Age           | Annual Income  | Demographic and income patterns |
| Annual Income | Spending Score | Spending behavior by income     |
| Age           | Spending Score | Generational spending patterns  |

---

# 📈 Understanding the Scatter Plot

The scatter plot represents individual customers as points.

```text
          High Spending
                ↑
                |
        ● ●     |        ▲ ▲
          ●     |      ▲ ▲ ▲
----------------+----------------→ Income
                |
        ● ● ●   |       ▲ ▲
                |
```

### How to Read the Plot

* **Each dot** represents one customer.
* The **X position** represents the value of the selected X-axis attribute.
* The **Y position** represents the value of the selected Y-axis attribute.
* The **color** indicates which cluster the customer belongs to.
* The **✕ marker** represents a cluster centroid.

---

# 🎨 Understanding Cluster Colors

Clusters are color-coded to make them easier to distinguish.

Depending on the clustering result, the application may highlight:

| Color     | Meaning              |
| --------- | -------------------- |
| 🔵 Blue   | Largest cluster      |
| 🟢 Green  | Middle-sized cluster |
| 🟠 Orange | Smallest cluster     |
| 🟣 Purple | Additional clusters  |

The same color mapping is used across the visualizations.

> Note: Colors are intended to distinguish clusters visually. A cluster's color does not indicate that it is inherently better or more valuable.

---

# 📊 Understanding the Bar Chart

The bar chart displays the number of customers in each cluster.

### How to Read It

* Each **bar** represents one cluster.
* The **height of the bar** represents the number of customers assigned to that cluster.
* Bar colors correspond to the cluster colors shown in the scatter plot.

Example:

```text
Customers
   │
50 │        ████
40 │   ████ ████
30 │   ████ ████       ████
20 │   ████ ████ ████  ████
   └─────────────────────────
      C1   C2   C3    C4
```

You can hover over chart elements to view additional information when supported by the application.

---

# 📌 Understanding the Statistics

The statistics section provides a quick summary of the current clustering result.

You may see information such as:

* 👥 **Total Customers** — Number of data points in the dataset
* 🏆 **Largest Cluster** — Size of the largest customer segment
* 🧩 **Cluster Count** — Current number of clusters

These statistics update when the clustering configuration changes.

---

# 🔄 Resetting the View

Use the **⟳ Reset** button to return the application to its default configuration.

Depending on the implementation, resetting may:

* Restore the default X-axis.
* Restore the default Y-axis.
* Reset the number of clusters to the default value.
* Recalculate the visualizations.

---

# 🧠 Interpreting Clustering Results

Clusters represent groups of customers with similar values based on the selected features.

For example:

### Cluster 1 — Young, High Spenders

```text
Age: Low
Income: Medium
Spending Score: High
```

Possible interpretation:

> This group may respond well to promotions, new products, or loyalty programs.

---

### Cluster 2 — High Income, Low Spending

```text
Age: Medium
Income: High
Spending Score: Low
```

Possible interpretation:

> These customers may have strong purchasing potential but may require different products, messaging, or incentives.

---

### Cluster 3 — Moderate Customers

```text
Age: Medium
Income: Medium
Spending Score: Medium
```

Possible interpretation:

> This group may represent a broad customer segment with stable purchasing behavior.

> ⚠️ These are examples only. Cluster labels and business interpretations should always be based on the actual data and domain context.

---

# 💼 Business Applications

Customer segmentation can support several business decisions.

## 🎯 Targeted Marketing

Create different marketing campaigns for different customer groups.

Example:

```text
High spenders → Premium offers
Price-sensitive customers → Discounts
New customers → Welcome campaigns
```

---

## 🛍️ Product Development

Identify groups with different needs and preferences.

This can help businesses develop products or services for specific customer segments.

---

## 💎 Customer Retention

Identify valuable customer groups and develop strategies to improve retention.

Examples include:

* Loyalty programs
* Personalized recommendations
* Exclusive offers
* Customer engagement campaigns

---

## 💰 Pricing Strategy

Customer segments can help businesses understand different levels of price sensitivity.

This may support more targeted pricing and promotional strategies.

---

# 💡 Tips for Better Clustering

## 1. Start With a Reasonable K

Try starting with:

```text
K = 3 to K = 5
```

Then experiment with other values.

---

## 2. Try Different Feature Combinations

Different columns may reveal different customer patterns.

For example:

```text
Age + Income
Income + Spending Score
Age + Spending Score
```

Experiment with combinations that make sense for your analysis.

---

## 3. Look for Meaningful Separation

Clusters that overlap heavily may indicate that:

* The selected features do not clearly separate customers.
* The chosen value of `K` may not be appropriate.
* Another clustering algorithm may be more suitable.

---

## 4. Check Cluster Sizes

Very small clusters may represent:

* A niche customer group
* Outliers
* A potentially meaningful but uncommon segment

Small clusters are not automatically errors, but they should be interpreted carefully.

---

# ⚡ Advanced Tips

## Standardize Your Data

K-Means uses distance calculations.

If one feature has a much larger numeric range than another, it can dominate the clustering process.

For example:

```text
Age → 18 to 70
Annual Income → 15 to 150
```

Scaling or standardizing the features can help ensure that each selected feature contributes more comparably to the distance calculation.

---

## Remove or Investigate Outliers

Extreme values can significantly affect centroid positions.

Before clustering, consider checking for:

* Extremely high income values
* Unusual spending scores
* Data entry errors
* Missing or invalid values

---

## Try Multiple Values of K

There is no universally correct number of clusters.

Try several values and compare the results.

The **Elbow Method** can help identify a reasonable starting point.

For a detailed explanation, see [algorithm.md](algorithm.md).

---

# 🛠️ Troubleshooting

## ❌ No Data Loaded

Possible solutions:

* Make sure your CSV file is selected correctly.
* Check that the file contains a header row.
* Ensure that the dataset includes numeric columns.
* Remove completely empty rows.

---

## ❌ Error Parsing CSV

Try the following:

* Confirm that the file uses the `.csv` format.
* Save the file as **CSV UTF-8**.
* Check for unusual formatting or broken delimiters.
* Remove unnecessary special characters from numeric fields.

---

## ❌ Charts Are Not Updating

Try:

1. Refreshing the page.
2. Uploading the CSV file again.
3. Changing the cluster count.
4. Checking the browser console for JavaScript errors.

Most browsers allow you to open developer tools with:

```text
F12
```

---

## ❌ Data Format Issues

Make sure:

* Your CSV file contains column headers.
* Numeric values are stored as numbers.
* Important numeric fields do not contain missing values.
* Text columns are not selected as chart axes.

Example of valid data:

```csv
Age,Annual Income (k$),Spending Score (1-100)
19,15,39
21,15,81
20,16,6
23,16,77
```

---

# ⌨️ Keyboard Navigation

The interface can be navigated using standard browser controls.

* **Tab** — Move between interactive controls.
* **Shift + Tab** — Move to the previous control.
* **Arrow Keys** — Adjust a focused range slider.
* **Enter / Space** — Activate focused buttons and controls.

Keyboard behavior may vary slightly depending on the browser and operating system.

---

# 📚 Getting Help

If you need more information:

* 🧠 Read [algorithm.md](algorithm.md) to understand how K-Means works.
* 🐛 Open an issue in the project repository if you encounter a problem.
* 📊 Check the Chart.js documentation for visualization customization.
* 🔍 Review your CSV data for formatting or numeric value issues.

---

## 🎉 You're Ready!

Upload your customer data, experiment with different features and cluster counts, and explore the patterns hidden in your dataset.

Happy clustering! 🧩📊
