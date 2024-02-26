async function getProductStatistics() {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" },
        },
      },
    ];

    return (await Product.aggregate(pipeline))[0];
  } catch (error) {
    console.error("Error calculating product statistics:", error.message);
    throw error;
  }
}

app.get("/product-statistics", async (req, res) => {
  try {
    res.json(await getProductStatistics());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});