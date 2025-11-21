import Axios from "axios";
type RegisterBody = {
  username: string;
  password: string;
  name: string;
};
type LoginBody = {
  username: string;
  password: string;
};

export default class AuthService {
  private static API_URL = "https://localhost:5000/api/v1/auth";

  private static axios = Axios.create({
    baseURL: this.API_URL,
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
