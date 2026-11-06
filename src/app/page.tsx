import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <h1 data-testid="home-title" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          ReadLog
        </h1>
        <p className="text-lg text-muted-foreground">
          Track what book was read, how many minutes, on which genre, and when. Mark your favorite reading
          sessions and view a live summary of minutes read by genre at a glance.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/register" passHref legacyBehavior>
            <Button size="lg" asChild>
              <a>Get Started</a>
            </Button>
          </Link>
          <Link href="/login" passHref legacyBehavior>
            <Button variant="outline" size="lg" asChild>
              <a>Login</a>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Log every session</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Record each reading session with book title, minutes read, date, and optional notes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sort by genre</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Organize your reading habits into Fiction, Non-Fiction, Sci-Fi, Biography, and Other.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">See minutes read</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Live automated summary shows your total reading minutes and breakdown by genre instantly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
