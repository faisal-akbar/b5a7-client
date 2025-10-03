import { DashboardBlogCardGrid } from "@/components/modules/dashboard/DashboardBlogCardGrid";
import Information from "@/components/modules/Information";

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
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
