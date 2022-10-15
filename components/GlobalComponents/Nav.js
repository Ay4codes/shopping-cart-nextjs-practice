import react from "react";
import {FaShoppingCart} from 'react-icons/fa'

export default function NavigationBar(props) {
    const {cart} = props
    return (
        <div className="nav-container">
            <div className="nav-inner">
                <div className="logo-container">
                    <p>Labongoes</p>
                </div>
                <div className="cart">
                    <button>
                        <p>{props.cart.length}</p><FaShoppingCart className="cart-icon" />
                    </button> 
                </div>
            </div>
        </div>
    )
}