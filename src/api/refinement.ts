import type { Refinement } from "@/types/section.types";
import Axios from "axios";

export default class RefinementService {
  private static axios = Axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/refinements`,
    withCredentials: true,
  });

  static rateRefinement(
    refinementId: string,
    rating: string
  ): Promise<{ refinement: Refinement }> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.axios.patch(`/${refinementId}/${rating}`);
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
