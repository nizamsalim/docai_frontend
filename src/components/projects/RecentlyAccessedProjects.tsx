import { ArrowRight, Calendar, FileText, PresentationIcon } from "lucide-react";
import type { Project } from "@/types/project.types";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function RecentlyAccessedProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="mb-16">
      <h3 className="text-xl font-semibold text-white mb-6">
        Recently Accessed
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {project.type === "pptx" ? (
                  <PresentationIcon className="text-purple-400" size={24} />
                ) : (
                  <FileText className="text-blue-400" size={24} />
                )}
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">
                    {project.type === "pptx" ? "Presentation" : "Document"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {project.sectionCount}{" "}
                    {project.type === "pptx" ? "slides" : "pages"}
                  </p>
                </div>
              </div>
              <ArrowRight
                className="text-slate-600 group-hover:text-blue-400 transition-colors"
                size={20}
              />
            </div>
            <h4 className="text-white font-semibold mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
              {project.title}
            </h4>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Calendar size={16} />
              <span>{formatDate(project.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyAccessedProjects;
