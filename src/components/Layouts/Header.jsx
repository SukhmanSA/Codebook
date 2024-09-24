import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { useEffect, useState } from "react"
import { Search } from "../Sections/Search"
import { DropdownLoggedIn,DropdownLoggedOut } from "../index"
import { useCart } from "../../context"

export const Header = () =>{
    const [dark,setDark] = useState(JSON.parse(localStorage.getItem("darkMode")) || false)
    const [useSearch,setUseSearch] = useState(false)
    const [dropdown,setDropdown] = useState(false) 
    const { cartList } = useCart()
    const token = JSON.parse(sessionStorage.getItem("token"))
    useEffect(()=>{
        localStorage.setItem("darkMode",JSON.stringify(dark))    
        if(dark){
            document.documentElement.classList.add("dark")
        }else{
            document.documentElement.classList.remove("dark")
        }
    },[dark])
    return(
        <header>      
        <nav className="bg-white dark:bg-gray-900">
            <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="mr-3 h-10" alt="CodeBook Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeBook</span>
                </Link>
                <div className="flex items-center relative">
                    <span onClick={()=> setDark(!dark)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>
                    <span onClick={()=> setUseSearch(!useSearch)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search"></span>
                    <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
                    <span className="text-2xl bi bi-cart-fill relative">
                        <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{(cartList.length || 0)}</span>
                    </span>                    
                    </Link>
                    <span span onClick={()=> setDropdown(!dropdown)} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white">
                        {dropdown ?
                        (token? <DropdownLoggedIn setDropdown={setDropdown} dropdown={dropdown}/> :
                        <DropdownLoggedOut setDropdown={setDropdown} dropdown={dropdown}/> )
                        : ""}</span>
                </div>
            </div>
        </nav>
        {useSearch ? <Search setUseSearch={setUseSearch}/> : ""}
    </header>
    )
}