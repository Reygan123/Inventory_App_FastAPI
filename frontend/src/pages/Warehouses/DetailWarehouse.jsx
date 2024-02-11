import { useState, useEffect } from "react";
import { get_warehouse } from "../../fetching/warehouse";
import { read_productWarehouse2 } from "../../fetching/product_warehouse";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const DetailWarehouse = () => {
    const { id } = useParams();
    const [warehouse, setWarehouse] = useState([])
    const [productWarehouse, setProductWarehouse] = useState([])

    const detailWarehouse = async () => {
        try {
            const warehouse = await get_warehouse(id)
            setWarehouse(warehouse.data)
            console.log("Detail>>>>>", warehouse.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fecthProductWarehouse = async () => {
        try {
            const productWarehouse = await read_productWarehouse2(id)
            setProductWarehouse(productWarehouse.data)
            console.log(productWarehouse.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        detailWarehouse();
        fecthProductWarehouse();
    }, [id]);

    const detailProduct = (id) => {
        navigate(`/products/${id}`)
    }

    return <>
        <div className="flex">
            <Navbar />
            <div className="text-xs md:text-sm lg:text-xs 2xl:text-md m-4 w-full">
                <h2 className='text-sm md:text-md lg:text-lg 2xl:text-lg font-bold text-center my-2'>List Gudang</h2>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className="w-1/2 flex flex-col justify-center items-center gap-4">
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{warehouse.title}</div>
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{warehouse.address}</div>
                        <div className="w-full flex justify-between gap-4">
                            <button className="w-full py-3 bg-green-500 rounded-md text-white font-bold">Edit</button>
                            <button className="w-full py-3 bg-red-500 rounded-md text-white font-bold">Hapus</button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between w-full mt-8 mb-4'>
                    <h2 className='text-sm md:text-md lg:text-lg 2xl:text-lg font-bold text-center my-2'>List Produk</h2>
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='w-44 px-2 py-2 shadow-md rounded-md bg-white text-gray-400'>Search..</div>
                    </div>
                </div>
                <table className="w-full bg-white shadow-md text-center">
                    <thead>
                        <tr className='text-center'>
                            <th className="py-2 px-4 ">ID</th>
                            <th className="py-2 px-4 ">Nama</th>
                            <th className="py-2 px-4 ">Harga</th>
                            <th className="py-2 px-4 ">Stok</th>
                            <th className="py-2 px-4 ">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productWarehouse.map((product) => (
                            <tr className="text-center" key={product.id}>
                                <td className="py-2 px-4">{product.product_detail.product_id}</td>
                                <td className="py-2 px-4">{product.product_detail.product_name}</td>
                                <td className="py-2 px-4">{product.product_detail.product_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                <td className="py-2 px-4">{product.product_detail.product_stok}</td>
                                <td className="py-2 px-4 "><button className='px-4 py-2 border border-gray-500 rounded-md text-gray-500 font-semibold' onClick={() => detailProduct(item.id)}>Detail</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default DetailWarehouse