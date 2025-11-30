import { useEffect, useState } from "react";
import "@/styles/project.css";
import { CheckIcon, DownloadIcon, EditIcon } from "lucide-react";
import { Link } from "react-router";
import ProjectService from "@/api/project";
import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import { StaticLoader } from "../common/Loader";
import { generateWord } from "@/utils/generateWord";
import { useAlert, type AlertContextType } from "@/context/AlertContext";
import type { APIError } from "@/types/api.types";

export default function TitleBar() {
  const { project, setCurrentProject } = useSectionData() as SectionContextType;
  const { showAlert } = useAlert() as AlertContextType;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    if (project) setEditedTitle(project.title);
  }, [project]);

  if (!project) return <StaticLoader isVisible={true} />;

  const handleEditClick = () => {
    setIsEditingTitle(true);
  };

  const handleSaveClick = async () => {
    // ProjectService.saveTitle
    try {
      const res = await ProjectService.updateProject(project!.id, {
        title: editedTitle,
      });
      setCurrentProject(res.project);
      setIsEditingTitle(false);
    } catch (error) {
      showAlert((error as Partial<APIError>).message);
    }
  };

  const handleDownload = () => {
    console.log("Download project");
    generateWord({ title: project.title, sections: project.sections! });
    // Logic will be handled by parent
  };

  return (
    <nav className="navbar">
      <Link to="/projects" className="logo">
        📄 DocAI
      </Link>

      <div className="project-title-section">
        {isEditingTitle ? (
          <input
            type="text"
            className="project-title-input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h1 className="project-title">{project!.title}</h1>
        )}

        <button
          className="icon-btn"
          onClick={isEditingTitle ? handleSaveClick : handleEditClick}
          title={isEditingTitle ? "Save title" : "Edit title"}
        >
          {isEditingTitle ? <CheckIcon /> : <EditIcon />}
        </button>

        <span className="project-type">{project!.type}</span>
      </div>

      <button className="download-btn" onClick={handleDownload}>
        <span>
          <DownloadIcon />
        </span>
        Download
      </button>
    </nav>
  );
}
