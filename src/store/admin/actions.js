import axios from "axios";
export default {
    async getCategories(context) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/admin/category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok) throw new Error(data.message);

        context.commit("setCategories", data.categories);
    },
    async newCategory(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/admin/category`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async editCategory(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const data2 = payload.data;
        const categoryId = payload.categoryId;

        const result = await fetch(`${apiEndpoint}/admin/category/${categoryId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data2,
        });

        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async deleteCategory(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const categoryId = payload.categoryId;

        const result = await fetch(`${apiEndpoint}/admin/category/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
    },
    // MANAGE TALENTS
    async addTalent(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/admin/talent`, {
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
    async getPendingTalents(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(
            `${apiEndpoint}/admin/talent/pending?skip=${skip}&limit=${limit}`,
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

        context.commit("setPendingTalents", data);
    },
    async getAcceptedTalents(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(
            `${apiEndpoint}/admin/talent/accepted?skip=${skip}&limit=${limit}`,
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

        context.commit("setAcceptedTalents", data);
    },
    async deleteTalent(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const talentId = payload.talentId;

        const result = await fetch(`${apiEndpoint}/admin/talent/${talentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);
    },
    async acceptTalent(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const talentId = payload.talentId;
        const categoryId = payload.categoryId;
        const comission = payload.comission;

        const result = await fetch(`${apiEndpoint}/admin/talent/${talentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                categoryId,
                comission,
            }),
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async editTalent(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const talentId = payload.talentId;
        const categoryId = payload.categoryId;
        const followers = payload.followers;
        const comission = payload.comission;

        const result = await fetch(`${apiEndpoint}/admin/talent/edit/${talentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                categoryId,
                followers,
                comission,
            }),
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async searchTalent(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const query = payload.query;

        const result = await fetch(`${apiEndpoint}/admin/talent/search?query=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok) throw new Error(data.message);
        context.commit("setAcceptedTalents", data);
    },
    async getAllRequests(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/admin/requests?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok) throw new Error(data.message);

        context.commit("setAllRequests", data);
    },
    async editRequest(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;
        const data = payload.data;

        const result = await fetch(`${apiEndpoint}/admin/edit-request/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const data2 = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data2.message);
    },
    async deleteRequest(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;

        const result = await fetch(`${apiEndpoint}/admin/delete-request/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data2 = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data2.message);
    },
    async downloadVideo(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const orderId = payload.orderId;

        const response = await axios.get(
            `${apiEndpoint}/admin/requests/download-video/${orderId}`,
            {
                responseType: "blob",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.data.error) {
            console.error(response.data.error);
        }
        return response;
    },
    async searchRequests(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const query = payload.query;

        const result = await fetch(`${apiEndpoint}/admin/requests/search?query=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok) throw new Error(data.message);
        context.commit("setAllRequests", data);
    },
    async filterRequests(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;
        const status = payload.status;

        const result = await fetch(
            `${apiEndpoint}/admin/requests/filter?status=${status}&skip=${skip}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await result.json();
        if (!result.ok) throw new Error(data.message);
        context.commit("setAllRequests", data);
    },
    async getArticles(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/admin/articles?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data.message);
        context.commit("setArticles", data);
    },
    async newArticle(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/admin/articles`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
        });
        const data = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data.message);
    },
    async editArticle(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const articleId = payload.articleId;

        const result = await fetch(`${apiEndpoint}/admin/articles/${articleId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload.data,
        });
        const data = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data.message);
    },
    async deleteArticle(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const articleId = payload.articleId;

        const result = await fetch(`${apiEndpoint}/admin/articles/${articleId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data.message);
    },
    async getUsers(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(`${apiEndpoint}/admin/users?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok && result.status !== 200) throw new Error(data.message);
        context.commit("setUsers", data);
    },
    async editUser(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const userId = payload.userId;
        const name = payload.name;
        const email = payload.email;

        const result = await fetch(`${apiEndpoint}/admin/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                email,
            }),
        });
        const data = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data.message);
    },
    async deleteUser(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const userId = payload.userId;

        const result = await fetch(`${apiEndpoint}/admin/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data.message);
    },
    async addAdmin(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const name = payload.name;
        const email = payload.email;
        const password = payload.password;

        const result = await fetch(`${apiEndpoint}/admin/new-admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, password, email }),
        });
        const data = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data.message);
    },
    async editAdmin(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const name = payload.name;
        const email = payload.email;
        const password = payload.password;

        const result = await fetch(`${apiEndpoint}/admin/edit-admin`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, password, email }),
        });
        const data = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data.message);
    },
    async updateGetawaySettings(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const publicK = payload.public;
        const secret = payload.secret;

        const result = await fetch(`${apiEndpoint}/admin/getaway`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ public: publicK, secret }),
        });
        const data = await result.json();
        if (!result.ok && result.status !== 201) throw new Error(data.message);
    },
    async getTalentAllInfo(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const talentId = payload.talentId;

        const result = await fetch(`${apiEndpoint}/admin/talent-all-info/${talentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await result.json();
        if (!result.ok && result.status !== 200) throw new Error(data.message);
        context.commit("setTalentAllInfo", data);
    },
};
