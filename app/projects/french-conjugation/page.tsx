"use client";

import { useState } from "react";
import { BookOpen, Search, ExternalLink, ChevronDown } from "lucide-react";
import Link from "next/link";

const mockConjugations: Record<string, any> = {
  parler: {
    present: {
      je: "parle",
      tu: "parles",
      "il/elle": "parle",
      nous: "parlons",
      vous: "parlez",
      "ils/elles": "parlent",
    },
    imparfait: {
      je: "parlais",
      tu: "parlais",
      "il/elle": "parlait",
      nous: "parlions",
      vous: "parliez",
      "ils/elles": "parlaient",
    },
    passeCompose: {
      je: "ai parlé",
      tu: "as parlé",
      "il/elle": "a parlé",
      nous: "avons parlé",
      vous: "avez parlé",
      "ils/elles": "ont parlé",
    },
  },
  être: {
    present: {
      je: "suis",
      tu: "es",
      "il/elle": "est",
      nous: "sommes",
      vous: "êtes",
      "ils/elles": "sont",
    },
    imparfait: {
      je: "étais",
      tu: "étais",
      "il/elle": "était",
      nous: "étions",
      vous: "étiez",
      "ils/elles": "étaient",
    },
    passeCompose: {
      je: "ai été",
      tu: "as été",
      "il/elle": "a été",
      nous: "avons été",
      vous: "avez été",
      "ils/elles": "ont été",
    },
  },
};

