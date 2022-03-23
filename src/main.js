import { createApp } from "vue";
import App from "./App.vue";

import router from "./routes/router";
import store from "./store/index";

// Components
import TheNavbar from "./components/layouts/TheNavbar.vue";
import TheFooter from "./components/layouts/TheFooter.vue";
import ThePagination from "./components/UI/ThePagination.vue";
import DeleteModal from "./components/UI/DeleteModal.vue";
import CelebrityCard from "./components/layouts/CelebrityCard.vue";
import ArticleCard from "./components/layouts/ArticleCard.vue";

// Loading overlay
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

// Sweetalert
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// GoogleMap
import VueGoogleMaps from "@fawmi/vue-google-maps";

// MultiSelect
import "@vueform/multiselect/themes/default.css";
import Multiselect from "@vueform/multiselect";

// Quill Editor
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

// Smooth Scroll
import VueSmoothScroll from "vue3-smooth-scroll";

// Popper
import Popper from "vue3-popper";

// Vue.use(VueCarousel);

// Components
const app = createApp(App);
app.component("Loading", Loading);
app.component("Multiselect", Multiselect);
app.component("Popper", Popper);
app.component("QuillEditor", QuillEditor);
app.component("TheNavbar", TheNavbar);
app.component("TheFooter", TheFooter);
app.component("ThePagination", ThePagination);
app.component("DeleteModal", DeleteModal);
app.component("CelebrityCard", CelebrityCard);
app.component("ArticleCard", ArticleCard);

app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.use(VueSmoothScroll, {
  duration: 200,
});
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA4INJZKlvFm1WdakxOWFrHTlYWTcr750A",
  },
});

app.mount("#app");
