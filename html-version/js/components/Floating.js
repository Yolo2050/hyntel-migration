import { getScrollPosition } from '../utils/scroll.js';

export class FloatingBanner {
  constructor() {
    this.banner = document.querySelector('.floating_banner');
    this.init();
  }

  init() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollPosition = getScrollPosition();
    
    if (scrollPosition > 200) {
      this.banner.classList.add('fixed');
    } else {
      this.banner.classList.remove('fixed');
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
