import { useEffect, useState } from "react";
import { marked } from "marked";
import "@/styles/project.css";
import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import { CheckIcon, EditIcon, MessageCircleIcon, SaveIcon } from "lucide-react";
import SectionService from "@/api/section";
import { useLoader, type LoaderContextType } from "@/context/LoaderContext";
import { Oval } from "react-loader-spinner";
import { StaticLoader } from "../common/Loader";
import Comments from "./Comments";
import type { APIError } from "@/types/api.types";
import { useAlert, type AlertContextType } from "@/context/AlertContext";

export default function SectionEditor() {
  const { section, setCurrentSection, setComments } =
    useSectionData() as SectionContextType;
  const { setLoading } = useLoader() as LoaderContextType;
  const { showAlert } = useAlert() as AlertContextType;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [content, setContent] = useState("");
  const [mode, setMode] = useState("code"); // 'code' or 'preview'
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (section) {
      setEditedTitle(section.title);
      setContent(section.content);
      setComments(section.comments!);
    }
  }, [section]);

  if (!section) return <StaticLoader isVisible={true} />;

  const handleEditTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitleClick = async () => {
    setIsSaving(true);
    try {
      const res = await SectionService.updateSection(section?.id as string, {
        title: editedTitle,
      });

      setCurrentSection(res.section, "title");
    } catch (error) {
      showAlert((error as Partial<APIError>).message);
    }
    setIsEditingTitle(false);
    setIsSaving(false);
  };

  const handleSaveContent = async () => {
    setLoading(true, "Saving content");
    try {
      const res = await SectionService.updateSection(section?.id as string, {
        content: content,
      });
      setCurrentSection(res.section, "content");
    } catch (error) {
      showAlert((error as Partial<APIError>).message);
    }
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
            {isEditingTitle ? (
              isSaving ? (
                <Oval visible={true} height={25} width={25} strokeWidth={5} />
              ) : (
                <CheckIcon />
              )
            ) : (
              <EditIcon />
            )}
          </button>
        </div>
        <button
          className="icon-btn"
          onClick={() => {
            setIsCommentsOpen(true);
          }}
          title="View comments"
        >
          Comments <MessageCircleIcon className="ml-2" />
        </button>
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
      {isCommentsOpen && <Comments onClose={() => setIsCommentsOpen(false)} />}
    </div>
  );
}
