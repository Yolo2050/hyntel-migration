import { BREAKPOINTS } from "../utils/constants.js";

export class SwiperManager {
  constructor() {
    this.initNewsSwiper();
    this.initPartnerSwiper();
  }

  initNewsSwiper() {
    return new Swiper(".swiper.news_swiper", {
      slidesPerView: "auto",
      slidesPerGroup: 1,
      centeredSlides: true,  // 모바일에서 중앙 정렬
      loop: true,  // 무한 루프
      breakpoints: {
        [BREAKPOINTS.DESKTOP]: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 33,
          centeredSlides: false,  // 데스크톱에서는 중앙 정렬 해제
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  initPartnerSwiper() {
    return new Swiper(".swiper.partner_swiper", {
      slidesPerView: "auto",
      allowTouchMove: true,
      breakpoints: {
        [BREAKPOINTS.DESKTOP]: {
          allowTouchMove: false,
        },
      },
      on: {
        breakpoint: function () {
          setTimeout(() => {
            this.slideTo(0, 0);
          }, 150);
        },
      },
    });
  }
}
