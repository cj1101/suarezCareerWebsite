"use client";

import { JobExperience } from "@/data/resume";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface JobCardProps {
  job: JobExperience;
  onBulletClick: (jobId: string, bulletId: string) => void;
}

export default function JobCard({ job, onBulletClick }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-[1.02]"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {job.role}
          </h3>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mt-1">
            {job.company}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>
            {job.startDate} - {job.endDate}
          </span>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>

      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          Key Responsibilities & Achievements:
        </h4>
        <ul className="space-y-2">
          {job.bulletPoints.map((bullet) => (
            <li
              key={bullet.id}
              onClick={() => onBulletClick(job.id, bullet.id)}
              className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors group"
            >
              <ChevronRight
                size={16}
                className="mt-0.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0"
              />
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {bullet.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

