let timer;
export default {
    async signup(context, payload) {
        const fullName = payload.fullName;
        const email = payload.email;
        const password = payload.password;
        const apiEndpoint = context.rootGetters.api;

        const result = await fetch(`${apiEndpoint}/signup/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName,
                email,
                password,
            }),
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);

        if (payload.setToken) context.dispatch("setLoginToken", { token: data.token });
    },
    async login(context, payload) {
        const email = payload.email;
        const password = payload.password;
        const apiEndpoint = context.rootGetters.api;

        const result = await fetch(`${apiEndpoint}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);

        context.dispatch("setLoginToken", { token: data.token });
        context.dispatch("getUserRole");
    },
    async resetPasswordRequest(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const email = payload.email;

        const result = await fetch(`${apiEndpoint}/password-reset-request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async resetPassword(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const password = payload.password;
        const token = payload.token;
        const userId = payload.userId;

        const result = await fetch(`${apiEndpoint}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, password, token }),
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async getUserRole(context) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/get-user-role`, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setUserRole", { role: data });
    },
    setLoginToken(context, payload) {
        const token = payload.token;

        if (token) {
            context.commit("setToken", { token });
            const expireTime = 1000 * 60 * 60 * 24 * 7; // 7d
            const expiration = new Date().getTime() + expireTime;
            localStorage.setItem("token", token);
            localStorage.setItem("expiration", expiration);
        } else {
            const error = new Error("Token is not set");
            throw error;
        }
    },
    autoLogin(context) {
        const token = localStorage.getItem("token");
        const expiration = localStorage.getItem("expiration");

        const expiresIn = expiration - new Date().getTime();

        if (expiresIn < 0) {
            context.dispatch("autoLogout");
            return;
        }

        timer = setTimeout(() => {
            context.dispatch("autoLogout");
        }, expiresIn);

        if (token && expiration) {
            context.commit("setToken", {
                token: token,
            });
        }
    },
    logout(context) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        clearTimeout(timer);

        context.commit("setToken", {
            token: null,
        });
    },
    autoLogout(context) {
        context.dispatch("logout");
        context.commit("setAutoLogout");
    },
};
