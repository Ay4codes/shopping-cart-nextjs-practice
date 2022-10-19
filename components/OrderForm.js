import react, { useEffect, useState } from "react";
import {FaTimesCircle} from 'react-icons/fa'
import { Icon } from '@iconify/react';


export default function OrderForm(props) {
    const {modalIsOpen, ModalHandler, TotalPrice, mainCartItems, setmainCartItems} = props
    const [formData, setFormData] = useState({name: '', tableNumber: '', orders: null})
    const [formSubmitState, setFormSubmitState] = useState({loading: false, submitted: false, success: false})

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function addOrderToFormData(data) {
        setFormData({...formData, orders: data})
    }

    async function handleFormSubmit () {
        if (mainCartItems.length === 0) {
            window.alert('Cart Items not available')
        } else {
            if (formData.name === '' || formData.tableNumber === '') {                
                window.alert('Name And Table Number Required')
                console.log(formData.orders)
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
                        setFormSubmitState({...formSubmitState, submitted: true, loading: false, success: true})
                        setFormData({...formData, tableNumber: ''})
                    } else {
                        window.alert('Error Sending Order')
                        setFormSubmitState({...formSubmitState, submitted: true, loading: false, success: false})
                    }
                } catch (error) {
                    window.alert('Error Sending Order')
                    setFormSubmitState({...formSubmitState, submitted: false, loading: false, success: false})
                }
            }
        }
    }
    
    return (
        <div>
            <div style={{display: modalIsOpen && 'block'}} className="backdrop">
                <div style={{transform: modalIsOpen && 'scale(1)'}} className="complete-order-form">
                    <div style={{transform: modalIsOpen && 'scale(1)'}} className="complete-order-form-inner">
                        <FaTimesCircle onClick={() => {ModalHandler(); setFormData({...formData, tableNumber: ''})}} className="cancel-form-btn" />
                        <p>About to order ₦ {Number(TotalPrice).toLocaleString("en-US") + '.00'} worth of items.</p>
                        <div className="inputs-wrapper">
                            <div className="input-container">
                                <input value={formData.name} onChange={(e) => {setFormData({...formData, name: capitalizeFirstLetter(e.target.value)})}} placeholder="Enter Your Full Name"  />
                            </div>

                            <div className="input-container">
                                <input type={'number'} value={formData.tableNumber} onChange={(e) => {setFormData({...formData, tableNumber: e.target.value})}} onClick={() => {addOrderToFormData(mainCartItems)}} placeholder="Enter Your Table Number"  />
                            </div>
                        </div>
                        <button onClick={formSubmitState.loading ? null : handleFormSubmit}> {formSubmitState.loading ? <Icon style={{color: '#fff', margin: 'auto', fontWeight: '800', textAlign: 'center'}} width='20' icon="eos-icons:loading" /> : 'Confirm'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}