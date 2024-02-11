import instance from "../lib/axios";

export async function create_orderProduct(payload) {
    try {
        const response = await instance.post(`/order-products/`, (payload));
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_orderProduct(order_id) {
    try {
        const response = await instance.get(`/order-products/?order_id=${order_id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_orderProduct(id) {
    try {
        const response = await instance.get(`/order-products/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_orderProduct(id, payload) {
    try {
        const response = await instance.put(`/order-products/${id}`, (payload));
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_orderProduct(id) {
    try {
        const response = await instance.delete(`/order-products/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}