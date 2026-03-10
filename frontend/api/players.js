export default function handler(req, res) {

  const players = [
    { id: 1, name: "Virat Kohli", sport: "Cricket", country: "India" },
    { id: 2, name: "Lionel Messi", sport: "Football", country: "Argentina" },
    { id: 3, name: "LeBron James", sport: "Basketball", country: "USA" },
    { id: 4, name: "Novak Djokovic", sport: "Tennis", country: "Serbia" }
  ];

  res.status(200).json({
    players: players,
    total: players.length
  });

}