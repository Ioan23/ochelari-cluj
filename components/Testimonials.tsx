import Link from "next/link";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/lib/reviews-data";

const featuredReviews = reviews
  .filter((review) => review.status === "aprobata")
  .sort((a, b) => {
    if (!!b.photoEmoji !== !!a.photoEmoji) {
      return b.photoEmoji ? 1 : -1;
    }
    return b.rating - a.rating;
  })
  .slice(0, 3);

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="container-padded">
        <div className="text-center">
          <h2 className="section-heading">Ce Spun Clienții Noștri</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featuredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/recenzii" className="btn-secondary">
            Vezi Toate Recenziile
          </Link>
        </div>
      </div>
    </section>
  );
}
