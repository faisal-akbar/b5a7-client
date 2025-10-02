import { DashboardBlogCardGrid } from "@/components/modules/dashboard/DashboardBlogCardGrid";

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    next: {
      tags: ["blogs", "blog_post"],
    },
  });
  const { data: blogs } = await res.json();
  return (
    <div>
      <DashboardBlogCardGrid blogs={blogs} columns={3} />
    </div>
  );
}

export default page;
