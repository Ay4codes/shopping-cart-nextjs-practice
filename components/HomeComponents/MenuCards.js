import react, { useState } from "react";
import Image from 'next/image'
import {FaPlus} from 'react-icons/fa'
import CartData from "../../Data/CartData";




export default function MenuCards(props) {
    const {click} = props
    const {zoom} = props

    const [Qty, setQty] = useState(null)
    const [price, setPrice] = useState(null)

    function calculatePrice() {
        const calcValues = (props.price * Qty)+'.00'
        const formatedCalcValues = Number(calcValues).toLocaleString("en-US") + '.00'
        if (calcValues == 0) {
            return Number(props.price).toLocaleString("en-US") + '.00'
        } else {
            return  formatedCalcValues
        }
    }
    // Stoped Here
    function PostCart(data) {
        CartData.push({key: data.id, type: data.type, name: data.name, img: data.img, desc: data.desc, price: data.price, qty: Qty, amount: data.price*Qty})
    }                                                                                             
    return (
        <div className="card-container">
            <div>
                <div className="card-img-container">
                    <img src={props.img} />
                </div>
                <div className="card-desc-cont">
                    <p>{props.desc}</p>
                </div>
                <div className="btm-cont">
                    <div className="price-cont">
                        <button>
                            <p>{'₦ ' + calculatePrice()}</p>
                        </button>
                        <input type={'number'} onChange={(e) => {setQty(e.target.value);}} placeholder="Qty?"></input>
                    </div>
                    <div onClick={async () => { await click(props); zoom(); PostCart(props);  }} className="add-cart ">
                        <FaPlus style={{color: '#fff'}} />
                    </div>
                </div>
            </div>
        </div>
    )
} 