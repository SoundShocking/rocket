import customSelect from 'custom-select'
import Swiper, { Navigation, Pagination } from 'swiper';
import Modal from 'bootstrap/js/dist/modal';

Swiper.use([Navigation, Pagination]);

const $mapContactSelect = document.querySelectorAll('.map-contacts__custom-select');

if ($mapContactSelect.length) {
  customSelect($mapContactSelect, {
    containerClass: '_custom-select-container',
    openerClass: '_custom-select-opener',
    panelClass: '_custom-select-panel',
    optionClass: '_custom-select-option'
  })
}

const $equipmentTabsHeaderItems = document.querySelectorAll('.equipment-tabs__header-item');
const $equipmentTabsBodyTab = document.querySelectorAll('.equipment-tabs-body__tab');
if ($equipmentTabsHeaderItems.length) {
  $equipmentTabsHeaderItems.forEach(el => {
    el.addEventListener('click', e => {
      $equipmentTabsHeaderItems.forEach(el => el.classList.remove('equipment-tabs__header-item--selected'));
      e.currentTarget.classList.add('equipment-tabs__header-item--selected');

      const $tab = document.getElementById(e.currentTarget.dataset.tab);
      $equipmentTabsBodyTab.forEach(el => el.classList.remove('equipment-tabs-body__tab--active'));
      $tab.classList.add('equipment-tabs-body__tab--active');
    })
  })
}

// const $equipmentTabsSlider = document.querySelectorAll('.equipment-tabs-body__slider');
const $equipmentTabsCarousel = document.querySelectorAll('.equipment-tabs-body__carousel');
const $equipmentTabsSubtab = document.querySelectorAll('.equipment-tabs-body__subtab');
if ($equipmentTabsCarousel.length) {
  $equipmentTabsCarousel.forEach(el => {
    new Swiper(el.querySelector('.equipment-tabs-body__slider'), {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 25,
      navigation: {
        nextEl: el.querySelector('.equipment-tabs-body__slider-next'),
        prevEl: el.querySelector('.equipment-tabs-body__slider-prev'),
      },
      pagination: {
        el: el.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true
      },
      observer: true,
      observeParents: true,
      breakpoints: {
        768: {
          slidesPerView: 3
        }
      }
    })
  })
}

const $equipmentTabsBodyItem = document.querySelectorAll('.equipment-tabs-body__item');

if ($equipmentTabsBodyItem.length) {
  $equipmentTabsBodyItem.forEach(el => {
    el.addEventListener('click', e => {
      const $activeTabLink = e.currentTarget.closest('.equipment-tabs-body__list').querySelector('.equipment-tabs-body__item--active');
      if ($activeTabLink) $activeTabLink.classList.remove('equipment-tabs-body__item--active');
      e.currentTarget.classList.add('equipment-tabs-body__item--active');

      const $activeSubTab = e.currentTarget.closest('.equipment-tabs-body__grid').querySelector('.equipment-tabs-body__subtab--active');
      if ($activeSubTab) $activeSubTab.classList.remove('equipment-tabs-body__subtab--active');

      console.log('el.currentTarget.dataset.tab: ', e.currentTarget.dataset.tab);
      const $activeTab = document.getElementById(e.currentTarget.dataset.tab);
      if ($activeTab) $activeTab.classList.add('equipment-tabs-body__subtab--active');
    })
  })
}

const $aboutCompanySlider = document.querySelector('.about-company__slider');

if ($aboutCompanySlider) {
  new Swiper($aboutCompanySlider, {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    pagination: {
      el: $aboutCompanySlider.querySelector('.swiper-pagination'),
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: document.querySelector('.about-company__slider-next'),
      prevEl: document.querySelector('.about-company__slider-prev'),
    },
    breakpoints: {
      1200: {
        width: 756,
        slidesPerView: 3
      }
    }
  })
}

