"use client";

import { useState } from "react";
import { Trophy, Calendar, Instagram, Play, ExternalLink, ChevronDown } from "lucide-react";
import Link from "next/link";

const mockTeams = [
  { id: 1, name: "Team Alpha", wins: 8, losses: 2 },
  { id: 2, name: "Team Beta", wins: 7, losses: 3 },
  { id: 3, name: "Team Gamma", wins: 6, losses: 4 },
  { id: 4, name: "Team Delta", wins: 5, losses: 5 },
];

const mockGames = [
  {
    id: 1,
    week: 1,
    team1: "Team Alpha",
    team2: "Team Beta",
    score1: 45,
    score2: 32,
    winner: "Team Alpha",
    date: "2024-12-01",
  },
  {
    id: 2,
    week: 1,
    team1: "Team Gamma",
    team2: "Team Delta",
    score1: 38,
    score2: 41,
    winner: "Team Delta",
    date: "2024-12-01",
  },
];

export default function CascadeDemo() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [games, setGames] = useState(mockGames);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setGames([
        ...games,
        {
          id: games.length + 1,
          week: selectedWeek + 1,
          team1: "Team Alpha",
          team2: "Team Gamma",
          score1: 42,
          score2: 39,
          winner: "Team Alpha",
          date: "2024-12-08",
        },
      ]);
      setIsSimulating(false);
    }, 2000);
  };

  const handlePostToInstagram = (gameId: number) => {
    alert(`Posting game ${gameId} to Instagram... (Mock)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/projects"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Cascade Game Simulation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Modular game simulation system that generates match results and posts them to Instagram
          </p>
          <a
            href="https://github.com/cj1101/cascade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink size={16} />
            View on GitHub
          </a>
        </div>

        {/* Summary Section */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Cascade Game Simulation</strong> is an automated tournament management system that simulates competitive game matches using realistic algorithms, generates visual result graphics, and automatically posts updates to Instagram. At full capacity, it runs sophisticated game simulation algorithms, uses Python PIL (Pillow) to create branded match result images, automates Instagram posting via Selenium, tracks complete tournament brackets, and stores all data in AWS services.
          </p>
        </div>

        {/* Expandable Detailed Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Full Functionality & Demo Limitations
            </h2>
            <ChevronDown
              size={24}
              className={`text-gray-600 dark:text-gray-400 transition-transform ${
                isExpanded ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {isExpanded && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Full Functionality
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    When running at full capacity, Cascade provides a complete automated tournament management system:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Realistic Game Simulation:</strong> Uses statistical models and algorithms that consider team performance history, player ratings, home/away advantages, and random variance to generate realistic match scores. The simulation engine can handle round-robin tournaments, elimination brackets, and complex multi-stage competitions.</li>
                    <li><strong>Automated Image Generation:</strong> Uses Python PIL (Pillow) to programmatically create branded match result graphics. The system loads team logos, applies custom templates, renders scores, dates, and match details, and exports high-resolution images optimized for social media (typically 1080x1080px for Instagram).</li>
                    <li><strong>Instagram Automation:</strong> Uses Selenium WebDriver to automate browser interactions with Instagram. The system logs in via Instagram&apos;s web interface, navigates to the post creation page, uploads the generated image, adds captions with hashtags and mentions, and publishes posts automatically at scheduled times.</li>
                    <li><strong>Tournament Bracket Management:</strong> Tracks complete tournament structures, automatically advances winners through brackets, calculates standings, and generates visual bracket representations. Supports various tournament formats including single-elimination, double-elimination, and Swiss-style tournaments.</li>
                    <li><strong>AWS Data Storage:</strong> Stores all match results, team data, tournament configurations, and generated images in AWS services (S3 for images, DynamoDB or RDS for structured data). Provides data persistence and enables historical analysis and reporting.</li>
                    <li><strong>Scheduling & Automation:</strong> Can be configured to run simulations on a schedule (e.g., weekly matches), automatically generate and post results, and send notifications to administrators.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Demo Limitations
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    This demo shows the interface and workflow, but all backend processing is simulated:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Game Simulation:</strong> The &quot;Simulate Week&quot; button adds a hardcoded game result to the list. In production, this would execute Python simulation algorithms that calculate realistic scores based on team statistics, generate multiple matches for the selected week, and update standings automatically.</li>
                    <li><strong>Image Generation:</strong> The &quot;View Image&quot; button doesn&apos;t actually generate or display images. In production, clicking this would trigger a Python PIL script that creates a custom match result graphic with team logos, scores, and branding, then serves it from the backend or AWS S3.</li>
                    <li><strong>Instagram Posting:</strong> The &quot;Post to Instagram&quot; button only shows an alert. In production, this would launch a Selenium-controlled browser, navigate to Instagram, authenticate, upload the generated image, add the caption, and publish the post. This would require Instagram credentials and careful handling of Instagram&apos;s anti-automation measures.</li>
                    <li><strong>Standings Calculation:</strong> The standings shown are static mock data. In production, standings would be automatically recalculated after each simulation based on wins, losses, points scored, and other tournament-specific metrics.</li>
                    <li><strong>Tournament Bracket:</strong> The bracket preview is a static placeholder. In production, the bracket would dynamically update as games are simulated, showing actual team progressions through elimination rounds or round-robin standings.</li>
                    <li><strong>Data Persistence:</strong> No data is saved between sessions. In production, all game results, team data, and tournament configurations would be stored in AWS, allowing the system to maintain state across runs and provide historical data.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Game Simulation Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Game Simulation
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Week
                </label>
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                    (week) => (
                      <option key={week} value={week}>
                        Week {week}
                      </option>
                    )
                  )}
                </select>
              </div>

              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Play size={20} />
                {isSimulating ? "Simulating Games..." : "Simulate Week"}
              </button>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Standings
              </h3>
              <div className="space-y-2">
                {mockTeams.map((team, index) => (
                  <div
                    key={team.id}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-400">
                        #{index + 1}
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {team.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {team.wins}-{team.losses}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Game Results & Instagram Posting */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Game Results
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Week {game.week} • {game.date}
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {game.team1} vs {game.team2}
                      </div>
                    </div>
                    <div title={`Winner: ${game.winner}`}>
                      <Trophy
                        size={24}
                        className="text-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {game.score1} - {game.score2}
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm">
                      {game.winner} Wins
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePostToInstagram(game.id)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
                    >
                      <Instagram size={18} />
                      Post to Instagram
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                      View Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tournament Bracket Preview */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Tournament Bracket Preview
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {["Quarterfinals", "Semifinals", "Finals", "Champion"].map(
              (round, index) => (
                <div
                  key={round}
                  className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {round}
                  </div>
                  <div className="h-32 flex items-center justify-center text-gray-400 dark:text-gray-600">
                    {index === 3 ? (
                      <Trophy size={48} className="text-yellow-500" />
                    ) : (
                      "Bracket"
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Features
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Automated game simulation with realistic scoring</li>
            <li>Round-robin tournament system</li>
            <li>Automatic image generation for game results</li>
            <li>Instagram integration for automated posting</li>
            <li>Tournament bracket generation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

