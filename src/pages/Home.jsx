import React from 'react'
import Navbar from '../components/Navbar'
import Badger from '../components/Badger'
import TopServices from '../components/TopServices'
import PromotionsSection from '../components/PromotionsSections'

const Home = () => {
  return (
    <div>
      <Badger />
      <PromotionsSection />
      <TopServices />
    </div>
  )
}

export default Home
