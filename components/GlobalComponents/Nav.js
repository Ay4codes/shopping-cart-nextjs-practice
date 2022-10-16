import react, { useEffect, useState } from "react";
import {FaShoppingCart} from 'react-icons/fa'
import {FaTimesCircle} from 'react-icons/fa'
import CartItem from "./CartItem";
import CartData from "../../Data/CartData";

export default function NavigationBar(props) {
    const {cart} = props
    const {toZoomCart} = props
    const {zoomOnRemoveCart} = props
    const [cartIsOpen, setCartIsOpen] = useState(false)
    
    function sanitizecartLength() {
        if (cart.length === 0) {
            return null
        } else {
            return cart.length
        }
    }
    function OpenCartHandler() {
        setCartIsOpen(true)
    }
    function CloseCartHandler() {
        setCartIsOpen(false)
    }
    
    return (
        <div>
            <div className="nav-container">
                <div className="nav-inner">
                    <div className="logo-container">
                        <p>Labongoes</p>
                    </div>
                    <div className="cart">
                        <button onClick={OpenCartHandler} style={{transform: toZoomCart ? 'scale(1.3)' : 'scale(1)'}}>
                            <p>{sanitizecartLength()}</p><FaShoppingCart className="cart-icon" />
                        </button> 
                    </div>
                </div>
            </div>

            <div style={{transform: cartIsOpen ? 'translateX(0%)' : 'translateX(100%)'}} className="drop-dwn-container">
                <div className="dropDownInner">
                    <div className="cart-head-container">
                        <FaTimesCircle style={{cursor: 'pointer'}} onClick={CloseCartHandler} />
                        <div className="cart">
                            <button style={{transform: toZoomCart ? 'scale(1.3)' : 'scale(1)'}}>
                                <p>{sanitizecartLength()}</p><FaShoppingCart className="cart-icon" />
                            </button> 
                        </div>
                    </div>
                    <div className="dfdfdfd">
                        {CartData.map((cartItem, index) => {
                            return (
                                <CartItem cartData={CartData} key={index} id={index} img={cartItem.img} price={cartItem.price} zoomOnRemoveCart={zoomOnRemoveCart} qty={cartItem.qty} />
                            )
                        })}
                    </div>
                    <div className="total-btn">
                        <button>
                            <span>Total: ₦{TotalPrice}</span>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>

    )
}