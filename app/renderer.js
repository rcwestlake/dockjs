const $ = require('jquery')

const $input = $('#input')

/* this works, currently using refactored version below
   use this if we can't pull value from field */

// let myCodeMirror = CodeMirror(function(elt) {
//   debugger
//   $input[0].parentNode.replaceChild(elt, $input[0]);
// }, {
//   value: "function myScript(){return 100;}\n",
//   lineNumbers: true,
//   mode: "javascript"
// });

var myCodeMirror = CodeMirror.fromTextArea($input[0], {
    lineNumbers: true,
    lineWrapping: true,
    theme: 'mbo',
    value: "function myScript(){return 100;}\n",
    mode: "javascript"
});
