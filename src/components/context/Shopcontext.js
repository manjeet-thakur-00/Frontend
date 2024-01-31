// Shopcontext.js

import React, { useState, useEffect, createContext } from "react";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const shopcontext = createContext(null);
const Shopcontextprovider = (props) => {
    const [products, setProducts] = useState([]);
    const [cartItem, setCartItem] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/v1/getproduct");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data.findProduct || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const addtoCart = (productId) => {
        setCartItem((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
        toast.success('Add to Cart success')
    };

    const removeFromCart = (productId) => {
        setCartItem((prev) => ({
            ...prev,
            [productId]: Math.max((prev[productId] || 0) - 1, 0),
        }));
    };

    const contextValue = { products, cartItem, addtoCart, removeFromCart };

    return (
        <shopcontext.Provider value={contextValue}>
            {props.children}
            <ToastContainer/>
        </shopcontext.Provider>
    );
};

export default Shopcontextprovider;
