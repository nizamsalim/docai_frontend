import type { ProjectInput } from "../types/project.types";
import Axios from "axios";

export default class ProjectService {
  private static axios = Axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/projects`,
  });
  static async createProject(project: ProjectInput) {
    try {
      const res = await this.axios.post("", project, { withCredentials: true });
      return res.data;
    } catch (err: any) {
      if (err.response) {
        return err.response.data;
      }
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }

  //   static async getProjectById(projectId:string){
  //     try {
  //       const res = await this.axios.post("", project, { withCredentials: true });
  //       return res.data;
  //     } catch (err: any) {
  //       if (err.response) {
  //         return err.response.data;
  //       }
  //       return {
  //         success: false,
  //         message: "Something went wrong",
  //       };
  //     }
  //   }
  static async getAllProjects() {
    try {
      const res = await this.axios.get("", { withCredentials: true });
      return res.data;
    } catch (err: any) {
      if (err.response) {
        return err.response.data;
      }
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
}
