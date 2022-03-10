import { useMutation } from "react-query";
import { strapi } from "@kidneed/services";
import { Models } from "@kidneed/types";

export const useSendOtp = () =>
  useMutation("request-otp", (data: any) => strapi.request("post", "/api/core/otp", { data }));

export const useLogin = () =>
  useMutation("login", async (data: any) => {
    const resp = await strapi
      .request<{
        jwt: string;
        user: Models.User;
      }>("post", "/api/core/login", { data: { ...data, scope: "portal" } });
    strapi.setToken(resp.jwt);

    return resp.user;
  });