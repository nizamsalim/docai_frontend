import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";
import { marked } from "marked";
import { useEffect, useState } from "react";

export default function RevisionModal() {
  const { refinement, setCurrentRefinement } =
    useSectionData() as SectionContextType;

  const [rating, setRating] = useState("");
  useEffect(() => {
    if (refinement) {
      setRating(refinement.rating!);
    }
  }, [refinement]);

  if (!refinement) return null;

  const { prompt, beforeContent, afterContent } = refinement;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* Outer container allows whole modal to scroll if needed */}
      <div className="max-h-[100vh] w-full max-w-5xl px-4 py-8 overflow-y-hidden">
        {/* Modal panel */}
        <div className="relative rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl p-6 sm:p-8">
          {/* Close button */}
          <button
            onClick={() => {
              setCurrentRefinement();
            }}
            className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Revision Details
            </h2>

            {/* Rating controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 uppercase tracking-wide">
                Rating
              </span>
              <div
                className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-900/70 text-slate-400 transition-colors ${
                  rating === "like"
                    ? "border-emerald-500/80 text-emerald-400 bg-emerald-500/10"
                    : "border-slate-700/70"
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
              </div>
              <div
                className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-900/70 text-slate-400 transition-colors ${
                  rating === "dislike"
                    ? "border-red-500/80 text-red-400 bg-red-500/10"
                    : "border-slate-700/70 "
                }`}
              >
                <ThumbsDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Prompt */}
          <div className="mb-4">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
              User Prompt
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-200 whitespace-pre-wrap">
              {prompt}
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
              {/* Before */}
              <div className="flex flex-col max-h-[60vh] border-b md:border-b-0 md:border-r border-slate-800">
                <div className="px-4 py-3 border-b border-slate-800">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Before
                  </span>
                </div>
                <div className="px-4 py-3 overflow-y-auto">
                  <div
                    className="markdown-preview prose prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(beforeContent),
                    }}
                  />
                </div>
              </div>

              {/* After */}
              <div className="flex flex-col max-h-[60vh]">
                <div className="px-4 py-3 border-b border-slate-800">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    After
                  </span>
                </div>
                <div className="px-4 py-3 overflow-y-auto">
                  <div
                    className="markdown-preview prose prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(afterContent),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer (optional) */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setCurrentRefinement()}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-100 text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
