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
      const res = await this.axios.post(`/${sectionId}/refinements`, body, {
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

  static async addComment(sectionId: string, comment: string) {
    try {
      const res = await this.axios.post(
        `/${sectionId}/comments`,
        { content: comment },
        {
          withCredentials: true,
        }
      );
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
  static async updateComment(
    sectionId: string,
    commentId: string,
    comment: string
  ) {
    try {
      const res = await this.axios.put(
        `/${sectionId}/comments/${commentId}`,
        { content: comment },
        {
          withCredentials: true,
        }
      );
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
  static async deleteComment(sectionId: string, commentId: string) {
    console.log({ url: `/${sectionId}/comments/${commentId}` });

    try {
      const res = await this.axios.delete(
        `/${sectionId}/comments/${commentId}`,
        {
          withCredentials: true,
        }
      );
      console.log({ success: res.data });

      return res.data;
    } catch (err: any) {
      if (err.response) {
        console.log({ error: err.response.data });

        return err.response.data;
      }
      console.log({ ERROR: err });

      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
}
