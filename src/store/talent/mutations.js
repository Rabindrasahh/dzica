export default {
    setTalent(state, payload) {
        state.talent = payload;
    },
    setMyProfile(state, payload) {
        state.myProfile = payload;
    },
    setPendingRequests(state, payload) {
        state.pendingRequests = payload;
    },
    setCompletedRequests(state, payload) {
        state.completedRequests = payload;
    },
    setRejectedRequests(state, payload) {
        state.rejectedRequests = payload;
    },
    setAllTalents(state, payload) {
        state.allTalents = payload;
    },
    setMyReviews(state, payload) {
        state.myReviews = payload;
    },
    setMyVideos(state, payload) {
        state.myVideos = payload;
    },
};
