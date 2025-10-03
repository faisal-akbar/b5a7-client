import { BlogCardGrid } from "@/components/modules/BlogCardGrid";
import { Container } from "@/components/modules/Container";
import { Heading } from "@/components/modules/Heading";
import Information from "@/components/modules/Information";
import { getBlogs } from "@/services/Blog";

export default async function BlogPage() {
  const { data: blogs } = await getBlogs();

  return (
    <Container className="mt-10 px-3">
      <div className="space-y-6">
        <Heading className="text-left font-bold tracking-tight text-zinc-800 text-4xl  dark:text-zinc-100 sm:text-3xl mr-3">
          Faisal Akbar
        </Heading>
        <p className="text-left  tracking-tight md:text-zinc-600 dark:text-zinc-400 text-3xl mr-3">
          A collection of thoughts, inspiration, mistakes, and other long-form
          minutia I've written.
        </p>

        <div>
          <hr className="border-gray-200 dark:border-gray-700" />
          {!blogs.length && <Information message="No blogs found." />}

          <div className="max-w-7xl mx-auto mt-10">
            <BlogCardGrid blogs={blogs} columns={3} />
          </div>
        </div>
      </div>
    </Container>
  );
}
