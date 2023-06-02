import { httpClient } from "~/shared/http";
import { NewCommandRequest, NewCommandResponse } from "../types/http";
import { NAVIGATION } from "~/shared/constants/routes";

export const sendNewDroneCommand = async (payload: NewCommandRequest) => {
  return httpClient<NewCommandResponse>(NAVIGATION.SEND_COMMAND, {
    body: payload,
  });
};
