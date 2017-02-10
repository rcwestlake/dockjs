const $ = require('jquery')

const $settingsContainer = $('.js-settings-container')
const $showSettings = $('.js-show-settings')
const $settingsWrapper = $('.js-settings-wrapper')
const $hideSettings = $('#hide-settings')

$showSettings.on('click', () => {
  $settingsContainer.addClass('settings-container--animatable')
  $settingsContainer.addClass('settings-container--visible')
  $settingsWrapper.addClass('settings-wrapper--visible')
  $settingsContainer.on('transitionend', onTransitionEnd)
})

$hideSettings.on('click', () => {
  $settingsContainer.addClass('settings-container--animatable')
  $settingsContainer.removeClass('settings-container--visible')
  $settingsWrapper.removeClass('settings-wrapper--visible')
  $settingsContainer.on('transitionend', onTransitionEnd)
})

const onTransitionEnd = () => {
  $settingsContainer.removeClass('settings-container--animatable')
  $settingsContainer.off('transitionend', onTransitionEnd)
}
