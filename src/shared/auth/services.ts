import { AUTH } from "../constants/routes";
import { httpClient } from "../http";
import { RequestAuthLogin, ResponseAuthLogin } from "./types";

export const authLogin = async (payload: RequestAuthLogin) => {
  return httpClient<ResponseAuthLogin>(AUTH.LOGIN, {
    body: payload,
  });
};
