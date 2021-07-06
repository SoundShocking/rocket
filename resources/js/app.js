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
      slidesPerView: 3,
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
    slidesPerView: 3,
    width: 756,
    pagination: {
      el: $aboutCompanySlider.querySelector('.swiper-pagination'),
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: document.querySelector('.about-company__slider-next'),
      prevEl: document.querySelector('.about-company__slider-prev'),
    }
  })
}