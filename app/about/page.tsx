import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-12 text-center">
          About Me
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Image Section */}
          <div className="lg:col-span-5 relative group">
            <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-gray-700">
              <Image
                src="/me.jpg"
                alt="Charles Suarez"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative decorative blob */}
            <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-blue-600/20 dark:bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-10 -right-10 w-full h-full bg-purple-600/20 dark:bg-purple-400/10 rounded-full blur-3xl"></div>
          </div>

          {/* Text Section */}
          <div className="lg:col-span-7 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-gray-800 dark:text-gray-200 text-lg space-y-6 leading-relaxed border border-gray-100 dark:border-gray-700">
            <p>
              I am a senior at Fordham University (Gabelli School of Business) on a full academic scholarship, double concentrating in Strategic Consulting and IT Strategy. My journey began in the pool as a Division 1 swimmer, where I learned the discipline required to train 20+ hours a week before transitioning to Head Coach of the Fordham Swim Club.
            </p>
            <p>
              I&apos;ve honed my corporate strategy skills through internships at Deloitte and Flexera, where I discovered a passion for using data analysis to solve complex business problems.
            </p>
            <p>
              During a gap year studying in London and Paris, I became obsessed with the intersection of business ethics and Artificial Intelligence. What started as a class project—building a tool to aggregate Game Worker Union data—quickly turned into a flow-state passion for pushing the limits of LLMs.
            </p>
            <p>
              This led to the founding of Crow&apos;s Eye. Originally a pro bono consulting project to help a local bakery with social media, I scaled it into a SaaS startup designed to automate the end-to-end content creation process for small businesses. While I have since sunset the company to focus on graduation, the experience taught me more about product development, API integration, and bootstrapping than any classroom ever could.
            </p>
            <p>
              I am currently based in Brooklyn, NY, exploring the potential societal impacts of theoretical AGI. In my free time, you can find me climbing, practicing yoga, immersing myself in music, or trying to make something bizarre.
            </p>
            <p className="font-extrabold text-blue-600 dark:text-blue-400">
              I am graduating in May 2026 and looking for opportunities to bridge the gap between commercial strategy and technical innovation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


