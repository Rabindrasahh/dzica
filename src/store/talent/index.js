import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state: {
        talnet: {},
        myProfile: {},
        pendingRequests: {},
        completedRequests: {},
        rejectedRequests: {},
        allTalents: {},
        myReviews: {},
        myVideos: {},
    },
    getters,
    mutations,
    actions,
};
