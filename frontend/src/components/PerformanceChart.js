import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const PerformanceChart = ({ player }) => {
  // Generate sample performance data based on player's sport and statistics
  const generatePerformanceData = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    const debutYear = player.debutYear || currentYear - 5;
    
    for (let year = debutYear; year <= currentYear; year++) {
      years.push(year);
    }

    switch (player.sport) {
      case 'Cricket':
        return years.map(year => ({
          year,
          runs: Math.floor(Math.random() * 1000) + 200,
          wickets: Math.floor(Math.random() * 50) + 10,
          matches: Math.floor(Math.random() * 20) + 5,
        }));
      
      case 'Football':
        return years.map(year => ({
          year,
          goals: Math.floor(Math.random() * 30) + 5,
          assists: Math.floor(Math.random() * 20) + 3,
          matches: Math.floor(Math.random() * 40) + 20,
        }));
      
      case 'Basketball':
        return years.map(year => ({
          year,
          points: Math.floor(Math.random() * 2000) + 500,
          rebounds: Math.floor(Math.random() * 500) + 200,
          assists: Math.floor(Math.random() * 400) + 150,
        }));
      
      case 'Tennis':
        return years.map(year => ({
          year,
          wins: Math.floor(Math.random() * 60) + 20,
          losses: Math.floor(Math.random() * 30) + 10,
          titles: Math.floor(Math.random() * 5),
        }));
      
      default:
        return years.map(year => ({
          year,
          performance: Math.floor(Math.random() * 100) + 50,
        }));
    }
  };

  const generateWinRateData = () => {
    switch (player.sport) {
      case 'Cricket':
        return [
          { name: 'Wins', value: 65, color: '#10b981' },
          { name: 'Losses', value: 25, color: '#ef4444' },
          { name: 'Draws', value: 10, color: '#f59e0b' },
        ];
      
      case 'Football':
        return [
          { name: 'Wins', value: 55, color: '#10b981' },
          { name: 'Losses', value: 20, color: '#ef4444' },
          { name: 'Draws', value: 25, color: '#f59e0b' },
        ];
      
      case 'Basketball':
        return [
          { name: 'Wins', value: 70, color: '#10b981' },
          { name: 'Losses', value: 30, color: '#ef4444' },
        ];
      
      case 'Tennis':
        return [
          { name: 'Matches Won', value: player.statistics?.matchesWon || 75, color: '#10b981' },
          { name: 'Matches Lost', value: (player.statistics?.matchesPlayed || 100) - (player.statistics?.matchesWon || 75), color: '#ef4444' },
        ];
      
      default:
        return [
          { name: 'Good Performance', value: 70, color: '#10b981' },
          { name: 'Average Performance', value: 30, color: '#f59e0b' },
        ];
    }
  };

  const performanceData = generatePerformanceData();
  const winRateData = generateWinRateData();

  const getChartConfig = () => {
    switch (player.sport) {
      case 'Cricket':
        return {
          lines: [
            { key: 'runs', color: '#3b82f6', name: 'Runs' },
            { key: 'wickets', color: '#ef4444', name: 'Wickets' },
          ],
          bars: [
            { key: 'matches', color: '#8b5cf6', name: 'Matches' },
          ]
        };
      
      case 'Football':
        return {
          lines: [
            { key: 'goals', color: '#10b981', name: 'Goals' },
            { key: 'assists', color: '#f59e0b', name: 'Assists' },
          ],
          bars: [
            { key: 'matches', color: '#3b82f6', name: 'Matches' },
          ]
        };
      
      case 'Basketball':
        return {
          lines: [
            { key: 'points', color: '#3b82f6', name: 'Points' },
            { key: 'rebounds', color: '#10b981', name: 'Rebounds' },
            { key: 'assists', color: '#f59e0b', name: 'Assists' },
          ],
        };
      
      case 'Tennis':
        return {
          lines: [
            { key: 'wins', color: '#10b981', name: 'Wins' },
            { key: 'losses', color: '#ef4444', name: 'Losses' },
          ],
          bars: [
            { key: 'titles', color: '#f59e0b', name: 'Titles' },
          ]
        };
      
      default:
        return {
          lines: [
            { key: 'performance', color: '#3b82f6', name: 'Performance' },
          ],
        };
    }
  };

  const chartConfig = getChartConfig();

  return (
    <div className="space-y-8">
      {/* Performance Trend */}
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Performance Trend Over Years</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="year" 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend 
              wrapperStyle={{ color: '#f1f5f9' }}
            />
            {chartConfig.lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={2}
                dot={{ fill: line.color, r: 4 }}
                activeDot={{ r: 6 }}
                name={line.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Stats (Bar Chart) */}
      {chartConfig.bars && (
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Additional Statistics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="year" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend 
                wrapperStyle={{ color: '#f1f5f9' }}
              />
              {chartConfig.bars.map((bar) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  fill={bar.color}
                  name={bar.name}
                  radius={[8, 8, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Win Rate Pie Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Win Rate Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={winRateData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {winRateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f1f5f9' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-sports-dark rounded-lg p-4 border border-sports-border text-center">
          <p className="text-2xl font-bold text-sports-primary">
            {player.popularity || 0}
          </p>
          <p className="text-sm text-gray-400">Popularity Score</p>
        </div>
        <div className="bg-sports-dark rounded-lg p-4 border border-sports-border text-center">
          <p className="text-2xl font-bold text-sports-success">
            {player.achievements?.length || 0}
          </p>
          <p className="text-sm text-gray-400">Total Achievements</p>
        </div>
        <div className="bg-sports-dark rounded-lg p-4 border border-sports-border text-center">
          <p className="text-2xl font-bold text-sports-warning">
            {new Date().getFullYear() - (player.debutYear || 2020)}
          </p>
          <p className="text-sm text-gray-400">Years Active</p>
        </div>
        <div className="bg-sports-dark rounded-lg p-4 border border-sports-border text-center">
          <p className="text-2xl font-bold text-sports-secondary">
            {player.age || 0}
          </p>
          <p className="text-sm text-gray-400">Current Age</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
