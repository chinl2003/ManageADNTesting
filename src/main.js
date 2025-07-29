import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import 'vue-multiselect/dist/vue-multiselect.min.css';
import {
  faGlobe,
  faSignInAlt,
  faUserPlus,
  faUser,
  faPhoneAlt,
  faMapMarkerAlt,
  faEnvelope,
  faLock,
  faSignOutAlt,
  faShoppingCart,
  faFileInvoice,
  faFileSignature,
  faChartBar,
  faStar,
  faFlask,
  faUsers,
  faBlog,
  faBars,
  faPlus,
  faTrash,
  faEdit,faHistory, faVial, faIdCard, faFileInvoiceDollar, faPenToSquare, faFloppyDisk, faCheck, faRotate, faSearch,
  faCirclePlus, faTrashAlt 
} from "@fortawesome/free-solid-svg-icons";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

library.add(
  faGlobe,
  faSignInAlt,
  faUserPlus,
  faUser,
  faPhoneAlt,
  faMapMarkerAlt,
  faEnvelope,
  faLock,
  faSignOutAlt,
  faShoppingCart,
  faFileInvoice,
  faFileSignature,
  faChartBar,
  faStar,
  faFlask,
  faUsers,
  faBlog,
  faBars,
  faPlus,
  faTrash,
  faEdit, faHistory, faVial, faIdCard, faFileInvoiceDollar, faPenToSquare, faFloppyDisk, faCheck, faRotate, faSearch,
  faCirclePlus, faTrashAlt 
);

const app = createApp(App);
app.use(router);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
});
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
