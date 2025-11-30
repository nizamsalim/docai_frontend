import { useEffect, useState } from "react";
import "@/styles/project.css";
import SectionService from "@/api/section";
import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import { StaticLoader } from "../common/Loader";
import type { Refinement } from "@/types/section.types";
import RefinementMessage from "./RefinementMessage";
import RefinementService from "@/api/refinement";
import type { APIError } from "@/types/api.types";
import { useAlert, type AlertContextType } from "@/context/AlertContext";

export default function ChatWindow() {
  const { showAlert } = useAlert() as AlertContextType;
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

  const handleRateRefinement = async (refinementId: string, rating: string) => {
    try {
      const res = await RefinementService.rateRefinement(refinementId, rating);
      setMessages((prev) => {
        return prev?.map((ref) =>
          ref.id === res.refinement.id
            ? { ...ref, rating: res.refinement.rating }
            : ref
        );
      });
    } catch (error) {
      showAlert((error as Partial<APIError>).message);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    setisLoading(true);
    try {
      const res = await SectionService.refine(section!.id, {
        userInstruction: inputText,
        modelName: selectedModel,
      });
      setCurrentSection(res.section);
    } catch (error) {
      showAlert((error as Partial<APIError>).message);
    }
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
            <RefinementMessage
              key={message.id}
              refinement={message}
              handleRateRefinement={handleRateRefinement}
            />
          ))
        )}
      </div>

      <div className="chat-input-container">
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
