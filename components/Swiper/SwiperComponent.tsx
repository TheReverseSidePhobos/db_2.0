import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Pagination } from "swiper/core";
import 'swiper/css';
import SwiperCore, { Autoplay } from 'swiper';
import style from './Swiper.module.scss';

const SwiperComponent: React.FC<any> = (data: any) => {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false
      }}
      slidesPerView={1}
      spaceBetween={50}
      speed={4000}
      grabCursor={true}
      //onSlideChange={() => console.log('slide change')}
      //onSwiper={(swiper) => console.log(swiper)}
    >
      {data.data &&
        data.data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className={style.itemInfo}>
              <div>
                <strong>{item.name}</strong>
              </div>
              <div>{item.description}</div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperComponent;
