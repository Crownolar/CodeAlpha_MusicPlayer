// 'use strict'

const pause = document.querySelector(".pause");
const icon = document.getElementById("icons");
const playerTitleH4 = document.querySelector(".playerTitle h4");
const playerTitleP = document.querySelector(".playerTitle p");
const playerTitleImg = document.querySelector(".imgContainer img");
const progressBar = document.querySelector(".progressSection input");
const volumeSlider = document.querySelector(".volume input");
const timeDisplay = document.querySelector(".time");
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");

const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let curInd = Number(localStorage.getItem("curInd"));
let isPlaying = false;

const song = playlist[curInd];
console.log(song);

if (song) {
  playerTitleH4.textContent = song.title;
  playerTitleP.textContent = song.artist;
  playerTitleImg.src = `../assets/images/${song.image}`;
}

console.log(song.audio);
const audio = new Audio();

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

audio.src = `../assets/audio/${song.audio}`;

audio.load();

audio.addEventListener("loadeddata", () => {
  console.log("Audio loaded successfully");
});

audio.addEventListener("error", (e) => {
  console.log("Audio failed to load", e);
});

progressBar.value = 0;

timeDisplay.innerHTML = `
  <span>0:00</span>
  <span>0:00</span>
`;

audio.addEventListener("loadedmetadata", () => {
  timeDisplay.innerHTML = `
    <span>0:00</span>
    <span>${formatTime(audio.duration)}</span>
  `;
});

// audio.play();

console.log(song);
console.log(audio.src);

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progressBar.value = (audio.currentTime / audio.duration) * 100;

  timeDisplay.innerHTML = `
    <span>${formatTime(audio.currentTime)}</span>
    <span>${formatTime(audio.duration)}</span>
  `;
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

pause.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();

    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");

    isPlaying = true;
  } else {
    audio.pause();

    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");

    isPlaying = false;
  }
});

audio.addEventListener("loadedmetadata", () => {
  progressBar.max = 100;
});

audio.addEventListener("error", () => {
  console.log("Audio file could not be loaded");
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
  localStorage.setItem('vol', audio.volume)
});

audio.addEventListener("timeupdate", () => {
  timeDisplay.innerHTML = `
    <span>${formatTime(audio.currentTime)}</span>
    <span>-${formatTime(audio.duration - audio.currentTime)}</span>
  `;
});

forward.addEventListener("click", () => {
  console.log(forward);

  if (curInd === playlist.length - 1) {
    curInd = 0;
  } else {
    curInd = curInd + 1;
  }

  localStorage.setItem("curInd", curInd);
  loadSong(true);;

  console.log(playlist[curInd]);

  console.log(playlist);
});

backward.addEventListener("click", () => {

  if (curInd === 0) {
    curInd = playlist.length - 1;
    console.log(curInd);
  } else {
    curInd = curInd - 1;
  }

  localStorage.setItem("curInd", curInd);
  loadSong(true);;

  console.log(playlist);
});

audio.addEventListener('ended', () => {
  if (curInd === playlist.length - 1) {
    curInd = 0;
  } else {
    curInd++
  }

  localStorage.setItem('curInd', curInd)
  loadSong(true)
})

const onPlay = !audio.paused
const curTime = audio.curTime
const vol = audio.volume

const loadSong = (autoPlay = false) => {
  const songData = playlist[curInd];
  
  playerTitleH4.textContent = songData.title;
  playerTitleP.textContent = songData.artist;

  playerTitleImg.src = `../assets/images/${songData.image}`;
  audio.src = `../assets/audio/${songData.audio}`;

  progressBar.value = 0

  audio.load();

  if (autoPlay || onPlay) {
    audio.play();

    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");

    isPlaying = true;
  } else {
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");

    isPlaying = false;
  }
  
  const persistVol = localStorage.getItem('vol')

  if (persistVol !== null) {
    audio.volume = Number(persistVol);
    volumeSlider.value = Number(persistVol) * 100
  } else {
    audio.volume = 1
  }
};

loadSong(true);
