import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "../src/assets/main.css";
import auth from "./router/auth";

const app = createApp(App);
app.config.globalProperties.$auth = auth;
app.use(router);
app.mount("#app");
