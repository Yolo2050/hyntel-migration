import { Navigation } from "./components/Navigation.js";
import { Header } from "./components/Header.js";
import { FloatingBanner } from "./components/Floating.js";
import { Anchor } from "./components/Anchor.js";
import { Toggle } from "./components/Toggle.js";
import { SwiperManager } from "./components/Swiper.js";

class App {
  constructor() {
    this.components = {
      navigation: new Navigation(),
      header: new Header(),
      floating: new FloatingBanner(),
      anchor: new Anchor(),
      toggle: new Toggle(),
      swiper: new SwiperManager(),
    };
  }

  destroy() {
    Object.values(this.components).forEach((component) => {
      if (typeof component.destroy === "function") {
        component.destroy();
      }
    });
  }
}

// DOM이 로드되면 앱 초기화
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
  new WOW().init();
});

// 페이지 언로드 시 정리
window.addEventListener("unload", () => {
  if (window.app) {
    window.app.destroy();
  }
});
