import { RouteRecordRaw } from "vue-router";
import deafult from "~/layouts/default.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    component: deafult,
    children: [
      {
        path: "",
        name: "dashboard.index",
        component: () => import("../pages/index.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];
