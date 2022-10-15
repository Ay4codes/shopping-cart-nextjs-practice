import react from "react";
import Image from 'next/image'
import {FaPlus} from 'react-icons/fa'

export default function MenuCards(props) {
    const {item, click} = props
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
                            <p>{props.price}</p>
                        </button>
                    </div>
                    <div onClick={() => click(props)} className="add-cart ">
                        <FaPlus style={{color: '#fff'}} />
                    </div>
                </div>
            </div>
        </div>
    )
} 