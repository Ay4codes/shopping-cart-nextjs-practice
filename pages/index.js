import React, { useState } from 'react'
import Head from 'next/head'
import MenuCards from '../components/HomeComponents/MenuCards'
import NavigationBar from '../components/GlobalComponents/Nav'
import FoodCardData from '../Data/FoodCardData'
import SmoothyCardData from '../Data/DrinksData'
import SoftDrinksCardData from '../Data/SftDrinksData'
import AlcoholData from '../Data/AlchData'
import FilterBtns from '../components/GlobalComponents/Filter'
import CartData from '../Data/CartData'

export default function Home() {
  const [toRenderData, setToRenderData] = useState(FoodCardData)
  const [toZoomCart, setToZoomCart] = useState(false)
  const [Qty, setQty] = useState(1)

  function filterFood() {
    setToRenderData(FoodCardData)
  }
  function filterSmoothy() {
    setToRenderData(SmoothyCardData)
  }
  function filterDrinks() {
    setToRenderData(SoftDrinksCardData)
  }
  function filterAlcohol() {
    setToRenderData(AlcoholData)
  }

  function changeZoomCartState() {
    setToZoomCart(true)

    setTimeout(() => {
      setToZoomCart(false)
    }, 300);
  }

  function PostCart(data) {
    if (CartData.length === 0) {
        const newCartItem = {key: data.id, id: data.id, type: data.type, name: data.name, img: data.img, desc: data.desc, price: data.price, qty: Qty, amount: data.price*Qty}
        CartData.push(newCartItem)
    } else {
        const exist = CartData.find((x) => x.id === data.id)
        if (exist) {
            exist.qty = Number(Qty) + Number(exist.qty)
        } else {
            const newCartItem = {key: data.id, id: data.id, type: data.type, name: data.name, img: data.img, desc: data.desc, price: data.price, qty: Qty, amount: data.price*Qty}
            CartData.push(newCartItem)
        }
    }
  }
  function reduceQty(data) {
    const exist = CartData.find((x) => x.id === data.id)
    if (exist) {
      exist.qty = exist.qty - 1
      console.log(CartData);
    }
    // console.log(exist.qty)
  }

  return (
    <div className='app-wrapper'>
      <Head>
        <title>Home</title>
      </Head>
      <NavigationBar reduceItemQty={reduceQty} zoomOnRemoveCart={changeZoomCartState} toZoomCart={toZoomCart}/>
      <div className='filter-btns-coont'>
        <FilterBtns filterFood={filterFood} filterSmoothy={filterSmoothy} filterDrinks={filterDrinks} filterAlcohol={filterAlcohol} />
        <div className='menu-card-wrapper'>
          {toRenderData.map((data, index) => {
            return (
              <MenuCards Qty={Qty} setQty={setQty} toUnzoomCart={setToZoomCart} zoom={changeZoomCartState} item = {data} id={data.key} key={data.key} img={data.img} desc={data.desc} price={data.price} name={data.name} onPost={PostCart} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
