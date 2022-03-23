export default {
    async getTalentTransactions(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;

        const result = await fetch(
            `${apiEndpoint}/transaction/talent?skip=${skip}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setTransactions", data);
    },
    async getAllTransactions(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const skip = payload.skip;
        const limit = payload.limit;
        const status = payload.status;
        let result;

        if (status) {
            result = await fetch(
                `${apiEndpoint}/transaction/get-all?skip=${skip}&limit=${limit}&status=${status}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } else {
            result = await fetch(`${apiEndpoint}/transaction/get-all?skip=${skip}&limit=${limit}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        const data = await result.json();
        if (!result.ok || result.status !== 200) throw new Error(data.message);

        context.commit("setTransactions", data);
    },
    async newTransaction(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];

        const result = await fetch(`${apiEndpoint}/transaction/new`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
    async editTransaction(context, payload) {
        const apiEndpoint = context.rootGetters.api;
        const token = context.rootGetters["auth/getToken"];
        const status = payload.status;
        const id = payload.id;

        const result = await fetch(`${apiEndpoint}/transaction/edit/${id}?status=${status}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        if (!result.ok || result.status !== 201) throw new Error(data.message);
    },
};
