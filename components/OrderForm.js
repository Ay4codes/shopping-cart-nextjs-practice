import react, { useEffect, useState } from "react";
import {FaTimesCircle} from 'react-icons/fa'
import { Icon } from '@iconify/react';


export default function OrderForm(props) {
    const {modalIsOpen, ModalHandler, TotalPrice, mainCartItems, setmainCartItems} = props

    const [formData, setFormData] = useState({name: '', tableNumber: '', orders: ''})
    const [formSubmitState, setFormSubmitState] = useState(false)

    async function handleFormSubmit () {
        if (mainCartItems.length === 0) {
            window.alert('Cart Items not available')
        } else {
            if (formData.name === '' && formData.tableNumber === '') {
                window.alert('Name And Table Number Required')
            } else {
                try {
                    setFormSubmitState(true)
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
                        ModalHandler()
                        setFormData({name: null, tableNumber: null, orders: null})
                        setFormSubmitState(false)
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
                                <input type={'number'} value={formData.tableNumber} onChange={(e) => setFormData({...formData, tableNumber: e.target.value})} placeholder="Table Number"  />
                            </div>
                        </div>
                        <button onClick={formSubmitState ? '' :  handleFormSubmit}> {formSubmitState ? <Icon style={{color: '#fff', margin: 'auto', fontWeight: '800', textAlign: 'center'}} width='20' icon="eos-icons:loading" /> : 'Confirm'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}