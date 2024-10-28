export function isInViewport(element, offset = 0) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return (
    rect.top <= windowHeight - offset &&
    rect.bottom >= offset
  );
}

export function getScrollPosition() {
  return window.scrollY || document.documentElement.scrollTop;
}

export function scrollToElement(target, options = {}) {
  const element = document.querySelector(target);
  if (!element) return;

  const {
    offset = 0,
    speed = 500,
    behavior = 'smooth'
  } = options;

  const navHeight = document.querySelector('.nav_box')?.offsetHeight || 0;
  const targetPosition = element.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: targetPosition - navHeight + offset,
    behavior
  });
}
