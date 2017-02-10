const { remote } = require('electron')
const { openFile, saveFile } = remote.require('./main')
const $ = require('jquery')
const babel = require('babel-core')
const lebab = require('lebab')

const $input = $('#input')
const $runButton = $('#run-button')
const $themeSelector = $('#theme-selector')
const $uploadButton = $('#upload-button')
const $saveButton = $('#save-button')
const $toES5Button = $('#transpile-to-es5')
const $toES6Button = $('#transpile-to-es6')

let $chosenTheme = 'mbo'

const editor = CodeMirror.fromTextArea($input[0], {
  lineNumbers: true,
  lineWrapping: true,
  theme: $chosenTheme,
  mode: 'javascript',
  autofocus: true,
  tabSize: 2,
  matchBrackets: true,
  styleActiveLine: true,
  autoCloseBrackets: true,
  styleSelectedText: true,

  lineComment: true,
  toggleComment: true,
  blockComment: true,
  continueComment: true,
  lint: true,
})

const $settingsContainer = $('.js-settings-container')
const $showSettings = $('.js-show-settings')
const $wrapper = $('.wrapper')
const $hideSettings = $('#hide-settings')

$showSettings.on('click', () => {
  console.log('clicked');
  $settingsContainer.addClass('settings-container--animatable')
  $settingsContainer.addClass('settings-container--visible')
  $wrapper.addClass('wrapper--visible')
  $settingsContainer.on('transitionend', onTransitionEnd)
})

$hideSettings.on('click', () => {
  console.log('hide is clicked');
  $settingsContainer.addClass('settings-container--animatable')
  $settingsContainer.removeClass('settings-container--visible')
  $wrapper.removeClass('wrapper--visible')
  $settingsContainer.on('transitionend', onTransitionEnd)
})

const onTransitionEnd = () => {
  console.log('transition end is called');
  $settingsContainer.removeClass('settings-container--animatable')
  $settingsContainer.off('transitionend', onTransitionEnd)
}

$themeSelector.on('change', () => {
  $chosenTheme = $('#theme-selector option:selected').val()
  editor.setOption('theme', $chosenTheme)
})

$runButton.on('click', () => {
  const code = transpileToES5()

  checkForMaliciousIntent(code)
  eval(code)
})

$uploadButton.on('click', () => {
  setEditorValue(openFile())
})

const setEditorValue = (content) => {
  if(!content) return
  editor.setValue(content)
}
$saveButton.on('click', () => {
  const code = editor.getValue()
  saveFile(code)
})

$toES5Button.on('click', () => {
  const code = transpileToES5()
  editor.setValue(code)
})

$toES6Button.on('click', () => {
  const editorCode = editor.getValue()
  const code = transpileToES6(editorCode)[0]
  const warnings = transpileToES6(editorCode)[1]

  if(warnings.length) {
    console.error('Warning: please be aware of these transpile errors: ', warnings)
  }
  editor.setValue(code)
})

const transpileToES6 = (editorCode) => {
  const { code, warnings } = lebab.transform(editorCode, ['let', 'arrow', 'class', 'commonjs', 'default-param'])

  return [code, warnings]
}

const transpileToES5 = () => {
  const editorCode = editor.getValue()
  const result = babel.transform(editorCode, {
    presets: ['es2015']
  })
  const code = result.code
  return code
}

const checkForMaliciousIntent = (code) => {
  maliciousIntentKeys.map(key => {
    if(code.includes(key)) {
      throw new Error('For your safety, we stopped the evaluation process. We detected malicious code.')
    }
  })
}

const maliciousIntentKeys = ['<script>', '</script>']
