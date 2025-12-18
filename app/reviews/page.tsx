import { Metadata } from "next";
import ReviewsPageClient from "./ReviewsPageClient";

export const metadata: Metadata = {
  title: "Reviews - Curd Your Enthusiasm",
  description:
    "Browse Madison, WI restaurant reviews with map and list views. Filter by cuisine, neighborhood, price, and more. Honest reviews rated on a cheese curd scale.",
  openGraph: {
    title: "Reviews - Curd Your Enthusiasm",
    description: "Browse Madison restaurant reviews with interactive map and advanced filters.",
    type: "website",
  },
};

export default function ReviewsPage() {
  return <ReviewsPageClient />;
}
