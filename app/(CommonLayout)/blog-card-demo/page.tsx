import { BlogCardGridExample } from "@/components/modules/BlogCardGrid";

export default function BlogCardDemoPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog Card Demo</h1>
          <p className="text-muted-foreground text-lg">
            Beautiful blog card component using shadcn/ui with equal heights
          </p>
        </div>

        <BlogCardGridExample />
      </div>
    </div>
  );
}
