export default function handler(req, res) {

const players = [
 { id: 1, name: "Virat Kohli", sport: "Cricket", country: "India" },
 { id: 2, name: "Lionel Messi", sport: "Football", country: "Argentina" },
 { id: 3, name: "LeBron James", sport: "Basketball", country: "USA" },
 { id: 4, name: "Novak Djokovic", sport: "Tennis", country: "Serbia" }
];

const { id } = req.query;

const player = players.find(p => p.id === parseInt(id));

if (!player) {
 return res.status(404).json({ error: "Player not found" });
}

res.status(200).json(player);

}