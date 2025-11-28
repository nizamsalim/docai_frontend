import { useEffect, useState } from "react";
import "@/styles/project.css";
import SectionService from "@/api/section";
import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import { StaticLoader } from "../common/Loader";
import type { Refinement } from "@/types/project.types";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

export default function ChatWindow() {
  const { section, setCurrentSection } = useSectionData() as SectionContextType;

  const [selectedModel, setSelectedModel] = useState("gemini");
  const [messages, setMessages] = useState<Refinement[]>();
  const [inputText, setInputText] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    if (section) {
      setMessages(section.refinements!);
    }

    return () => {};
  }, [section]);

  const handleSendMessage = async () => {
    setisLoading(true);
    if (!inputText.trim()) return;

    // onRefinementRequest(inputText, selectedModel);
    // ProjectService.refine
    const res = await SectionService.refine(section!.id, {
      userInstruction: inputText,
      modelName: selectedModel,
    });
    setCurrentSection(res.section);
    setInputText("");
    setisLoading(false);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3 className="chat-title">AI Content Refinement</h3>
        <select
          className="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="gemini">Gemini</option>
          <option value="gpt">GPT</option>
        </select>
      </div>
      <StaticLoader isVisible={isLoading} />

      <div className="chat-messages">
        {messages && messages!.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💬</div>
            <div className="empty-state-text">
              Start a conversation to refine your content with AI assistance
            </div>
          </div>
        ) : (
          messages &&
          messages!.map((message) => (
            <div key={message.id} className={`message user`}>
              {message.prompt}
            </div>
          ))
        )}
      </div>

      <div className="chat-input-container">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-transparent hover:bg-gray-30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-pressed="false"
            aria-label="Like"
          >
            <ThumbsUpIcon />
            <span className="text-sm font-medium">Like</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-transparent hover:bg-gray-30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-pressed="false"
            aria-label="Dislike"
          >
            <ThumbsDownIcon />
            <span className="text-sm font-medium">Dislike</span>
          </button>
        </div>

        <textarea
          className="chat-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AI to refine your content..."
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <button className="chat-send-btn" onClick={handleSendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
}
