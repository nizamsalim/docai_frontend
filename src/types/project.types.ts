import type { Section, SectionInput } from "./section.types";

export interface UpdateProjectInput {
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
  type: string;
  sectionCount: number;
  createdAt: string;
  updatedAt: string;
  sections?: Section[];
}
