# 🧠 K-Means Clustering Algorithm Explained

## What Is K-Means?

**K-Means** is an unsupervised machine learning algorithm used to group similar data points into a predefined number of clusters.

Think of it like sorting a box of mixed objects into separate groups based on how similar they are.

In customer segmentation, K-Means can help identify groups of customers with similar characteristics, such as:

* Age
* Annual income
* Spending behavior

The **K** in K-Means represents the number of clusters you want the algorithm to create.

For example:

* `K = 2` → 2 customer segments
* `K = 3` → 3 customer segments
* `K = 5` → 5 customer segments

---

## ⚙️ How K-Means Works

K-Means follows an iterative process:

```text
Choose K
   ↓
Initialize Centroids
   ↓
Assign Points to Nearest Centroid
   ↓
Recalculate Centroids
   ↓
Repeat Until Convergence
```

Let's look at each step in detail.

---

## 1️⃣ Choose K — Number of Clusters

The first step is deciding how many groups you want to create.

For example, if:

```text
K = 3
```

The algorithm will attempt to divide the dataset into **three clusters**.

Each cluster represents a group of data points that are more similar to each other than to points in other clusters.

### Example

Imagine a customer dataset containing:

```text
Customer A → Age: 22, Income: 25
Customer B → Age: 24, Income: 30
Customer C → Age: 45, Income: 80
Customer D → Age: 48, Income: 85
```

With `K = 2`, the algorithm might identify two groups:

* 👥 Younger customers with lower income
* 💰 Older customers with higher income

---

## 2️⃣ Initialize Centroids

A **centroid** represents the center of a cluster.

At the beginning of the algorithm, K-Means selects `K` initial centroid positions.

For example, with two clusters:

```text
Data points: 10 customers

Centroid 1 → (2, 3)
Centroid 2 → (7, 8)
```

These initial positions act as the starting points for the clustering process.

> ⚠️ Initial centroid placement can affect the final result. Different starting positions may produce different cluster assignments.

---

## 3️⃣ Assign Points to the Nearest Centroid

Each data point is compared with every centroid.

The algorithm calculates the distance between the point and each centroid, then assigns the point to the closest one.

### Euclidean Distance

For two points:

```text
P = (x₁, y₁)
C = (x₂, y₂)
```

The Euclidean distance is:

```text
distance = √((x₂ - x₁)² + (y₂ - y₁)²)
```

### Example

Suppose a customer is located at:

```text
Customer → (3, 4)
```

And there are two centroids:

```text
Centroid A → (2, 3)
Centroid B → (8, 9)
```

The customer is assigned to whichever centroid has the smaller distance.

After this step, every data point belongs to a cluster.

---

## 4️⃣ Update the Centroids

Once all data points have been assigned to clusters, the algorithm calculates a new center for each cluster.

The new centroid is the **mean (average)** position of all points assigned to that cluster.

For a two-dimensional dataset:

```text
New Centroid =
(
  Average of all X values,
  Average of all Y values
)
```

### Example

Suppose a cluster contains:

```text
(2, 4)
(4, 6)
(6, 8)
```

The new centroid becomes:

```text
X = (2 + 4 + 6) / 3 = 4
Y = (4 + 6 + 8) / 3 = 6

New Centroid = (4, 6)
```

---

## 🔁 Repeat Until Convergence

The algorithm repeats the following two steps:

1. Assign every point to the nearest centroid.
2. Recalculate the centroids.

This process continues until the centroids stop changing significantly.

This is called **convergence**.

```text
Iteration 1
   ↓
Assign Points
   ↓
Update Centroids
   ↓
Iteration 2
   ↓
Assign Points
   ↓
Update Centroids
   ↓
...
   ↓
Centroids Stabilize
   ↓
Finished
```

---

# 📐 Mathematical Details

## Distance Calculation

For a point `p` and centroid `c`:

```text
d(p, c) = √((pₓ - cₓ)² + (pᵧ - cᵧ)²)
```

Where:

* `pₓ`, `pᵧ` are the coordinates of the data point.
* `cₓ`, `cᵧ` are the coordinates of the centroid.
* `d(p, c)` is the distance between them.

The point is assigned to the centroid with the **smallest distance**.

---

## Centroid Update

For a cluster containing:

```text
p₁, p₂, p₃, ..., pₙ
```

