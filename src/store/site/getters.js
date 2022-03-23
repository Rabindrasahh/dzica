export default {
    pendingOrders(state) {
        return state.pendingOrders;
    },
    completedOrders(state) {
        return state.completedOrders;
    },
    indexData(state) {
        return state.indexData;
    },
    singleArticle(state) {
        return state.singleArticle;
    },
    articles(state) {
        return state.articles;
    },
    userProfile(state) {
        return state.userProfile;
    },
    paymentIntent(state) {
        return state.paymentIntent;
    },
    stripePublicKey(state) {
        return state.stripePublicKey;
    },
    isBookmarked(state) {
        return state.isBookmarked;
    },
    bookmarks(state) {
        return state.bookmarks;
    },
};
