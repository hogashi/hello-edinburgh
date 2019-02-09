// index.js

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/js/index.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// main part
const axios = require('axios');

const textarea = document.querySelector('#text');
const goButton = document.querySelector('#goButton');
const message  = document.querySelector('#message');

// timeline
const tweetsContainer = document.querySelector('#tweets');
const timer = document.querySelector('#timer');

const loadTimeline = () => {
  let sinceId = 0;
  const lastTweet = timeline.querySelector('.tweet');
  if (lastTweet) {
    sinceId = lastTweet.getAttribute('data-id');
  }
  console.log(`loading timeline, sinceId: ${sinceId}`);
  axios.get(`/api/home_timeline?since_id=${sinceId || ''}`)
  .then(res => {
    console.log(res);
    tweetsContainer.insertAdjacentHTML('afterbegin', res.data);
  })
  .catch(err => {
    console.log(err, err.response, err.response.data);
  });
};

// eventListener
switch (window.location.pathname) {
  case '/':
    if (goButton) {
      goButton.addEventListener('click', e => {
        const text = encodeURIComponent(textarea.value.trim());
        // axios.post('/tweet', {
        //   hoge: 123,
        //   text: text,
        // })
        axios.get(`/api/tweet?text=${text}`)
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
    }

    document.addEventListener('DOMContentLoaded', e => {
      console.log('index.js loaded');
    });
    break;
  case '/timeline':
    let loadTimer;
    let count = 60;
    document.addEventListener('DOMContentLoaded', e => {
      console.log('timeline.js loaded');

      loadTimeline();
      loadTimer = setInterval(() => {
        count -= 1;
        if (count < 0) {
          count = 60;
          loadTimeline();
        }
        timer.innerText = count;
      }, 1 * 1000);
    });
    break;
  default:
    console.log("default");
    break;
};
