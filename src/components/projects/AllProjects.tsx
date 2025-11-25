import { FileText, PresentationIcon } from "lucide-react";
import type { Project } from "@/types/project.types";
import { useNavigate } from "react-router";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function AllProjects({ projects }: { projects: Project[] }) {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-6">All Projects</h3>

      <div className="bg-slate-900/50 border border-slate-800 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50">
                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Type
                </th>
                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Pages/Slides
                </th>
                <th className="text-left px-6 py-4 text-slate-300 font-semibold">
                  Last Accessed
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project.id}
                  className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer ${
                    index === projects.length - 1 ? "border-b-0" : ""
                  }`}
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {project.type === "pptx" ? (
                        <PresentationIcon
                          className="text-purple-400"
                          size={18}
                        />
                      ) : (
                        <FileText className="text-blue-400" size={18} />
                      )}
                      <span className="text-white font-medium">
                        {project.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300 uppercase text-sm tracking-wider">
                      {project.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300">
                      {project.sectionCount}{" "}
                      {project.type === "pptx" ? "slides" : "pages"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400">
                      {formatDate(project.createdAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllProjects;
