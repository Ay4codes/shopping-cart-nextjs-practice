import react, { useEffect } from "react";
import {FaShoppingCart} from 'react-icons/fa'

export default function NavigationBar(props) {
    const {cart} = props
    const {toZoomCart} = props
    
    function sanitizecartLength() {
        if (cart.length === 0) {
            return null
        } else {
            return cart.length
        }
    }
    return (
        <div className="nav-container">
            <div className="nav-inner">
                <div className="logo-container">
                    <p>Labongoes</p>
                </div>
                <div className="cart">
                    <button style={{transform: toZoomCart ? 'scale(1.3)' : 'scale(1)'}}>
                        <p>{sanitizecartLength()}</p><FaShoppingCart className="cart-icon" />
                    </button> 
                </div>
            </div>
        </div>
    )
}