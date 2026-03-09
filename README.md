# Sports Player Stats & Records

A modern full-stack sports analytics web application that collects and displays sports player data in one unified system.

## Features

- Global player search across all sports
- Detailed player profiles with statistics
- Interactive performance analytics
- Sports categorization (Cricket, Football, Basketball, Tennis)
- Favorites system
- Responsive design
- Modern dark-themed UI

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Chart.js/Recharts
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ORM

## Getting Started

1. Install dependencies:
```bash
npm run install-deps
```

2. Start development servers:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## Project Structure

```
sports-analytics-platform/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
└── README.md
```

## API Endpoints

- `GET /players` - Fetch all players
- `GET /players/:id` - Fetch player details
- `GET /players/search?name=` - Search player by name
- `POST /players` - Add a new player
- `PUT /players/:id` - Update player statistics
- `DELETE /players/:id` - Delete a player
