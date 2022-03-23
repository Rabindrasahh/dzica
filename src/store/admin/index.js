import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state: {
        categories: [],
        pendingTalents: {},
        acceptedTalents: {},
        allRequests: {},
        articles: {},
        users: {},
        getawaySettings: {},
        talentAllInfo: {},
    },
    getters,
    mutations,
    actions,
};
