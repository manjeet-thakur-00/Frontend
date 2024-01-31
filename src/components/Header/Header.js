import React, { useContext } from 'react';
import '../Header/Header.css';
import img1 from './cart-icon-28356.png';
import { Link } from 'react-router-dom';
import { shopcontext } from '../context/Shopcontext';

function Header() {
    const { cartItem } = useContext(shopcontext);

    const totalQuantity = Object.values(cartItem).reduce((acc, qty) => acc + qty, 0);

    return (
        <div>
            <div className="flex1">
                <div className="home">
                    <p>Home</p>
                </div>
                <Link to="/cart" className="home">
                    <div>
                        <img src={img1} alt="" />

                    </div>
                    {totalQuantity >= 0 && <p className="cart-count">{totalQuantity} </p>}
                </Link>
            </div>
        </div>
    );
}

export default Header;
