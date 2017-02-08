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
  const editorCode = editor.getValue()
  const result = babel.transform(editorCode, {
    presets: ['es2015']
  })
  const code = result.code

  checkForMaliciousIntent(code)
  eval(code)
})

const checkForMaliciousIntent = (code) => {
  maliciousIntentKeys.map(key => {
    if(code.includes(key)) {
      throw new Error('For your safety, we stopped the evaluation process. We detected malicious code.')
    }
  })
}

const maliciousIntentKeys = ['<script>', 'script', '</script>']
