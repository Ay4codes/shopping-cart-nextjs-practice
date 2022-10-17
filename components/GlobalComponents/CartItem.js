import {FaTimesCircle} from 'react-icons/fa'
import CartData from '../../Data/CartData'

export default function CartItem(props) {
    const {price, qty} = props
    const {CartData} = props
    const {zoomOnRemoveCart} = props
    const {onRemove} = props
    const {onReduce} = props

    function calculatePrice() {
        const calcValues = (price * qty)+'.00'
        const formatedCalcValues = Number(calcValues).toLocaleString("en-US") + '.00'
        if (calcValues == 0) {
            return Number(props.price).toLocaleString("en-US") + '.00'
        } else {
            return  formatedCalcValues
        }
    }

    function FormatQty() {
        if (qty == null) {
            return 1
        } else {
            return qty
        }
    }

    function formatAmount() {
        return Number(price).toLocaleString("en-US") + '.00'
    }

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
                                    <div className="cart-price-desc-wrapper"><span>Amount: <b>₦ {formatAmount()}</b></span></div>
                                    <div className="cart-price-desc-wrapper"><span>Qty: <b>{FormatQty()}</b></span></div>
                                    <div className="cart-price-desc-wrapper"><span>Total: <b>₦ {calculatePrice()}</b></span></div>
                                </div>
                            </div>
                        </div>
                        <div className='reduce-btns'>
                            <img onClick={() => onReduce(props)} width={30} src='/reduce.png' />
                            <FaTimesCircle style={{fontSize: '30px', color: '#ea4c89', cursor: 'pointer'}} onClick={() => {zoomOnRemoveCart(); onRemove(props)}} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}