import instance from "../lib/axios";

export async function create_warehouse(payload) {
    try {
        const response = await instance.post(`/warehouse/`, (payload));
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_warehouse() {
    try {
        const response = await instance.get(`/warehouse/`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_warehouse(id) {
    try {
        const response = await instance.get(`/warehouse/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_warehouse(id) {
    try {
        const response = await instance.put(`/warehouse/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_warehouse(id) {
    try {
        const response = await instance.delete(`/warehouse/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}