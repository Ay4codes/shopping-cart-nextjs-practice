import react from "react";
import {FaTimesCircle} from 'react-icons/fa'


export default function OrderForm(props) {
    const {modalIsOpen, ModalHandler, TotalPrice} = props
    
    return (
        <div>
            <div style={{display: modalIsOpen && 'block'}} className="backdrop">
                <div style={{transform: modalIsOpen && 'scale(1)'}} className="complete-order-form">
                    <div style={{transform: modalIsOpen && 'scale(1)'}} className="complete-order-form-inner">
                        <FaTimesCircle onClick={() => ModalHandler()} className="cancel-form-btn" />
                        <p>About to order ₦ {Number(TotalPrice).toLocaleString("en-US") + '.00'} worth of items.</p>
                        <div className="inputs-wrapper">
                            <div className="input-container">
                                <input placeholder="Full Name"  />
                            </div>
                            <div className="input-container">
                                <input placeholder="Table Number"  />
                            </div>
                        </div>
                        <button>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}