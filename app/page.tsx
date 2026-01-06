import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Charles Suarez
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Welcome to my professional portfolio
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/experience"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            View Experience
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}


