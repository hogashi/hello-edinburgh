// index.js

const axios = require('axios');

document.addEventListener('DOMContentLoaded', e => {
  console.log('index.js loaded');
});

const textarea = document.querySelector('#text');
const goButton = document.querySelector('#goButton');

goButton.addEventListener('click', e => {
  const text = textarea.value;
  axios.get(`/tweet?${text}`)
  .then(res => {
    console.log(res);
    textarea.value = '';
  })
  .catch(err => {
    console.log(err);
  });
});

