import { useState } from "react";
import {
  Plus,
  Trash2,
  ChevronRight,
  Wand2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { SectionInput } from "@/types/project.types";
import ProjectService from "@/api/project";
import {
  AlertType,
  useAlert,
  type AlertContextType,
} from "@/context/AlertContext";
import { useLoader, type LoaderContextType } from "@/context/LoaderContext";
import { useNavigate } from "react-router";

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const [projectType, setProjectType] = useState<"pptx" | "docx" | null>(
    "docx"
  );
  const [projectTitle, setProjectTitle] = useState(
    "Advent of EV industry in India"
  );
  const [sections, setSections] = useState<SectionInput[]>([
    { order: 0, title: "Introduction" },
    { order: 1, title: "Current EV scenario in India" },
    { order: 2, title: "Potential of EVs in Indian market" },
    { order: 3, title: "Conclusion" },
  ]);

  const { showAlert } = useAlert() as AlertContextType;
  const { setLoading } = useLoader() as LoaderContextType;

  const uiFunctions = {
    handleAddSection: () => {
      const newIndex =
        sections.length > 0 ? Math.max(...sections.map((s) => s.order)) + 1 : 0;
      setSections([...sections, { order: newIndex, title: "" }]);
    },
    handleSectionTitleChange: (order: number, newTitle: string) => {
      setSections(
        sections.map((s) => (s.order === order ? { ...s, title: newTitle } : s))
      );
    },
    handleDeleteSection: (order: number) => {
      const filtered = sections.filter((s) => s.order !== order);
      // Re-index all remaining sections
      const reindexed = filtered.map((s, idx) => ({ ...s, order: idx }));
      setSections(reindexed);
    },
    handleMoveUp: (index: number) => {
      if (index === 0) return;
      const newSections = [...sections];
      [newSections[index - 1], newSections[index]] = [
        newSections[index],
        newSections[index - 1],
      ];
      // Re-index after swap
      const reindexed = newSections.map((s, idx) => ({ ...s, index: idx }));
      setSections(reindexed);
    },
    handleMoveDown: (index: number) => {
      if (index === sections.length - 1) return;
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [
        newSections[index + 1],
        newSections[index],
      ];
      // Re-index after swap
      const reindexed = newSections.map((s, idx) => ({ ...s, index: idx }));
      setSections(reindexed);
    },
  };

  const handleSubmit = async () => {
    setLoading(
      true,
      "Creating project & Generating content\nThis may take a while\nPlease wait"
    );
    // const formattedData = {
    //   title: projectTitle,
    //   type: projectType as "pptx" | "docx",
    //   sections: sections.map((s) => ({ order: s.order, title: s.title })),
    // };
    // const res = await ProjectService.createProject(formattedData);
    // if (!res.success) {
    //   showAlert({ title: res.message, type: AlertType.DANGER });
    //   return;
    // }
    // console.log(res);
    setLoading(false);

    // User will implement handleSubmit logic
  };

  const isFormValid = projectType && projectTitle.trim() && sections.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-y-auto">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">DocAI</h1>
          <button
            onClick={() => {
              /* Navigate back - user will implement */
              navigate(-1);
            }}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">
            Create New Project
          </h2>
          <p className="text-slate-400">
            Set up your document or presentation and define sections/slides
          </p>
        </div>

        {/* Type Selection */}
        {!projectType ? (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-white mb-6">
              Choose Project Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setProjectType("pptx")}
                className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 hover:border-purple-500 hover:from-slate-800/80 hover:to-slate-900/80 transition-all text-left"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Presentation (PPTX)
                </h4>
                <p className="text-slate-400">
                  Create a slide-based presentation with images and animations
                </p>
              </button>

              <button
                onClick={() => setProjectType("docx")}
                className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 hover:border-blue-500 hover:from-slate-800/80 hover:to-slate-900/80 transition-all text-left"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  📄
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Document (DOCX)
                </h4>
                <p className="text-slate-400">
                  Create a formatted document with sections and content
                </p>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Project Details */}
            <div className="mb-12 bg-slate-900/50 border border-slate-800 rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Project Details
                </h3>
                <button
                  onClick={() => {
                    setProjectType(null);
                    setProjectTitle("");
                    setSections([]);
                  }}
                  className="text-slate-400 hover:text-white text-sm"
                >
                  Change Type
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-slate-300 font-medium mb-3">
                  {projectType === "pptx" ? "Presentation" : "Document"} Title
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Enter project title..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="text-sm text-slate-400">
                Type:{" "}
                <span className="text-slate-300 font-medium uppercase">
                  {projectType}
                </span>
              </div>
            </div>

            {/* Sections */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {projectType === "pptx" ? "Slides" : "Sections"}
                </h3>
                <button
                  onClick={() => {
                    /* User will implement AI generation logic */
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all"
                >
                  <Wand2 size={18} />
                  Generate with AI
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {sections.length === 0 ? (
                  <div className="bg-slate-900/30 border border-dashed border-slate-700 rounded-lg p-8 text-center">
                    <p className="text-slate-400">
                      No {projectType === "pptx" ? "slides" : "sections"} added
                      yet
                    </p>
                  </div>
                ) : (
                  sections.map((section, sectionIndex) => (
                    <div
                      key={section.order}
                      className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 flex items-center gap-4 group hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-800 text-slate-400 font-medium text-sm">
                        {section.order + 1}
                      </div>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) =>
                          uiFunctions.handleSectionTitleChange(
                            section.order,
                            e.target.value
                          )
                        }
                        placeholder={`${
                          projectType === "pptx" ? "Slide" : "Section"
                        } title...`}
                        className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none"
                      />
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={() => uiFunctions.handleMoveUp(sectionIndex)}
                          disabled={sectionIndex === 0}
                          className="p-2 text-slate-400 hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          title="Move up"
                        >
                          <ChevronUp size={18} />
                        </button>
                        <button
                          onClick={() =>
                            uiFunctions.handleMoveDown(sectionIndex)
                          }
                          disabled={sectionIndex === sections.length - 1}
                          className="p-2 text-slate-400 hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          title="Move down"
                        >
                          <ChevronDown size={18} />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          uiFunctions.handleDeleteSection(section.order)
                        }
                        className="p-2 text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={uiFunctions.handleAddSection}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-dashed border-slate-700 hover:border-slate-600 rounded-lg py-3 text-slate-300 hover:text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add {projectType === "pptx" ? "Slide" : "Section"}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setProjectType(null);
                  setProjectTitle("");
                  setSections([]);
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                Create Project
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
