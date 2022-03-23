export default {
    setCategories(state, payload) {
        state.categories = payload;
    },
    setPendingTalents(state, payload) {
        state.pendingTalents = payload;
    },
    setAcceptedTalents(state, payload) {
        state.acceptedTalents = payload;
    },
    setAllRequests(state, payload) {
        state.allRequests = payload;
    },
    setArticles(state, payload) {
        state.articles = payload;
    },
    setUsers(state, payload) {
        state.users = payload;
    },
    setGetawaySettings(state, payload) {
        state.getawaySettings = payload;
    },
    setTalentAllInfo(state, payload) {
        state.talentAllInfo = payload;
    },
};
