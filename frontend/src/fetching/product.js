import instance from "../lib/axios";

export async function create_product(payload) {
    try {
        const response = await instance.post(`/products/`, (payload));
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_product() {
    try {
        const response = await instance.get(`/products/`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_product(id) {
    try {
        const response = await instance.get(`/products/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_product(id, payload) {
    try {
        const response = await instance.put(`/products/${id}`, payload);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_product(id) {
    try {
        const response = await instance.delete(`/products/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}