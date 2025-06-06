import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faGlobe,
  faSignInAlt,
  faUserPlus,
  faUser,
  faPhoneAlt,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import router from "./router";

library.add(
  faGlobe,
  faSignInAlt,
  faUserPlus,
  faUser,
  faPhoneAlt,
  faMapMarkerAlt,
  faEnvelope
);

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
