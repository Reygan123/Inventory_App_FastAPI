import React, { useState, useEffect } from 'react';
import { read_product, update_product } from '../../fetching/product';
import { read_warehouse } from '../../fetching/warehouse';
import { read_supplier } from '../../fetching/supplier';
import { read_order, delete_order, create_order } from '../../fetching/order';
import { read_productWarehouse2 } from '../../fetching/product_warehouse';
import { create_supplyItem } from '../../fetching/supply_item';
import { create_supplyOrder } from '../../fetching/supply_order';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Delete from '../../assets/trash.png'
import Alert from '../../assets/warning.png'
import Input from '../../components/Input';
import { create_orderProduct } from '../../fetching/order_product';

const Order = () => {
    const [order, setOrder] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [idOrder, setIdOrder] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [product, setProduct] = useState([])
    const [warehouse, setWarehouse] = useState([])
    const [supplier, setSupplier] = useState([])
    const [productWarehouse, setProductWarehouse] = useState([])
    const [value, setValue] = useState()
    const [price, setPrice] = useState(100000)
    const [invoice, setInvoice] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [selectedWarehouse, setSelectedWarehouse] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(1)
    const [selectedProduct, setSelectedProduct] = useState(0)
    const [selectedSupplier, setSelectedSupplier] = useState([])
    const [status, setStatus] = useState('Packing')
    const [stok, setStok] = useState()
    const [inputError, setInputError] = useState(false);
    const navigate = useNavigate()

    const fetchOrder = async () => {
        try {
            const order = await read_order();
            setOrder(order.data);
            console.log("Respons", order.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProduct = async () => {
        try {
            const products = await read_product();
            setProduct(products.data);
            console.log("Produk", products.data);

            const selectedProductObject = products.data.find((item) => item.name === selectedProduct);
            if (selectedProductObject) {
                setStok(selectedProductObject.stok);
            } else {
                setStok(undefined);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchWarehouse = async () => {
        try {
            const warehouse = await read_warehouse()
            setWarehouse(warehouse.data)
            console.log("Warehouse", warehouse.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchSupplier = async () => {
        try {
            const supplier = await read_supplier()
            setSupplier(supplier.data)
            console.log("Supplier", supplier.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProductWarehouse = async () => {
        try {
            const warehouseID = await getWarehouseIdByName(selectedWarehouse);
            console.log(warehouseID);

            const productWarehouse = await read_productWarehouse2(warehouseID);
            setProductWarehouse(productWarehouse.data)
            console.log("Produk Warehouse >>>", productWarehouse.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getSupplierIdByName = (name) => {
        const supplierName = supplier.find((cat) => cat.company_name === name);
        return supplierName ? supplierName.id : null;
    };

    const handleDropdownSupplierChange = (event) => {
        const selectedSupplierName = event.target.value;
        setSelectedSupplier(selectedSupplierName);

        setInputError(false);
    };

    const getWarehouseIdByName = (name) => {
        const productName = warehouse.find((cat) => cat.title === name);
        return productName ? productName.id : null;
    };

    const handleDropdownWarehouseChange = (event) => {
        const selectedWarehouseName = event.target.value;
        setSelectedWarehouse(selectedWarehouseName);
    };

    const getProductIdByName = (name) => {
        const productName = product.find((cat) => cat.name === name);
        return productName ? productName.id : null;
    };

    const handleDropdownProductChange = (event) => {
        const selectedProductName = event.target.value;
        setSelectedProduct(selectedProductName);

        setInputError(false);
    };

    useEffect(() => {
        fetchOrder();
        fetchProduct();
        fetchWarehouse();
        fetchSupplier();
        fetchProductWarehouse();
    }, []);

    useEffect(() => {
        if (selectedWarehouse) {
            fetchProductWarehouse();
        }
    }, [selectedWarehouse]);

    const handleDelete = async () => {
        try {
            await delete_order(idOrder)
            setIsOpen(false);
            await fetchOrder();
        } catch (error) {
            console.log(error)
        }
    }

    const detailProduct = (id) => {
        navigate(`/order/${id}`)
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

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);

        const selectedProductObject = product.find((item) => item.name === selectedProduct);
        const availableStock = selectedProductObject ? selectedProductObject.stok : 0;

        if (parseInt(inputValue, 10) > availableStock) {
            setInputError(true);
        } else {
            setInputError(false);
            const calculatedTotalPrice = parseInt(inputValue, 10) * price;
            setTotalPrice(calculatedTotalPrice);
        }
    };


    const generateInvoiceNumber = (userId) => {
        const timestamp = Date.now();
        const invoiceNumber = `${userId}${timestamp}`;
        return invoiceNumber;
    };

    const handleSubmit = async () => {
        try {
            const warehouseID = getWarehouseIdByName(selectedWarehouse);
            console.log(warehouseID);

            const payload = {
                invoice: invoice,
                total_price: totalPrice,
                customer_id: selectedCustomer,
                warehouse_id: warehouseID,
                status: status,
                created_at: Date.now(),
                updated_at: Date.now(),
            };
            const response = await create_order(payload);
            console.log(response, "<<<<<<<<<<<<<<<")
            console.log(response.data.id);

            const productId = getProductIdByName(selectedProduct);
            console.log(productId);

            const payloadOrderProduct = {
                order_id: response.data.id,
                product_id: productId
            }

            const responseProduct = await create_orderProduct(payloadOrderProduct)
            console.log(responseProduct)

            const supplierId = getSupplierIdByName(selectedSupplier);
            console.log(supplierId);

            const payloadSupplyOrder = {
                invoice: invoice,
                total_price: totalPrice,
                supplier_id: selectedCustomer,
                warehouse_id: warehouseID,
                status: status,
                created_at: Date.now(),
                updated_at: Date.now(),
            }

            const responseSupplyOrder = await create_supplyOrder(payloadSupplyOrder)
            console.log(responseSupplyOrder)

            const payloadSupplyItem = {
                product_id: productId,
                supply_order_id: responseSupplyOrder.data.id
            }

            const responseSupplyItem = await create_supplyItem(payloadSupplyItem)
            console.log(responseSupplyItem)

            console.log("Original Stok:", value);

            const parsedStok = parseInt(value, 10);

            console.log("Parsed Stok:", parsedStok);

            if (isNaN(parsedStok)) {
                console.error("Error: Stok should be a valid integer");
                return;
            }

            const payloadStok = {
                stok: Math.max(stok - value, 0)
            };

            const responseStok = await update_product(productId, payloadStok);
            console.log(responseStok);

            setIsOpenAdd(false)
            await fetchOrder()
        } catch (error) {
            console.log(error)
        }
    }

    console.log(stok)

    return <>
        <div className='flex w-full'>
            <Navbar />
            <div className='text-xs md:text-sm lg:text-xs 2xl:text-md m-4 w-full'>
                <div className='flex justify-between w-full my-2'>
                    <h2 className='text-sm md:text-md lg:text-lg 2xl:text-lg font-bold'>List Order</h2>
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='w-44 px-2 py-2 shadow-md rounded-md bg-white text-gray-400'>Search..</div>
                        <button onClick={toggleAdd} className='px-6 py-2 shadow-md bg-sky-500 rounded-md text-white font-semibold'>Tambah</button>
                    </div>
                </div>
                <table className="w-full bg-white shadow-md text-center">
                    <thead>
                        <tr className='text-center'>
                            <th className="py-2 px-4 ">Invoice</th>
                            {/* <th className="py-2 px-4 ">Nama</th> */}
                            <th className="py-2 px-4 ">Gudang</th>
                            <th className="py-2 px-4 ">Total Harga</th>
                            <th className="py-2 px-4 ">Status</th>
                            <th className="py-2 px-4 ">Detail</th>
                            <th className="py-2 px-4 "></th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item) => (
                            <tr className='text-center' key={item.id}>
                                <td className="py-2 px-4 ">{item.invoice}</td>
                                <td className="py-2 px-4 ">{item.warehouse_detail.warehouse_name}</td>
                                <td className="py-2 px-4 ">{item.total_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                <td className="py-2 px-4 ">{item.status}</td>
                                <td className="py-2 px-4 "><button className='px-4 py-2 border border-gray-500 rounded-md text-gray-500 font-semibold' onClick={() => detailProduct(item.id)}>Detail</button></td>
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

            {isOpenAdd && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>


                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                        <div className="relative p-4 rounded-md bg-white flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 w-2/6">
                            <h1 className='font-bold text-sm md:text-md lg:text-md 2xl:text-lg mb-4'>Buat Pesanan</h1>
                            <div className='w-3/4 flex flex-col justify-center items-center gap-4'>
                                <select
                                    value={selectedWarehouse}
                                    onChange={handleDropdownWarehouseChange}
                                    className="border py-2 border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-sm w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                                >
                                    <option value="">Pilih Gudang...</option>
                                    {warehouse.map((item) => (
                                        <option key={item.id} value={item.title}>
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={selectedProduct}
                                    onChange={handleDropdownProductChange}
                                    className="border py-2 border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-sm w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                                >
                                    <option value="">Pilih Produk...</option>
                                    {productWarehouse.map((item) => (
                                        <option key={item.id} value={item.product_detail.product_name}>
                                            {item.product_detail.product_name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={selectedSupplier}
                                    onChange={handleDropdownSupplierChange}
                                    className="border py-2 border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-sm w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                                >
                                    <option value="">Pilih Supplier...</option>
                                    {supplier.map((item) => (
                                        <option key={item.id} value={item.company_name}>
                                            {item.company_name}
                                        </option>
                                    ))}
                                </select>
                                <Input
                                    type="number"
                                    value={value}
                                    onChange={handleInputChange}
                                    placeholder="Banyak Produk"
                                    className={inputError ? 'border border-red-500' : ''}
                                />
                                {inputError && (
                                    <p className="text-red-500 text-xs md:text-sm lg:text-xs 2xl:text-md">Stok tidak mencukupi untuk jumlah yang dimasukkan.</p>
                                )}
                                <Input
                                    type="text"
                                    value={totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    readOnly
                                    placeholder="Total Harga"
                                />
                            </div>
                            <div className='flex gap-4 mt-6 text-sm md:text-md lg:text-md 2xl:text-lg'>
                                <button onClick={handleSubmit} className='px-10 py-2 bg-green-500 rounded-md text-white font-semibold'>Kirim</button>
                                <button onClick={toggleAdd} className='px-10 py-2 border border-gray-500 rounded-md text-gray-500 font-semibold'>Batal</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    </>
};

export default Order;
