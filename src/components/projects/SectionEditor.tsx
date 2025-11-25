import { useEffect, useState } from "react";
import { marked } from "marked";
import "@/styles/project.css";
import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import { CheckIcon, EditIcon, SaveIcon } from "lucide-react";
import SectionService from "@/api/section";
import { useLoader, type LoaderContextType } from "@/context/LoaderContext";

export default function SectionEditor() {
  const { section, setCurrentSection } = useSectionData() as SectionContextType;
  const { setLoading } = useLoader() as LoaderContextType;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(section?.title || "");
  const [content, setContent] = useState(section?.content || "");
  const [mode, setMode] = useState("code"); // 'code' or 'preview'

  useEffect(() => {
    if (section) {
      setEditedTitle(section.title);
      setContent(section.content);
    }
  }, [section]);

  useEffect(() => {
    return () => {
      setIsEditingTitle(false);
    };
  }, []);

  const handleEditTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitleClick = async () => {
    const res = await SectionService.updateSection(section?.id as string, {
      title: editedTitle,
    });
    setCurrentSection(res.section, "title");
    setIsEditingTitle(false);
  };

  const handleSaveContent = async () => {
    setLoading(true, "Saving content");
    const res = await SectionService.updateSection(section?.id as string, {
      content: content,
    });
    setCurrentSection(res.section, "content");
    setLoading(false);
  };

  if (!section) {
    return (
      <div className="section-editor">
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-text">
            Select a section to start editing
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-editor">
      <div className="editor-header">
        <div className="editor-title-section">
          {isEditingTitle ? (
            <input
              type="text"
              className="editor-section-input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              autoFocus
            />
          ) : (
            <h2 className="editor-section-title">{section.title}</h2>
          )}

          <button
            className="icon-btn"
            onClick={
              isEditingTitle ? handleSaveTitleClick : handleEditTitleClick
            }
            title={isEditingTitle ? "Save title" : "Edit title"}
          >
            {isEditingTitle ? <CheckIcon /> : <EditIcon />}
          </button>
        </div>
      </div>

      <div className="editor-controls">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${mode === "code" ? "active" : ""}`}
            onClick={() => setMode("code")}
          >
            Code
          </button>
          <button
            className={`mode-btn ${mode === "preview" ? "active" : ""}`}
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
        </div>

        <button className="save-btn" onClick={handleSaveContent}>
          <SaveIcon />
        </button>
      </div>

      <div className="editor-content">
        {mode === "code" ? (
          <textarea
            className="markdown-editor"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your markdown content here..."
          />
        ) : (
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={{
              __html: marked.parse(content),
            }}
          />
        )}
      </div>
    </div>
  );
}
