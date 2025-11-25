import { useState } from "react";
import "@/styles/project.css";
import SectionService from "@/api/section";
import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import { StaticLoader } from "../common/Loader";

export default function ChatWindow() {
  const { section, setCurrentSection } = useSectionData() as SectionContextType;
  const [selectedModel, setSelectedModel] = useState("gemini");
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: "Hello. How may I assist you today",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSendMessage = async () => {
    setisLoading(true);
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
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
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💬</div>
            <div className="empty-state-text">
              Start a conversation to refine your content with AI assistance
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.text}
            </div>
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
