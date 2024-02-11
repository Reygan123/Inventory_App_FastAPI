import instance from "../lib/axios";

export async function create_category(payload) {
    try {
        const response = await instance.post(`/category/`, (payload));
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_category() {
    try {
        const response = await instance.get(`/category/`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_category(id) {
    try {
        const response = await instance.get(`/category/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_category(id, payload) {
    try {
        const response = await instance.put(`/category/${id}`, (payload));
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_category(id) {
    try {
        const response = await instance.delete(`/category/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}