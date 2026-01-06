"use client";

import { useState } from "react";
import { Search, Globe, FileText, Download, ExternalLink, ChevronDown } from "lucide-react";
import Link from "next/link";

const mockArticles = [
  {
    id: 1,
    title: "Game Developers Unionize at Major Studio",
    date: "2024-12-10",
    location: "London, UK",
    country: "United Kingdom",
    company: "TechGame Studios",
    organizingGroups: "Game Workers United",
    summary: "Over 200 game developers at TechGame Studios have successfully unionized, marking a significant milestone in the UK gaming industry's labor movement.",
    url: "#",
  },
  {
    id: 2,
    title: "French Game Studio Workers Strike for Better Conditions",
    date: "2024-12-08",
    location: "Paris, France",
    country: "France",
    company: "PixelForge Games",
    organizingGroups: "Syndicat du Jeu Vidéo",
    summary: "Workers at PixelForge Games organized a week-long strike demanding improved working conditions and fair compensation for overtime work.",
    url: "#",
  },
  {
    id: 3,
    title: "Japanese Game Company Implements Four-Day Work Week",
    date: "2024-12-05",
    location: "Tokyo, Japan",
    country: "Japan",
    company: "Nexus Interactive",
    organizingGroups: "Game Workers Alliance Japan",
    summary: "Following worker advocacy efforts, Nexus Interactive becomes the first major Japanese game company to adopt a four-day work week policy.",
    url: "#",
  },
];

export default function GameWorkerDemo() {
  const [isScraping, setIsScraping] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStartScraping = () => {
    setIsScraping(true);
    setTimeout(() => {
      setArticles(mockArticles);
      setIsScraping(false);
    }, 2000);
  };

  const filteredArticles =
    selectedCountry === "all"
      ? articles
      : articles.filter((a) => a.country === selectedCountry);

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
            Game Worker Info Gatherer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tool to track and analyze video game industry labor movements worldwide
          </p>
        </div>

        {/* Summary Section */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Game Worker Info Gatherer</strong> is a web scraping and AI-powered analysis tool that monitors labor movements in the global video game industry. At full capacity, it uses Playwright to scrape Google News from 18+ countries, employs OpenAI GPT-4 to extract structured information from articles, translates foreign-language content, and exports formatted JSON data to AirTable for tracking and analysis.
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
                    When running at full capacity, the Game Worker Info Gatherer performs comprehensive data collection and analysis:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Multi-Country Web Scraping:</strong> Uses Playwright to automate browser sessions and scrape Google News search results from 18+ countries (UK, France, Germany, Japan, USA, Canada, Australia, and more). The scraper navigates through search results, extracts article links, and handles pagination automatically.</li>
                    <li><strong>AI-Powered Information Extraction:</strong> Sends scraped article content to OpenAI GPT-4 API (api.openai.com/v1/chat/completions) with carefully crafted prompts to extract structured data including: company names, locations, dates, organizing groups, union names, strike details, and event summaries. The AI identifies key information even from complex, unstructured news articles.</li>
                    <li><strong>Automatic Translation:</strong> Detects non-English content and uses translation APIs (Google Translate API or DeepL) to convert foreign-language articles to English before processing, ensuring comprehensive coverage of international labor movements.</li>
                    <li><strong>Data Structuring:</strong> Formats extracted information into standardized JSON objects with consistent fields (title, date, location, country, company, organizing groups, summary, URL) for easy database integration.</li>
                    <li><strong>AirTable Integration:</strong> Connects to AirTable API (api.airtable.com) to automatically create or update records in a database table, maintaining a searchable, filterable database of labor movement events.</li>
                    <li><strong>Error Handling & Rate Limiting:</strong> Implements intelligent retry logic, respects API rate limits, and handles CAPTCHAs and anti-scraping measures through proxy rotation and browser fingerprinting.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Demo Limitations
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    This demo displays the interface and sample data, but all backend processing is simulated:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Web Scraping:</strong> The &quot;Start Scraping&quot; button doesn&apos;t actually launch Playwright browsers or scrape any websites. In production, clicking this would initiate headless browser sessions, navigate to Google News with country-specific queries, extract article URLs, and fetch article content from multiple sources.</li>
                    <li><strong>AI Processing:</strong> No API calls are made to OpenAI. In production, each scraped article would be sent to GPT-4 with a prompt like &quot;Extract the following information from this article: company name, location, date, organizing group, and summary&quot; and the API would return structured JSON data.</li>
                    <li><strong>Article Data:</strong> All articles shown are hardcoded mock data. In production, articles would be dynamically scraped and processed, with new articles appearing as they are discovered and analyzed.</li>
                    <li><strong>Translation:</strong> Translation functionality is not implemented in the demo. In production, articles in non-English languages would be detected and sent to a translation API before AI processing.</li>
                    <li><strong>Export to AirTable:</strong> The &quot;Export JSON&quot; button only shows an alert. In production, this would make authenticated API calls to AirTable to create records with the scraped and processed data, including proper field mapping and error handling.</li>
                    <li><strong>Country Filtering:</strong> The country filter works on mock data only. In production, filtering would query the AirTable database or local cache to retrieve articles matching the selected country.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Web Scraping Interface
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Countries to Scrape
                </label>
                <div className="flex flex-wrap gap-2">
                  {["All", "UK", "France", "Germany", "Japan", "USA"].map(
                    (country) => (
                      <button
                        key={country}
                        onClick={() =>
                          setSelectedCountry(
                            country === "All" ? "all" : country.toLowerCase()
                          )
                        }
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          (country === "All" && selectedCountry === "all") ||
                          country.toLowerCase() === selectedCountry
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <Globe size={16} className="inline mr-2" />
                        {country}
                      </button>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={handleStartScraping}
                disabled={isScraping}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                <Search size={20} />
                {isScraping ? "Scraping Articles..." : "Start Scraping"}
              </button>
            </div>
          </div>

          {articles.length > 0 && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Scraped Articles ({filteredArticles.length})
                </h3>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90 flex items-center gap-2">
                  <Download size={18} />
                  Export JSON
                </button>
              </div>

              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {article.title}
                      </h4>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                        {article.country}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <div>
                        <span className="font-medium">Date:</span> {article.date}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {article.location}
                      </div>
                      <div>
                        <span className="font-medium">Company:</span> {article.company}
                      </div>
                      <div>
                        <span className="font-medium">Organizing Group:</span>{" "}
                        {article.organizingGroups}
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {article.summary}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                      <FileText size={16} />
                      <a href={article.url} className="hover:underline">
                        View Original Article
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {articles.length === 0 && !isScraping && (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <Globe size={48} className="mx-auto mb-4 opacity-50" />
              <p>Click &quot;Start Scraping&quot; to begin gathering articles</p>
            </div>
          )}

          {isScraping && (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Scraping articles from multiple sources...
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            How It Works
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Scrapes news articles from Google News across 18+ countries</li>
            <li>Uses AI (OpenAI GPT-4) to extract key information</li>
            <li>Translates content to English when necessary</li>
            <li>Exports structured data in JSON format for AirTable</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

