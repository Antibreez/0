(function () {
  const itemsOnPage = 20;
  let allItems = document.querySelectorAll(`.catalog__list li`);
  let numberOfPages = Math.ceil(allItems.length / itemsOnPage);
  let allButtons = document.querySelectorAll(`.js-catalog-pagination-btn`);

  if (!allItems || !allButtons) {
    return;
  }

  // Показать карточку
  function showItem(item) {
    item.classList.add(`is-open`);
    item.style.display = ``;
  }

  // Скрыть карточку
  function hideItem(item) {
    item.classList.remove(`is-open`);
    item.style.display = `none`;
  }

  // Показать все карточки
  function showAllItems() {
    for (let i = 0; i < allItems.length; i++) {
      showItem(allItems[i]);
    }
  }

  // Показать карточки на странице
  function showPage(number) {
    let lastToShow = number * itemsOnPage - 1;
    let firstToShow = lastToShow - (itemsOnPage - 1);
    for (let i = 0; i < allItems.length; i++) {
      if (i > (firstToShow - 1) && i < (lastToShow + 1)) {
        showItem(allItems[i]);
      } else {
        hideItem(allItems[i]);
      }
    }
  }

  // // Скрыть все карточки
  // function hideAllItems() {
  //   for (let i = 0; i < allItems.length; i++) {
  //     hideItem(allItems[i]);
  //   }
  // }

  // Показать нужное количество кнопок
  function showButtons() {
    for (let i = 0; i <= allButtons.length; i++) {
      if (i < numberOfPages) {
        if (allButtons[i]) {
          allButtons[i].style.display = `block`;
        }
      }
    }
  }

  // Скрыть кнопки
  function hideButtons() {
    for (let i = 0; i <= allButtons.length; i++) {
      if (allButtons[i]) {
        allButtons[i].style.display = `none`;
      }
    }
  }

  // Сделать кнопку неактивной
  function setDisabled(evt) {
    evt.target.closest(`button`).disabled = true;
    for (let i = 0; i <= allButtons.length; i++) {
      if (allButtons[i] && allButtons[i].disabled) {
        allButtons[i].disabled = false;
      }
    }
  }

  // Обработчик кликов на кнопки
  function addClickListener() {
    for (let i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener(`click`, function (evt) {
        let page = i + 1;
        showPage(page);
        setDisabled(evt);
      });
    }
  }

  function setState() {
    if (window.matchMedia(`(max-width: 767px)`).matches) {
      showPage(1);
      showButtons();
      allButtons[0].disabled = true;
      addClickListener();
    } else {
      showAllItems();
      hideButtons();
    }
  }

  setState();
  window.addEventListener(`resize`, setState);
})();

(function () {
  const form = document.querySelector('.checkout form');

  if (form) {
    const inputList = form.querySelectorAll('.input input');
    const textarea = form.querySelector('textarea');
  }

  const button = document.querySelector('.js-checkout-button');
  const popup = document.querySelector('.confirmation');

  if(!form || !inputList.length || !textarea || !button || !popup) {
    return;
  }

  let isSubmitBloked = true;

  let inputs = Array.from(inputList);
  inputs.push(textarea);

  const removeClass = function (item, actualClass) {
    if (item.classList.contains(actualClass)) {
      item.classList.remove(actualClass)
    }
  };

  const addClass = function (item, actualClass) {
    if (!item.classList.contains(actualClass)) {
      item.classList.add(actualClass)
    }
  };

  const checkValidity = function (item) {
    if (!item.value.trim() || item.validity.patternMismatch || item.validity.typeMismatch) {
      addClass(item, 'invalid');
    } else {
      removeClass(item, 'invalid');
    }
  }

  const resetFlag = function () {
    let checkInvalidClass = inputs.some(function(item) {
        return item.classList.contains('invalid') ||item.classList.contains('unchanged');
    });

    if (checkInvalidClass) {
      isSubmitBloked = true;
    } else {
      isSubmitBloked = false;
    }
  };

  const resetButton = function () {
    if (isSubmitBloked) {
      button.setAttribute('disabled', 'disabled');
    } else {
      button.removeAttribute('disabled');
    }
  };

  inputs.forEach((input) => {
    input.classList.add('unchanged');
    input.addEventListener('input', function (){
      removeClass(input, 'unchanged');
      checkValidity(input);
      resetFlag();
      resetButton();
    });
  });

  button.addEventListener('click', function (evt) {
    removeClass(button, 'hidden');
    if (isSubmitBloked) {
      evt.preventDefault();
    } else {
      evt.preventDefault();
      //form.submit();
      addClass(form, 'hidden');
      removeClass(popup, 'hidden');
      inputs.forEach((input) => {
        input.classList.add('unchanged');
      });
      resetFlag();
      resetButton();
      addClass(button, 'hidden');
    }
  })

  form.addEventListener('submit', function (evt) {
    if (isSubmitBloked) {
      evt.preventDefault();
    } else {
      evt.preventDefault();
      addClass(form, 'hidden');
      removeClass(popup, 'hidden');
      inputs.forEach((input) => {
        input.classList.add('unchanged');
      });
      resetFlag();
      resetButton();
      addClass(button, 'hidden');
    }
  });

})();

