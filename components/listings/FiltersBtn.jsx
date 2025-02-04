import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaFireAlt, FaMountain, FaRegSnowflake } from "react-icons/fa";
import { FaBed, FaMountainCity, FaPersonSwimming, FaCampground, FaCow, FaIgloo, FaSailboat,FaFortAwesome } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';


const filters = [
  { icon: <FaFireAlt />, label: "Trending" },
  { icon: <FaBed />, label: "Rooms" },
  { icon: <FaMountainCity />, label: "Iconic Cities" },
  { icon: <FaMountain />, label: "Mountains" },
  { icon: <FaFortAwesome />, label: "Castles" },
  { icon: <FaPersonSwimming />, label: "Amazing Pools" },
  { icon: <FaCampground />, label: "Camping" },
  { icon: <FaCow />, label: "Farms" },
  { icon: <FaRegSnowflake />, label: "Arctic" },
  { icon: <FaIgloo />, label: "Domes" },
  { icon: <FaSailboat />, label: "Boats" },
];

const FiltersBtn = () => {
const handleToggle = ()=>{
 let taxInfo = document.getElementsByClassName("tax-info");
 for(let info of taxInfo ){
    if(info.style.display != "inline"){
      info.style.display = "inline";
    }else{
      info.style.display = "none"
    }
  }
}


    return (
      <div className="main-filter">
        <div id="filters-container">
        <Swiper
          slidesPerView={6}
          spaceBetween={0} // Reduced space between slides
          navigation={true}
          breakpoints={{
            320: { slidesPerView: 4, spaceBetween: 5}, // Mobile
            768: { slidesPerView: 6, spaceBetween: 5 }, // Tablet
            1024: { slidesPerView: 9, spaceBetween: 5 }, // Desktop
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {filters.map((filter, index) => (
            <SwiperSlide key={index}>
              <div className="filter">
                <div className="icon">{filter.icon}</div>
                <p>{filter.label}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        
        <div id="tax-toggler">
        <Form.Label htmlFor="tax" >Total taxes</Form.Label>
        <Form.Check // prettier-ignore
        type="switch"
        id="tax"
        onClick={handleToggle}
        />
      
      </div>
      </div>
    );
  };
  
  export default FiltersBtn;