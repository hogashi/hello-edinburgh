// index.js

const axios = require('axios');

document.addEventListener('DOMContentLoaded', e => {
  console.log('index.js loaded');
});

const textarea = document.querySelector('#text');
const goButton = document.querySelector('#goButton');
const message  = document.querySelector('#message');

goButton.addEventListener('click', e => {
  const text = encodeURIComponent(textarea.value.trim());
  // axios.post('/tweet', {
  //   hoge: 123,
  //   text: text,
  // })
  axios.get(`/tweet?text=${text}`)
  .then(res => {
    console.log(res);
    if (res.data !== 'ng') {
      textarea.value = '';
    }
    message.innerText = res.data;
  })
  .catch(err => {
    console.log(err);
  });
});

