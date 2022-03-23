export default {
    setUserPosts(state, payload) {
        state.userPosts = payload;
    },
    setSinglePost(state, payload) {
        state.post = payload;
    },
    setFollowingPost(state, payload) {
        state.followingPosts = payload;
    },
};
