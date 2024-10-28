import { getScrollPosition } from '../utils/scroll.js';

export class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav_box');
    this.navButton = document.querySelector('.nav_box button');
    this.navItems = document.querySelectorAll('.nav_box ul li a');
    this.header = document.querySelector('.header');
    
    this.init();
  }

  init() {
    this.handleScroll = this.handleScroll.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);

    window.addEventListener('scroll', this.handleScroll);
    this.navButton.addEventListener('click', this.handleButtonClick);
    this.navItems.forEach(item => {
      item.addEventListener('click', this.handleNavClick);
    });
  }

  handleScroll() {
    const scrollPosition = getScrollPosition();
    if (scrollPosition > 200) {
      this.header.classList.add('on');
    } else {
      this.header.classList.remove('on');
    }
  }

  handleButtonClick() {
    this.nav.classList.toggle('on');
  }

  handleNavClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href !== 'javascript:;') {
      location.href = href;
    }
    this.nav.classList.remove('on');
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
    this.navButton.removeEventListener('click', this.handleButtonClick);
    this.navItems.forEach(item => {
      item.removeEventListener('click', this.handleNavClick);
    });
  }
}
