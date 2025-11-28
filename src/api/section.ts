import type {
  RefineSectionInput,
  UpdateSectionInput,
} from "@/types/section.types";
import Axios from "axios";
export default class SectionService {
  private static axios = Axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/sections`,
  });

  static async updateSection(sectionId: string, body: UpdateSectionInput) {
    try {
      const res = await this.axios.put(`/${sectionId}`, body, {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);

        return err.response.data;
      }
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
  static async refine(sectionId: string, body: RefineSectionInput) {
    try {
      const res = await this.axios.post(`/${sectionId}`, body, {
        withCredentials: true,
      });
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
