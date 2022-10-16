import React, { useState } from 'react'
import Head from 'next/head'
import MenuCards from '../components/HomeComponents/MenuCards'
import NavigationBar from '../components/GlobalComponents/Nav'
import FoodCardData from '../Data/FoodCardData'
import SmoothyCardData from '../Data/DrinksData'
import SoftDrinksCardData from '../Data/SftDrinksData'
import AlcoholData from '../Data/AlchData'
import FilterBtns from '../components/GlobalComponents/Filter'

export default function Home() {
  const [toRenderData, setToRenderData] = useState(FoodCardData)
  const [cart, setCart] = useState([])
  const [toZoomCart, setToZoomCart] = useState(false)

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


  function click(item) {
    setCart([...cart, item])
  }

  function changeZoomCartState() {
    setToZoomCart(true)

    setTimeout(() => {
      setToZoomCart(false)
    }, 300);
  }

  return (
    <div className='app-wrapper'>
      <Head>
        <title>Home</title>
      </Head>
      <NavigationBar cart={cart} zoomOnRemoveCart={changeZoomCartState} toZoomCart={toZoomCart}/>
      <div className='filter-btns-coont'>
        <FilterBtns filterFood={filterFood} filterSmoothy={filterSmoothy} filterDrinks={filterDrinks} filterAlcohol={filterAlcohol} />
        <div className='menu-card-wrapper'>
          {toRenderData.map((data, index) => {
            return (
              <MenuCards toUnzoomCart={setToZoomCart} zoom={changeZoomCartState} item = {data} click={click} id={index} key={data.key} img={data.img} desc={data.desc} price={data.price} name={data.name} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
