"use client";

import { useState, useEffect } from "react";
import { workExperience, JobExperience, JobCategory } from "../../data/resume";
import JobCard from "../../components/JobCard";
import JobDetailPanel from "../../components/JobDetailPanel";

export default function ExperiencePage() {
  const [selectedJob, setSelectedJob] = useState<JobExperience | null>(null);
  const [selectedBulletId, setSelectedBulletId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [filter, setFilter] = useState<JobCategory | "all">("all");

  const handleBulletClick = (jobId: string, bulletId: string) => {
    const job = workExperience.find((j) => j.id === jobId);
    if (job) {
      setScrollPosition(window.scrollY);
      setSelectedJob(job);
      setSelectedBulletId(bulletId);
      setIsPanelOpen(true);
      // Prevent body scroll when panel is open
      document.body.style.overflow = "hidden";
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedJob(null);
    setSelectedBulletId(null);
    document.body.style.overflow = "unset";
  };

  const filteredJobs = filter === "all" 
    ? workExperience 
    : workExperience.filter((job) => job.category === filter);

  const businessCount = workExperience.filter((job) => job.category === "business").length;
  const serviceCount = workExperience.filter((job) => job.category === "service").length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Work Experience
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Click on any bullet point to learn more about my experience
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "all"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
              }`}
            >
              All ({workExperience.length})
            </button>
            <button
              onClick={() => setFilter("business")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "business"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
              }`}
            >
              Business/Major Related ({businessCount})
            </button>
            <button
              onClick={() => setFilter("service")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "service"
                  ? "bg-green-600 text-white shadow-lg shadow-green-500/50"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
              }`}
            >
              Service Jobs ({serviceCount})
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onBulletClick={handleBulletClick}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No jobs found for the selected filter. Please update{" "}
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  data/resume.ts
                </code>{" "}
                with your work experience.
              </p>
            </div>
          )}
        </div>
      </div>

      <JobDetailPanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        job={selectedJob}
        bulletId={selectedBulletId}
        scrollPosition={scrollPosition}
      />
    </main>
  );
}

