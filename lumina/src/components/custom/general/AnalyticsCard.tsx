"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function AnalyticsCard() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-muted-foreground">
        <div>
          <strong className="text-lg text-foreground block">5</strong>
          Live Viewers
        </div>
        <div>
          <strong className="text-lg text-foreground block">126</strong>
          Total Views
        </div>
        <div>
          <strong className="text-lg text-foreground block">3.4</strong>
          Avg. Resources Viewed
        </div>
        <div>
          <strong className="text-sm text-foreground block">
            May 15, 2025 – 2:41 PM
          </strong>
          Last Activity
        </div>
      </CardContent>

      <CardContent>
        <h4 className="text-sm font-semibold text-foreground">
          Current Viewers
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {/* Replace these with dynamic values later */}
          <li className="rounded bg-muted px-3 py-2">johndoe123</li>
          <li className="rounded bg-muted px-3 py-2">alex_dev</li>
          <li className="rounded bg-muted px-3 py-2">sarah_w</li>
          <li className="rounded bg-muted px-3 py-2">guest_user_87</li>
          <li className="rounded bg-muted px-3 py-2">tech_girl</li>
        </ul>
      </CardContent>
    </Card>
  );
}
