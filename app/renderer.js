const $ = require('jquery')
const babel = require('babel-core')

const $input = $('#input')
const $runButton = $('#run-button')

const editor = CodeMirror.fromTextArea($input[0], {
    lineNumbers: true,
    lineWrapping: true,
    theme: 'mbo',
    mode: 'javascript'
})

$runButton.on('click', () => {
  const code = editor.getValue()
  const result = babel.transform(code, {
    presets: ['es2015']
  })
  console.log(result);
})
