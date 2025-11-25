import "@/styles/project.css";
import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";

export default function SectionList() {
  const {
    section: activeSection,
    setCurrentSection,
    sections,
  } = useSectionData() as SectionContextType;
  return (
    <div className="section-list">
      <h2 className="section-list-title">Sections</h2>
      {sections.map((section) => (
        <div
          key={section.id}
          className={`section-item ${
            activeSection?.id === section.id ? "active" : ""
          }`}
          onClick={() => {
            setCurrentSection(section);
          }}
        >
          <div className="section-item-title">{section.title}</div>
        </div>
      ))}
    </div>
  );
}
