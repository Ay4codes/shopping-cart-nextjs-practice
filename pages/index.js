import React, { useState } from 'react'
import Head from 'next/head'
import MenuCards from '../components/MenuCards'
import NavigationBar from '../components/Nav'
import FoodCardData from '../Data/FoodCardData'
import SmoothyCardData from '../Data/DrinksData'
import SoftDrinksCardData from '../Data/SftDrinksData'
import AlcoholData from '../Data/AlchData'
import FilterBtns from '../components/Filter'

export default function Home() {
  const [toRenderData, setToRenderData] = useState(FoodCardData)
  const [toZoomCart, setToZoomCart] = useState(false)
  const [Qty, setQty] = useState(1)
  const [mainCartItems, setmainCartItems] = useState([])

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
    }, 200);
  }

  function PostCart(data) {
    if (mainCartItems.length === 0) {
        const newCartItem = {key: data.id, id: data.id, type: data.type, name: data.name, img: data.img, desc: data.desc, price: data.price, qty: Qty, amount: data.price*Qty}
        setmainCartItems([newCartItem, ...mainCartItems])
    } else {
        const exist = mainCartItems.find((x) => x.id === data.id)
        if (exist) {
            exist.qty = Number(Qty) + Number(exist.qty)
        } else {
            const newCartItem = {key: data.id, id: data.id, type: data.type, name: data.name, img: data.img, desc: data.desc, price: data.price, qty: Qty, amount: data.price*Qty}
            setmainCartItems([newCartItem, ...mainCartItems])
        }
    }
  }


  function reduceQty(data) {
    setmainCartItems(currentCartItems =>
      // Use the map() method to iterate over the array
      currentCartItems.map((cartItems) => {
        // On each iteration, check if a certain condition is met.
        if (cartItems.id === data.id) {
          if (data.qty === 1) {
            // Update the properties of the object that matches the condition.
            return {...cartItems, qty:  Number(data.qty) }
          } else {
            return {...cartItems, qty:  Number(data.qty - 1) }
          }
        }
        return cartItems;
      })
    );
  }

  function removeCartItem(cartItem) {
    const exist = mainCartItems.find((x) => x.id === cartItem.id)
    if (exist) {
        setmainCartItems(mainCartItems.filter((item) => item.id !== exist.id))
    }
  }

  return (
    <div className='app-wrapper'>
      <Head>
        <title>Labongoes</title>
      </Head>
      <NavigationBar setmainCartItems={setmainCartItems} removeCartItem={removeCartItem} mainCartItems={mainCartItems} reduceItemQty={reduceQty} zoomOnRemoveCart={changeZoomCartState} toZoomCart={toZoomCart}/>
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
