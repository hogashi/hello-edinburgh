// index.js

const axios = require('axios');

const textarea = document.querySelector('#text');
const goButton = document.querySelector('#goButton');
const message  = document.querySelector('#message');

// timeline
const timeline = document.querySelector('#timeline');
const timer = document.querySelector('#timer');

let loadTimer;
let sinceId = 0;
let count = 0;

const loadTimeline = () => {
  const lastTweet = timeline.querySelector('.tweet');
  if (lastTweet) {
    sinceId = lastTweet.getAttribute('data-id');
  }
  axios.get(`/api/home_timeline?since_id=${sinceId || ''}`)
  .then(res => {
    console.log(res);
    timeline.insertAdjacentHTML('afterbegin', res.data);
  })
  .catch(err => {
    console.log(err);
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
        axios.get(`/api/tweets?text=${text}`)
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
    document.addEventListener('DOMContentLoaded', e => {
      console.log('timeline.js loaded');

      loadTimeline();
      loadTimer = setInterval(() => {
        timer.innerText = count;
        count += 1;
        if (count >= 60) {
          count = 0;
          console.log(`loading timeline, sinceId: ${sinceId}`);
          loadTimeline();
        }
      }, 1 * 1000);
    });
    break;
  default:
    console.log("default");
    break;
};
