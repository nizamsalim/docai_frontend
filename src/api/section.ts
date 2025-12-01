import type {
  Comment,
  RefineSectionInput,
  Section,
  UpdateSectionInput,
} from "@/types/section.types";
import Axios from "axios";
export default class SectionService {
  private static axios = Axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/sections`,
    withCredentials: true,
  });

  static updateSection(
    sectionId: string,
    body: UpdateSectionInput
  ): Promise<{ section: Section }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.put(`/${sectionId}`, body);
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
  static refine(
    sectionId: string,
    body: RefineSectionInput
  ): Promise<{ section: Section }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.post(`/${sectionId}/refinements`, body);
        resolve(res.data);
      } catch (err: any) {
        if (err.response) {
          console.log(err.response.data);

          reject(err.response.data);
        }
        reject({
          success: false,
          message: "Something went wrong",
        });
      }
    });
  }

  static addComment(
    sectionId: string,
    comment: string
  ): Promise<{ comment: Comment }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.post(
          `/${sectionId}/comments`,
          { content: comment },
          {
            withCredentials: true,
          }
        );
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
  static updateComment(
    sectionId: string,
    commentId: string,
    comment: string
  ): Promise<{ comment: Comment }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.put(
          `/${sectionId}/comments/${commentId}`,
          { content: comment }
        );
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
  static deleteComment(sectionId: string, commentId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.delete(
          `/${sectionId}/comments/${commentId}`
        );

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
  static regenerate(
    sectionId: string,
    modelName: string
  ): Promise<{ section: Section }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.get(
          `/${sectionId}/regenerate/${modelName}`
        );

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
