import { useState, useEffect } from "react";
import { get_order, update_order } from "../../fetching/order";
import { read_orderProduct } from "../../fetching/order_product";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const DetailOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [product, setProduct] = useState([]);
    const [newStatus, setNewStatus] = useState("");
    const navigate = useNavigate();

    console.log(newStatus)

    const fetchOrder = async () => {
        try {
            const order = await get_order(id);
            setOrder(order.data);
            console.log("Order", order.data);
            setNewStatus(order.data.status)
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOrderProduct = async () => {
        try {
            const product = await read_orderProduct(id);
            setProduct(product.data);
            console.log(product.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async () => {
        try {
            if (newStatus) {
                const payload = {
                    status: newStatus,
                }
                await update_order(id, payload);
                fetchOrderProduct();
            } else {
                console.log("Pilih status baru untuk mengedit.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrder();
        fetchOrderProduct();
    }, [id]);

    return (
        <>
            <div className="flex">
                <Navbar />
                <div className="text-xs md:text-sm lg:text-xs 2xl:text-md m-4 w-full flex flex-col justify-center items-center">
                    <div className="w-3/4">
                        <h2 className='text-lg md:text-lg lg:text-xl 2xl:text-2xl font-bold text-center mb-6'>Detail Order</h2>
                        <div className='grid grid-cols-2 gap-4 w-full'>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Invoice</label>
                                <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{order.invoice}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Total Harga</label>
                                <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{order.total_price}</div>
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-semibold mb-2">Status</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="shadow-md w-full py-3 px-3 bg-white rounded-md"
                                >
                                    <option value="">Pilih Status...</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipping">Shipping</option>
                                    <option value="Success">Success</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Produk</label>
                                {product.map((item) => (
                                    <div className="w-full" key={item.id}>
                                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{item.product_detail.product_name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full flex justify-between gap-4 mt-6">
                            <button className="w-full py-3 bg-green-500 rounded-md text-white font-bold" onClick={handleEdit}>
                                Edit
                            </button>
                            <button className="w-full py-3 bg-red-500 rounded-md text-white font-bold">Hapus</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailOrder;
