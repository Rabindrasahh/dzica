import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import adminRouter from "./adminRouter";
import talentRouter from "./talentRouter";
import userRouter from "./userRouter";
import NotFound from "../views/NotFound.vue";
import TheIndex from "../views/site/TheIndex.vue";
import CelebrityInfo from "../views/site/TalentInfo.vue";
import TalentsJoin from "../views/site/TalentsJoin.vue";
import AllTalents from "../views/site/AllTalents.vue";
import AllCategories from "../views/site/AllCategories.vue";
import BookNormalVideo from "../views/site/BookNormalVideo.vue";
import BookMarketingVideo from "../views/site/BookMarketingVideo.vue";
import TheArticle from "../views/site/TheArticle.vue";
import TheArticles from "../views/site/TheArticles.vue";
import TheSignup from "../views/auth/TheSignup.vue";
import TheLogin from "../views/auth/TheLogin.vue";
import ResetPasswordRequest from "../views/auth/ResetPasswordRequest.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";
import ThePolicy from "../views/site/ThePolicy.vue";
import TheTermAndCondition from "../views/site/TheTermAndCondition.vue";
import TheBlog from "../views/site/TheBlog.vue";
import PersonnelInfo from "../views/site/PersonnelInfo.vue";
import Business from "../views/site/Business.vue";
import TalentProfile from "../views/site/TalentProfile.vue";
import enrole from "../views/site/enrole_dezicare.vue";
import cete from "../views/site/cete.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: TheIndex,
    meta: { Auth: false },
  },
  {
    path: "/reset-password-request",
    name: "resetPasswordRequest",
    component: ResetPasswordRequest,
    meta: { Auth: false },
  },
  {
    path: "/reset-password",
    name: "resetPassword",
    component: ResetPassword,
    meta: { Auth: false },
  },
  {
    path: "/sign-up",
    name: "signup",
    component: TheSignup,
    meta: { Auth: false },
  },
  {
    path: "/enrole",
    name: "enrole",
    component: enrole,
    meta: { Auth: false },
  },
  { path: "/login", name: "login", component: TheLogin, meta: { Auth: false } },
  {
    path: "/talents-join",
    name: "talentsJoin",
    component: TalentsJoin,
    meta: { Auth: false },
  },
  {
    path: "/book/normal/:talentId",
    name: "bookNormalVideo",
    component: BookNormalVideo,
    meta: { Auth: true },
    props: true,
  },
  {
    path: "/book/marketing/:talentId",
    name: "bookMarketingVideo",
    component: BookMarketingVideo,
    meta: { Auth: true },
    props: true,
  },
  {
    path: "/talents",
    name: "allTalents",
    component: AllTalents,
    meta: { Auth: false },
  },
  {
    path: "/talent/:talentId",
    name: "talentInfo",
    component: CelebrityInfo,
    props: true,
    meta: { Auth: false },
  },
  {
    path: "/articles",
    name: "articles",
    component: TheArticles,
    meta: { Auth: false },
  },
  {
    path: "/cete",
    name: "cete",
    component: cete,
    meta: { Auth: false },
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: TheArticle,
    props: true,
    meta: { Auth: false },
  },
  {
    path: "/categories",
    name: "allCategories",
    component: AllCategories,
    meta: { Auth: false },
  },

  {
    path: "/:notFound(.*)",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/policy",
    name: "ThePolicy",
    component: ThePolicy,
  },
  {
    path: "/the-terms-and-condition",
    name: "TheTermAndCondition",
    component: TheTermAndCondition,
  },
  {
    path: "/blog",
    name: "TheBlog",
    component: TheBlog,
  },
  {
    path: "/personnel-info",
    name: "PersonnelInfo",
    component: PersonnelInfo,
  },
  {
    path: "/business",
    name: "Business",
    component: Business,
  },
  {
    path: "/talent-profile",
    name: "TalentProfile",
    component: TalentProfile,
  },
  adminRouter,
  talentRouter,
  userRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  // to, _, next
  window.scrollTo(0, 0);

  const isAuthenticated = store.getters["auth/isAuthenticated"];

  // can navigate to all pages with Auth False
  if (!to.meta.Auth) return next();

  // navigate to pages with Auth true
  if (!isAuthenticated) {
    return next("/");
  } else {
    if (store.getters["auth/getUserRole"] === undefined) {
      await store.dispatch("auth/getUserRole");
      const role = store.getters["auth/getUserRole"];

      if (role === "user" && (to.meta.Talent || to.meta.Admin))
        return next("/");
      if (role === "talent" && (to.meta.User || to.meta.Admin))
        return next("/talent/panel/profile");
      if (role === "admin" && (to.meta.User || to.meta.Talent))
        return next("/admin/talents/pending");

      return next();
    } else {
      const role = store.getters["auth/getUserRole"];

      if (role === "user" && (to.meta.Talent || to.meta.Admin))
        return next("/");
      if (role === "talent" && (to.meta.User || to.meta.Admin))
        return next("/talent/panel/profile");
      if (role === "admin" && (to.meta.User || to.meta.Talent))
        return next("/admin/talents/pending");

      return next();
    }
  }
});

