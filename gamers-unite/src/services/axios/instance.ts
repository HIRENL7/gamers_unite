import axios from "axios";

import { env } from "@/config";
import { applyInterceptors } from "@/services/axios/interceptors";

export const axiosInstance = applyInterceptors(
  axios.create({
    baseURL: env.apiBaseUrl || undefined,
    timeout: env.apiTimeout,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }),
);
