export default function handler(req, res) {

  const players = [
    { id: 1, name: "Virat Kohli", sport: "Cricket", score: 95 },
    { id: 2, name: "Lionel Messi", sport: "Football", score: 98 },
    { id: 3, name: "LeBron James", sport: "Basketball", score: 97 },
    { id: 4, name: "Novak Djokovic", sport: "Tennis", score: 96 }
  ];

  const { page = 1, limit = 12 } = req.query;

  const start = (page - 1) * limit;
  const end = start + Number(limit);

  const paginatedPlayers = players.slice(start, end);

  res.status(200).json({
    players: paginatedPlayers,
    total: players.length
  });

}
