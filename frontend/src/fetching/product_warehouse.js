import instance from "../lib/axios";

export async function create_productWarehouse(payload) {
    try {
        const response = await instance.post(`/product-warehouse/`, (payload));
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_productWarehouse(product_id) {
    try {
        const response = await instance.get(`/product-warehouse/?product_id=${product_id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function read_productWarehouse2(warehouse_id) {
    try {
        const response = await instance.get(`/product-warehouse/?warehouse_id=${warehouse_id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function get_productWarehouse(id) {
    try {
        const response = await instance.get(`/product-warehouse/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function update_productWarehouse(id, payload) {
    try {
        const response = await instance.put(`/product-warehouse/${id}`, (payload));
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function delete_productWarehouse(id) {
    try {
        const response = await instance.delete(`/product-warehouse/${id}`);
        const data = response.data
        return data;
    } catch (error) {
        console.log(error)
    }
}