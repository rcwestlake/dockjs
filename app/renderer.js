const $ = require('jquery')
const babel = require('babel-core')

const $input = $('#input')
const $runButton = $('#run-button')

/* this works, currently using refactored version below
   use this if we can't pull value from field */

// let editor = CodeMirror(function(elt) {
//   debugger
//   $input[0].parentNode.replaceChild(elt, $input[0]);
// }, {
//   value: "function myScript(){return 100;}\n",
//   lineNumbers: true,
//   mode: "javascript"
// });

const editor = CodeMirror.fromTextArea($input[0], {
    lineNumbers: true,
    lineWrapping: true,
    theme: 'mbo',
    value: 'function myScript(){return 100;}\n',
    mode: 'javascript'
})

$runButton.on('click', () => {
  const code = editor.getValue()
  const result = babel.transform(code, {
    presets: ['es2015']
  })
  console.log(result);
})
