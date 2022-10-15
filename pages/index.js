import React, { useState } from 'react'
import Head from 'next/head'
import MenuCards from '../components/HomeComponents/MenuCards'
import NavigationBar from '../components/GlobalComponents/Nav'
import FoodCardData from '../Data/FoodCardData'
import SmoothyCardData from '../Data/DrinksData'
import SoftDrinksCardData from '../Data/SftDrinksData'
import AlcoholData from '../Data/AlchData'

export default function Home() {
  const [toRenderData, setToRenderData] = useState(FoodCardData)

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

  const [cart, setCart] = useState([])

  function click(item) {
    setCart([...cart, item])
  }


  return (
    <div className='app-wrapper'>
      <Head>
        <title>Home</title>
      </Head>
      <NavigationBar cart={cart} />
      <div>
          <div className='home-head'>
            <p>-- Menu Items --</p>
          </div>
          <div className='filter-btn-container'>
            <button onClick={filterFood}>Food</button>
            <button onClick={filterSmoothy}>Smoothy</button>
            <button onClick={filterDrinks}>Soft Drinks</button>
            <button onClick={filterAlcohol}>Alcohol</button>
          </div>
      </div>
      <div className='menu-card-wrapper'>
          {toRenderData.map((data, index) => {
            return (
              <MenuCards item = {data} click={click} id={index} key={data.key} img={data.img} desc={data.desc} price={data.price} />
            )
          })}
      </div>
    </div>
  )
}
