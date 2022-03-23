import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state: {
        completedOrders: {},
        pendingOrders: {},
        indexData: {},
        singleArticle: {},
        articles: {},
        userProfile: {},
        paymentIntent: {},
        stripePublicKey: "",
        isBookmarked: false,
        bookmarks: {},
    },
    getters,
    mutations,
    actions,
};
