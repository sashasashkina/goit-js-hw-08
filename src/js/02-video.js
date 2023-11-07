// import Player from '@vimeo/player';
// const iframe = document.querySelector('iframe');
// const player = new Player(iframe);

// const key = 'videoplayer-current-time';
// const playTime = localStorage.getItem(key);

// player.on('play', function () {
//   console.log('played the video!');
// });

// function onPlay(event) {
//   const time = event.seconds;
//   localStorage.setItem(key, time);
// }

// if (playTime) {
//   player.setCurrentTime(playTime);
// }

// player.on('timeupdate', throttle(onPlay, 1000));

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const TIME_KEY = 'videoplayer-current-time';

timeToSet();

function timeToUpdate({ seconds }) {
  localStorage.setItem(TIME_KEY, seconds);
}

function timeToSet() {
  const currentTime = localStorage.getItem(TIME_KEY);

  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}

player.on('timeupdate', throttle(timeToUpdate, 1000));