(function () {
  const header = document.querySelector(`.header`);
  const headerToggler = header.querySelector(`.js-menu-toggler`);
  const menyLinks = header.querySelectorAll(`.js-menu-link`);
  const classIsOpen = `header--menu-open`;
  const headerCart = header.querySelector(`.cart a`);
  const headerLogo = header.querySelector(`.header__logo a`);

  if (!header || !headerToggler || !menyLinks || !headerCart || !headerLogo) {
    return;
  }

  // Меняет таб-индекс
  function setTabindex() {
    if (window.matchMedia(`(max-width: 1023px)`).matches) {
      headerLogo.tabIndex = 2;
      headerCart.tabIndex = 3;
    } else {
      headerLogo.tabIndex = 0;
      headerCart.tabIndex = 0;
    }
  }

  // Закрыть меню
  function closeMenu() {
    header.classList.remove(classIsOpen);
    headerToggler.querySelector(`span`).textContent = `Открыть меню`;
  }

  // Открыть меню
  function openMenu() {
    header.classList.add(classIsOpen);
    headerToggler.querySelector(`span`).textContent = `Закрыть меню`;
  }

  // Добавить обработчик событий на кнопку
  headerToggler.addEventListener(`click`, function () {
    if (header.classList.contains(classIsOpen)) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Добавть обработчики событий на ссылки
  for (let i = 0; i < menyLinks.length; i++) {
    menyLinks[i].addEventListener(`click`, closeMenu);
  }

  setTabindex();
  window.addEventListener(`resize`, setTabindex);
  closeMenu();
})();

(function () {
  const body = document.querySelector(`body`);
  const popupCart = document.querySelector(`.popup-cart`);
  const popupClose = popupCart.querySelector(`.popup-cart__close`);
  const popupToCatalog = popupCart.querySelector(`.popup-cart__to-catalog`);
  const overlay = popupCart.querySelector(`.popup-cart__overlay`);

  function isEscKey(evt) {
    return evt.key === `Esc` || evt.key === `Escape`;
  };

  function showElement(element) {
    element.classList.remove(`hidden`);
  }

  function hideElement(element) {
    element.classList.add(`hidden`);
  }

  function PopupCart() {
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onToCatalogClick = this._onToCatalogClick.bind(this);
    this._onOverlayClick = this._onOverlayClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  PopupCart.prototype.open = function () {
    showElement(popupCart);
    body.classList.add(`popup`);
    this._addEventListeners();
  };

  PopupCart.prototype._close = function () {
    hideElement(popupCart);
    body.classList.remove(`popup`);
    this._removeEventListeners();
  };

  PopupCart.prototype._onCloseClick = function () {
    this._close();
  };

  PopupCart.prototype._onToCatalogClick = function () {
    this._close();
  };

  PopupCart.prototype._onOverlayClick = function () {
    this._close();
  };

  PopupCart.prototype._onKeyDown = function (evt) {
    return isEscKey(evt) && this._close();
  };

  PopupCart.prototype._addEventListeners = function () {
    popupClose.addEventListener(`click`, this._onCloseClick);
    popupToCatalog.addEventListener(`click`, this._onToCatalogClick);
    overlay.addEventListener(`click`, this._onOverlayClick);
    document.addEventListener(`keydown`, this._onKeyDown);
  };

  PopupCart.prototype._removeEventListeners = function () {
    popupClose.removeEventListener(`click`, this._onCloseClick);
    popupToCatalog.removeEventListener(`click`, this._onToCatalogClick);
    overlay.removeEventListener(`click`, this._onOverlayClick);
    document.removeEventListener(`keydown`, this._onKeyDown);
  };

  window.PopupCart = PopupCart;
})();

(function (PopupCart) {
  let initialDirection = getDirection();

  let previewSlider = initPreviewSwiper(initialDirection, `.popup-preview__slider`);
  let fullSlider = initPreviewSwiper(initialDirection, `.popup-fullview__slider`);

  function getDirection() {
    return document.body.clientWidth > 767 ? `vertical` : `horizontal`;
  }

  function initPreviewSwiper(direct, name) {
    return new Swiper(name, {
      direction: direct,
      loop: true,
      mousewheel: {
        sensitivity: 100,
      },
      pagination: {
        el: `.swiper-pagination`,
        clickable: true,
      },
    });
  }

  window.addEventListener(`resize`, function () {
    if (getDirection() !== initialDirection) {
      initialDirection = getDirection();
      previewSlider.destroy(true, true);
      previewSlider = initPreviewSwiper(initialDirection, `.popup-preview__slider`);
      fullSlider.destroy(true, true);
      fullSlider = initPreviewSwiper(initialDirection, `.popup-fullview__slider`);
    }
  });

  const body = document.querySelector(`body`);
  const popup = document.querySelector(`.popup-preview`);
  const preview = popup.querySelector(`.popup-preview__slider`);
  const fullView = popup.querySelector(`.popup-fullview__slider`);
  const itemInfo = popup.querySelector(`.popup-preview__info`);
  const closePreview = popup.querySelector(`.popup-preview__close`);
  const closeFullview = popup.querySelector(`.popup-fullview__close`);
  const toCart = popup.querySelector(`.popup-preview__to-cart`);

  function showElement(element) {
    element.classList.remove(`hidden`);
  }

  function hideElement(element) {
    element.classList.add(`hidden`);
  }

  function PopupPreview() {
    this._onPreviewClick = this._onPreviewClick.bind(this);
    this._onFullviewClick = this._onFullviewClick.bind(this);
    this._onToCartClick = this._onToCartClick.bind(this);
    this._onClosePreviewClick = this._onClosePreviewClick.bind(this);
    this._onCloseFullviewClick = this._onCloseFullviewClick.bind(this);
    this._addEventListeners = this._addEventListeners.bind(this);

    this._popupCart = new PopupCart();
  }

  PopupPreview.prototype.open = function () {
    showElement(popup);
    body.classList.add(`popup`);
    previewSlider.destroy(true, true);
    previewSlider = initPreviewSwiper(initialDirection, `.popup-preview__slider`);
    this._addEventListeners();
  };

  PopupPreview.prototype._close = function () {
    hideElement(popup);
    body.classList.remove(`popup`);
    this._removeEventListeners();
  };

  PopupPreview.prototype._onToCartClick = function () {
    this._popupCart.open();
  };

  PopupPreview.prototype._onPreviewClick = function () {
    hideElement(itemInfo);
    hideElement(preview);
    showElement(fullView);
    fullSlider.destroy(true, true);
    fullSlider = initPreviewSwiper(initialDirection, `.popup-fullview__slider`);
  };

  PopupPreview.prototype._onFullviewClick = function () {
    hideElement(fullView);
    showElement(preview);
    showElement(itemInfo);
    previewSlider.destroy(true, true);
    previewSlider = initPreviewSwiper(initialDirection, `.popup-preview__slider`);
  };

  PopupPreview.prototype._onClosePreviewClick = function () {
    this._close();
    this._removeEventListeners();
  };

  PopupPreview.prototype._onCloseFullviewClick = function () {
    hideElement(fullView);
    showElement(preview);
    showElement(itemInfo);
  };

  PopupPreview.prototype._addEventListeners = function () {
    preview.addEventListener(`click`, this._onPreviewClick);
    fullView.addEventListener(`click`, this._onFullviewClick);
    toCart.addEventListener(`click`, this._onToCartClick);
    closePreview.addEventListener(`click`, this._onClosePreviewClick);
    closeFullview.addEventListener(`click`, this._onCloseFullviewClick);
    //document.addEventListener(`keydown`, this._onKeyPress);
  };

  PopupPreview.prototype._removeEventListeners = function () {
    preview.removeEventListener(`click`, this._onPreviewClick);
    fullView.removeEventListener(`click`, this._onFullviewClick);
    toCart.removeEventListener(`click`, this._onToCartClick);
    closePreview.removeEventListener(`click`, this._onClosePreviewClick);
    closeFullview.removeEventListener(`click`, this._onCloseFullviewClick);
    //document.addEventListener(`keydown`, this._onKeyPress);
  };

  window.PopupPreview = PopupPreview;
})(window.PopupCart);



(function () {
  let scrollDownLink = document.querySelector(`.js-scroll-down`);

  let handleAnchorClick = function () {
    event.preventDefault();
    let linkTarget = event.currentTarget.getAttribute(`href`);
    let id = linkTarget.substring(1, linkTarget.length);
    let aim = document.getElementById(id);
    aim.scrollIntoView({block: `start`, behavior: `smooth`});
  };

  if (scrollDownLink) {
    scrollDownLink.addEventListener(`click`, handleAnchorClick);
  }

})();

(function () {
  /* eslint-disable no-undef */
  // eslint-disable-next-line no-unused-vars
  let mainSwiper = new Swiper(`.slider-main__slider.swiper-container`, {
    fadeEffect: {crossFade: true},
    virtualTranslate: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    speed: 1000,
    slidersPerView: 1,
    effect: `fade`
  });
})();

(function (PopupPreview, PopupCart) {
  const catalog = document.querySelector(`.js--catalog`);

  const popupPreview = new PopupPreview();
  const popupCart = new PopupCart();

  function onCatalogClick(evt) {
    if (evt.target.parentNode.classList.contains(`js--preview`)
      || evt.target.parentNode.parentNode.classList.contains(`js--preview`)) {
      popupPreview.open();
    }

    if (evt.target.classList.contains(`js--to-cart`)) {
      popupCart.open();
    }
  }

  catalog.addEventListener(`click`, onCatalogClick);
})(window.PopupPreview, window.PopupCart);
