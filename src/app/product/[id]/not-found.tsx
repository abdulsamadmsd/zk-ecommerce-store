import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-blue-600">
        Product Not Found
      </p>
      <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-white">
        This product is no longer available.
      </h1>
      <p className="mb-8 text-slate-500 dark:text-slate-400">
        The product may have been removed or the link may be incorrect.
      </p>
      <Link
        href="/"
        className="rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
      >
        Back to store
      </Link>
    </div>
  );
}
