import { useParams } from "react-router";

function ProjectPage() {
  const { projectId } = useParams();
  return <div>ProjectPage : {projectId}</div>;
}

export default ProjectPage;
