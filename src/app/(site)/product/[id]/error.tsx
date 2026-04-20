"use client";

import { useEffect } from "react";

export default function ProductError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.3em] text-red-500">
        Product Error
      </p>
      <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-white">
        The product details could not be loaded.
      </h1>
      <p className="mb-8 text-slate-500 dark:text-slate-400">
        Please try again. If the issue persists, check the product data in Firestore.
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
      >
        Try again
      </button>
    </div>
  );
}
