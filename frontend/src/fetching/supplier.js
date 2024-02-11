import instance from "../lib/axios";

export async function create_supplier(payload) {
    try {
        const response = await instance.post(`/supplier/`, (payload));
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_supplier() {
    try {
        const response = await instance.get(`/supplier/`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_supplier(id) {
    try {
        const response = await instance.get(`/supplier/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_supplier(id, payload) {
    try {
        const response = await instance.put(`/supplier/${id}`, (payload));
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_supplier(id) {
    try {
        const response = await instance.delete(`/supplier/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}