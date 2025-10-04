const siteMetadata = {
  title: "Faisal Akbar - Software Engineer & Full Stack Developer",
  author: "Faisal Akbar",
  headerTitle: "Faisal Akbar",
  description:
    "Software Engineer based in New York City. Passionate about building high-quality web applications with React, Next.js, TypeScript, and modern technologies. Explore my projects, blog posts, and professional journey.",
  language: "en-us",
  theme: "system",
  siteUrl: "https://b5a7-client.vercel.app",
  siteRepo: "https://github.com/faisal-akbar/",
  siteLogo: "/images/faisal-akbar.jpg",
  image: "/images/faisal-akbar.jpg",
  socialBanner: "/images/faisal-akbar.jpg",
  email: "faisal.akbar@example.com",
  github: "https://github.com/faisal-akbar",
  twitterUrl: "https://twitter.com/_faisal_akbar",
  twitterHandle: "@_faisal_akbar",
  linkedin: "https://www.linkedin.com/in/md-faisal-akbar/",
  locale: "en-US",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "New York Developer",
  ],
  openGraph: {
    type: "website" as const,
    locale: "en_US",
    url: "https://b5a7-client.vercel.app",
    title: "Faisal Akbar - Software Engineer & Full Stack Developer",
    description:
      "Software Engineer based in New York City. Passionate about building high-quality web applications with React, Next.js, TypeScript, and modern technologies.",
    siteName: "Faisal Akbar Portfolio",
    images: [
      {
        url: "/images/twitter-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Faisal Akbar - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Faisal Akbar - Software Engineer & Full Stack Developer",
    description:
      "Software Engineer based in New York City. Passionate about building high-quality web applications with React, Next.js, TypeScript, and modern technologies.",
    images: ["/images/twitter-banner.jpg"],
    creator: "@_faisal_akbar",
    site: "@_faisal_akbar",
  },
};

const personalData = {
  skills: [
    "JavaScript",
    "TypeScript",
    "React JS",
    "Next JS",
    "Node JS",
    "Express JS",
    "Redux",
    "React Query",
    "MongoDB",
    "Mongoose",
    "PostgreSQL",
    "Prisma",
    "Single Store",
    "Python",
    "Django",
    "Chrome Dev Tools",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Material UI",
    "CDN",
  ],
  experience: [
    {
      company: "CVS Health",
      position: "Full Stack Developer",
      summary:
        "Worked with various clients to build and maintain their web applications.",
      from: "2018-05-01",
      to: "2020-07-31",
    },
    {
      company: "Healthfirst",
      position: "Tableau Developer",
      summary: "Led a team of developers and worked on high-impact projects.",
      from: "2019-12-01",
      to: "2020-08-20",
    },
    {
      company: "Bank of America",
      position: "Software Engineer",
      summary:
        "Leading a team of developers and worked on high-impact projects.",
      from: "2020-09-01",
      to: "present",
    },
  ],
  education: [
    {
      institution: "The City College of New York",
      degree: "Masters in Information Systems",
    },
    {
      institution: "Shahjalal University of Science and Technology",
      degree: "Bachelor in Chemical Engineering",
    },
  ],
  certifications: [],
  resume:
    "https://www.dropbox.com/scl/fi/1y3tv3cmnc9nuwho512c4/Resume_Faisal_Akbar_2025.pdf?rlkey=31d6bdb52rctdbz6kb2dqt9vm&st=qbvadb9c&dl=0",
};

export { personalData, siteMetadata };
