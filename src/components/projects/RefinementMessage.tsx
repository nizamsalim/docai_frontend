import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import type { Refinement } from "@/types/section.types";
import { InfoIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";

export default function RefinementMessage({
  refinement,
  handleRateRefinement,
}: {
  refinement: Refinement;
  handleRateRefinement: (refinementId: string, rating: string) => Promise<void>;
}) {
  const [_, setHovered] = useState(false);
  const { setCurrentRefinement } = useSectionData() as SectionContextType;
  return (
    <div
      className={`relative group flex items-start ${"justify-end"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Info icon on hover, left side */}
      <div className="mr-2 flex-shrink-0">
        <button
          onClick={() => {
            setCurrentRefinement(refinement);
          }}
          className="bg-slate-800 text-blue-500 rounded-full p-1 hover:bg-blue-700 transition"
          title="Show revision details"
        >
          <InfoIcon />
        </button>
      </div>
      <div className={`message user`}>
        {refinement.prompt}
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={() => handleRateRefinement(refinement.id, "like")}
            className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-900/70 text-slate-400 transition-colors ${
              refinement.rating === "like"
                ? "border-emerald-500/80 text-emerald-400 bg-emerald-500/10"
                : "border-slate-700/70 hover:border-emerald-500/70 hover:bg-emerald-500/10 hover:text-emerald-400"
            }`}
          >
            <ThumbsUpIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => handleRateRefinement(refinement.id, "dislike")}
            className={`group relative inline-flex h-8 w-8 items-center justify-center rounded-full border bg-slate-900/70 text-slate-400 transition-colors ${
              refinement.rating === "dislike"
                ? "border-red-500/80 text-red-400 bg-red-500/10"
                : "border-slate-700/70 hover:border-red-500/70 hover:bg-red-500/10 hover:text-red-400"
            }`}
          >
            <ThumbsDownIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
