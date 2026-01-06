"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { JobExperience } from "@/data/resume";

interface JobDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobExperience | null;
  bulletId: string | null;
  scrollPosition: number;
}

export default function JobDetailPanel({
  isOpen,
  onClose,
  job,
  bulletId,
  scrollPosition,
}: JobDetailPanelProps) {
  const bullet = job?.bulletPoints.find((b) => b.id === bulletId);

  const handleClose = () => {
    onClose();
    // Restore scroll position
    window.scrollTo({ top: scrollPosition, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isOpen && job && bullet && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {job.company}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {job.role}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close panel"
              >
                <X size={24} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {bullet.text}
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                {bullet.detailContent ? (
                  bullet.detailContent.sections.map((section, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      {section.heading && (
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {section.heading}
                        </h4>
                      )}
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                        {section.body}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-gray-500">
                    Detailed content will be provided here. This section will
                    contain more in-depth information about this specific
                    achievement or responsibility.
                  </p>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Related Information
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    <span className="font-medium">Location:</span> {job.location}
                  </p>
                  <p>
                    <span className="font-medium">Duration:</span> {job.startDate}{" "}
                    - {job.endDate}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


