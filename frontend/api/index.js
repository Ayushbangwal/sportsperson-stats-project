export default function handler(req, res) {

  if (req.url.includes("/top")) {
    return res.status(200).json([
      { name: "Virat Kohli", sport: "Cricket", score: 95 },
      { name: "Lionel Messi", sport: "Football", score: 98 }
    ]);
  }

  if (req.url.includes("/stats")) {
    return res.status(200).json([
      { sport: "Cricket", players: 10 },
      { sport: "Football", players: 8 }
    ]);
  }

  return res.status(200).json([]);
}