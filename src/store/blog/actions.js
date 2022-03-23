export default {
    async newPost(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const deviceId = context.rootGetters["auth/getUserAgent"];
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/app/posts/create`, {
            method: "POST",
            headers: {
                "device-id": deviceId,
                "Content-Type": "application/json",
                token,
            },
            body: JSON.stringify(payload),
        });

        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
    },
    async updatePost(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const deviceId = context.rootGetters["auth/getUserAgent"];
        const token = context.rootGetters["auth/getToken"];
        const postId = payload.postId;

        const result = await fetch(`${apiEndpoint}/app/posts/update/${postId}`, {
            method: "PUT",
            headers: {
                "device-id": deviceId,
                "Content-Type": "application/json",
                token,
            },
            body: JSON.stringify(payload),
        });

        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
    },
    async deletePost(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const deviceId = context.rootGetters["auth/getUserAgent"];
        const token = context.rootGetters["auth/getToken"];
        const postId = payload;

        const result = await fetch(`${apiEndpoint}/app/posts/del/${postId}`, {
            method: "DELETE",
            headers: {
                "device-id": deviceId,
                "Content-Type": "application/json",
                token,
            },
        });

        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
    },
    async getUserPosts(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const deviceId = context.rootGetters["auth/getUserAgent"];
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/app/posts/my-post?limit=${limit}&skip=${skip}`, {
            method: "GET",
            headers: {
                "device-id": deviceId,
                "Content-Type": "application/json",
                token,
            },
        });

        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setUserPosts", { data: data.payload, totalItems: data.count });
    },
    async getSinglePost(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const deviceId = context.rootGetters["auth/getUserAgent"];
        const token = context.rootGetters["auth/getToken"];
        const postId = payload;

        const result = await fetch(`${apiEndpoint}/app/posts/get/${postId}`, {
            method: "GET",
            headers: {
                "device-id": deviceId,
                "Content-Type": "application/json",
                token,
            },
        });

        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setSinglePost", data.payload);
    },
    async getFollowingPosts(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const deviceId = context.rootGetters["auth/getUserAgent"];
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(
            `${apiEndpoint}/app/posts/following-post?skip=${skip}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "device-id": deviceId,
                    "Content-Type": "application/json",
                    token,
                },
            }
        );

        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setFollowingPost", { data: data.payload, count: data.count });
    },
    async likePost(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const deviceId = context.rootGetters["auth/getUserAgent"];
        const token = context.rootGetters["auth/getToken"];
        const postId = payload.id;

        const result = await fetch(`${apiEndpoint}/app/posts/like`, {
            method: "PUT",
            headers: {
                "device-id": deviceId,
                "Content-Type": "application/json",
                token,
            },
            body: JSON.stringify({ _id: postId }),
        });

        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
    },
};
