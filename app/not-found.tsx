import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          Error 404
        </p>
        <h1 className="text-7xl md:text-9xl font-display font-bold text-neutral-100 mb-2 select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-5 -mt-4 relative z-10">
          Page Not Found
        </h2>
        <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary px-8 py-3">
            Go Home
          </Link>
          <Link href="/contact-us" className="btn-outline px-8 py-3">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