ymaps.ready(function () {
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 9
  });

  const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    hintContent: '?????????????????????? ???????????? ??????????',
    balloonContent: '?????? ???????????????? ??????????'
  }, {
    // ??????????.
    // ???????????????????? ?????????????? ???????????? ?????? ????????????.
    iconLayout: 'default#image',
    // ???????? ?????????????????????? ???????????? ??????????.
    iconImageHref: 'assets/images/map-marker-icon.svg',
    // ?????????????? ??????????.
    iconImageSize: [30, 42],
    // ???????????????? ???????????? ???????????????? ???????? ???????????? ????????????????????????
    // ???? "??????????" (?????????? ????????????????).
    iconImageOffset: [-5, -38]
  });

  myMap.geoObjects.add(myPlacemark);

  myMap.controls.remove('geolocationControl');
  myMap.controls.remove('searchControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');
  myMap.behaviors.disable(['scrollZoom']);

  if (window.innerWidth < 768) {
    let pixelCenter = myMap.getGlobalPixelCenter('map');
    pixelCenter = [
      pixelCenter[0],
      pixelCenter[1] - 400
    ];
    const geoCenter = myMap.options.get('projection').fromGlobalPixels(pixelCenter, myMap.getZoom());
    myMap.setCenter(geoCenter);
    console.log('pixelCenter: ', pixelCenter);
  }

});

const $equipmentTabsSelect = document.querySelectorAll('.equipment-tabs__select');

customSelect($equipmentTabsSelect, {
  containerClass: '_custom-select-container',
  openerClass: '_custom-select-opener',
  panelClass: '_custom-select-panel',
  optionClass: '_custom-select-option'
})

const selectService = document.getElementById('select_service').customSelect;
const selectEquipment = document.getElementById('select_equipment').customSelect;

const subTabs = ['??????????????????????????', '????????????????????', '????????????????', '????????????????????????', '??????????????????????', '????????????????????????', '??????????????????????'];

selectService.select.addEventListener('change', (e) => {
  e.target.closest('._custom-select-container').querySelector('._custom-select-opener').classList.add('is-selected')

  const $tab = document.getElementById(e.target.value);
  if ($tab) {
    $equipmentTabsBodyTab.forEach(el => el.classList.remove('equipment-tabs-body__tab--active'));
    $tab.classList.add('equipment-tabs-body__tab--active');

    selectEquipment.empty();
    subTabs.forEach((tab, i) => {
      const option = document.createElement('option');
      option.text = tab;
      option.value = `${e.target.value}_${i + 1}`;
      selectEquipment.append(option);
    })
  }
})

selectEquipment.select.addEventListener('change', e => {
  e.target.closest('._custom-select-container').querySelector('._custom-select-opener').classList.add('is-selected')

  console.log(e.target.value)

  const $activeSubTab = document.getElementById(e.target.value).closest('.equipment-tabs-body__right').querySelector('.equipment-tabs-body__subtab--active');
  if ($activeSubTab) $activeSubTab.classList.remove('equipment-tabs-body__subtab--active');

  const $tab = document.getElementById(e.target.value);
  if ($tab) $tab.classList.add('equipment-tabs-body__subtab--active');
})

const $headerMenuBurger = document.querySelector('.header__menu-burger');
const $headerMenu = document.querySelector('.header__menu');
$headerMenuBurger.addEventListener('click', e => {
  $headerMenu.classList.add('header-menu--active');
})

const $headerMenuClose = document.querySelector('.header-menu .header__menu-burger');
$headerMenuClose.addEventListener('click', e => {
  $headerMenu.classList.remove('header-menu--active');
})

const $aboutCompanyShowMore = document.querySelector('.about-company__show-more');
const $aboutCompanyText = document.querySelector('.about-company__text');
$aboutCompanyShowMore.addEventListener('click', e => {
  $aboutCompanyShowMore.remove();
  $aboutCompanyText.classList.add('about-company__text--show');
})