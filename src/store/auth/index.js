import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state: {
        token: null,
        didAutoLogout: false,
        userRole: undefined,
    },
    getters,
    mutations,
    actions,
};
