const local = false;
export const API_URL = local
  ? "http://127.0.0.1:3001/"
  : "https://drone-control-api.up.railway.app/";

export const enum AUTH {
  LOGIN = "user/login",
}

export const enum NAVIGATION {
  SEND_COMMAND = "navigation/private/send-new-command",
}
