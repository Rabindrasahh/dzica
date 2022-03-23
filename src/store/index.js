import { createStore } from "vuex";
import auth from "./auth";
import site from "./site";
import blog from "./blog";
import talent from "./talent";
import admin from "./admin";
import transaction from "./transaction";

export default createStore({
    state: {
        // api: "https://dzicace.herokuapp.com",
        api: "https://dzicace.herokuapp.com",
    },
    getters: {
        api(state) {
            return state.api;
        },
    },
    mutations: {},
    actions: {},
    modules: {
        auth,
        site,
        blog,
        talent,
        admin,
        transaction,
    },
});
