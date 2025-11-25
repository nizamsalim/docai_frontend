import { useLoaderData, useNavigate } from "react-router";
import type { Project } from "@/types/project.types";
import AllProjects from "@/components/projects/AllProjects";
import { Plus } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const { projects } = useLoaderData() as { projects: Project[] };
  console.log(projects);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-white"
            onClick={() => navigate("/")}
          >
            DocAI
          </h1>
          <button
            onClick={() => {
              /* Navigate to create project - user will implement */
              navigate("/projects/new");
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            New Project
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Your Projects</h2>
          <p className="text-slate-400">
            Manage and access all your AI-generated documents and presentations
          </p>
        </div>

        {projects.length === 0 ? (
          <h2 className="text-white text-center text-2xl font-semibold">
            No projects found
          </h2>
        ) : (
          <>
            {/* <RecentlyAccessedProjects projects={[projects[0]]} /> */}

            <AllProjects projects={projects} />
          </>
        )}
      </div>
    </div>
  );
}
