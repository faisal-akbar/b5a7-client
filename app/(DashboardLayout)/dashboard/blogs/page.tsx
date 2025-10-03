import { DashboardBlogCardGrid } from "@/components/modules/dashboard/DashboardBlogCardGrid";
import Information from "@/components/modules/Information";
import config from "@/config";

async function page() {
  const res = await fetch(`${config.baseUrl}/blog`, {
    next: {
      tags: ["blogs"],
    },
  });
  const { data: blogs } = await res.json();

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
