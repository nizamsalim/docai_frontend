export interface UpdateSectionInput {
  title?: string;
  content?: string;
}

export interface RefineSectionInput {
  userInstruction: string;
  modelName: string;
}

export interface Refinement {
  id: string;
  prompt: string;
  rating?: string;
  sectionId: string;
  beforeContent: string;
  afterContent: string;
}

export interface Comment {
  id: string;
  content: string;
  sectionId: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  order: number;
  projectId: string;
  refinements?: Refinement[];
  comments?: Comment[];
}

export interface SectionInput {
  order: number;
  title: string;
}
