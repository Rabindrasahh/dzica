import PanelSkeleton from "../views/talent/PanelSkeleton.vue";
import TheProfile from "../views/talent/TheProfile.vue";
import PendingRequests from "../views/talent/PendingRequests.vue";
import CompletedRequests from "../views/talent/CompletedRequests.vue";
import RejectedRequests from "../views/talent/RejectedRequests.vue";
import TheDashboard from "../views/talent/TheDashboard.vue";
import MyReviews from "../views/talent/MyReviews.vue";
import MyVideos from "../views/talent/MyVideos.vue";
import TheTransactions from "../views/talent/TheTransactions.vue";

export default {
    path: "/talent/panel",
    component: PanelSkeleton,
    redirect: { name: "talentPanelProfile" },
    children: [
        {
            path: "dashboard",
            component: TheDashboard,
            name: "talentPanelDashboard",
            meta: { Auth: true, Talent: true },
        },
        {
            path: "profile",
            component: TheProfile,
            name: "talentPanelProfile",
            meta: { Auth: true, Talent: true },
        },
        {
            path: "my-reviews",
            component: MyReviews,
            name: "talentPanelMyReviews",
            meta: { Auth: true, Talent: true },
        },
        {
            path: "my-videos",
            component: MyVideos,
            name: "talentPanelMyVideos",
            meta: { Auth: true, Talent: true },
        },
        {
            path: "pending-requests",
            component: PendingRequests,
            name: "talentPanelPendingRequests",
            meta: { Auth: true, Talent: true },
        },
        {
            path: "completed-requests",
            component: CompletedRequests,
            name: "talentPanelCompletedRequests",
            meta: { Auth: true, Talent: true },
        },
        {
            path: "rejceted-requests",
            component: RejectedRequests,
            name: "talentPanelRejectedRequests",
            meta: { Auth: true, Talent: true },
        },
        {
            path: "transactions",
            component: TheTransactions,
            name: "talentPanelTransactions",
            meta: { Auth: true, Talent: true },
        },
    ],
};
