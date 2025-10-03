import EditBlogForm from "@/components/modules/dashboard/addBlog/EditBlogForm";
import { getBlogById } from "@/services/Blog";
import { notFound } from "next/navigation";

type PageProps = {
  params: { blogId: string };
};

export default async function EditBlogPage({ params }: PageProps) {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);

  console.log(blog);
  if (!blog || !blog.data) {
    return notFound();
  }

  return <EditBlogForm blog={blog.data} />;
}
