import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <h1 data-testid="home-title" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          ExpenseTrail
        </h1>
        <p className="text-lg text-muted-foreground">
          Track what was spent, how much, on which category, and when. Star your most important expenses
          and view live category breakdowns at a glance.
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
            <CardTitle className="text-xl">Track spending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Log every expense with title, precise amount, date, and optional notes to never lose track of your daily costs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sort into categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Organize your spending into Food, Transport, Bills, Shopping, and Other to filter and analyze effortlessly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">See where it goes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Live automated summary and category breakdown show you exactly where your money flows in real time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
