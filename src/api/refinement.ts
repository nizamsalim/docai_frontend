import Axios from "axios";

export default class RefinementService {
  private static axios = Axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/refinements`,
  });

  static async rateRefinement(refinementId: string, rating: string) {
    try {
      const res = await this.axios.patch(`/${refinementId}/${rating}`, {
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
