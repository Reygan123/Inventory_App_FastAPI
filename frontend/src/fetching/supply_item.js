import instance from "../lib/axios";

export async function create_supplyItem(payload) {
    try {
        const response = await instance.post(`/supply-item/`, (payload));
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_supplyItem(supply_order_id) {
    try {
        const response = await instance.get(`/supply-item/?supply_order_id=${supply_order_id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_supplyItem(id) {
    try {
        const response = await instance.get(`/supply-item/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_supplyItem(id, payload) {
    try {
        const response = await instance.put(`/supply-item/${id}`, payload);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_supplyItem(id) {
    try {
        const response = await instance.delete(`/supply-item/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}