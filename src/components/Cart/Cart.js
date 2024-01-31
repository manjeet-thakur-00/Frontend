import React, { useContext } from "react";
import { shopcontext } from "../context/Shopcontext";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
    const { products, cartItem, removeFromCart } = useContext(shopcontext);

    const getTotalPrice = (productId) => {
        const product = products.find((p) => p._id === productId);
        if (product) {
            return cartItem[productId] * parseFloat(product.price);
        }
        return 0;
    };

    const getTotalCartPrice = () => {
        let total = 0;
        Object.keys(cartItem).forEach((productId) => {
            total += getTotalPrice(productId);
        });
        return total.toFixed(2);
    };

    return (
        <>
            <div className="cartitem">
                <div className="cart-item-main">
                    <p>Product</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total Price</p>
                    <p>Remove</p>
                </div>
                <hr className="line" />
                {Object.keys(cartItem).length === 0 ? (
                    <p className="center">No products in the cart</p>
                ) : (
                    Object.keys(cartItem).map((productId) => {
                        const product = products.find((p) => p._id === productId);
                        if (!product || cartItem[productId] === 0) {
                            return null;
                        }

                        return (
                            <div key={productId} className="cart-item-format">
                                <img className="carticon" src={product.image} alt="" />
                                <p>{product.productName}</p>
                                <p>${product.price}</p>
                                <button className="quantity">{cartItem[productId]}</button>
                                <p>${getTotalPrice(productId).toFixed(2)}</p>
                                <p onClick={() => removeFromCart(productId)}>Remove</p>
                            </div>
                        );
                    })
                )}
            </div>
            <div className="main">
                <div className="total-price">
                    <p>Total Price: ${getTotalCartPrice()}</p>
                </div>

                <Link to='/product'><p>Continue shoping........ </p></Link>
            </div>
        </>
    );
}

export default Cart;
