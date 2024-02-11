import { useState, useEffect } from "react";
import { delete_supplier, get_supplier, update_supplier } from "../../fetching/supplier";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";

const DetailSupplier = () => {
    const { id } = useParams();
    const [supplier, setSupplier] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [company_name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [zip, setZip] = useState(0)
    const navigate = useNavigate()

    const detailSupplier = async () => {
        try {
            const supplier = await get_supplier(id)
            setSupplier(supplier.data)
            console.log("Detail>>>>>", supplier.data)
            setName(supplier.data.company_name)
            setAddress(supplier.data.address)
            setEmail(supplier.data.email)
            setZip(supplier.data.zip_code)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        try {
            const payload = {
                company_name: company_name,
                address: address,
                email: email,
                zip_code: zip
            }

            const response = await update_supplier(id, payload)
            console.log(response)
            setIsOpen(false)
            await detailSupplier()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        detailSupplier();
    }, [id]);

    const toggleEdit = () => {
        setIsOpen(!isOpen);
    };

    const handleDelete = async () => {
        try {
            await delete_supplier(id);
            navigate("/supplier")
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <div className="flex">
            <Navbar />
            <div className="text-xs md:text-sm lg:text-xs 2xl:text-md m-4 w-full min-h-screen flex flex-col justify-center items-center">
                <h2 className='text-lg md:text-lg lg:text-xl 2xl:text-2xl font-bold text-center mb-6'>Detail Supplier</h2>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className="w-1/2 flex flex-col justify-center items-center gap-4">
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{supplier.company_name}</div>
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{supplier.address}</div>
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{supplier.email}</div>
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{supplier.zip_code}</div>
                        <div className="w-full flex justify-between gap-4">
                            <button onClick={toggleEdit} className="w-full py-3 bg-green-500 rounded-md text-white font-bold">Edit</button>
                            <button onClick={handleDelete} className="w-full py-3 bg-red-500 rounded-md text-white font-bold">Hapus</button>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <>
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>


                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                            <div className="relative p-4 rounded-md bg-white flex flex-col justify-center items-center top-1/2 left-1/2 transform -translate-x-1/2 w-2/6">
                                <h1 className='font-bold text-sm md:text-md lg:text-md 2xl:text-lg mb-4'>Form Edit Supplier</h1>
                                <div className='w-3/4 flex flex-col justify-center items-center gap-4'>
                                    <Input type="text" value={company_name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama Supplier" />
                                    <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Masukan Alamat" />
                                    <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukan Email" />
                                    <Input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Masukan Zip Code" />
                                </div>
                                <div className='flex gap-4 mt-6 text-sm md:text-md lg:text-md 2xl:text-lg'>
                                    <button onClick={handleSubmit} className='px-10 py-2 bg-green-500 rounded-md text-white font-semibold'>Kirim</button>
                                    <button onClick={toggleEdit} className='px-10 py-2 border border-gray-500 rounded-md text-gray-500 font-semibold'>Batal</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
}

export default DetailSupplier