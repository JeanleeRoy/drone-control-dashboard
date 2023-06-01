import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { authLogin } from "~/shared/auth/services";
import { useAuthStore } from "~/shared/auth/store";
import { AuthPayload, User } from "~/shared/auth/types";
import { decodeJwtToken } from "~/shared/utils/jwt";
import { useMessage } from "naive-ui";
import { computed } from "vue";

export const useLogin = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const alert = useMessage();

  const { mutateAsync, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: authLogin,
    onSuccess: (res) => {
      authStore.setToken(res.data.token);
      const user = decodeJwtToken<AuthPayload>(res.data.token);
      authStore.setUser(user as User);
      router.push({ name: "dashboard.index" }).then(() => {
        alert.success("Bienvenido");
      });
    },
    onError: (error: Error) => {
      alert.error(error.message || "Ocurrió un error");
    },
  });

  return {
    login: mutateAsync,
    isLoggedIn: computed(() => authStore.isAuthenticated),
    loginError: error,
  };
};
