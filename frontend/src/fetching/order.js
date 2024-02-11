import instance from "../lib/axios";

export async function create_order(payload) {
    try {
        const response = await instance.post(`/order/`, (payload));
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_order() {
    try {
        const response = await instance.get(`/order/`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_order(id) {
    try {
        const response = await instance.get(`/order/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_order(id, payload) {
    try {
        const response = await instance.put(`/order/${id}`, payload);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_order(id) {
    try {
        const response = await instance.delete(`/order/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}