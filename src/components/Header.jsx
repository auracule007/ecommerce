
import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu3Fill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import useLocalStorage from '../hooks/useLocalStorage';
import AuthContext from '../context/AuthContext';
import EcomContext from '../context/EcomContext';

function Header() {
  const [ open, setOpen ] = useState(false);
  const { deleteItem } = useLocalStorage("auth-token");
  const [state, dispatch] = useContext(AuthContext);
  const redirect = useNavigate();
  const { isAuthenticated, showHide, cartCount} =useContext(EcomContext);

  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: "setToken", payload: null })
    deleteItem("auth-token");
    redirect("/login");
    showHide("success", "You are now logged out!..")
  }
  return (
    <div className="bg-[#502274] text-[#fff] sticky top-0 z-[20] flex justify-between items-center py-[15px] px-[30px]">
    <div className="flex-1">
      <a href="">
        <h1 className="text-left text-[#fff] font-bold">StoresByScores</h1>
      </a>
    </div>
    {/* First Navigation */}
    <nav className="hidden lg:flex space-x-4 text-white text-[16px]">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/product">Products</Link>
      {isAuthenticated ? (<>
        <Link onClick={logout}>Logout</Link>
      </>) : (<>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </>)}
        <Link to="/cart" className="relative">
              <FiShoppingCart />
              <div className="absolute bottom-4 left-4 text-white bg-blue-950 text-center rounded-full h-6 w-6 text-[15px]">
                {cartCount}
              </div>
        </Link>
    </nav>
    {/* First Nav done */}
    <button
      type="button"
      className="flex justify-end lg:hidden items-center w-[35px] h-[35px]"
      onClick={() => setOpen(!open)}
    >
      <RiMenu3Fill />
    </button>
    {/* Second Nav (Mobile) */}
    {/* <div
      className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-[20] transition-opacity duration-200 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setOpen(open)}
    ></div> */}
    <div
      className={`fixed lg:hidden top-0 left-0 w-[300px] h-screen overflow-auto z-[30] bg-[red] transition-transform duration-200 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* XMark for closing */}
      <button
        className="absolute top-5 right-5 text-3xl text-black"
        onClick={() => setOpen(!open)}
      >
        <HiXMark />
      </button>
      <nav onClick={() => setOpen(open)} className="flex flex-col gap-5 text-center text-black pt-20 px-10 text-[25px]">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/">Contact</Link>
        {isAuthenticated ? (<>
          <Link onClick={logout}>Logout</Link>
        </>) : (<>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>) }
          <Link to="/cart">
          <FiShoppingCart />
              <div className="absolute bottom-4 left-4 text-white bg-blue-950 text-center rounded-full h-6 w-6 text-[15px]">
                {cartCount}
              </div>
          </Link>
      </nav>
    </div>
    {/* Second Nav done */}
  </div>

  )
}

export default Header;
