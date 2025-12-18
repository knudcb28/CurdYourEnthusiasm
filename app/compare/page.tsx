import { Metadata } from "next";
import { Suspense } from "react";
import ComparePageClient from "./ComparePageClient";

export const metadata: Metadata = {
  title: "Compare Restaurants - Curd Your Enthusiasm",
  description:
    "Compare Madison restaurants side-by-side. See ratings, features, and details to help you decide where to eat.",
  openGraph: {
    title: "Compare Restaurants - Curd Your Enthusiasm",
    description: "Compare Madison restaurants side-by-side with detailed ratings.",
    type: "website",
  },
};

export default function ComparePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComparePageClient />
    </Suspense>
  );
}

