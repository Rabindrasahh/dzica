import PanelSkeleton from "../views/admin/PanelSkeleton.vue";
import PendingTalents from "../views/admin/PendingTalents.vue";
import AcceptedTalents from "../views/admin/AcceptedTalents.vue";
import TheCategories from "../views/admin/TheCategories.vue";
import TheRequests from "../views/admin/TheRequests.vue";
import NewArticle from "../views/admin/NewArticle.vue";
import EditArticle from "../views/admin/EditArticle.vue";
import TheArticles from "../views/admin/TheArticles.vue";
import TheUsers from "../views/admin/TheUsers.vue";
import TheSettings from "../views/admin/TheSettings.vue";
import AddTalent from "../views/admin/AddTalent.vue";
import TheTransactions from "../views/admin/TheTransactions.vue";
import TalentInfo from "../views/admin/TalentInfo.vue";

export default {
    path: "/admin",
    component: PanelSkeleton,
    redirect: { name: "adminPanelTalentsPending" },
    children: [
        {
            path: "talent-all-info/:talentId",
            component: TalentInfo,
            name: "adminPanelTalentInfo",
            meta: { Auth: true, Admin: true },
            props: true,
        },
        {
            path: "talents/pending",
            component: PendingTalents,
            name: "adminPanelTalentsPending",
            meta: { Auth: true, Admin: true },
        },
        {
            path: "talents/accepted",
            component: AcceptedTalents,
            name: "adminPanelTalentsAccepted",
            meta: { Auth: true, Admin: true },
        },
        {
            path: "add-talent",
            component: AddTalent,
            name: "adminPanelAddTalent",
            meta: { Auth: true, Admin: true },
        },
        {
            path: "categories",
            component: TheCategories,
            name: "adminPanelCategories",
            meta: { Auth: true, Admin: true },
        },
        {
            path: "requests",
            component: TheRequests,
            name: "adminPanelRequests",
            meta: { Auth: true, Admin: true },
        },
        {
            path: "articles",
            component: TheArticles,
            name: "adminPanelArticles",
            meta: { Auth: true, Admin: true },
        },
        {
            path: "transactions",
            component: TheTransactions,
            name: "adminPanelTransactions",
            meta: { Auth: true, Admin: true },
        },
        {
            path: "new-article",
            component: NewArticle,
            name: "adminPanelNewArticle",
            meta: { Auth: true, Admin: true },
        },
        {
            path: "edit-article/:articleId",
            component: EditArticle,
            name: "adminPanelEditArticle",
            props: true,
            meta: { Auth: true, Admin: true },
        },
        {
            path: "users",
            component: TheUsers,
            name: "adminPanelUsers",
            props: true,
            meta: { Auth: true, Admin: true },
        },
        {
            path: "settings",
            component: TheSettings,
            name: "adminPanelSettings",
            props: true,
            meta: { Auth: true, Admin: true },
        },
    ],
};
