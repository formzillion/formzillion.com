"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCards, Autoplay, Pagination, Navigation } from "swiper";
import clsx from "clsx";

const Carousel = ({
  className,
  slides
} : {
  className?: string,
  slides: React.ReactNode[]
}) => {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[Autoplay, Pagination, Navigation, EffectCards]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      className={clsx("mySwiper", className)}
    >
      {
        slides.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))
      }
    </Swiper>
  );
};

export default Carousel;