export default function FrenchConjugationDemo() {
  const [mode, setMode] = useState<"conjugate" | "identify">("conjugate");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      if (mode === "conjugate") {
        const verb = input.toLowerCase().trim();
        if (mockConjugations[verb]) {
          setResult({
            type: "conjugation",
            verb: verb,
            conjugations: mockConjugations[verb],
          });
        } else {
          setResult({
            type: "error",
            message: `Verb "${verb}" not found in database`,
          });
        }
      } else {
        // Identify form mode
        const form = input.toLowerCase().trim();
        const found: any[] = [];
        Object.entries(mockConjugations).forEach(([verb, tenses]) => {
          Object.entries(tenses).forEach(([tense, forms]: [string, any]) => {
            Object.entries(forms).forEach(([pronoun, conjugated]: [string, any]) => {
              if (conjugated.toLowerCase() === form) {
                found.push({
                  infinitive: verb,
                  tense: tense,
                  pronoun: pronoun,
                  form: conjugated,
                });
              }
            });
          });
        });
        setResult({
          type: "identification",
          form: form,
          matches: found,
        });
      }
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/projects"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            French Verb Conjugator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Conjugate French verbs or identify conjugated forms
          </p>
        </div>

        {/* Summary Section */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>French Verb Conjugator</strong> is a comprehensive tool for learning and working with French verb conjugations. At full capacity, it contains a database of thousands of French verbs with complete conjugation tables for all tenses and moods, uses advanced algorithms to identify conjugated forms and find their infinitive origins, and provides a PyQt6 desktop application interface with search, filtering, and educational features.
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
                    When running at full capacity, the French Verb Conjugator provides comprehensive verb conjugation support:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Comprehensive Verb Database:</strong> Contains thousands of French verbs including all regular verbs (-er, -ir, -re endings) and hundreds of irregular verbs. The database includes complete conjugation tables for all tenses: Présent, Imparfait, Passé Composé, Plus-que-parfait, Futur Simple, Futur Antérieur, Conditionnel, Subjonctif, and Imperatif, as well as all moods and persons (je, tu, il/elle, nous, vous, ils/elles).</li>
                    <li><strong>Conjugation Rules Engine:</strong> Uses pattern-matching algorithms and rule-based systems to conjugate verbs according to French grammar rules. For irregular verbs, the system applies specific conjugation patterns and handles exceptions. The engine can conjugate verbs that aren&apos;t explicitly in the database by applying appropriate rules based on verb endings.</li>
                    <li><strong>Form Identification:</strong> Employs advanced search algorithms including fuzzy matching, stem analysis, and pattern recognition to identify conjugated forms and determine their infinitive, tense, mood, and person. The system can handle variations, accents, and common spelling variations, and provides multiple possible matches when a form could belong to different verbs or tenses.</li>
                    <li><strong>PyQt6 Desktop Interface:</strong> Provides a native desktop application built with PyQt6, offering a responsive GUI with search functionality, result display, verb browsing, and educational features like verb frequency information and usage examples.</li>
                    <li><strong>Educational Features:</strong> Includes verb frequency rankings, common usage examples, verb group classifications, and links to related verbs. Can generate practice exercises and quizzes.</li>
                    <li><strong>Export & Sharing:</strong> Allows users to export conjugation tables, save favorite verbs, and print reference materials.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Demo Limitations
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    This demo shows the interface and basic functionality, but has significant limitations:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Limited Verb Database:</strong> The demo only includes 2 verbs (parler and être) with hardcoded conjugations. In production, the system would have a database of thousands of verbs stored in a structured format (SQLite, JSON, or similar), allowing users to conjugate any common French verb.</li>
                    <li><strong>Limited Tenses:</strong> Only shows 3 tenses (Présent, Imparfait, Passé Composé) for the demo verbs. In production, the system would support all French tenses including Futur, Conditionnel, Subjonctif, and more complex compound tenses, providing complete conjugation tables.</li>
                    <li><strong>Simple Identification:</strong> The form identification uses basic exact string matching against the limited demo data. In production, this would use sophisticated algorithms including stem extraction, pattern matching, fuzzy string matching to handle typos, and analysis of verb endings to identify possible origins even for verbs not in the database.</li>
                    <li><strong>No Rule-Based Conjugation:</strong> The demo cannot conjugate verbs that aren&apos;t explicitly in its tiny database. In production, the system would apply conjugation rules to generate conjugations for any regular verb, even if it&apos;s not stored, by recognizing verb endings and applying appropriate patterns.</li>
                    <li><strong>No Desktop Application:</strong> This is a web demo, not the PyQt6 desktop application. In production, users would run a native desktop app with additional features like offline access, system integration, and potentially better performance for large database queries.</li>
                    <li><strong>No Advanced Features:</strong> Missing educational features like verb frequency, usage examples, practice exercises, and verb group information that would be present in the full application.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          {/* Mode Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mode
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMode("conjugate");
                  setInput("");
                  setResult(null);
                }}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  mode === "conjugate"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <BookOpen size={18} className="inline mr-2" />
                Conjugate Infinitive
              </button>
              <button
                onClick={() => {
                  setMode("identify");
                  setInput("");
                  setResult(null);
                }}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  mode === "identify"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Search size={18} className="inline mr-2" />
                Identify Form
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === "conjugate"
                ? "Infinitive Verb"
                : "Conjugated Form"}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder={
                  mode === "conjugate"
                    ? "e.g., parler, être, finir..."
                    : "e.g., parle, suis, finis..."
                }
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSubmit}
                disabled={isProcessing || !input.trim()}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Go"}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
              {result.type === "conjugation" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Conjugations for: {result.verb}
                  </h3>
                  {Object.entries(result.conjugations).map(
                    ([tense, forms]: [string, any]) => (
                      <div key={tense} className="mb-4">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 capitalize">
                          {tense === "passeCompose"
                            ? "Passé Composé"
                            : tense === "imparfait"
                            ? "Imparfait"
                            : "Présent"}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(forms).map(([pronoun, form]) => (
                            <div
                              key={pronoun}
                              className="flex justify-between p-2 bg-white dark:bg-gray-800 rounded"
                            >
                              <span className="text-gray-600 dark:text-gray-400">
                                {pronoun}
                              </span>
                              <span className="font-mono text-gray-900 dark:text-white">
                                {form as string}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

              {result.type === "identification" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Possible origins for &quot;{result.form}&quot;
                  </h3>
                  {result.matches.length > 0 ? (
                    <div className="space-y-2">
                      {result.matches.map((match: any, index: number) => (
                        <div
                          key={index}
                          className="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600"
                        >
                          <div className="text-sm">
                            <div>
                              <span className="font-medium">Infinitive:</span>{" "}
                              {match.infinitive}
                            </div>
                            <div>
                              <span className="font-medium">Tense:</span>{" "}
                              {match.tense === "passeCompose"
                                ? "Passé Composé"
                                : match.tense === "imparfait"
                                ? "Imparfait"
                                : "Présent"}
                            </div>
                            <div>
                              <span className="font-medium">Pronoun:</span>{" "}
                              {match.pronoun}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      No matches found for &quot;{result.form}&quot;
                    </p>
                  )}
                </div>
              )}

              {result.type === "error" && (
                <div className="text-red-600 dark:text-red-400">
                  {result.message}
                </div>
              )}
            </div>
          )}

          {!result && !isProcessing && (
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Enter a verb or form to get started</p>
            </div>
          )}

          {isProcessing && (
            <div className="mt-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600 dark:text-gray-400">Processing...</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Features
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Conjugate French verbs in multiple tenses</li>
            <li>Identify conjugated forms and find their infinitive</li>
            <li>Support for regular and irregular verbs</li>
            <li>Multiple tenses: Présent, Imparfait, Passé Composé, and more</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

