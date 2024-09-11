import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import EcomContext from "../../context/EcomContext";
import AuthContext from "../../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useContext(AuthContext);
  const redirect = useNavigate();
  const { showHide, isAuthenticated,setCartItems, fetchCart } = useContext(EcomContext);
  const { setItem, getItem, deleteItem } = useLocalStorage("auth-token");

// client02@gmail.com
// qwerty456

  if (isAuthenticated) {
    return <Navigate to="/" />
  }
  
  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showHide("error", "Email and Passowrd is required")
      return;
    } 
    try {
      const res = await fetch("https://shoesbystores.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.message) {
        showHide("error", data.message);
      }else {
        dispatch({ type: "setToken", payload: data.token });
        setItem(data.token);
        const cartDataItem = JSON.parse(getItem("cart"));
        if (cartDataItem) {
          console.log("request made");
          await Promise.all(cartDataItem?.products?.map(async (item) => {
            const response = await fetch("https://shoesbystores.onrender.com/api/add-to-cart", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": getItem("auth-token"),  // Use the token directly
              },
              body: JSON.stringify({ productId: item.product._id, quantity: item.quantity }),
            });

            const cartdata = await response.json();
            // console.log( "todday", cartdata);
            if (res.ok) {
              setCartItems(cartdata && cartdata.products);
              fetchCart();
              showHide("success", "added to cart successfully")
            } else {
              console.error(`Failed to add items to the backend cart`);
            }
          }));
          deleteItem("cart");
        }

        redirect("/");
        showHide("success", "you are now logged in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="h-full">
        <div className="m-auto mt-16 max-w-lg w-full rounded shadow-lg">
          <div className="grid grid-cols-1 items-center justify-center">
            <div className="p-5">
              <h1 className="text-2xl font-bold mb-3 text-center">Signin</h1>
              <form onSubmit={loginHandler}>
                <div className="mb-6 ">
                  <label htmlFor="" className="capitalize">
                    Email
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#ccc] p-2 border-none outline-none"
                    name=""
                    id="email"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="pb-2 capitalize">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-[#ccc] p-2 border-none outline-none"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className="bg-purple-600 w-24 p-2 text-white"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="mb-3 flex justify-between items-center">
                <Link to="/register">Don't have an account?..</Link>
                <Link to="">Forgot password?..</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
