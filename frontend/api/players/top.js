export default function handler(req, res) {
  res.status(200).json({
    success: true,
    data: ["Player 1", "Player 2", "Player 3"]
  });
}