export interface SectionInput {
  order: number;
  title: string;
}

export interface ProjectInput {
  title: string;
  type: string;
  sections: SectionInput[];
}

export interface Project {
  id: string;
  title: string;
  type: "pptx" | "docx";
  sectionCount: number;
  createdAt: string;
  updatedAt: string;
}
