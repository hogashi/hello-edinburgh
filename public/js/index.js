"use strict";

// index.js
var axios = require('axios');

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('index.js loaded');
});
var textarea = document.querySelector('#text');
var goButton = document.querySelector('#goButton');
goButton.addEventListener('click', function (e) {
  var text = textarea.value;
  axios.get("/tweet?".concat(text)).then(function (res) {
    console.log(res);
    textarea.value = '';
  }).catch(function (err) {
    console.log(err);
  });
});