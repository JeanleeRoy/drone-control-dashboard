import ky, { HTTPError } from "ky";
import { API_URL } from "~/shared//constants/routes";
import { ExceptionHttpError, HttpClientOptions } from "~/shared/http/types";
import { handleAppendToken } from "./interceptors/append-token";
import { handleSessionExpired } from "./interceptors/session-expired";
import { handleErrorCapture } from "./interceptors/error-capture";

const httpInternal = ky.create({
  prefixUrl: API_URL,
  retry: 0,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000 * 60 * 1,
  hooks: {
    beforeRequest: [handleAppendToken],
    afterResponse: [handleSessionExpired],
    beforeError: [handleErrorCapture],
  },
});

export const httpClient = async <T>(
  endpoint: string,
  options: HttpClientOptions = {}
) => {
  const { method = "POST", body } = options;

  try {
    const response = await httpInternal(endpoint, {
      method,
      json: body,
    }).json<T>();

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      throw new ExceptionHttpError(error.message, error.response.status);
    }

    throw error;
  }
};
