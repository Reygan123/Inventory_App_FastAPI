import React, { useState, useEffect } from 'react';
import { read_warehouse, delete_warehouse, create_warehouse } from '../../fetching/warehouse';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Delete from '../../assets/trash.png'
import Alert from '../../assets/warning.png'
import Input from '../../components/Input';

const Warehouse = () => {
    const [warehouse, setWarehouse] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [idWarehouse, setIdWarehouse] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate()

    const fetchWarehouse = async () => {
        try {
            const warehouse = await read_warehouse();
            setWarehouse(warehouse.data);
            console.log("Respons", warehouse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                title: title,
                address: address
            };
            const response = await create_warehouse(payload);
            console.log(response);
            setIsOpenAdd(false)
            await fetchWarehouse();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        try {
            await delete_warehouse(idWarehouse)
            setIsOpen(false);
            await fetchWarehouse();
        } catch (error) {
            console.log(error)
        }
    }

    const detailProduct = (id) => {
        navigate(`/warehouse/${id}`)
    }

    useEffect(() => {
        fetchWarehouse();
    }, []);

    const toggleDelete = (id) => {
        setIdWarehouse(id);
        setIsOpen(!isOpen);
    };

    const toggleAdd = () => {
        setIsOpenAdd(!isOpenAdd);
    };

    return <>
        <div className='flex w-full'>
            <Navbar />
            <div className='text-xs md:text-sm lg:text-xs 2xl:text-md m-4 w-full'>
                <div className='flex justify-between w-full my-2'>
                    <h2 className='text-sm md:text-md lg:text-lg 2xl:text-lg font-bold'>List Gudang</h2>
                    <div className='flex gap-2 justify-center items-center'>
                        <div className='w-44 px-2 py-2 shadow-md rounded-md bg-white text-gray-400'>Search..</div>
                        <button onClick={toggleAdd} className='px-6 py-2 shadow-md bg-sky-500 rounded-md text-white font-semibold'>Tambah</button>
                    </div>
                </div>
                <table className="w-full bg-white shadow-md text-center">
                    <thead>
                        <tr className='text-center'>
                            <th className="py-2 px-4 ">Nama</th>
                            <th className="py-2 px-4 ">Alamat</th>
                            <th className="py-2 px-4 ">Detail</th>
                            <th className="py-2 px-4 "></th>
                        </tr>
                    </thead>
                    <tbody>
                        {warehouse.map((item) => (
                            <tr className='text-center' key={item.id}>
                                <td className="py-2 px-4 ">{item.title}</td>
                                <td className="py-2 px-4 ">{item.address}</td>
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
                            <h1 className='font-bold text-sm md:text-md lg:text-md 2xl:text-lg mb-4'>Form Tambah Gudang</h1>
                            <div className='w-3/4 flex flex-col justify-center items-center gap-4'>
                                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukan Nama Gudang" />
                                <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Masukan Alamat" />
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

export default Warehouse;
