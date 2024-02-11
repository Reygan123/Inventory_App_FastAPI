import { useState, useEffect } from "react";
import Toogle from "../assets/Navbar.png"
import Home from "../assets/homepage.png"
import Category from "../assets/categories.png"
import Product from "../assets/Box.png"
import Supplier from "../assets/courier.png"
import Warehouse from "../assets/warehouse.png"
import Order from "../assets/shopping-cart.png"
import Supply_Order from "../assets/sent.png"
import { useNavigate } from "react-router";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const navigate = useNavigate()

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleRouteChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    const activeLink = 'font-bold w-full bg-blue-600 ';

    return <>
        <div className="w-[20%] bg-[#3850BE] min-h-screen text-white font-normal text-center ">
            <h1 className="text-lg md:text-lg lg:text-xl 2xl:text-2xl my-4 font-bold">Gudang-Ku</h1>
            <div className="flex flex-col justify-between items-center text-sm md:text-md lg:text-md 2xl:text-lg">
                <div className={`flex justify-center items-center w-full ${currentPath === '/' ? activeLink : ''} text-left gap-4 py-2`}>
                    <div className="w-fit">
                        <img className="w-5" src={Home} alt="" />
                    </div>
                    <div className="w-[45%]">
                        <a href="/" className={currentPath === '/' ? activeLink : 'py-2'}>Home</a>
                    </div>
                </div>
                <div className={`flex justify-center items-center w-full ${currentPath === '/products' ? activeLink : ''} text-left gap-4 py-2`}>
                    <div className="w-fit">
                        <img className="w-5" src={Product} alt="" />
                    </div>
                    <div className="w-[45%]">
                        <a href="/products" className={currentPath === '/products' ? activeLink : 'py-2'}>Products</a>
                    </div>
                </div>
                <div className={`flex justify-center items-center w-full ${currentPath === '/warehouse' ? activeLink : ''} text-left gap-4 py-2`}>
                    <div className="w-fit">
                        <img className="w-5" src={Warehouse} alt="" />
                    </div>
                    <div className="w-[45%]">
                        <a href="/warehouse" className={currentPath === '/warehouse' ? activeLink : 'py-2'}>Warehouse</a>
                    </div>
                </div>
                <div className={`flex justify-center items-center w-full ${currentPath === '/supplier' ? activeLink : ''} text-left gap-4 py-2`}>
                    <div className="w-fit">
                        <img className="w-5" src={Supplier} alt="" />
                    </div>
                    <div className="w-[45%]">
                        <a href="/supplier" className={currentPath === '/supplier' ? activeLink : 'py-2'}>Supplier</a>
                    </div>
                </div>
                <div className={`flex justify-center items-center w-full ${currentPath === '/category' ? activeLink : ''} text-left gap-4 py-2`}>
                    <div className="w-fit">
                        <img className="w-5" src={Category} alt="" />
                    </div>
                    <div className="w-[45%]">
                        <a href="/category" className={currentPath === '/category' ? activeLink : 'py-2'}>Category</a>
                    </div>
                </div>
                <div className={`flex justify-center items-center w-full ${currentPath === '/order' ? activeLink : ''} text-left gap-4 py-2`}>
                    <div className="w-fit">
                        <img className="w-5" src={Order} alt="" />
                    </div>
                    <div className="w-[45%]">
                        <a href="/order" className={currentPath === '/order' ? activeLink : 'py-2'}>Order</a>
                    </div>
                </div>
                <div className={`flex justify-center items-center w-full ${currentPath === '/supply-order' ? activeLink : ''} text-left gap-4 py-2`}>
                    <div className="w-fit">
                        <img className="w-5" src={Supply_Order} alt="" />
                    </div>
                    <div className="w-[45%]">
                        <a href="/supply-order" className={currentPath === '/supply-order' ? activeLink : 'py-2'}>Supply Order</a>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Navbar