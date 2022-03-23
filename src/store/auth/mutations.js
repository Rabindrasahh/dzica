export default {
    setToken(state, payload) {
        state.token = payload.token;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    },
    setUserRole(state, payload) {
        state.userRole = payload.role;
    },
};
