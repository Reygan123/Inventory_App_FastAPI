import instance from "../lib/axios";

export async function create_productCategory(payload) {
    try {
        const response = await instance.post(`/product-category`, (payload));
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_productCategory(product_id) {
    try {
        const response = await instance.get(`/product-category/?product_id=${product_id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_productCategory(id) {
    try {
        const response = await instance.get(`/product-category/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_productCategory(id, payload) {
    try {
        const response = await instance.put(`/product-category/${id}`, (payload));
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_productCategory(id) {
    try {
        const response = await instance.delete(`/product-category/${id}`);
        const data = response.data
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}