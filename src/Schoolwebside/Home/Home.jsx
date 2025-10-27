import React from 'react'
import Slider from './Hero'

import Courses from './Courses'
import Why from './Why'

import Mission from './Mission'
import Ourcorevalue from './Ourcorevalue'
import Contactus from './Contactus'
import Gallery from './Gallery'
import Ourservice from './Ourservice'
import ShowPrincipaltoclient from './Princaple'
import DisplayAchievements from './DisplayAchievements'
import Publicnotic from './Publicnotic'
import Popup from './Popup'
import SchoolTestimonialCarousel from "./SchoolTestimonialCarousel"
import TeacherCards from '../Admin/TeacherCards'




const Home = () => {
  return (
    <div>
         <main className="     ">
          <div className="   text-black   min-h-screen">
          
        <Popup/>
           <Slider/>
          <Why/>
          <Courses/>
          <ShowPrincipaltoclient/>
          <DisplayAchievements/>
           <Publicnotic/>
          <Mission/>
          <Ourcorevalue/>
          <Contactus/>
            <SchoolTestimonialCarousel/>
          <Gallery/>
          <Ourservice/>
          <TeacherCards/>
          </div>
        </main>
    </div>
  )
}

export default Home
