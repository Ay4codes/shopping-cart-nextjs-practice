import react, { useEffect, useState } from "react";
import {FaShoppingCart} from 'react-icons/fa'
import {FaTimesCircle} from 'react-icons/fa'
import CartItem from "./CartItem";
import {ToWords} from 'to-words'
import OrderForm from "./OrderForm";

const toWords = new ToWords({
    localeCode: 'en-US',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: true,
      currencyOptions: {
        name: 'Naira',
        plural: 'Naira',
        symbol: '₦'
      }
    }
  });
 
export default function NavigationBar(props) {
    const {toZoomCart, reduceItemQty, zoomOnRemoveCart, mainCartItems, removeCartItem, setmainCartItems} = props
    const [cartIsOpen, setCartIsOpen] = useState(false)
    const [modalIsOpen, setModalisOpen] = useState(false)
    
    function sanitizecartLength() {
        if (mainCartItems.length === 0) {
            return null
        } else {
            return mainCartItems.length
        }
    }
    function OpenCartHandler() {
        setCartIsOpen(true)
    }
    function CloseCartHandler() {
        setCartIsOpen(false)
    }
    function ModalHandler() {
        if (modalIsOpen == false) {
            setModalisOpen(true)
        } else {
            setModalisOpen(false)
        }
    }
    function CloseModalHandler() {
        setModalisOpen(false)
    }
    
    let TotalPrice = Number(null)
    function calcTotalPrice() {
        for (let i = 0; i < mainCartItems.length; i++) {
            const element = mainCartItems[i];
            TotalPrice += Number(element.price * element.qty)
        }
        if (TotalPrice === null) {
            return null
        } else {
            return Number(TotalPrice).toLocaleString("en-US") + '.00'
        }
    }

    let Total = Number(null)
    function TotalToSpeech() {
      for (let i = 0; i < mainCartItems.length; i++) {
          const element = mainCartItems[i];
          Total += Number(element.price * element.qty)
      }
      const convert = toWords.convert(Total, {currency: true, ignoreDecimal: true})
      function FormatSpeech() {
        if (convert === 'Zero Naira') {
            return '';
        } else {
            return 'About to order '+convert+' worth of items'
        }
    }
        const speech = 'About to order '+convert+' worth of items' 
        const msg = new SpeechSynthesisUtterance()
        msg.text = FormatSpeech()
        console.log()
        window.speechSynthesis.speak(msg)
        Total = Number(null)
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
                        <FaTimesCircle style={{cursor: 'pointer'}} onClick={() => {CloseCartHandler(); CloseModalHandler()}} />
                        <div className="order-cont">
                            <button onClick={() => {TotalToSpeech(); ModalHandler()}}><span>Complete Order</span></button>
                            <div className="cart">
                                <button style={{transform: toZoomCart ? 'scale(1.3)' : 'scale(1)'}}>
                                    <p>{sanitizecartLength()}</p><FaShoppingCart className="cart-icon" />
                                </button> 
                            </div>
                        </div>
                    </div>
                    <div className="cart-item-main-container">
                        {mainCartItems.map((cartItem) => {
                            return (
                                <CartItem key={cartItem.id} id={cartItem.id} onReduce={reduceItemQty} onRemove={removeCartItem} mainCartItems={mainCartItems} img={cartItem.img} price={cartItem.price} name={cartItem.name} zoomOnRemoveCart={zoomOnRemoveCart} qty={cartItem.qty} />
                            )
                        })}
                    </div>
                    <div className="total-btn">
                        <button>
                            <span>Total: ₦ {calcTotalPrice()}</span>
                        </button>
                    </div>
                    
                </div>
                <OrderForm setmainCartItems={setmainCartItems} mainCartItems={mainCartItems} modalIsOpen={modalIsOpen} ModalHandler={ModalHandler} TotalPrice={TotalPrice}/>
            </div>
        </div>

    )
}