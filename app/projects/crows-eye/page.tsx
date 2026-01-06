"use client";

import { useState } from "react";
import { Sparkles, Calendar, Image, BarChart3, Upload, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function CrowsEyeDemo() {
  const [activeTab, setActiveTab] = useState("content");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedContent(
        "🌟 Exciting news! We're launching our new product line that combines innovation with sustainability. Join us on this journey towards a better future! #Innovation #Sustainability #NewProduct"
      );
      setIsGenerating(false);
    }, 1500);
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
            Crow&apos;s Eye Marketing Suite
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered social media management platform demo
          </p>
          <a
            href="https://github.com/cj1101/CrowsEyeWebsite.git"
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
            <strong>Crow&apos;s Eye Marketing Suite</strong> is a comprehensive AI-powered social media management platform that enables businesses to create, schedule, and analyze content across multiple platforms. At full capacity, it integrates with Gemini AI for intelligent content generation, connects to social media APIs (Instagram, Facebook, Twitter, TikTok) for automated posting, provides real-time analytics from platform APIs, stores media in Firebase, and processes payments through Stripe.
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
                    When running at full capacity, Crow&apos;s Eye Marketing Suite provides a complete social media management solution:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>AI Content Generation:</strong> Integrates with Google&apos;s Gemini AI API to generate high-quality, platform-specific content based on user prompts, brand voice, and target audience. The AI understands context, generates appropriate hashtags, and adapts content length and style for each platform.</li>
                    <li><strong>Multi-Platform Scheduling:</strong> Connects to Instagram, Facebook, Twitter, and TikTok APIs to schedule and automatically post content at optimal times. Supports image, video, and carousel posts with platform-specific formatting.</li>
                    <li><strong>Real-Time Analytics:</strong> Fetches live engagement metrics, follower growth, reach, impressions, and engagement rates from each platform&apos;s API. Provides detailed analytics dashboards with trend analysis and performance comparisons.</li>
                    <li><strong>Media Library:</strong> Uses Firebase Storage to upload, store, and manage media files. Supports image optimization, video compression, and cloud-based asset management with CDN delivery.</li>
                    <li><strong>Payment Processing:</strong> Integrates with Stripe for subscription management, allowing users to choose between free, pro, and enterprise plans with automated billing.</li>
                    <li><strong>User Management:</strong> Firebase Authentication handles user accounts, sessions, and role-based access control for team collaboration.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Demo Limitations
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    This demo showcases the interface and user experience, but all backend functionality is simulated:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Content Generation:</strong> The &quot;Generate Content&quot; button returns a hardcoded response. In production, this would make an API call to Gemini AI (api.gemini.google.com) with the user&apos;s prompt, platform selection, and tone preferences, returning dynamically generated content.</li>
                    <li><strong>Scheduling:</strong> The scheduling calendar displays mock data. In production, clicking &quot;Schedule&quot; would create a post entry in Firebase Firestore and set up a scheduled job that would call the respective social media platform API (graph.facebook.com, api.instagram.com, api.twitter.com, or api.tiktok.com) at the specified time.</li>
                    <li><strong>Analytics:</strong> All metrics shown are static mock data. In production, the analytics tab would make API calls to each platform&apos;s analytics endpoints (e.g., Facebook Graph API, Instagram Insights API) to fetch real-time engagement data, follower counts, and performance metrics.</li>
                    <li><strong>Media Upload:</strong> The upload button doesn&apos;t actually save files. In production, clicking upload would send files to Firebase Storage, which would return a CDN URL for the uploaded media that would be stored in Firestore.</li>
                    <li><strong>Copy & Schedule Actions:</strong> The &quot;Copy&quot; and &quot;Schedule&quot; buttons in the generated content section are non-functional. In production, Copy would use the Clipboard API, and Schedule would open the scheduling interface with the generated content pre-filled.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          {/* Demo Panel */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "content"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Sparkles size={18} className="inline mr-2" />
                Content Generation
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "schedule"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Calendar size={18} className="inline mr-2" />
                Scheduling
              </button>
              <button
                onClick={() => setActiveTab("media")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "media"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image size={18} className="inline mr-2" />
                Media Library
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "analytics"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <BarChart3 size={18} className="inline mr-2" />
                Analytics
              </button>
            </div>

            {/* Content Generation Tab */}
            {activeTab === "content" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content Prompt
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows={4}
                    placeholder="Describe the content you want to create..."
                    defaultValue="Create a social media post about launching a new sustainable product line"
                  />
                </div>
                <div className="flex gap-4">
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>Twitter</option>
                    <option>TikTok</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Friendly</option>
                  </select>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isGenerating ? "Generating..." : "Generate Content"}
                </button>
                {generatedContent && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-gray-900 dark:text-white">{generatedContent}</p>
                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90">
                        Copy
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        Schedule
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Scheduling Tab */}
            {activeTab === "schedule" && (
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div
                        key={day}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"
                      >
                        <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {day}
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 bg-blue-500 rounded"></div>
                          <div className="h-2 bg-purple-500 rounded"></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Upcoming Posts
                  </h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Dec {15 + i}, 2024 at 2:00 PM
                          </span>
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                            Instagram
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Media Library Tab */}
            {activeTab === "media" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Media Library
                  </h3>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
                    <Upload size={18} />
                    Upload
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                    >
                      {i}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      1.2K
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Posts
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      45K
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Engagement
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      12.5%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Avg. Engagement Rate
                    </div>
                  </div>
                </div>
                <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Analytics Chart (Mock Data)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

