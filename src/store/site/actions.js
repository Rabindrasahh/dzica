import axios from "axios";
export default {
    async getIndexData(context) {
        const apiEndpoint = context.rootGetters.api;

        const result = await fetch(`${apiEndpoint}/get-index-data`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setIndexData", data);
    },
    async bookVideo(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/book-video`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async getUserProfile(context) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/user-profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setUserProfile", data);
    },
    async updateMyProfile(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/user/update-profile`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async getPendingOrders(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/pending-orders?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setPendingOrders", data);
    },
    async getCompletedOrders(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/completed-orders?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setCompletedOrders", data);
    },
    async acceptPendingOrder(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;

        const result = await fetch(`${apiEndpoint}/accept-order/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async rejectPendingOrder(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;

        const result = await fetch(`${apiEndpoint}/reject-order/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async downloadVideo(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;

        const response = await axios.get(`${apiEndpoint}/download-video/${orderId}`, {
            responseType: "blob",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data.error) {
            console.error(response.data.error);
        }
        return response;
    },
    async copyVideoLink(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const orderId = payload.orderId;

        const result = await fetch(`${apiEndpoint}/copy-video-link/${orderId}`);

        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
        return data;
    },
    async submitReview(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;

        const result = await fetch(`${apiEndpoint}/submit-review/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                content: payload.content,
                rating: payload.rating,
            }),
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async getSingleArticle(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const articleId = payload.articleId;

        const result = await fetch(`${apiEndpoint}/articles/${articleId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
        context.commit("setSingleArticle", data);
    },
    async getArticles(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/articles?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
        context.commit("setArticles", data);
    },
    async getPaymentIntent(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const talentId = payload.talentId;
        const type = payload.type;

        const result = await fetch(
            `${apiEndpoint}/get-payment-intent?talentId=${talentId}&type=${type}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
        context.commit("setPaymentIntent", data);
    },
    async getStripePublicKey(context) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/get-public-key`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
        context.commit("setStripePublicKey", data);
    },
    async getIsBookmarked(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const talentId = payload.talentId;

        const result = await fetch(`${apiEndpoint}/bookmark/${talentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
        context.commit("setIsBookmarked", data.status);
    },
    async getBookmarks(context) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/bookmarks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
        context.commit("setBookmarks", data);
    },
    async bookmark(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const talentId = payload.talentId;

        const result = await fetch(`${apiEndpoint}/bookmark/${talentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async unbookmark(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const talentId = payload.talentId;

        const result = await fetch(`${apiEndpoint}/bookmark/${talentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
};
