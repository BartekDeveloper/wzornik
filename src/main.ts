import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/main.css";
import { applyTheme, loadSettings } from "./lib/settings";

applyTheme(loadSettings().theme);

createApp(App).use(router).mount("#app");