The centroid is calculated using the mean of all points.

### X Coordinate

```text
cₓ = (p₁ₓ + p₂ₓ + ... + pₙₓ) / n
```

### Y Coordinate

```text
cᵧ = (p₁ᵧ + p₂ᵧ + ... + pₙᵧ) / n
```

For higher-dimensional data, the same calculation is performed for every feature.

---

## 🎯 Objective Function

K-Means attempts to minimize the **Within-Cluster Sum of Squares (WCSS)**.

WCSS measures how close data points are to their assigned cluster centroids.

```text
WCSS = Σ ||xᵢ - μ(cluster of xᵢ)||²
```

In simpler terms:

```text
WCSS =
Sum of the squared distances between
each point and its assigned centroid
```

A lower WCSS generally indicates that points are closer to their cluster centers.

---

# 📊 Choosing the Right Value of K

One of the biggest challenges with K-Means is deciding how many clusters to use.

A common technique is the **Elbow Method**.

## The Elbow Method

1. Run K-Means with different values of `K`.
2. Calculate the WCSS for each value.
3. Plot `K` against WCSS.
4. Look for the point where the improvement begins to slow down.

Example:

```text
WCSS
│
│\
│ \
│  \
│   \__
│      \___
│          \__
└─────────────────
  1  2  3  4  5  K
```

The point where the curve begins to flatten is called the **elbow**.

This can provide a useful estimate for a suitable number of clusters.

> 💡 The Elbow Method is a guideline, not a guarantee. Domain knowledge and other clustering metrics can also help determine the most meaningful value of `K`.

---

# 📈 Visual Example

Imagine a dataset with two natural groups:

```text
Before Clustering

● ● ● ●          ▲ ▲ ▲ ▲
  ● ●              ▲ ▲
● ● ● ●          ▲ ▲ ▲
```

After running K-Means with `K = 2`:

```text
Cluster 1              Cluster 2

● ● ● ●                ▲ ▲ ▲ ▲
  ● ●                    ▲ ▲
● ● ● ●                ▲ ▲ ▲
```

Each group has its own centroid:

```text
● ● ● ●          ▲ ▲ ▲ ▲
  ● ✕ ●            ▲ ✕ ▲
● ● ● ●          ▲ ▲ ▲ ▲
```

The `✕` symbol represents the cluster centroid.

---

# ✅ Advantages of K-Means

* Easy to understand and implement
* Computationally efficient for many datasets
* Scales relatively well to larger datasets
* Works well when clusters are compact and well separated
* Produces clear and interpretable customer segments
* Typically converges to a local optimum in a finite number of assignment/update steps under standard assumptions

---

# ⚠️ Limitations of K-Means

* You must choose the value of `K` in advance.
* Results can depend on the initial centroid positions.
* It is sensitive to outliers.
* It works best when clusters are relatively compact and roughly spherical.
* Features with larger numeric scales can dominate distance calculations.
* It may struggle with clusters of very different sizes or densities.

For better results, it is often useful to:

* Standardize numeric features.
* Remove or investigate extreme outliers.
* Run the algorithm multiple times with different initializations.
* Compare different values of `K`.

---

# 🧩 K-Means in This Project

In the **Customer Segmentation Explorer**, K-Means is used to group customers based on selected numeric attributes.

Example features include:

* 👤 **Age** — How old the customer is
* 💰 **Annual Income** — The customer's yearly income
* 🛍️ **Spending Score** — A score representing spending behavior

For example, the algorithm may identify segments such as:

```text
Cluster 1 → Young customers with high spending scores
Cluster 2 → High-income customers with low spending scores
Cluster 3 → Middle-income customers with moderate spending behavior
```

These segments can help businesses better understand their customers and support decisions related to:

* 🎯 Targeted marketing
* 🛍️ Product recommendations
* 💎 Customer retention
* 💰 Pricing strategies
* 📈 Business analysis

---

## 🚀 Summary

K-Means clustering follows a simple cycle:

```text
1. Choose K clusters
2. Initialize K centroids
3. Assign each point to its nearest centroid
4. Calculate new centroid positions
5. Repeat until the centroids stabilize
```

The result is a set of customer groups that can reveal useful patterns hidden within the dataset.

For instructions on using the application, see the [User Guide](user-guide.md).
