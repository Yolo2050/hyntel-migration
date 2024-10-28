import { getScrollPosition, isInViewport } from "../utils/scroll.js";

export class Header {
  constructor() {
    this.header = document.querySelector(".header");
    this.nav = document.querySelector(".nav_box");
    this.navItems = document.querySelectorAll(".gnb_box li a");
    this.sections = [
      ".about-us",
      ".our-team",
      ".algorism",
      ".partner",
      ".news",
      ".contact_us",
    ].map((selector) => document.querySelector(selector));

    this.init();
  }

  init() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const scrollPosition = getScrollPosition();
    const navHeight = this.nav.offsetHeight;

    // 현재 활성화된 섹션 찾기
    this.sections.forEach((section, index) => {
      if (isInViewport(section, navHeight)) {
        this.navItems.forEach((item) => item.classList.remove("on"));
        this.navItems[index].classList.add("on");
      }
    });
  }

  destroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
