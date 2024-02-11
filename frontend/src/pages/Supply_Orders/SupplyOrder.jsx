import { useState, useEffect } from "react";
import { read_supplyOrder, delete_supplyOrder } from "../../fetching/supply_order";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Delete from '../../assets/trash.png'

const SupplyOrder = () => {
    const [supplyOrder, setSupplyOrder] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [idOrder, setIdOrder] = useState('');
    const navigate = useNavigate()

    const fetchSupplyOrder = async () => {
        try {
            const supplyOrder = await read_supplyOrder();
            setSupplyOrder(supplyOrder.data)
            console.log(supplyOrder.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSupplyOrder();
    }, [])

    const detailSupplyOrder = (id) => {
        navigate(`/supply-order/${id}`)
    }

    const handleDelete = async () => {
        try {
            await delete_supplyOrder(idOrder)
            setIsOpen(false);
            await fetchOrder();
        } catch (error) {
            console.log(error)
        }
    }

    const toggleDelete = (id) => {
        setIdOrder(id);
        setIsOpen(!isOpen);
    };

    const toggleAdd = () => {
        setIsOpenAdd(!isOpenAdd);

        const userId = 1;
        const newInvoiceNumber = generateInvoiceNumber(userId);
        setInvoice(newInvoiceNumber);
    };

    return <>
        <div className="flex">
            <Navbar />
            <div className='text-xs md:text-sm lg:text-xs 2xl:text-md m-4 w-full'>
                <div className='flex justify-between w-full my-2'>
                    <h2 className='text-sm md:text-md lg:text-lg 2xl:text-lg font-bold'>List Supply Order</h2>
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='w-44 px-2 py-2 shadow-md rounded-md bg-white text-gray-400'>Search..</div>
                    </div>
                </div>
                <table className="w-full bg-white shadow-md text-center">
                    <thead>
                        <tr className='text-center'>
                            <th className="py-2 px-4 ">Invoice</th>
                            <th className="py-2 px-4 ">Supplier</th>
                            <th className="py-2 px-4 ">Gudang</th>
                            <th className="py-2 px-4 ">Total Harga</th>
                            <th className="py-2 px-4 ">Status</th>
                            <th className="py-2 px-4 ">Detail</th>
                            <th className="py-2 px-4 "></th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplyOrder.map((item) => (
                            <tr className='text-center' key={item.id}>
                                <td className="py-2 px-4 ">{item.invoice}</td>
                                <td className="py-2 px-4 ">{item.supplier_detail.supplier_name}</td>
                                <td className="py-2 px-4 ">{item.warehouse_detail.warehouse_name}</td>
                                <td className="py-2 px-4 ">{item.total_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                <td className="py-2 px-4 ">{item.status}</td>
                                <td className="py-2 px-4 "><button className='px-4 py-2 border border-gray-500 rounded-md text-gray-500 font-semibold' onClick={() => detailSupplyOrder(item.id)}>Detail</button></td>
                                <td className="py-2 px-4 "><button onClick={() => toggleDelete(item.id)}><span><img className='w-6' src={Delete} alt="" /></span></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isOpen && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>

                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative py-4 px-10 rounded-md bg-white flex flex-col justify-center items-center">
                            <img className='w-10 my-2 2xl:w-8' src={Alert} alt="" />
                            <h1 className='font-bold text-sm md:text-md lg:text-md 2xl:text-lg'>Apakah Kamu Yakin?</h1>
                            <p className='mt-2 text-xs md:text-sm lg:text-xs 2xl:text-md'>Data akan hilang</p>
                            <div className='flex justify-between mt-2 text-sm md:text-md lg:text-md 2xl:text-lg'>
                                <button onClick={handleDelete} className='px-4 mr-4 py-2 bg-red-500 rounded-md text-white font-semibold'>Hapus</button>
                                <button onClick={toggleDelete} className='px-4 py-2 border border-gray-500 rounded-md text-gray-500 font-semibold'>Batal</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    </>
}

export default SupplyOrder