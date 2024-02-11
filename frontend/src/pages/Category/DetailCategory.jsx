import { useState, useEffect } from "react";
import { delete_category, get_category, update_category } from "../../fetching/category";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";

const DetailCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const fetchCategory = async () => {
        try {
            const category = await get_category(id)
            setCategory(category.data)
            console.log("Detail>>>>>", category.data)
            setName(category.data.name)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        try {
            const payload = {
                name: name,
            }

            const response = await update_category(id, payload)
            console.log(response)
            setIsOpen(false)
            await fetchCategory()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [id]);

    const toggleEdit = () => {
        setIsOpen(!isOpen);
    };

    const handleDelete = async () => {
        try {
            await delete_category(id);
            navigate("/category")
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <div className="flex">
            <Navbar />
            <div className="text-xs md:text-sm lg:text-xs 2xl:text-md m-4 w-full min-h-screen flex flex-col justify-center items-center">
                <h2 className='text-lg md:text-lg lg:text-xl 2xl:text-2xl font-bold text-center mb-6'>Detail Kategori</h2>
                <div className='flex flex-col justify-center items-center w-full'>
                    <div className="w-1/2 flex flex-col justify-center items-center gap-4">
                        <div className="shadow-md w-full py-3 px-3 bg-white rounded-md">{category.name}</div>
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
                                <h1 className='font-bold text-sm md:text-md lg:text-md 2xl:text-lg mb-4'>Form Edit Kategori</h1>
                                <div className='w-3/4 flex flex-col justify-center items-center gap-4'>
                                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukan Nama" />
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

export default DetailCategory