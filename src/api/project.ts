import type { Section } from "@/types/section.types";
import type {
  Project,
  ProjectInput,
  UpdateProjectInput,
} from "../types/project.types";
import Axios from "axios";

export default class ProjectService {
  private static axios = Axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/projects`,
    withCredentials: true,
  });
  static generateProjectSections(
    project: Partial<ProjectInput>
  ): Promise<{ sections: Section[] }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.post("/generate", project);
        resolve(res.data);
      } catch (err: any) {
        console.log(err);
        if (err.response) {
          reject(err.response.data);
        }
        reject({
          success: false,
          message: "Something went wrong",
        });
      }
    });
  }
  static createProject(project: ProjectInput): Promise<{ project: Project }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.post("", project);
        resolve(res.data);
      } catch (err: any) {
        if (err.response) {
          reject(err.response.data);
        }
        reject({
          success: false,
          message: "Something went wrong",
        });
      }
    });
  }

  static getProjectById(projectId: string): Promise<{ project: Project }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.get(`/${projectId}`);
        resolve(res.data);
      } catch (err: any) {
        if (err.response) {
          reject(err.response.data);
        }
        reject({
          success: false,
          message: "Something went wrong",
        });
      }
    });
  }
  static getAllProjects(): Promise<{ projects: Project[] }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.get("", { withCredentials: true });
        resolve(res.data);
      } catch (err: any) {
        if (err.response) {
          reject(err.response.data);
        }
        reject({
          success: false,
          message: "Something went wrong",
        });
      }
    });
  }

  static updateProject(
    projectId: string,
    body: UpdateProjectInput
  ): Promise<{ project: Project }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.put(`/${projectId}`, body);
        resolve(res.data);
      } catch (err: any) {
        if (err.response) {
          reject(err.response.data);
        }
        reject({
          success: false,
          message: "Something went wrong",
        });
      }
    });
  }
}
