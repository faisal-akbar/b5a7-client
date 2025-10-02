import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAbout } from "@/services/About";
import { Download, Edit, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AboutPage() {
  const about = await getAbout();

  // If no about data exists, show add button
  if (!about || !about.data) {
    return (
      <div className="space-y-8">
        <Card className="border shadow-lg shadow-primary/5">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">About Me</CardTitle>
              </div>
              <Link href="/dashboard/about/edit">
                <Button className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Add About
                </Button>
              </Link>
            </div>
            <CardDescription className="text-base">
              No about information found. Click &quot;Add About&quot; to get
              started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No about information available</p>
                <p className="text-sm">
                  Create your professional profile to get started
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const aboutData = about.data;

  return (
    <div className="space-y-8">
      {/* Read-only view */}
      <Card className="border shadow-lg shadow-primary/5">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">About Me</CardTitle>
            </div>
            <Link href="/dashboard/about/edit">
              <Button className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
          </div>
          <CardDescription className="text-base">
            Personal and professional information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Image and Title */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {aboutData.thumbnail && (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={aboutData.thumbnail}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{aboutData.title}</h2>
              </div>
              {aboutData.resume && (
                <div>
                  <a
                    href={aboutData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {aboutData.skills && aboutData.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: aboutData.content }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
