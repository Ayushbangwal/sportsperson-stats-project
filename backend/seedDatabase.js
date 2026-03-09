const mongoose = require('mongoose');
const Player = require('./models/Player');
require('dotenv').config();

const samplePlayers = [
  // Cricket Players
  {
    name: "Virat Kohli",
    sport: "Cricket",
    country: "India",
    age: 35,
    team: "Royal Challengers Bangalore",
    position: "Batsman",
    image: "https://picsum.photos/seed/virat/400/400",
    debutYear: 2008,
    statistics: {
      matches: 274,
      runs: 12898,
      battingAverage: 53.5,
      strikeRate: 137.9,
      centuries: 73,
      halfCenturies: 65
    },
    achievements: [
      {
        title: "ICC ODI Player of the Year",
        year: 2012,
        description: "Awarded for outstanding performance in ODI cricket"
      },
      {
        title: "ICC Test Player of the Year",
        year: 2018,
        description: "Recognized as the best Test cricketer globally"
      },
      {
        title: "World Cup Winner",
        year: 2011,
        description: "Part of India's World Cup winning team"
      }
    ]
  },
  {
    name: "Steve Smith",
    sport: "Cricket",
    country: "Australia",
    age: 34,
    team: "Australia National",
    position: "Batsman",
    image: "https://picsum.photos/seed/smith/400/400",
    debutYear: 2010,
    statistics: {
      matches: 87,
      runs: 8647,
      battingAverage: 57.4,
      strikeRate: 55.8,
      centuries: 32,
      halfCenturies: 35
    },
    achievements: [
      {
        title: "ICC Test Player of the Year",
        year: 2015,
        description: "Recognized as the best Test cricketer"
      },
      {
        title: "Ashes Winner",
        year: 2019,
        description: "Led Australia to Ashes victory"
      }
    ]
  },

  // Football Players
  {
    name: "Lionel Messi",
    sport: "Football",
    country: "Argentina",
    age: 36,
    team: "Inter Miami",
    position: "Forward",
    image: "https://picsum.photos/seed/messi/400/400",
    debutYear: 2004,
    statistics: {
      matches: 845,
      goals: 721,
      assists: 305,
      yellowCards: 89,
      redCards: 3
    },
    achievements: [
      {
        title: "FIFA World Cup Winner",
        year: 2022,
        description: "Led Argentina to World Cup victory"
      },
      {
        title: "Ballon d'Or Winner",
        year: 2021,
        description: "Awarded as the world's best footballer"
      },
      {
        title: "UEFA Champions League Winner",
        year: 2015,
        description: "Won with Barcelona"
      }
    ]
  },
  {
    name: "Cristiano Ronaldo",
    sport: "Football",
    country: "Portugal",
    age: 38,
    team: "Al Nassr",
    position: "Forward",
    image: "https://picsum.photos/seed/ronaldo/400/400",
    debutYear: 2002,
    statistics: {
      matches: 1195,
      goals: 873,
      assists: 242,
      yellowCards: 125,
      redCards: 11
    },
    achievements: [
      {
        title: "UEFA European Championship Winner",
        year: 2016,
        description: "Led Portugal to Euro 2016 victory"
      },
      {
        title: "Ballon d'Or Winner",
        year: 2016,
        description: "Awarded as the world's best footballer"
      },
      {
        title: "UEFA Champions League Winner",
        year: 2018,
        description: "Won with Real Madrid"
      }
    ]
  },

  // Basketball Players
  {
    name: "LeBron James",
    sport: "Basketball",
    country: "USA",
    age: 39,
    team: "Los Angeles Lakers",
    position: "Small Forward",
    image: "https://picsum.photos/seed/lebron/400/400",
    debutYear: 2003,
    statistics: {
      pointsPerGame: 27.2,
      rebounds: 7.5,
      assists: 7.3,
      blocks: 0.7,
      steals: 1.3
    },
    achievements: [
      {
        title: "NBA Champion",
        year: 2020,
        description: "Led Lakers to NBA championship"
      },
      {
        title: "NBA MVP",
        year: 2013,
        description: "Most Valuable Player in the NBA"
      },
      {
        title: "Olympic Gold Medal",
        year: 2012,
        description: "Gold medal with Team USA"
      }
    ]
  },
  {
    name: "Stephen Curry",
    sport: "Basketball",
    country: "USA",
    age: 35,
    team: "Golden State Warriors",
    position: "Point Guard",
    image: "https://picsum.photos/seed/curry/400/400",
    debutYear: 2009,
    statistics: {
      pointsPerGame: 24.5,
      rebounds: 4.7,
      assists: 6.4,
      blocks: 0.3,
      steals: 1.5
    },
    achievements: [
      {
        title: "NBA Champion",
        year: 2022,
        description: "Led Warriors to NBA championship"
      },
      {
        title: "NBA MVP",
        year: 2016,
        description: "Unanimous MVP selection"
      },
      {
        title: "3-Point Contest Winner",
        year: 2021,
        description: "NBA All-Star 3-Point champion"
      }
    ]
  },

  // Tennis Players
  {
    name: "Roger Federer",
    sport: "Tennis",
    country: "Switzerland",
    age: 42,
    team: "Independent",
    position: "All-Rounder",
    image: "https://picsum.photos/seed/federer/400/400",
    debutYear: 1998,
    statistics: {
      matchesPlayed: 1526,
      matchesWon: 1251,
      titles: 103,
      grandSlamTitles: 20
    },
    achievements: [
      {
        title: "Wimbledon Champion",
        year: 2017,
        description: "Won 8th Wimbledon title"
      },
      {
        title: "Australian Open Champion",
        year: 2018,
        description: "Won 6th Australian Open"
      },
      {
        title: "ATP Finals Champion",
        year: 2011,
        description: "Year-end championship winner"
      }
    ]
  },
  {
    name: "Serena Williams",
    sport: "Tennis",
    country: "USA",
    age: 42,
    team: "Independent",
    position: "Power Player",
    image: "https://picsum.photos/seed/serena/400/400",
    debutYear: 1995,
    statistics: {
      matchesPlayed: 1017,
      matchesWon: 855,
      titles: 73,
      grandSlamTitles: 23
    },
    achievements: [
      {
        title: "Australian Open Champion",
        year: 2017,
        description: "Won while pregnant"
      },
      {
        title: "Wimbledon Champion",
        year: 2016,
        description: "7th Wimbledon title"
      },
      {
        title: "Olympic Gold Medal",
        year: 2012,
        description: "Singles gold at London Olympics"
      }
    ]
  },

  // Additional Cricket Players
  {
    name: "Babar Azam",
    sport: "Cricket",
    country: "Pakistan",
    age: 29,
    team: "Pakistan National",
    position: "Batsman",
    image: "https://picsum.photos/seed/babar/400/400",
    debutYear: 2015,
    statistics: {
      matches: 89,
      runs: 3945,
      battingAverage: 45.6,
      strikeRate: 88.4,
      centuries: 9,
      halfCenturies: 28
    },
    achievements: [
      {
        title: "ICC ODI Player of the Year",
        year: 2022,
        description: "Recognized for consistent performance"
      }
    ]
  },
  {
    name: "Joe Root",
    sport: "Cricket",
    country: "England",
    age: 33,
    team: "England National",
    position: "Batsman",
    image: "https://picsum.photos/seed/root/400/400",
    debutYear: 2012,
    statistics: {
      matches: 149,
      runs: 11458,
      battingAverage: 49.6,
      strikeRate: 55.4,
      centuries: 30,
      halfCenturies: 60
    },
    achievements: [
      {
        title: "ICC Test Player of the Year",
        year: 2021,
        description: "Outstanding Test performance"
      }
    ]
  },

  // Additional Football Players
  {
    name: "Kylian Mbappé",
    sport: "Football",
    country: "France",
    age: 25,
    team: "Paris Saint-Germain",
    position: "Forward",
    image: "https://picsum.photos/seed/mbappe/400/400",
    debutYear: 2015,
    statistics: {
      matches: 378,
      goals: 290,
      assists: 108,
      yellowCards: 45,
      redCards: 2
    },
    achievements: [
      {
        title: "FIFA World Cup Winner",
        year: 2018,
        description: "Won with France"
      },
      {
        title: "World Cup Golden Boot",
        year: 2022,
        description: "Top scorer in World Cup"
      }
    ]
  },
  {
    name: "Erling Haaland",
    sport: "Football",
    country: "Norway",
    age: 23,
    team: "Manchester City",
    position: "Forward",
    image: "https://picsum.photos/seed/haaland/400/400",
    debutYear: 2016,
    statistics: {
      matches: 234,
      goals: 219,
      assists: 55,
      yellowCards: 12,
      redCards: 0
    },
    achievements: [
      {
        title: "UEFA Champions League Winner",
        year: 2023,
        description: "Won with Manchester City"
      },
      {
        title: "Premier League Golden Boot",
        year: 2023,
        description: "Top scorer in Premier League"
      }
    ]
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing players
    console.log('Clearing existing players...');
    await Player.deleteMany({});
    console.log('Existing players cleared');

    // Insert sample players
    console.log('Inserting sample players...');
    const insertedPlayers = await Player.insertMany(samplePlayers);
    console.log(`Inserted ${insertedPlayers.length} players`);

    // Display summary
    console.log('\n=== Database Summary ===');
    const cricketPlayers = insertedPlayers.filter(p => p.sport === 'Cricket').length;
    const footballPlayers = insertedPlayers.filter(p => p.sport === 'Football').length;
    const basketballPlayers = insertedPlayers.filter(p => p.sport === 'Basketball').length;
    const tennisPlayers = insertedPlayers.filter(p => p.sport === 'Tennis').length;

    console.log(`Cricket: ${cricketPlayers} players`);
    console.log(`Football: ${footballPlayers} players`);
    console.log(`Basketball: ${basketballPlayers} players`);
    console.log(`Tennis: ${tennisPlayers} players`);
    console.log(`Total: ${insertedPlayers.length} players`);

    console.log('\nDatabase seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();
