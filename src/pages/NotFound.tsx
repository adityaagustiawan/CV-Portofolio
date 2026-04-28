import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-xs font-semibold uppercase tracking-wide text-white/60">404</div>
        <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-white/70">The page you’re looking for doesn’t exist.</p>
        <div className="mt-6">
          <Link to="/">
            <Button type="button" variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

