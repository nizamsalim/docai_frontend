import type { Project } from "@/types/project.types";
import type { Comment, Refinement, Section } from "@/types/section.types";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface SectionContextType {
  setCurrentSection: (section?: Section, source?: string) => void;
  section?: Section;
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  project?: Project;
  setCurrentProject: (project?: Project) => void;
  refinement?: Refinement;
  setCurrentRefinement: (refinement?: Refinement) => void;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
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
  const [refinement, setRefinement] = useState<Refinement | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);
  const setCurrentSection = (section?: Section, source: string = "title") => {
    if (!section) return;
    setSection(section);

    if (source === "title") {
      setSections((prev) =>
        prev.map((sec) => (sec.id === section.id ? section : sec))
      );
    }
  };
  const setCurrentProject = (project?: Project) => {
    setProject((_) => project);
  };
  const setCurrentRefinement = (refinement?: Refinement) => {
    setRefinement(refinement);
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
        refinement,
        setCurrentRefinement,
        comments,
        setComments,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export const useSectionData = () => useContext(SectionContext);
