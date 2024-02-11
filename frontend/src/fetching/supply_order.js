import instance from "../lib/axios";

export async function create_supplyOrder(payload) {
    try {
        const response = await instance.post(`/supply-order/`, (payload));
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_supplyOrder() {
    try {
        const response = await instance.get(`/supply-order/`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_supplyOrder(id) {
    try {
        const response = await instance.get(`/supply-order/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_supplyOrder(id, payload) {
    try {
        const response = await instance.put(`/supply-order/${id}`, payload);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_supplyOrder(id) {
    try {
        const response = await instance.delete(`/supply-order/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}