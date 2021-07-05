import customSelect from 'custom-select'

const $mapContactSelect = document.querySelectorAll('.map-contacts__custom-select');

if ($mapContactSelect.length) {
  // $mapContactSelect.forEach(el => {
  //   customSelect
  // })
  customSelect($mapContactSelect, {
    containerClass: '_custom-select-container',
    openerClass: '_custom-select-opener',
  })
}