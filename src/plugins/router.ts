import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "~/shared/auth/store";

const moduleRoutes = Object.entries(
  import.meta.glob<{ routes: RouteRecordRaw[] }>(
    "~/modules/**/routes/index.ts",
    { eager: true }
  )
).reduce((acc, [, { routes }]) => {
  return [...acc, ...routes];
}, [] as RouteRecordRaw[]);

const routes: Array<RouteRecordRaw> = [...moduleRoutes];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const authSotrage = useAuthStore();
  const isAuthenticated = authSotrage.isAuthenticated;

  if (to.name === "login.index" && isAuthenticated) {
    next({ name: "dashboard.index" });
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login.index" });
  }

  next();
});
