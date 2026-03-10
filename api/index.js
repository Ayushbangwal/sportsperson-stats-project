export default function handler(req, res) {

  const { url } = req;

  if (url.includes("top")) {
    return res.status(200).json({
      success: true,
      data: ["Player 1", "Player 2", "Player 3"]
    });
  }

  if (url.includes("stats")) {
    return res.status(200).json({
      success: true,
      stats: {
        totalPlayers: 100,
        sports: 5
      }
    });
  }

  res.status(404).json({ message: "Route not found" });
}