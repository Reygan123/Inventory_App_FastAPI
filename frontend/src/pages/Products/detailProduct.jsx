import { useState, useEffect } from "react";
import { get_product } from "../../fetching/product";
import { read_productCategory } from "../../fetching/product_category";
import { read_productWarehouse } from "../../fetching/product_warehouse";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const DetailProduct = () => {
    const { id } = useParams();
    const [product, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [warehouse, setWarehouse] = useState([])
    const navigate = useNavigate()

    const fetchProducts = async () => {
        try {
            const product = await get_product(id)
            setProducts(product.data)
            console.log("Detail>>>>>", product.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProductWarehouse = async () => {
        try {
            const warehouse = await read_productWarehouse(id);
            setWarehouse(warehouse.data)
            console.log("Warehouse>>", warehouse.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProductCategory = async () => {
        try {
            const category = await read_productCategory(id);
            setCategory(category)
            console.log("Category>>>>", category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchProductCategory();
        fetchProductWarehouse()
    }, [id]);

    return <>
        <div className="flex">
            <Navbar />
            <div className="text-xs md:text-sm lg:text-xs 2xl:text-md m-4 w-full">
                <h2 className='text-sm md:text-md lg:text-lg 2xl:text-lg font-bold text-center mb-6'>Detail Produk</h2>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className="w-1/2 flex flex-col justify-center items-center gap-4">
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{product.name}</div>
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{product.stok}</div>
                        <h2 className='text-sm md:text-md lg:text-lg 2xl:text-lg font-bold text-center my-2'>Kategori</h2>
                        {category.data?.map((category) => (
                            <div className="w-full flex flex-col justify-center items-center gap-4" key={category.id}>
                                <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{category.category_detail.category_name}</div>
                            </div>
                        ))}
                        <h2 className='text-sm md:text-md lg:text-lg 2xl:text-lg font-bold text-center my-2'>Lokasi Gudang</h2>
                        {warehouse.map((warehouse) => (
                            <div className="w-full flex flex-col justify-center items-center gap-4" key={warehouse.id}>
                                <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{warehouse.warehouse_detail.warehouse_name}</div>
                            </div>
                        ))}
                        <div className="w-full flex justify-between gap-4">
                            <button className="w-full py-3 bg-green-500 rounded-md text-white font-bold">Edit</button>
                            <button className="w-full py-3 bg-red-500 rounded-md text-white font-bold">Hapus</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DetailProduct