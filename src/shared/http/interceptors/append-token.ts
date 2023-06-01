import { useAuthStore } from "~/shared/auth/store";
import { AUTH } from "~/shared/constants/routes";

export const handleAppendToken = (request: Request) => {
  const authStore = useAuthStore();
  const token = authStore.getToken;
  const isLoginEndpoint = request.url.includes(AUTH.LOGIN);

  if (token && !isLoginEndpoint) {
    request.headers.set("Authorization", `Bearer ${token}`);
  } else {
    authStore.clear();
  }
};
