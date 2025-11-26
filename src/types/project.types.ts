export interface SectionInput {
  order: number;
  title: string;
}

export interface UpdateProjectInput {
  title: string;
}

export interface ProjectInput {
  title: string;
  type: string;
  sections: SectionInput[];
}

export interface Refinement {
  id: string;
  prompt: string;
  rating?: string;
  sectionId: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  order: number;
  projectId: string;
  refinements?: Refinement[];
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
