import type { NormalizedOptions } from "ky";

import { useAuthStore } from "~/shared/auth/store";

export const handleSessionExpired = async (
  _request: Request,
  _options: NormalizedOptions,
  response: Response
) => {
  if (response.status === 401) {
    const authStore = useAuthStore();
    authStore.clear();
    window.location.href = "/";

    return;
  }
};