export default router;










//import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import adminRouter from "./adminRouter";
import talentRouter from "./talentRouter";
import userRouter from "./userRouter";
import NotFound from "../views/NotFound.vue";
import TheIndex from "../views/site/TheIndex.vue";
import CelebrityInfo from "../views/site/TalentInfo.vue";
import TalentsJoin from "../views/site/TalentsJoin.vue";
import AllTalents from "../views/site/AllTalents.vue";
import AllCategories from "../views/site/AllCategories.vue";
import BookNormalVideo from "../views/site/BookNormalVideo.vue";
import BookMarketingVideo from "../views/site/BookMarketingVideo.vue";
import TheArticle from "../views/site/TheArticle.vue";
import TheArticles from "../views/site/TheArticles.vue";
import TheSignup from "../views/auth/TheSignup.vue";
import TheLogin from "../views/auth/TheLogin.vue";
import ResetPasswordRequest from "../views/auth/ResetPasswordRequest.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";
import ThePolicy from "../views/site/ThePolicy.vue";
import TheTermAndCondition from "../views/site/TheTermAndCondition.vue";
import TheBlog from "../views/site/TheBlog.vue";
import PersonnelInfo from "../views/site/PersonnelInfo.vue";
import Business from "../views/site/Business.vue";
import TalentProfile from "../views/site/TalentProfile.vue";
import enrole from "../views/site/enrole_dezicare.vue";
import cete from "../views/site/cete.vue";

const routes = [
  {
    path: "/dzicace/dist/",
    name: "index",
    component: TheIndex,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/reset-password-request",
    name: "resetPasswordRequest",
    component: ResetPasswordRequest,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/reset-password",
    name: "resetPassword",
    component: ResetPassword,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/sign-up",
    name: "signup",
    component: TheSignup,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/enrole",
    name: "enrole",
    component: enrole,
    meta: { Auth: false },
  },
  { path: "/login", name: "login", component: TheLogin, meta: { Auth: false } },
  {
    path: "/dzicace/dist/talents-join",
    name: "talentsJoin",
    component: TalentsJoin,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/book/normal/:talentId",
    name: "bookNormalVideo",
    component: BookNormalVideo,
    meta: { Auth: true },
    props: true,
  },
  {
    path: "/dzicace/dist/book/marketing/:talentId",
    name: "bookMarketingVideo",
    component: BookMarketingVideo,
    meta: { Auth: true },
    props: true,
  },
  {
    path: "/dzicace/dist/talents",
    name: "allTalents",
    component: AllTalents,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/talent/:talentId",
    name: "talentInfo",
    component: CelebrityInfo,
    props: true,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/articles",
    name: "articles",
    component: TheArticles,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/cete",
    name: "cete",
    component: cete,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/article/:articleId",
    name: "article",
    component: TheArticle,
    props: true,
    meta: { Auth: false },
  },
  {
    path: "/dzicace/dist/categories",
    name: "allCategories",
    component: AllCategories,
    meta: { Auth: false },
  },

  {
    path: "/dzicace/dist/:notFound(.*)",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/dzicace/dist/policy",
    name: "ThePolicy",
    component: ThePolicy,
  },
  {
    path: "/dzicace/dist/the-terms-and-condition",
    name: "TheTermAndCondition",
    component: TheTermAndCondition,
  },
  {
    path: "/dzicace/dist/blog",
    name: "TheBlog",
    component: TheBlog,
  },
  {
    path: "/dzicace/dist/personnel-info",
    name: "PersonnelInfo",
    component: PersonnelInfo,
  },
  {
    path: "/dzicace/dist/business",
    name: "Business",
    component: Business,
  },
  {
    path: "/dzicace/dist/talent-profile",
    name: "TalentProfile",
    component: TalentProfile,
  },
  adminRouter,
  talentRouter,
  userRouter,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  // to, _, next
  window.scrollTo(0, 0);

  const isAuthenticated = store.getters["auth/isAuthenticated"];

  // can navigate to all pages with Auth False
  if (!to.meta.Auth) return next();

  // navigate to pages with Auth true
  if (!isAuthenticated) {
    return next("/");
  } else {
    if (store.getters["auth/getUserRole"] === undefined) {
      await store.dispatch("auth/getUserRole");
      const role = store.getters["auth/getUserRole"];

      if (role === "user" && (to.meta.Talent || to.meta.Admin))
        return next("/");
      if (role === "talent" && (to.meta.User || to.meta.Admin))
        return next("/talent/panel/profile");
      if (role === "admin" && (to.meta.User || to.meta.Talent))
        return next("/admin/talents/pending");

      return next();
    } else {
      const role = store.getters["auth/getUserRole"];

      if (role === "user" && (to.meta.Talent || to.meta.Admin))
        return next("/");
      if (role === "talent" && (to.meta.User || to.meta.Admin))
        return next("/talent/panel/profile");
      if (role === "admin" && (to.meta.User || to.meta.Talent))
        return next("/admin/talents/pending");

      return next();
    }
  }
});

export default router;
