import { personalData, siteMetadata } from "@/app/siteMetaData";
import ContactForm from "@/components/modules/ContactForm";
import { Container } from "@/components/modules/Container";
import { Timeline } from "@/components/modules/timeline";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Faisal Akbar, a dedicated Software Engineer based in New York City. Discover my passion for coding, technical skills, professional experience, and favorite books. Get in touch for opportunities and collaborations.",
  openGraph: {
    title: "About Faisal Akbar - Software Engineer & Full Stack Developer",
    description:
      "Learn more about Faisal Akbar, a dedicated Software Engineer based in New York City. Discover my passion for coding, technical skills, professional experience, and favorite books.",
    url: `${siteMetadata.siteUrl}/about`,
    siteName: siteMetadata.openGraph.siteName,
    images: [
      {
        url: `${siteMetadata.siteUrl}/images/twitter-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "About Faisal Akbar - Software Engineer Portfolio",
      },
    ],
    locale: siteMetadata.openGraph.locale,
    type: "profile" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "About Faisal Akbar - Software Engineer & Full Stack Developer",
    description:
      "Learn more about Faisal Akbar, a dedicated Software Engineer based in New York City. Discover my passion for coding, technical skills, and professional experience.",
    images: [`${siteMetadata.siteUrl}/images/twitter-banner.jpg`],
    creator: siteMetadata.twitter.creator,
    site: siteMetadata.twitter.site,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/about`,
  },
};

export default async function AboutPage() {
  return (
    <Container className="mt-10 px-3">
      <article>
        <div className="space-y-15">
          <header>
            <div className="mb-10 space-y-2">
              {/* Title */}
              <div>
                <h1 className="mb-5 font-extrabold leading-9 tracking-tight text-gray-900 text-3xl dark:text-gray-100 sm:leading-10 sm:text-4xl md:leading-14 md:text-5xl">
                  About Me
                </h1>
              </div>
              <p className="text-left  tracking-tight md:text-zinc-600 dark:text-zinc-400 text-xl mr-3">
                Hi, I&#39;m {siteMetadata.author} As a dedicated software
                engineer, I specialize in creating sophisticated solutions for
                challenging technical problems. My full-stack development
                expertise drives me to build impactful, user-focused
                applications that create meaningful value.
              </p>

              {/* <hr className="border-gray-200 dark:border-gray-700" /> */}
            </div>
          </header>
          <div>
            <Timeline />
          </div>

          <div>
            {/* Skills */}
            {personalData.skills.length > 0 && (
              <div>
                <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
                  Skills
                </h2>
                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="max-w-7xl mx-auto mt-10 flex flex-wrap gap-3">
                  {personalData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-lg px-3 py-1.5 hover:bg-secondary/80 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* My Passion as a Coder */}
          <div>
            <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
              My Passion as a Coder
            </h2>
            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="mt-6">
              <blockquote className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-xl italic border-l-4 border-blue-500 pl-6">
                &#34;Today i am gonna write a piece of code that will solve a
                problem and will affect millions of life, is what gets me
                started for the day.&#34;
              </blockquote>
            </div>
          </div>

          {/* Some things about me */}
          <div>
            <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
              Some things about me
            </h2>
            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="mt-6 space-y-4">
              <p className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-xl">
                I love learning new things, therefore I had worked on large set
                of fields. I love creating new things and find solutions to real
                life problems. I am passionate to solve problems using novel
                ideas and iterate quickly on my ideas to optimize it for
                scalability.
              </p>

              <p className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-xl">
                I also improve myself everyday, optimizing my work flow in every
                step of my life. I like things clean and organized.
              </p>

              <p className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-xl">
                And I am fun to be with :D
              </p>
            </div>
          </div>

          {/* Favorite Books */}
          <div>
            <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
              Favorite Books
            </h2>
            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="mt-6">
              <ul className="space-y-3">
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>
                    Storytelling with Data: A Data Visualization Guide for
                    Business Professionals
                  </strong>{" "}
                  --- Cole Nussbaumer Knaflic
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>Storytelling with Data: Let&#39;s Practice!</strong>{" "}
                  --- Cole Nussbaumer Knaflic
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>
                    The Big Book of Dashboards: Visualizing Your Data Using
                    Real-World Business Scenarios
                  </strong>{" "}
                  --- Steve Wexler, Jeffrey Shaffer, Andy Cotgreave
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>Visual Analytics with Tableau</strong> --- Alexander
                  Loth
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>
                    Practical Tableau: 100 Tips, Tutorials, and Strategies from
                    a Tableau Zen Master
                  </strong>{" "}
                  --- Ryan Sleeper
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>
                    Innovative Tableau: 100 More Tips, Tutorials, and Strategies
                  </strong>{" "}
                  --- Ryan Sleeper
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>
                    Functional Art, The: An introduction to information graphics
                    and visualization
                  </strong>{" "}
                  --- Alberto Cairo
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>Learning Shiny</strong> --- Hernan G. Resnizky
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>Business Statistics 2nd Edition</strong> --- Sharpe,
                  Norean D., De Veaux, Richard D., Velleman, Paul
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>
                    Python for Data Analysis: Data Wrangling with Pandas, NumPy,
                    and IPython
                  </strong>{" "}
                  --- Wes McKinney
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>
                    Practical Statistics for Data Scientists: 50 Essential
                    Concepts
                  </strong>{" "}
                  --- Peter Bruce , Andrew Bruce
                </li>
                <li className="text-left tracking-tight md:text-zinc-600 dark:text-zinc-400 text-lg">
                  <strong>
                    Hadoop: The Definitive Guide: Storage and Analysis at
                    Internet Scale
                  </strong>{" "}
                  --- Tom White
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-4xl">
              Get In Touch
            </h2>
            <hr className="border-gray-200 dark:border-gray-700" />
            <p className="my-6 text-zinc-600 text-base dark:text-zinc-300">
              I&apos;m always interested in hearing about new opportunities and
              interesting projects. Feel free to reach out if you&apos;d like to
              connect!
            </p>

            <div className="max-w-4xl mx-auto mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </article>
    </Container>
  );
}
