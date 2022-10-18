import react, { useEffect, useState } from "react";
import {FaTimesCircle} from 'react-icons/fa'
import { Icon } from '@iconify/react';


export default function OrderForm(props) {
    const {modalIsOpen, ModalHandler, TotalPrice, mainCartItems, setmainCartItems} = props
    const [formData, setFormData] = useState({name: '', tableNumber: '', total: '', orders: ''})
    const [formSubmitState, setFormSubmitState] = useState({loading: false, submitted: false, success: false})

    async function handleFormSubmit () {
        if (mainCartItems.length === 0) {
            window.alert('Cart Items not available')
            console.log(formData);
        } else {
            if (formData.name === '' || formData.tableNumber === '') {
                window.alert('Name And Table Number Required')
            } else {
                try {
                    setFormSubmitState({...formSubmitState, loading: true})
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
                        setFormSubmitState({...formData, submitted: true, loading: false, success: true})
                    } else {
                        window.alert('Error Sending Order')
                        setFormSubmitState({...formData, submitted: true, loading: false, success: false})
                    }
                } catch (error) {
                    window.alert('Error Sending Order')
                    setFormSubmitState({...formData, submitted: true, loading: false, success: false})
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
                                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter Your Full Name"  />
                            </div>

                            <div className="input-container">
                                <input type={'number'} value={formData.tableNumber} onChange={(e) => setFormData({...formData, tableNumber: e.target.value})} placeholder="Enter Your Table Number"  />
                            </div>
                        </div>
                        <button onClick={formSubmitState.loading ? null :  () => handleFormSubmit()}> {formSubmitState.loading ? <Icon style={{color: '#fff', margin: 'auto', fontWeight: '800', textAlign: 'center'}} width='20' icon="eos-icons:loading" /> : 'Confirm'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}