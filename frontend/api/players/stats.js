export default function handler(req, res) {
  res.status(200).json({
    success: true,
    stats: {
      totalPlayers: 100,
      sports: 5
    }
  });
}