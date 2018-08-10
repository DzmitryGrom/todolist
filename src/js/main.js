(function () {
  'use strict';

  const burger = document.querySelector('#burger'),
    btnCloseMenu = document.querySelector('.header__icon-close'),
    menuList = document.querySelector('.header__list'),
    menuActiveSolid = document.querySelector('.header__item-active');

  let isOpen = false;

  document.addEventListener("click", toggleMenu, false);
  document.addEventListener("touchdown", toggleMenu, false);
  document.addEventListener("click", activeMonth, false);
  document.addEventListener("touchdown", activeMonth, false);

  function toggleMenu(event) {
    const currentElement = event.target;
    if (currentElement.parentNode.classList.contains('icon-burger')) {
      isOpen = true;
      console.log(isOpen);
    }
    if (currentElement.parentNode.classList.contains('icon-close')) {
      isOpen = false;
    }
    if (isOpen === true) {
      menuList.classList.add('header__list_open');
    } else {
      menuList.classList.remove('header__list_open');
    }

  }

  function activeMonth(event) {
    const currentElement = event.target;
    if (currentElement.tagName == 'A') {
      console.dir(currentElement);
      event.preventDefault();
      menuActiveSolid.style.width = currentElement.clientWidth + 'px';
      menuActiveSolid.style.left = currentElement.offsetLeft + 'px';
    }

    return;
  }

  // onMoveSolid(event) {
  //   const currentElement = event.target;
  //   if (currentElement.tagName !== 'A') {
  //     return;
  //   }
  //   this.monthItemActiveLineWidth = currentElement.clientWidth;
  //   this.monthItemActiveLineLeft = currentElement.offsetLeft;
  // }

})();