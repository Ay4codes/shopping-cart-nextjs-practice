import react, { useState } from "react";
import {FaTimesCircle} from 'react-icons/fa'

export default function OrderForm(props) {
    const {modalIsOpen, ModalHandler, TotalPrice, mainCartItems, setmainCartItems} = props

    const [formData, setFormData] = useState({name: '', tableNumber: '', orders: mainCartItems})
    const [formSubmitState, setFormSubmitState] = useState(false)

    async function handleFormSubmit () {
        if (formData.name && formData.tableNumber === '') {
            window.alert('Name And Table Number Required')
        } else {
            try {
                const response = await fetch('/api/order', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                      Accept: 'application.json',
                      'Content-Type': 'application/json'
                    }
                })
    
                if (response.ok === true) {
                    window.alert('Order sent Successfully')
                    setmainCartItems([])
                    setFormSubmitState(true)
                    ModalHandler()
                    setFormData({name: null, tableNumber: null, orders: null})
                } else {
                    window.alert('Error Sending Order')
                    setFormSubmitState(false)
                }
            } catch (error) {
                window.alert('Error Sending Order')
                setFormSubmitState(false)
            }
        }
    }
    
    return (
        <div>
            <div style={{display: modalIsOpen && 'block'}} className="backdrop">
                <div style={{transform: modalIsOpen && 'scale(1)'}} className="complete-order-form">
                    <div style={{transform: modalIsOpen && 'scale(1)'}} className="complete-order-form-inner">
                        <FaTimesCircle onClick={() => ModalHandler()} className="cancel-form-btn" />
                        <p>About to order ₦ {Number(TotalPrice).toLocaleString("en-US") + '.00'} worth of items.</p>
                        <div className="inputs-wrapper">
                            <div className="input-container">
                                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Name"  />
                            </div>
                            
                            <div className="input-container">
                                <input value={formData.tableNumber} onChange={(e) => setFormData({...formData, tableNumber: e.target.value})} placeholder="Table Number"  />
                            </div>
                        </div>
                        <button onClick={handleFormSubmit}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}