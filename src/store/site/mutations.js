export default {
    setPendingOrders(state, payload) {
        state.pendingOrders = payload;
    },
    setCompletedOrders(state, payload) {
        state.completedOrders = payload;
    },
    setIndexData(state, payload) {
        state.indexData = payload;
    },
    setSingleArticle(state, payload) {
        state.singleArticle = payload;
    },
    setArticles(state, payload) {
        state.articles = payload;
    },
    setUserProfile(state, payload) {
        state.userProfile = payload;
    },
    setPaymentIntent(state, payload) {
        state.paymentIntent = payload;
    },
    setStripePublicKey(state, payload) {
        state.stripePublicKey = payload;
    },
    setIsBookmarked(state, payload) {
        state.isBookmarked = payload;
    },
    setBookmarks(state, payload) {
        state.bookmarks = payload;
    },
};
