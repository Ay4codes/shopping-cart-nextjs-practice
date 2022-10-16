import {FaTimesCircle} from 'react-icons/fa'
import CartData from '../../Data/CartData'

export default function CartItem(props) {
    

    return (
        <>
            <div className="cart-item-container">
                <div className="cart-item-wrapper">
                    
                    <div className="cart-img-wrapper">
                        <div className="cart-img-inner">
                            <img src={props.img} alt="Cart-Items" />
                            <div className="cart-desc-container">
                                <h5>{props.name}</h5>
                                <div className="">
                                    <div className="cart-price-desc-wrapper"><span>Amount: <b>₦{props.price}</b></span></div>
                                    <div className="cart-price-desc-wrapper"><span>Qty: <b>{props.qty}</b></span></div>
                                    <div className="cart-price-desc-wrapper"><span>Total: <b>₦{props.price * props.qty}</b></span></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FaTimesCircle style={{fontSize: '30px', color: '#ea4c89', cursor: 'pointer'}} onClick={props.zoomOnRemoveCart} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}