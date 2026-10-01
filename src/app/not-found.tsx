import Link from "next/link";
import { EmptyState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <EmptyState
        title="Page not found"
        description="The page you are looking for does not exist or was moved."
        action={
          <Link href="/">
            <Button>Back to dashboard</Button>
          </Link>
        }
      />
    </div>
  );
}
