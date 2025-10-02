import { BlogCardGrid } from "@/components/modules/BlogCardGrid";
import { Container } from "@/components/modules/Container";
import { Flipper } from "@/components/modules/flipper";
import { Heading } from "@/components/modules/Heading";
import GithubIcon from "@/icons/github-icon";
import LinkedinIcon from "@/icons/linkedin-icon";
import TwitterIcon from "@/icons/twitter-icon";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    next: {
      tags: ["BLOGS"],
    },
  });
  const { data: blogs } = await res.json();
  console.log(blogs);
  return (
    <Container className="mt-10 px-3">
      <div className="space-y-11">
        <div className="space-y-9">
          <Image
            src="/images/faisal-akbar.jpg"
            alt=""
            sizes="4rem"
            width={500}
            height={500}
            quality={100}
            className="h-28 w-28 rounded-full bg-zinc-100
                            object-cover dark:bg-zinc-800"
            priority
          />
          <div>
            <div className="max-w-5xl">
              {/* <h1 className="font-bold tracking-tight text-zinc-800 text-4xl  dark:text-zinc-100 sm:text-5xl">
                Code. Problem-Solving. Building.
              </h1> */}
              <div className="flex flex-col sm:flex-row sm:items-center">
                <Heading className="font-bold tracking-tight text-zinc-800 text-4xl  dark:text-zinc-100 sm:text-5xl mr-3">
                  Faisal Akbar
                </Heading>
                <Flipper />
              </div>
              <p className="mt-6 text-zinc-600 text-base dark:text-zinc-300">
                I’m Faisal Akbar, Software Engineer based in New York City.
                Passionate, curious, and with zest and problem-solving skills,
                always looking to deliver high-quality products.
                <span className="mt-3 block">
                  Find out more{" "}
                  <Link
                    href="/about"
                    className="underline decoration-wavy underline-offset-1 hover:text-blue-900 dark:hover:text-blue-400"
                  >
                    about me
                  </Link>
                  .
                </span>
              </p>
              <div className="mt-6 flex gap-6">
                <SocialLink
                  href="https://www.linkedin.com/in/md-faisal-akbar/"
                  aria-label="Follow on Instagram"
                  icon={LinkedinIcon}
                />
                <SocialLink
                  href="https://github.com/faisal-akbar"
                  aria-label="Follow on GitHub"
                  icon={GithubIcon}
                />
                <SocialLink
                  href="https://twitter.com/_faisal_akbar"
                  aria-label="Follow on LinkedIn"
                  icon={TwitterIcon}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="flex pb-4 font-bold tracking-tight text-neutral-900 text-3xl dark:text-neutral-100 sm:text-3xl md:text-5xl">
            Featured Posts
          </h2>
          <hr className="border-gray-200 dark:border-gray-700" />
          {!blogs.length && <div className="mt-6">No blogs found.</div>}

          <div className="max-w-7xl mx-auto mt-7">
            <BlogCardGrid blogs={blogs} columns={3} />
          </div>
        </div>
      </div>
    </Container>
  );
}

function SocialLink({
  icon: Icon,
  href,
  ...props
}: {
  icon: any;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} className="group -m-1 p-1" {...props}>
      <Icon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}
