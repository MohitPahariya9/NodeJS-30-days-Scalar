async function averageAgeOfUsers(req, res) {
  try {
    // Use MongoDB aggregation to calculate the average age
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const averageAge = result[0].averageAge;
    res.json({ averageAge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}