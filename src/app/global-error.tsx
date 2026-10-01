"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-xl p-6">
          <ErrorState
            title="Something went wrong"
            description="An unexpected error occurred. Please try again."
          />
          <div className="mt-4">
            <Button onClick={reset}>Try again</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
