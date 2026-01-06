"use client";

import { useState } from "react";
import { TrendingDown, Upload, Download, BarChart3, ExternalLink, ChevronDown } from "lucide-react";
import Link from "next/link";

const mockEmissionsData = [
  { year: 2020, emissions: 1000 },
  { year: 2021, emissions: 950 },
  { year: 2022, emissions: 900 },
  { year: 2023, emissions: 850 },
  { year: 2024, emissions: 800 },
];

const mockProjection = [
  { year: 2025, emissions: 750 },
  { year: 2026, emissions: 700 },
  { year: 2027, emissions: 650 },
  { year: 2028, emissions: 600 },
  { year: 2029, emissions: 550 },
  { year: 2030, emissions: 500 },
];

export default function NetZeroDemo() {
  const [companyName, setCompanyName] = useState("Example Corp");
  const [targetYear, setTargetYear] = useState(2030);
  const [hasData, setHasData] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1500);
  };

  const currentReductionRate = 5.0; // 5% per year
  const requiredReductionRate = 7.5; // 7.5% per year to reach net zero by 2030
  const projectedEmissions = 500;
  const targetEmissions = 0;

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
            Net Zero Analyzer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analysis engine for emissions data and net zero progress tracking
          </p>
          <a
            href="https://github.com/cj1101/netZeroTrends"
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
            <strong>Net Zero Analyzer</strong> is a comprehensive emissions analysis and reporting tool designed to help organizations track their progress toward net zero goals. At full capacity, it parses emissions data from CSV files using Pandas, performs statistical trend analysis with scikit-learn machine learning models, generates detailed visualizations with Matplotlib, creates comprehensive PDF reports, and provides a Tkinter desktop GUI for data input and result visualization.
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
                    When running at full capacity, the Net Zero Analyzer provides comprehensive emissions analysis:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>CSV Data Processing:</strong> Uses Pandas to read and parse emissions data from CSV files with flexible column formats. Handles multiple data sources, validates data integrity, cleans missing values, and supports various date formats and units. Can process historical data spanning many years with multiple emission sources (Scope 1, 2, 3).</li>
                    <li><strong>Statistical Analysis:</strong> Employs scikit-learn for advanced data analysis including linear regression for trend identification, time series forecasting to predict future emissions, and statistical tests to validate reduction rates. Calculates key metrics like year-over-year reduction rates, compound annual growth rates (CAGR), and statistical significance of trends.</li>
                    <li><strong>Visualization Generation:</strong> Uses Matplotlib to create professional charts including line graphs showing historical trends, bar charts comparing periods, projection charts with confidence intervals, and multi-panel dashboards. Generates publication-quality figures with custom styling, labels, and annotations.</li>
                    <li><strong>Net Zero Projections:</strong> Calculates whether current reduction rates will achieve net zero by target dates, identifies required acceleration rates, and provides multiple scenario projections (business-as-usual, accelerated reduction, etc.). Uses regression models to forecast future emissions based on historical trends.</li>
                    <li><strong>Report Generation:</strong> Creates comprehensive PDF reports including executive summaries, detailed analysis sections, charts and visualizations, recommendations for action, and compliance documentation. Reports are formatted professionally and can be customized with company branding.</li>
                    <li><strong>Tkinter Desktop Interface:</strong> Provides a native desktop application with file dialogs for CSV upload, interactive charts, data tables, configuration panels, and export options. The GUI allows users to adjust parameters, view results, and generate reports without using command-line tools.</li>
                    <li><strong>Recommendations Engine:</strong> Analyzes emissions data to generate actionable recommendations such as specific reduction targets, energy efficiency measures, renewable energy adoption strategies, and carbon offset suggestions.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Demo Limitations
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    This demo shows the interface and sample analysis, but all data processing is simulated:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>CSV Upload:</strong> The upload button doesn&apos;t actually process files. In production, clicking upload would open a file dialog, read the selected CSV using Pandas, parse the data, validate formats, and load the emissions data into memory for analysis. The system would handle various CSV formats and column structures.</li>
                    <li><strong>Data Analysis:</strong> The &quot;Run Analysis&quot; button doesn&apos;t execute any scikit-learn models or statistical calculations. In production, this would perform linear regression on historical data to calculate reduction rates, use time series models to project future emissions, and compute statistical metrics. The analysis would run actual Python code with Pandas and scikit-learn.</li>
                    <li><strong>Chart Generation:</strong> The charts shown are static mock visualizations created with CSS. In production, Matplotlib would generate actual charts from the analyzed data, creating line plots showing historical trends, bar charts for comparisons, and projection charts with trend lines and confidence intervals. Charts would be rendered as images and displayed in the interface.</li>
                    <li><strong>Projection Calculations:</strong> The projection values shown are hardcoded. In production, the system would use regression models to calculate future emissions based on historical trends, determine if current reduction rates are sufficient to reach net zero, and calculate the required acceleration rate using mathematical formulas.</li>
                    <li><strong>Report Export:</strong> The export button doesn&apos;t generate actual PDF files. In production, clicking export would use libraries like ReportLab or Matplotlib&apos;s PDF backend to create a comprehensive PDF document with all analysis results, charts, recommendations, and formatted text sections.</li>
                    <li><strong>No Desktop Application:</strong> This is a web demo, not the Tkinter desktop application. In production, users would run a native desktop app with file system access, better performance for large datasets, and system integration features.</li>
                    <li><strong>Static Recommendations:</strong> The recommendations list is hardcoded. In production, recommendations would be dynamically generated based on the specific emissions data, reduction rates, and target goals, using rule-based systems or machine learning models to suggest relevant actions.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Configuration
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Year
                </label>
                <input
                  type="number"
                  value={targetYear}
                  onChange={(e) => setTargetYear(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Emissions Data
                </label>
                <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 flex items-center justify-center gap-2">
                  <Upload size={20} />
                  Upload CSV File
                </button>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <BarChart3 size={20} />
                {isAnalyzing ? "Analyzing..." : "Run Analysis"}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Analysis Results
            </h2>

            {hasData && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {currentReductionRate}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Current Reduction Rate
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {requiredReductionRate}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Required Rate
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {targetYear}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Target Year
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-64 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="relative h-full">
                    {/* Mock chart bars */}
                    <div className="flex items-end justify-between h-full gap-2">
                      {[...mockEmissionsData, ...mockProjection].map(
                        (data, index) => {
                          const isProjected = index >= mockEmissionsData.length;
                          const height = (data.emissions / 1000) * 100;
                          return (
                            <div
                              key={data.year}
                              className="flex-1 flex flex-col items-center"
                            >
                              <div
                                className={`w-full rounded-t ${
                                  isProjected
                                    ? "bg-purple-400 dark:bg-purple-600 opacity-60"
                                    : "bg-blue-500 dark:bg-blue-600"
                                }`}
                                style={{ height: `${height}%` }}
                                title={`${data.year}: ${data.emissions} tons`}
                              ></div>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {data.year}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <div className="absolute top-0 left-0 text-xs text-gray-500 dark:text-gray-400">
                      Emissions (tons CO₂)
                    </div>
                  </div>
                </div>

                {/* Projection Info */}
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-2">
                    <TrendingDown
                      size={20}
                      className="text-yellow-600 dark:text-yellow-400 mt-0.5"
                    />
                    <div>
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                        Projection Analysis
                      </h4>
                      <p className="text-sm text-yellow-800 dark:text-yellow-300">
                        At current reduction rate of {currentReductionRate}% per
                        year, projected emissions in {targetYear} will be{" "}
                        {projectedEmissions} tons. To reach net zero, a
                        reduction rate of {requiredReductionRate}% per year is
                        required.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Recommendations
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>Increase renewable energy usage by 25%</li>
                    <li>Implement energy efficiency measures</li>
                    <li>Offset remaining emissions through carbon credits</li>
                    <li>Accelerate transition to electric vehicles</li>
                  </ul>
                </div>

                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2">
                  <Download size={18} />
                  Export Report
                </button>
              </div>
            )}

            {!hasData && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
                <p>Upload emissions data to begin analysis</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Features
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Load and analyze emissions data from CSV files</li>
            <li>Calculate current and required reduction rates</li>
            <li>Project future emissions based on trends</li>
            <li>Generate visual charts and reports</li>
            <li>Provide actionable recommendations for net zero goals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


