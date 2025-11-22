import Axios from "axios";
import type { LoginBody, RegisterBody } from "../types/auth.types";

export default class AuthService {
  private static API_URL = import.meta.env.VITE_API_URL;

  private static axios = Axios.create({
    baseURL: `${this.API_URL}/auth`,
  });

  static async register(body: RegisterBody) {
    try {
      const { data } = await this.axios.post("/register", body);
      if (data.success) {
        return data;
      }
      return {
        success: false,
      };
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }

  static async login(body: LoginBody) {
    try {
      const { data } = await this.axios.post("/login", body, {
        withCredentials: true,
      });
      return data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }

  static async logout() {
    const res = await this.axios.post("/logout", {}, { withCredentials: true });
    return res.data;
  }

  static async verify_token() {
    try {
      const { data } = await this.axios.post(
        "/me",
        {},
        { withCredentials: true }
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
}
