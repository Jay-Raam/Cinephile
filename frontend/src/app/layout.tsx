import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "@/components/ui/navbar";
import BackTotop from "@/components/ui/BackToTop";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinephile - Explore the Movie World",
  description:
    "Discover and interact with a comprehensive database of movies. Stay updated with upcoming releases, reviews, and movie-related content.",
  keywords:
    "movies, film database, movie reviews, upcoming releases, film ratings, movie trailers, movie guide, cinema news",
  creator: "Jayasriraam",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
            <BackTotop />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
