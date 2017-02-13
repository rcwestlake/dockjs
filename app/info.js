const $ = require('jquery')

const $infoContainer = $('.js-info-container')
const $showInfo = $('.js-show-info')
const $infoWrapper = $('.js-info-wrapper')
const $hideInfo = $('#hide-info-button')
const $runButton = $('#run-button')

$showInfo.on('click', () => {
  $infoContainer.addClass('info-container--animatable')
  $infoContainer.addClass('info-container--visible')
  $infoWrapper.addClass('info-wrapper--visible')
  $runButton.hide()
  $infoContainer.on('transitionend', onTransitionEnd)
})

$hideInfo.on('click', () => {
  $infoContainer.addClass('info-container--animatable')
  $infoContainer.removeClass('info-container--visible')
  $infoWrapper.removeClass('info-wrapper--visible')
  $runButton.show()
  $infoContainer.on('transitionend', onTransitionEnd)
})

const onTransitionEnd = () => {
  $infoContainer.removeClass('info-container--animatable')
  $infoContainer.off('transitionend', onTransitionEnd)
}
