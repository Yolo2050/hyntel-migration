import { BREAKPOINTS } from '../utils/constants.js';
import { scrollToElement } from '../utils/scroll.js';

export class Anchor {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('[data-role="btnAnchor"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleClick.bind(this));
    });
  }

  handleClick(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const targetSelector = target.dataset.target;
    const speed = parseInt(target.dataset.speed) || 500;
    const scroll = this.calculateScroll(target.dataset.scroll);
    
    scrollToElement(targetSelector, { speed, offset: scroll });
  }

  calculateScroll(scrollValue) {
    if (!scrollValue) return 1;
    
    const scroll = parseInt(scrollValue);
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth < BREAKPOINTS.DESKTOP;
    
    if (isMobile) {
      return Math.min(scroll, (scroll / 720) * windowWidth);
    }
    return Math.min(scroll, (scroll / 1440) * windowWidth);
  }
}

