import type { Project, Section } from "@/types/project.types";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface SectionContextType {
  setCurrentSection: (section?: Section, source?: string) => void;
  section?: Section;
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  project?: Project;
  setCurrentProject: (project?: Project) => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export default function SectionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [section, setSection] = useState<Section | undefined>();
  const [sections, setSections] = useState<Section[]>([]);
  const [project, setProject] = useState<Project | undefined>();
  const setCurrentSection = (section?: Section, source: string = "title") => {
    setSection(section);

    if (!section) return;

    if (source === "title") {
      setSections((prev) =>
        prev.map((sec) => (sec.id === section.id ? section : sec))
      );
    }
  };
  const setCurrentProject = (project?: Project) => {
    setProject((_) => project);
  };
  return (
    <SectionContext.Provider
      value={{
        section,
        setCurrentSection,
        sections,
        setSections,
        project,
        setCurrentProject,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export const useSectionData = () => useContext(SectionContext);
