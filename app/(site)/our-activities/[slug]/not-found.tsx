import Link from "next/link";

export default function EventNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          404 — Not Found
        </p>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-5">
          Event Not Found
        </h1>
        <p className="text-neutral-500 mb-8 max-w-sm mx-auto leading-relaxed">
          This event may have been removed or the URL is incorrect.
        </p>
        <Link href="/our-activities" className="btn-primary">
          Back to Our Activities
        </Link>
      </div>
    </div>
  );
}
