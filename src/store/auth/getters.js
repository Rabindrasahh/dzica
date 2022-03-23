export default {
    getToken(state) {
        const token = localStorage.getItem("token");
        return state.token || token;
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    },
    isAuthenticated(state) {
        return !!state.token;
    },
    getUserRole(state) {
        return state.userRole;
    },
};
