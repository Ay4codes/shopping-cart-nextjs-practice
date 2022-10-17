import react, { useState } from "react";
import {FaPlus} from 'react-icons/fa'




export default function MenuCards(props) {
    const {zoom} = props
    const {setQty} = props
    const {onPost} = props                                                                                           

    return (
        <div className="card-container">
            <div>
                <div className="card-img-container">
                    <img src={props.img} />
                </div>
                <div className="card-desc-cont">
                    <h5>{props.name}</h5>
                    <p>{props.desc}</p>
                </div>
                <div className="btm-cont">
                    <div className="price-cont">
                        <button>
                            <p>{'₦ ' + Number(props.price).toLocaleString("en-US") + '.00'}</p>
                        </button>
                        <input type={'number'} onChange={(e) => {setQty(e.target.value);}} placeholder="Qty?"></input>
                    </div>
                    <div onClick={async () => {zoom(); onPost(props); setQty(1)}} className="add-cart ">
                        <FaPlus style={{color: '#fff'}} />
                    </div>
                </div>
            </div>
        </div>
    )
} 