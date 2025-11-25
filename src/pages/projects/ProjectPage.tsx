import TitleBar from "@/components/projects/TitleBar";
import SectionList from "@/components/projects/SectionsList";
import SectionEditor from "@/components/projects/SectionEditor";
import ChatWindow from "@/components/projects/ChatWindow";
import "@/styles/project.css";
import { useLoaderData } from "react-router";
import type { Project } from "@/types/project.types";
import {
  useSectionData,
  type SectionContextType,
} from "@/context/SectionContext";
import { useEffect } from "react";
import { StaticLoader } from "@/components/common/Loader";

export default function ProjectPage() {
  const { project } = useLoaderData() as { project: Project };
  if (!project) return <StaticLoader isVisible={true} />;
  console.log({ project });

  const { setCurrentSection, setSections, setCurrentProject } =
    useSectionData() as SectionContextType;
  useEffect(() => {
    setCurrentProject(project);
    setSections(project.sections!);
    setCurrentSection(project.sections![0]);

    return () => {
      setCurrentProject(undefined);
      setSections([]);
      setCurrentSection(undefined);
    };
  }, [project]);

  return (
    <div className="app-container">
      <TitleBar />

      <div className="main-content">
        <SectionList />

        <SectionEditor />

        <ChatWindow />
      </div>
    </div>
  );
}
