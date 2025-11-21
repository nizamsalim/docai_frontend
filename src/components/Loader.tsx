import { useLoader, type LoaderContextType } from "../context/LoaderContext";

export function Loader() {
  const { isLoading } = useLoader() as LoaderContextType;
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-[9999]">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-slate-300 rounded-full opacity-25"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
export function StaticLoader() {
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-100 flex items-center justify-center z-[9999]">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-slate-300 rounded-full opacity-25"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
