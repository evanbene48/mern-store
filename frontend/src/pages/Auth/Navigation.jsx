import React, { useState } from 'react'
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
  } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
//redux
import { useDispatch, useSelector } from 'react-redux';
//slicer untuk melakukan update ke state
import { logout } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from '../../redux/api/usersApiSlice';

const Navigation = () => {
  //reducer / redux
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutApiCall = useLoginMutation()
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [showHome, setShowHome] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userInfo)

  return (
    <div
    style={{ zIndex: 9999 }}
    className={`${
      showSidebar ? "hidden" : "flex"
    } xl:flex lg:flex md:hidden sm:hidden 
    flex-col justify-between p-4 text-white bg-[#000] 
    w-[4%] hover:w-[15%] h-[100vh]  fixed `}
    id="navigation-container"
    >
        <div className="flex flex-col justify-center space-y-4">
          {/* HOME */}
          
          <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <div className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineHome className="mt-[3rem] mr-2" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
            </div>
          </Link>

          {/* SHOP */}
          <Link
          to="/shop"
          className="flex items-center transition-transform 
          transform hover:translate-x-2"
          >
            <div 
            className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
            </div>
          </Link>

          {/* CART */}
          <Link to="/cart" className="flex relative">
            <div className="flex items-center transition-transform transform hover:translate-x-2">
              <AiOutlineShoppingCart className="mt-[3rem] mr-2" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
            </div>

            {/* <div className="absolute top-9">
              {cartItems.length > 0 && (
                <span>
                  <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                </span>
              )}
            </div> */}
          </Link>

          {/* FAVORITES */}
          <Link to="/favorite" 
          // className="flex relative"
          className="flex items-center transition-transform 
          transform hover:translate-x-2"
          >
            {/* <div className="flex justify-center items-center transition-transform transform hover:translate-x-2"> */}
              <FaHeart className="mt-[3rem] mr-2" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">
                Favorites
              </span>{" "}
              {/* <FavoritesCount /> */}
            {/* </div> */}
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-800 
            focus:outline-none"
          >
            {userInfo? (
              <span className="flex">{userInfo.username}</span>
            ) : (<></>)}
            {/* {userInfo ? (
              <span className="text-white">{userInfo.username}</span>
            ) : (
              <></>
            )}
            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )} */}
          </button>
        </div>

        <ul>
            {/* LOGIN */}
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform 
                transform hover:translate-x-2"
              >
                <div 
                className="flex items-center transition-transform 
                transform hover:translate-x-2">
                  <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                  <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>
                </div>
              </Link>
            </li>

            {/* REGISTER */}
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform 
                transform hover:translate-x-2"
              >
                <div
                className="flex items-center transition-transform"
                >
                  <AiOutlineUserAdd className="mr-2 mt-[1rem] mb-10" size={26} />
                  <span className="hidden nav-item-name mt-[1rem] mb-10">REGISTER</span>
                </div>
              </Link>
            </li>
        </ul>
    </div>
  )
}

export default Navigation