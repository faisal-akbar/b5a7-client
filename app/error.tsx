"use client";

import { Container } from "@/components/modules/Container";
import { Heading } from "@/components/modules/Heading";
import { SubHeading } from "@/components/modules/SubHeading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Container className="max-w-2xl">
        <Card className="text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <Heading className="text-2xl md:text-3xl">
                Oops! Something went wrong
              </Heading>
              <SubHeading className="text-base">
                We encountered an unexpected error. Don&apos;t worry, it&apos;s
                not your fault.
              </SubHeading>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {process.env.NODE_ENV === "development" && (
              <div className="text-left">
                <SubHeading className="text-sm font-medium mb-2 text-destructive">
                  Error Details (Development Only):
                </SubHeading>
                <div className="bg-muted p-4 rounded-lg border">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
                    {error.message}
                  </pre>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset} className="flex-1 sm:flex-none">
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="flex-1 sm:flex-none"
              >
                Go Home
              </Button>
            </div>

            <div className="text-center">
              <SubHeading className="text-xs text-muted-foreground">
                If this problem persists, please contact support.
              </SubHeading>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
