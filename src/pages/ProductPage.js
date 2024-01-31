import React, { useEffect, useState, useContext } from "react";
import { shopcontext } from "../components/context/Shopcontext";
import './Css/Product.css'
import Header from "../components/Header/Header";

function ProductPage() {
    const baseUrl = "http://localhost:5000/api/v1";
    const [data, setdata] = useState({ message: "", findProduct: [] });
    const context = useContext(shopcontext);
    const { addtoCart } = context || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/getproduct`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = await response.json();
                console.log("Fetched data:", responseData);
                setdata(responseData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [addtoCart]);

    return (
        <div className="flex">
            <Header />
            <h2>Products</h2>
            <div className="flex">
                <ul>
                    {Array.isArray(data.findProduct) && data.findProduct.length > 0 ? (
                        data.findProduct.map((product) => (
                            <li key={product._id}>
                                <strong>{product.productName}</strong> - {product.price}
                                {product.image && <img src={product.image} alt="" />}
                                <div className="btn">
                                    <button onClick={() => addtoCart && addtoCart(product._id)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No products available</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ProductPage;
