import { useState, useEffect } from "react";
import { get_supplyOrder, update_supplyOrder } from "../../fetching/supply_order";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const DetailSupplyOrder = () => {
    const { id } = useParams();
    const [supplyOrder, setSupplyOrder] = useState([]);
    const [newStatus, setNewStatus] = useState("");
    const navigate = useNavigate();

    const fetchSupplyOrder = async () => {
        try {
            const supplyOrder = await get_supplyOrder(id);
            setSupplyOrder(supplyOrder.data);
            console.log(supplyOrder.data);
            setNewStatus(supplyOrder.data.status)
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
                await update_supplyOrder(id, payload);
                fetchSupplyOrder();
            } else {
                console.log("Pilih status baru untuk mengedit.");
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchSupplyOrder();
    }, [id]);

    const supplierName = supplyOrder.supplier_detail?.supplier_name;
    const warehouseName = supplyOrder.warehouse_detail?.warehouse_name;


    return (
        <>
            <div className="flex">
                <Navbar />
                <div className="text-xs md:text-sm lg:text-xs 2xl:text-md m-4 w-full flex flex-col justify-center items-center">
                    <div className="w-3/4">
                        <h2 className='text-lg md:text-lg lg:text-xl 2xl:text-2xl font-bold text-center mb-6'>Detail Supply Order</h2>
                        <div className='grid grid-cols-2 gap-4 w-full'>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Invoice</label>
                                <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{supplyOrder.invoice}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Total Harga</label>
                                <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{supplyOrder.total_price}</div>
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-semibold mb-2">Status</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="shadow-md w-full py-3 px-3 bg-white rounded-md"
                                >
                                    <option value="">Pilih Status...</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Success">Success</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Supplier</label>
                                {/* <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{supplyOrder.supplier_detail.supplier_name}</div> */}
                                <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{supplierName}</div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Gudang</label>
                                {/* <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{supplyOrder.warehouse_detail.warehouse_name}</div> */}
                                <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{warehouseName}</div>
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

export default DetailSupplyOrder;
