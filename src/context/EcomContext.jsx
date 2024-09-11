import { createContext, useContext, useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";
import AuthContext from "./AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

const EcomContext = createContext();

export const EcomProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const { alertInfo, showHide } = useAlert();
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState({});
  const [cartCount, setCartCount] = useState(0); //i am using this state to update the cartCOunt
  const [state, dispatch] = useContext(AuthContext);
  const isAuthenticated = state.accessToken !== null;
  const { setItem, getItem } = useLocalStorage();

  useEffect(() => {
    fetchData();
    fetchCart();
  }, []);

  // added cart count
  useEffect(() => {
    const count = cartItems?.products?.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const countItem = count ? count : 0;
    setCartCount(countItem);
  }, [cartItems]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://shoesbystores.onrender.com/api/product");
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const featuredProduct = product.filter(
    (product) => product.featured === true
  );
  const topSellingProduct = product.filter(
    (product) => product.topSelling === true
  );

  // adding items to cart
  const addToCart = async (productId, quantity, product) => {
    if (isAuthenticated) {
      // if authenticated
      try {
        const res = await fetch("https://shoesbystores.onrender.com/api/add-to-cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify({ productId, quantity }), // pass the value of quantity and productId in the details
        });
        const data = await res.json();
        if (res.ok) {
          setCartItems(data); // add the data
          console.log(data);
          showHide("success", "You have successfully added item to cart");
        } else {
          showHide("error", "product was not added to cart");
        }
      } catch (error) {
        console.log(error);
      }
      // if authenticated done
    } else {
      // if unauthenticated
      const storedCart = JSON.parse(getItem("cart")) || { products: [] };
      const itemIndex = storedCart.products.findIndex(
        (item) => item.product._id === productId
      );

      if (itemIndex >= 0) {
        storedCart.products[itemIndex].quantity += 1;
        storedCart.products[itemIndex].amount = product.price * storedCart.products[itemIndex].quantity;
      } else {
        storedCart.products.push({
          product,
          quantity: 1,
          amount: product.price * 1,
        });
        console.log(product);
      }

      localStorage.setItem("cart", JSON.stringify(storedCart));
      showHide("success", "Product added to cart successfully!");
      setCartItems(storedCart); // This line sets the cartItems state to match local storage
      // if unauthenticated done
    }
  };

  // fetch cart
  const fetchCart = async () => {
    if (isAuthenticated) {
      // authenticated
      const res = await fetch("https://shoesbystores.onrender.com/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCartItems(data.products && data); // change the operator both statement has to be true
      } else {
        showHide("error", "Could not get cart");
      }
      // authenticated done
    } else {
      // unauthenticated
      const localCart = getItem("cart");
      console.log(localCart);
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      
      } else {
        setCartItems([]); // Clear cart items if nothing is in local storage
      }
      // unauthenticated done
    }
  };

  // calculate subtotal
  const calculateSubTotal = () => {
    return cartItems.products?.reduce((acc, curr) => acc + curr.amount, 0);
  };

  // calculate vat
  const calculateVat = (vat = 0.075) => {
    const subtotal = calculateSubTotal();
    return subtotal * vat;
  };

  // calculate total amount
  const calculateTotalAmount = () => {
    const subtotal = calculateSubTotal();
    const vat = calculateVat();
    return subtotal + vat;
  };

  // remove cart items
  const removeCartItems = async (productId) => {
    if (window.confirm("Are you sure you want to delete?..")) {
      if (isAuthenticated) {
        try {
          // authenticated
          const res = await fetch("https://shoesbystores.onrender.com/api/delete-cart", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({ productId }),
          });
          const data = await res.json();
          if (res.ok) {
            showHide("success", "Product Successfully deleted from cart");
            setCartItems(data);
            //   setCartItems(data || data.products);
          }
        } catch (error) {
          console.log(error);
        }
        // authenticated done
      } else {
        // unauthenticated
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {
          products: [],
        };
        const itemIndex = storedCart.products.findIndex(
          (item) => item.product._id === productId
        );

        if (itemIndex >= 0) {
          storedCart.products.splice(itemIndex, 1);
          localStorage.setItem("cart", JSON.stringify(storedCart));
          setCartItems(storedCart); // Update the state to reflect changes in local storage
          showHide("success", "Product removed from cart successfully!");
        } else {
          showHide("error", "Product not found in cart.");
        }
        // unauthenticated done
      }
    }
  };

  // update cart items
  const updateCartItems = async (productId, quantity) => {
    if (isAuthenticated) {
      try {
        const res = await fetch("https://shoesbystores.onrender.com/api/update-cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify({ productId, quantity }),
        });
        const data = await res.json();
        if (res.status === 200) {
          const existingItems = cartItems.products?.findIndex(
            (items) => items.product._id === productId
          );
          if (existingItems !== -1) {
            const itemsInCart = [...cartItems.products];
            const updateCartItems = itemsInCart[existingItems];
            updateCartItems.quantity = parseInt(quantity);
            updateCartItems.amount =
              updateCartItems.product.price * updateCartItems.quantity;
            setCartItems({ ...cartItems, products: itemsInCart });
          }
        } else {
          showHide("error", "Could not update cart");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // Handle updating cart items in local storage for unauthenticated users
      const storedCart = JSON.parse(localStorage.getItem("cart")) || {
        products: [],
      };
      const itemIndex = storedCart.products.findIndex(
        (item) => item.product._id === productId
      );

      if (itemIndex >= 0) {
        if (quantity === 0) {
          storedCart.products.splice(itemIndex, 1);
        } else {
          // Update quantity of item
          storedCart.products[itemIndex].quantity = parseInt(quantity, 10);
          storedCart.products[itemIndex].amount =
            storedCart.products[itemIndex].product.price *
            storedCart.products[itemIndex].quantity;
        }
        localStorage.setItem("cart", JSON.stringify(storedCart));
        setCartItems(storedCart);
        showHide("success", "Cart updated successfully!");
      }
    }
  };

  const createOrder = async (transaction_id, orderId) => {
    try {
      const res = await fetch("https://shoesbystores.onrender.com/api/payment/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ transaction_id, orderId }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrder(data.order);
        console.log(data.order && data);
        setCartItems([]);
      } else {
        showHide("error", "insufficient Funds!...Credit your acct boss");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <EcomContext.Provider
      value={{
        product,
        alertInfo,
        cartItems,
        featuredProduct,
        topSellingProduct,
        isAuthenticated,
        showHide,
        addToCart,
        cartCount,
        calculateSubTotal,
        calculateVat,
        calculateTotalAmount,
        removeCartItems,
        updateCartItems,
        createOrder,
        order,
        setCartItems,
        fetchCart,
      }}
    >
      {children}
    </EcomContext.Provider>
  );
};

export default EcomContext;
