import {
  type VueQueryPluginOptions,
  VueQueryPlugin,
} from "@tanstack/vue-query";
import type { App } from "vue";

export const query = (app: App) => {
  app.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 10,
          keepPreviousData: true,
          retry: 0,
        },
      },
    },
  } satisfies VueQueryPluginOptions);
};
