import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

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
