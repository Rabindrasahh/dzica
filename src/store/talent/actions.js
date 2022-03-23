export default {
    async talentJoin(context, payload) {
        const name = payload.name;
        const email = payload.email;
        const nickName = payload.nickName;
        const followers = payload.followers;
        const socialNetwork = payload.socialNetwork;
        const socialNetworkLink = payload.socialNetworkLink;
        const phoneNumber = payload.phoneNumber;
        const description = payload.description;
        const apiEndpoint = context.rootGetters.api;

        const result = await fetch(`${apiEndpoint}/talent/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                nickName,
                followers,
                socialNetwork,
                socialNetworkLink,
                phoneNumber,
                description,
            }),
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async getTalent(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const talentId = payload.talentId;

        const result = await fetch(`${apiEndpoint}/talent/${talentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setTalent", data);
    },
    async getAllTalents(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/talent/talents?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setAllTalents", data);
    },
    async searchTalents(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const query = payload.query;

        const result = await fetch(`${apiEndpoint}/talent/search?query=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setAllTalents", data);
    },
    async searchTalentsByCategory(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const category = payload.category;

        const result = await fetch(`${apiEndpoint}/talent/category-search?category=${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setAllTalents", data);
    },
    async getMyProfile(context) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/talent/myself`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setMyProfile", data);
    },
    async updateMyProfile(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/talent/update-myself`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async updateIntroVideo(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/talent/update-intro-video`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async getPendingRequests(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(
            `${apiEndpoint}/talent/pending-requests?skip=${skip}&limit=${limit}`,
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

        context.commit("setPendingRequests", data);
    },
    async getCompletedRequests(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(
            `${apiEndpoint}/talent/completed-requests?skip=${skip}&limit=${limit}`,
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

        context.commit("setCompletedRequests", data);
    },
    async getRejectedRequests(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(
            `${apiEndpoint}/talent/rejected-requests?skip=${skip}&limit=${limit}`,
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

        context.commit("setRejectedRequests", data);
    },
    async uploadVideo(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;

        const result = await fetch(`${apiEndpoint}/talent/upload-video/${orderId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload.data,
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async acceptPendingRequest(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;

        const result = await fetch(`${apiEndpoint}/talent/accept-request/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async rejectPendingRequest(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;

        const result = await fetch(`${apiEndpoint}/talent/reject-request/${orderId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async getMyReviews(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/talent/my-reviews?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setMyReviews", data);
    },
    async getMyVideos(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/talent/my-videos?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setMyVideos", data);
    },
};
