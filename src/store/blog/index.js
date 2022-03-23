import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state: {
        userPosts: [],
        post: {},
        followingPosts: [],
    },
    getters,
    mutations,
    actions,
};
