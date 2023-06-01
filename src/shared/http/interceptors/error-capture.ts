import type { HTTPError } from "ky";
import { ResponseError } from "../types";

export const handleErrorCapture = async (error: HTTPError) => {
  const newError = error;
  const { response } = newError;
  const body = (await response.json()) as ResponseError;

  if (body && body.message) {
    // newError.name = body.type;
    newError.message = body.message;
  }

  return newError;
};
