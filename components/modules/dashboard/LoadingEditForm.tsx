import { Card, CardContent } from "@/components/ui/card";

export default function LoadingEditForm() {
  return (
    <Card className="border shadow-lg shadow-primary/5">
      <CardContent className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-pulse">Loading editable data...</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
