import { TRANSLATIONS } from '../utils/constants.js';

export class Toggle {
  constructor() {
    this.toggleBtn = document.querySelector('[data-role="btnToggle"]');
    this.subText = document.querySelector('.our-team .txt_box .sub_txt');
    this.btnMore = document.querySelector('.our-team .btn-more');
    this.btnText = document.querySelector('.our-team .btn-more > span');
    
    if (this.toggleBtn) {
      this.init();
    }
  }

  init() {
    this.toggleBtn.addEventListener('click', this.handleToggle.bind(this));
  }

  handleToggle(e) {
    e.preventDefault();
    this.subText.classList.toggle('on');
    this.btnMore.classList.toggle('on');

    const isKorean = document.getElementById('wrap').classList.contains('ko-page');
    const lang = isKorean ? 'ko' : 'en';
    
    this.btnText.textContent = this.btnMore.classList.contains('on') 
      ? TRANSLATIONS[lang].close 
      : TRANSLATIONS[lang].more;
  }
}

