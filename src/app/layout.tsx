import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LearningProvider } from "@/context/LearningContext";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "CloudTrack - AWS Next.js Deployment Dashboard",
  description:
    "A production-style learning dashboard to master Next.js static deployment on Amazon S3 and CloudFront.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <ThemeProvider>
          <LearningProvider>
            <AppShell>{children}</AppShell>
          </LearningProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
