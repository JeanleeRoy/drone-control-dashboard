import { RouteRecordRaw } from "vue-router";
import simple from "~/layouts/simple.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: simple,
    children: [
      {
        path: "",
        name: "login.index",
        component: () => import("../pages/index.vue"),
      },
    ],
  },
];
