import { createApp } from "vue";
import { query } from "~/plugins/query";
import "~/assets/css/fonts.css";
import "~/assets/css/tailwind.css";
import "mapbox-gl/dist/mapbox-gl.css";
import App from "./App.vue";

import { pinia } from "./plugins/pinia";
import { router } from "./plugins/router";
import naive from "naive-ui";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(query);
app.use(naive);

app.mount("#app");
