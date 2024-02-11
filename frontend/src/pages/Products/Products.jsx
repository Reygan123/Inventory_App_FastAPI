import React, { useState, useEffect } from 'react';
import { read_product, delete_product, create_product } from '../../fetching/product';
import { read_warehouse } from '../../fetching/warehouse';
import { read_category } from '../../fetching/category';
import { create_productCategory } from '../../fetching/product_category';
import { create_productWarehouse } from '../../fetching/product_warehouse';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Delete from '../../assets/trash.png'
import Alert from '../../assets/warning.png'
import Input from '../../components/Input';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [warehouse, setWarehouse] = useState([])
    const [category, setCategory] = useState([])
    const [selectedWarehouse, setselectedWarehouse] = useState('')
    const [selectedCategory, setselectedCategory] = useState('')
    const [productWarehouse, setProductWarehouse] = useState([])
    const [productCategory, setProductCategory] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [idProduct, setIdProduct] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [stok, setStok] = useState('')
    const navigate = useNavigate()

    const getWarehouseIdByName = (name) => {
        const selectedWarehouse = warehouse.find((cat) => cat.title === name);
        return selectedWarehouse ? selectedWarehouse.id : null;
    };

    const handleDropdownWarehouseChange = (event) => {
        const selectedWarehouseName = event.target.value;
        setselectedWarehouse(selectedWarehouseName);

        const selectedWarehouseId = getWarehouseIdByName(selectedWarehouseName);
        console.log("ID Warehouse yang Dipilih:", selectedWarehouseId);
    };


    const getCategoryIdByName = (name) => {
        const selectedCategory = category.find((cat) => cat.name === name);
        return selectedCategory ? selectedCategory.id : null;
    };

    const handleDropdownCategoryChange = (event) => {
        const selectedCategoryName = event.target.value;
        setselectedCategory(selectedCategoryName);

        const selectedCategoryId = getCategoryIdByName(selectedCategoryName);
        console.log("ID Category yang Dipilih:", selectedCategoryId);
    };

    const fetchProducts = async () => {
        try {
            const readProducts = await read_product();
            setProducts(readProducts.data);
            console.log("Produk:", readProducts.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchWarehouse = async () => {
        try {
            const warehouse = await read_warehouse();
            setWarehouse(warehouse.data);
            console.log("Warehouse:", warehouse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategory = async () => {
        try {
            const category = await read_category();
            setCategory(category.data);
            console.log("Category:", category.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                name: name,
                stok: stok,
                price: price
            };
            const response = await create_product(payload);
            console.log(response, "<<<<<<<<<<<<<<<")
            console.log(response.data.id);

            const selectedCategoryID = getCategoryIdByName(selectedCategory)
            console.log("Category COYY >>>", selectedCategoryID)

            const payloadCategory = {
                product_id: response.data.id,
                category_id: selectedCategoryID
            }
            const responseCategory = await create_productCategory(payloadCategory)
            console.log(responseCategory);

            const selectedWarehouseID = getWarehouseIdByName(selectedWarehouse)
            console.log("Warehouse COYY >>>", selectedWarehouseID)

            console.log(response.data.id, "<<<<<<<<<<")

            const payloadWarehouse = {
                quantity: stok,
                product_id: response.data.id,
                warehouse_id: selectedWarehouseID
            }
            const responseWarehouse = await create_productWarehouse(payloadWarehouse)
            console.log(responseWarehouse);

            setIsOpenAdd(false)
            await fetchProducts()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            await delete_product(idProduct)
            setIsOpen(false);
            await fetchProducts();
        } catch (error) {
            console.log(error)
        }
    }

    const detailProduct = (id) => {
        navigate(`/products/${id}`)
    }

    useEffect(() => {
        fetchProducts();
        fetchWarehouse();
        fetchCategory();
    }, []);

    const toggleDelete = (id) => {
        setIdProduct(id);
        setIsOpen(!isOpen);
    };

    const toggleAdd = () => {
        setIsOpenAdd(!isOpenAdd);
    };

    return <>
        <div className='flex w-full'>
            <Navbar />
            <div className='text-xs md:text-xs lg:text-xs 2xl:text-md m-4 w-full'>
                <div className='flex justify-between w-full my-2'>
                    <h2 className='text-sm md:text-md lg:text-lg 2xl:text-lg font-bold'>List Produk</h2>
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='w-44 px-2 py-2 shadow-md rounded-md bg-white text-gray-400'>Search..</div>
                        <button onClick={toggleAdd} className='px-6 py-2 shadow-md bg-sky-500 rounded-md text-white font-semibold'>Tambah</button>
                    </div>
                </div>
                <table className="w-full bg-white border border-gray-300 text-center">
                    <thead>
                        <tr className='text-center'>
                            <th className="py-2 px-4 border-b">Nama</th>
                            <th className="py-2 px-4 border-b">Harga</th>
                            <th className="py-2 px-4 border-b">Stok</th>
                            <th className="py-2 px-4 border-b">Detail</th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr className='text-center' key={product.id}>
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                <td className="py-2 px-4 border-b">{product.stok}</td>
                                <td className="py-2 px-4 border-b"><button onClick={() => detailProduct(product.id)}>Detail</button></td>
                                <td className="py-2 px-4 border-b"><button onClick={() => toggleDelete(product.id)}><span><img className='w-6' src={Delete} alt="" /></span></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
            {isOpen && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>

                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative py-4 px-10 rounded-md bg-white flex flex-col justify-center items-center">
                            <img className='w-10 my-2 2xl:w-8' src={Alert} alt="" />
                            <h1 className='font-bold text-sm md:text-md lg:text-md 2xl:text-lg'>Apakah Kamu Yakin?</h1>
                            <p className='mt-2 text-xs md:text-xs lg:text-xs 2xl:text-md'>Data akan hilang</p>
                            <div className='flex justify-between mt-2 text-sm md:text-md lg:text-md 2xl:text-lg'>
                                <button onClick={handleDelete} className='px-4 mr-4 py-2 bg-red-500 rounded-md text-white font-semibold'>Hapus</button>
                                <button onClick={toggleDelete} className='px-4 py-2 border border-gray-500 rounded-md text-gray-500 font-semibold'>Batal</button>
                            </div>
                        </div>
                    </div>
                </>
            )
            }

            {
                isOpenAdd && (
                    <>
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>


                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                            <div className="relative p-4 rounded-md bg-white flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 w-2/6">
                                <h1 className='font-bold text-sm md:text-md lg:text-md 2xl:text-lg mb-4'>Form Tambah Produk</h1>
                                <div className='w-3/4 flex flex-col justify-center items-center gap-4'>
                                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama" />
                                    <Input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Harga" />
                                    <Input type="number" value={stok} onChange={(e) => setStok(e.target.value)} placeholder="Masukan Stok" />
                                    <select
                                        value={selectedCategory}
                                        onChange={handleDropdownCategoryChange}
                                        className="border py-2 border-[#BFBFBF] text-sm md:text-md lg:text-md 2xl:text-lg text-black rounded-sm w-full focus:border-none focus:outline-none focus:ring focus:ring-sky-500"
                                    >
                                        <option value="">Pilih Kategori...</option>
                                        {category.map((item) => (
                                            <option key={item.id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    <h1 className='font-bold text-sm md:text-md lg:text-md 2xl:text-lg'>Gudang</h1>
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
                                </div>
                                <div className='flex gap-4 mt-6 text-sm md:text-md lg:text-md 2xl:text-lg'>
                                    <button onClick={handleSubmit} className='px-10 py-2 bg-green-500 rounded-md text-white font-semibold'>Kirim</button>
                                    <button onClick={toggleAdd} className='px-10 py-2 border border-gray-500 rounded-md text-gray-500 font-semibold'>Batal</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div >
    </>
};

export default ProductList;
