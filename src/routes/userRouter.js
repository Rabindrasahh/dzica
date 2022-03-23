import PanelSkeleton from "../views/user/PanelSkeleton.vue";
import PendingOrders from "../views/user/PendingOrders.vue";
import CompletedOrders from "../views/user/CompletedOrders.vue";
import TheProfile from "../views/user/TheProfile.vue";
import TheBookmarks from "../views/user/TheBookmarks.vue";

export default {
    path: "/user/panel",
    component: PanelSkeleton,
    redirect: { name: "userPanelCompletedOrders" },
    children: [
        {
            path: "pending-orders",
            component: PendingOrders,
            name: "userPanelPendingOrders",
            meta: { Auth: true, User: true },
        },
        {
            path: "completed-orders",
            component: CompletedOrders,
            name: "userPanelCompletedOrders",
            meta: { Auth: true, User: true },
        },
        {
            path: "profile",
            component: TheProfile,
            name: "userPanelProfile",
            meta: { Auth: true, User: true },
        },
        {
            path: "bookmarks",
            component: TheBookmarks,
            name: "userPanelBookmarks",
            meta: { Auth: true, User: true },
        },
    ],
};
