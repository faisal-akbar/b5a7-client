import { DashboardBlogCardGrid } from "@/components/modules/dashboard/DashboardBlogCardGrid";
import Information from "@/components/modules/Information";
import { getBlogs } from "@/services/Blog";

async function page() {
  const { data: blogs } = await getBlogs();

  if (!blogs || blogs.length === 0) {
    return <Information message="No blogs found." />;
  }
  return (
    <div>
      <DashboardBlogCardGrid blogs={blogs} columns={3} />
    </div>
  );
}

export default page;
