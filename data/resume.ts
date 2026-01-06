export type JobCategory = "business" | "service";

export interface JobExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  category: JobCategory;
  bulletPoints: Array<{
    id: string;
    text: string;
    detailContent?: {
      sections: Array<{
        heading?: string;
        body: string;
      }>;
    };
  }>;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export interface Skill {
  category: string;
  items: string[];
}

// Resume data structure - Extracted from LinkedIn profile with full descriptions
// All 12 work experiences with complete bullet points
export const workExperience: JobExperience[] = [
  {
    id: "job-1",
    company: "Crow's Eye",
    role: "Founder/CEO",
    location: "Self-employed",
    startDate: "Jan 2025",
    endDate: "Present",
    category: "business",
    description: "Founder and CEO of Crow's Eye, developing innovative AI-powered SaaS platforms and automated business solutions.",
    bulletPoints: [
      {
        id: "bullet-1-1",
        text: "Leveraged Docker to create a social media Python/Node.js SaaS platform that is informed by context engineering data that delegates social media marketing tasks across seven platforms to Gemini and Veo AI agents to create photo, video or text content and answer customer questions via comments or DMs for use by small businesses",
        detailContent: {
          sections: [
            {
              heading: "Technical Challenge & Migration",
              body: "The project started as a simple Python program. Transitioning to a web app required using Docker to consolidate API calls and reduce cost and loading time."
            },
            {
              heading: "AI-Assisted Development",
              body: "As a sole developer who didn't initially know JS/TS, Charles used context engineering to delegate coding to AI, choosing to learn by \"debugging\" the AI's logic rather than writing every line manually."
            },
            {
              heading: "Financial Management",
              body: "Charles refused external funding until the MVP was perfect to avoid managing other people's money without a finished product, which led to personal debt but allowed him to learn without the pressure of investors."
            }
          ]
        }
      },
      {
        id: "bullet-1-2",
        text: "Use Next.js/MongoDB coding languages to design a fully automated custom apparel website for the MoodyArt subsidiary of Crow's Eye, integrating Printful API to automate fulfillment and digitize legacy operations",
        detailContent: {
          sections: [
            {
              heading: "Project Status",
              body: "This project is completed. The owner (the artist) has taken control of the subsidiary."
            },
            {
              heading: "Philosophy",
              body: "MoodyArt served as a proof of concept for automating legacy operations via the Printful API."
            }
          ]
        }
      },
      {
        id: "bullet-1-3",
        text: "Develop a fictionalized AI-powered simulated sports league to drive autonomous entertainment engagement through content creation and data-informed sports betting",
        detailContent: {
          sections: [
            {
              heading: "Ethics and \"Safe Betting\"",
              body: "For now, the sportsbook is purely fictional, using \"Cascadian Coins\" generated solely by the app."
            },
            {
              heading: "Future Vision",
              body: "The long-term goal is to create a \"safe betting\" platform using data gathered without guardrails to build an ecosystem that refuses aggressive promotions and protects users."
            }
          ]
        }
      }
    ]
  },
  {
    id: "job-2",
    company: "Game Worker Solidarity Project",
    role: "Automation and Data Integration Specialist",
    location: "London Area, United Kingdom",
    startDate: "May 2024",
    endDate: "Nov 2024",
    category: "business",
    description: "Automation and Data Integration Specialist at Game Worker Solidarity Project, building tools to document and map collective movements in the gaming industry.",
    bulletPoints: [
      {
        id: "bullet-2-1",
        text: "Leveraged Python/Gemini 2.0 to continuously scrape and summarize gaming industry news stories for inclusion in a game worker database of events that can be searched by location, type of action, and numbers involved for events like the creation of trade union branches, new contracts, strikes, protests, and social media campaigns for a mapping and documenting collective movement by game workers striving to improve working conditions",
        detailContent: {
          sections: [
            {
              heading: "Data Processing",
              body: "Gemini was used to clean unstructured data with minimal errors. Anti-scraping measures were a non-issue as sources were global and varied."
            },
            {
              heading: "Adoption Lesson",
              body: "Although the tool worked perfectly, it was not adopted by the client (professor) due to a lack of live in-person demos and proactive communication—a key lesson learned for future consulting."
            }
          ]
        }
      }
    ]
  },
  {
    id: "job-3",
    company: "Sol Cacao",
    role: "Consultant",
    location: "Bronx, New York, United States",
    startDate: "Sep 2023",
    endDate: "Dec 2023",
    category: "business",
    description: "Consultant at Sol Cacao, a Bronx-based premium chocolate company, developing marketing strategies to drive awareness.",
    bulletPoints: [
      {
        id: "bullet-3-1",
        text: "Worked on a team to develop a marketing strategy to drive awareness for Sol Cacao, a Bronx-based premium chocolate company; developed a 8-page PowerPoint deck summarizing pricing and advertising solutions",
        detailContent: {
          sections: [
            {
              body: "You still need to ask me something in the interview :)"
            }
          ]
        }
      }
    ]
  },
  {
    id: "job-4",
    company: "Fordham University",
    role: "Head Club Swim Coach",
    location: "Bronx, New York",
    startDate: "Sep 2022",
    endDate: "Dec 2023",
    category: "service",
    description: "Head Club Swim Coach at Fordham University, managing a team of 30+ student-athletes with personalized training programs.",
    bulletPoints: [
      {
        id: "bullet-4-1",
        text: "Managed 30+ student-athletes in bi-weekly personalized workouts that resulted in time drops of up to ten seconds for beginners and three to four seconds for advanced swimmers",
        detailContent: {
          sections: [
            {
              heading: "Transition and Confidence",
              body: "The transition from D1 swimmer to coach was due to health reasons (lung issues from indoor pools) but became a major leadership opportunity."
            },
            {
              heading: "Human Impact",
              body: "This experience transformed his impostor syndrome into managerial confidence, as he realized he could manage a group and build strong social ties."
            }
          ]
        }
      }
    ]
  },
  {
    id: "job-5",
    company: "Flexera",
    role: "Product Pricing and Packaging Intern",
    location: "Location to be updated",
    startDate: "Jun 2023",
    endDate: "Aug 2023",
    category: "business",
    description: "Product Pricing and Packaging Intern at Flexera, supporting the Product Team for a SaaS-based IT management solutions company.",
    bulletPoints: [
      {
        id: "bullet-5-1",
        text: "Supported the Product Team for a SaaS-based IT management solutions company that enables enterprises to accelerate digital transformation and multiply the value of their technology investments with a portfolio of Enterprise software products: Cloud Cost Optimization/FinOps, IT Visibility (ITV) and SaaS Manager",
        detailContent: {
          sections: [
            { body: "You still need to ask me something in the interview :)" }
          ]
        }
      },
      {
        id: "bullet-5-2",
        text: "Leveraged Pendo, Salesforce, and advanced Excel skills to gather and manipulate large amounts of Flexera IT Visibility product usage data; performed analytics to uncover customer and pricing insights to inform usage-pricing strategies and modeling, and summarized results for a cross-functional (Revenue Operations, Sales, Finance) team of management in PowerPoint",
        detailContent: {
          sections: [
            {
              heading: "Strategic Pivot",
              body: "Analytics via Pendo revealed a critical lack of usage for certain products, making usage-based pricing impossible to model."
            },
            {
              heading: "Bold Recommendation",
              body: "Instead of forcing a pricing model, Charles recommended removing the \"ITV\" product and integrating its functions into the main ITAM platform—an idea supported by some leaders but unpopular with the specific product team."
            },
            {
              heading: "Resilience",
              body: "Although his final presentation to the CPO was cancelled on his last day, he consolidated all his findings so they remained accessible and actionable for the company."
            }
          ]
        }
      },
      {
        id: "bullet-5-3",
        text: "Utilized Access and VBA to develop a Pendo and Salesforce integration model that eliminated the need to purchase Alteryx, a $250K AI-guided solution that automates data and analytics tasks",
        detailContent: {
          sections: [
            {
              heading: "Economic Impact",
              body: "Charles solved the data consolidation problem that justified a $250k Alteryx solution, rendering the tool unnecessary for that specific task."
            },
            {
              heading: "Adoption",
              body: "The solution was unofficially adopted by the team, who continued working with his method after he left."
            }
          ]
        }
      },
      {
        id: "bullet-5-4",
        text: "Leveraged ChatGPT and Gemini to classify 50K+ customer records into 165+ NAICS and SIC Codes providing valuable consumer insights",
        detailContent: {
          sections: [
            {
              heading: "Validation Methodology",
              body: "Charles classified industry definitions (rather than individual records) into codes 1-5. The process included an AI double-check followed by a human check."
            },
            {
              heading: "Data Accuracy",
              body: "While jokingly referred to as a \"0% error rate,\" the methodology aimed for a 90-95% confidence interval given AI capabilities at the time."
            }
          ]
        }
      }
    ]
  },
  {
    id: "job-6",
    company: "Kerbey Lane Cafe",
    role: "Food Server",
    location: "Austin, Texas, United States",
    startDate: "Apr 2023",
    endDate: "May 2023",
    category: "service",
    description: "Food Server at Kerbey Lane Cafe, providing exemplary customer service at a popular Austin cafe.",
    bulletPoints: [
      {
        id: "bullet-6-1",
        text: "Waited tables and provided exemplary customer service at a cafe serving daily homemade pancakes, queso and comfort food and whose best-selling queso was sent aboard SpaceX Falcon rocket in 2019",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      }
    ]
  },
  {
    id: "job-7",
    company: "Liberty Partnerships Program - NYSED",
    role: "Volunteer Tutor",
    location: "Bronx, New York, United States",
    startDate: "Feb 2022",
    endDate: "Feb 2023",
    category: "business",
    description: "Volunteer Tutor at Liberty Partnerships Program - NYSED, providing academic and social-emotional support to middle school students.",
    bulletPoints: [
      {
        id: "bullet-7-1",
        text: "Provided one on one academic, social-emotional, and enrichment services to three middle school students at local Bronx schools as part of a comprehensive pre-collegiate/dropout prevention program",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      }
    ]
  },
  {
    id: "job-8",
    company: "Fordham Gabelli School of Business",
    role: "Gabelli Consulting Cup - Team Member",
    location: "Bronx, New York, United States",
    startDate: "Sep 2022",
    endDate: "Dec 2022",
    category: "business",
    description: "Team Member in the Gabelli Consulting Cup competition, completing a comprehensive consulting project for Park Hotels & Resorts.",
    bulletPoints: [
      {
        id: "bullet-8-1",
        text: "Completed comprehensive financial, operational, and marketing benchmarking competitive analysis in order to identify business challenges facing Park Hotels & Resorts as part of a semester-long consulting project",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      },
      {
        id: "bullet-8-2",
        text: "Developed a comprehensive solution to adapt to the current and upcoming challenges associated with the post-COVID hotel industry and presented the solution in a 30-page written report and a PowerPoint deck",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      }
    ]
  },
  {
    id: "job-9",
    company: "Freebirds World Burrito",
    role: "Front of House",
    location: "Austin, Texas Metropolitan Area",
    startDate: "May 2022",
    endDate: "Aug 2022",
    category: "service",
    description: "Front of House at Freebirds World Burrito, a Texas fast-casual burrito restaurant.",
    bulletPoints: [
      {
        id: "bullet-9-1",
        text: "Took customers orders, prepared exceptional high-quality personalized menu items and processed customer payments using a POS system at a Texas fast-casual burrito joint with crave-able proteins grilled in-house by master grillers famous for Texas' No. 1 Burrito",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      }
    ]
  },
  {
    id: "job-10",
    company: "Deloitte",
    role: "Discovery Intern",
    location: "Location to be updated",
    startDate: "Jun 2022",
    endDate: "Jul 2022",
    category: "business",
    description: "Discovery Intern at Deloitte, performing research and analysis on various client projects.",
    bulletPoints: [
      {
        id: "bullet-10-1",
        text: "Worked on a team to perform research about Chester County, Pennsylvania's ALICE (Asset Limited, Income Restrained, Employed) population, identified opportunities to expand financial resources to support greater economic equity for this under-resourced demographic and summarized findings and recommendations in a PowerPoint pitch to United Way representatives from Chester County, Pennsylvania",
        detailContent: {
          sections: [
            {
              heading: "Innovative Solution",
              body: "To aid the ALICE population, the team proposed more accessible credit cards, partially funded by the charity to help build credit scores."
            },
            {
              heading: "Risk Management",
              body: "To prevent debt accumulation, the proposal included integrating the Chime program to limit purchases to the user's actual debit balance."
            }
          ]
        }
      },
      {
        id: "bullet-10-2",
        text: "Evaluated two smart home acquisition targets for a simulation M&A client; pitched evaluation and recommended acquisition to Principals, Partners, and Managing Directors",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      },
      {
        id: "bullet-10-3",
        text: "Attended national and local learning and networking events, including: lunch and learns, industry/service line spotlights, and regularly scheduled training developing technical and client service skills including the 2022 Dallas, TX Deloitte University's Discovery Intern Conference",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      }
    ]
  },
  {
    id: "job-11",
    company: "Walgreens",
    role: "Customer Service Representative",
    location: "Austin, Texas, United States",
    startDate: "May 2021",
    endDate: "Aug 2021",
    category: "service",
    description: "Customer Service Representative at Walgreens, providing excellent customer service and managing store operations.",
    bulletPoints: [
      {
        id: "bullet-11-1",
        text: "Provided excellent customer service and helped to create a welcoming environment",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      },
      {
        id: "bullet-11-2",
        text: "Managed space inside of the stockroom and dealt with cash up to $400 behind the register",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      }
    ]
  },
  {
    id: "job-12",
    company: "LIFETIME FITNESS",
    role: "Lifeguard/Swim Instructor",
    location: "Austin, Texas, United States",
    startDate: "May 2019",
    endDate: "Sep 2019",
    category: "service",
    description: "Lifeguard and Swim Instructor at LIFETIME FITNESS, ensuring pool safety and teaching swimming skills.",
    bulletPoints: [
      {
        id: "bullet-12-1",
        text: "Collaborated with co-workers to ensure a safe a fun environment for all guests in and out of the pool",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      },
      {
        id: "bullet-12-2",
        text: "Taught 5 groups of children between the ages of 2-5 basic water safety and swimming skills",
        detailContent: { sections: [{ body: "You still need to ask me something in the interview :)" }] }
      }
    ]
  }
];

export const education: Education[] = [
  // Add education details from resume
];

export const skills: Skill[] = [
  {
    category: "Programming Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C++"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["Next.js", "React", "Node.js", "FastAPI", "PyQt6", "Tkinter"]
  },
  {
    category: "Tools & Technologies",
    items: ["Git", "Docker", "AWS", "Firebase", "PostgreSQL", "MongoDB"]
  }
];
