
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import image1 from '../assets/volunteer-2.jpg';
import image2 from '../assets/volunteer-3.jpg';
import image3 from '../assets/volunteer-4.jpeg';
import image4 from '../assets/Volunteer-banner.jpg';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';


export default function Carousel() {


  return (
    <div className='container px-6 py-2 mx-auto'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Slide image={image1} text='Volunteerism that Touches the Soul'/></SwiperSlide>
        <SwiperSlide><Slide image={image2} text='Volunteerism that Touches the Soul'/></SwiperSlide>
        <SwiperSlide><Slide image={image3} text='Volunteerism that Touches the Soul'/></SwiperSlide>
        <SwiperSlide><Slide image={image4} text='Volunteerism that Touches the Soul'/></SwiperSlide>
      </Swiper>
    </div>
  );
}