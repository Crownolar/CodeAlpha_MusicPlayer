// 'use strict'

const card = document.querySelector(".imageCarousel");
const cards = document.querySelectorAll(".card");
const navItem = document.querySelectorAll(".navItem");
const playingInfo = document.querySelector(".playingInfo");
const play = document.querySelector(".play");
const icon = document.getElementById("icn");
const nowPlayingImg = document.querySelector(".nowPlaying img");
const nowPlayingTitle = document.querySelector(".playingInfo h4");
const nowPlayingArtist = document.querySelector(".playingInfo p");
const recentlyPlayedContainer = document.querySelector(".recentlyPlayedImgcon");
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");
const progressMiniFill = document.querySelector(".progressMiniFill");

cardData = [
  {
    label: "card 1",
    title: "Al-Fatiha",
    image: "Al-Fatiha.png",
    artist: "Maher Al-Mu'aiqly",
    audio: `Al-Fatiha.mp3`,
    year: 2026,
  },
  {
    label: "card 2",
    title: "An-Nas",
    image: "An-Nas.png",
    artist: "Maher Al-Mu'aiqly",
    audio: `An-Nas.mp3`,
    year: 2026,
  },
  {
    label: "card 3",
    title: `Al-Flaq`,
    image: "Al-Falaq.png",
    artist: " Maher Al-Mu'aiqly",
    audio: `Al-Falaq.mp3`,
    year: 2026,
  },
  {
    label: "card 4",
    title: "Al-Ikhlas",
    image: "Al-Ikhlas.png",
    artist: "Maher Al-Mu'aiqly",
    audio: `Al-Ikhlas.mp3`,
    year: 2026,
  },
  {
    label: "card 5",
    title: "Al-Masad",
    image: "Al-Masad.png",
    artist: "Maher Al-Mu'aiqly",
    audio: `Al-Masad.mp3`,
    year: 2026,
  },
  {
    label: "card 6",
    title: "An-Nasr",
    image: "An-Nasr.png",
    artist: "Maher Al-Mu'aiqly",
    audio: `An-Nasr.mp3`,
    year: 2026,
  },
];

card.innerHTML = cardData
  .map(
    (card) => `
    <div class="card">
      <div class="cardImg">
        <img src="./assets/images/${card.image}" alt="${card.title}" />
      </div>

      <div class="cardDetails">
        <p class="cardTitle">${card.title}</p>
        <div class="cardSubtext">
          <span class="cardArtist">${card.artist}</span>
          <span class="cardYear">${card.year}</span>
        </div>
      </div>
    </div>
  `,
  )
  .join("");

localStorage.setItem("playlist", JSON.stringify(cardData));

const playlist = JSON.parse(localStorage.getItem("playlist")) || [];

const curInd = Number(localStorage.getItem("curInd")) || 0;

const curSong = playlist[curInd];

progressMiniFill.style.width = "0%";

// const selectedSong = JSON.parse(localStorage.getItem("selectedSong"));

if (curSong) {
  nowPlayingImg.src = `./assets/images/${curSong.image}`;
  nowPlayingTitle.textContent = curSong.title;
  nowPlayingArtist.textContent = curSong.artist;
}

card.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".card");

  if (!clickedCard) return;

  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    if (cards[i] === clickedCard) {
      const selectedSong = cardData[i];

      localStorage.setItem("curInd", i);
      localStorage.setItem("selectedSong", JSON.stringify(selectedSong));

      let recentlyPlayed =
        JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

      let filteredSongs = [];

      for (let j = 0; j < recentlyPlayed.length; j++) {
        if (recentlyPlayed[j].title !== selectedSong.title) {
          filteredSongs.push(recentlyPlayed[j]);
        }
      }

      recentlyPlayed = filteredSongs;

      recentlyPlayed.unshift(selectedSong);

      recentlyPlayed = recentlyPlayed.slice(0, 6);

      localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));

      localStorage.setItem("selectedSong", JSON.stringify(cardData[i]));

      localStorage.setItem("resumeTime", 0);
      localStorage.setItem("wasPlaying", true);

      setTimeout(() => {
        window.location.href = "dashboard/index.html";
      }, 50);
      break;
    }
  }

  window.location.href = "dashboard/index.html";
});

for (let i = 0; i < navItem.length; i++) {
  navItem[i].addEventListener("click", () => {
    console.log("navItem");

    let currentActive = document.querySelector(".navItem.active");

    if (currentActive) {
      currentActive.classList.remove("active");
    }

    navItem[i].classList.add("active");
    currentActive = navItem[i];
  });
}

playingInfo.addEventListener("click", () => {
  localStorage.setItem("resumeTime", audio.currentTime);
  localStorage.setItem("wasPlaying", isPlaying);
  window.location.href = "dashboard/index.html";
});

let isPlaying = false;

const audio = new Audio();

const loadHomePlay = () => {
  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];

  const curInd = Number(localStorage.getItem("curInd")) || 0;

  const play = playlist[curInd];

  if (!play) return;

  nowPlayingArtist.textContent = play.artist;
  nowPlayingImg.src = `./assets/images/${play.image}`;
  nowPlayingTitle.textContent = play.title;

  audio.src = `./assets/audio/${play.audio}`;
};

loadHomePlay();

play.addEventListener("click", () => {
  // isplaying = !isplaying;

  if (!isPlaying) {
    audio.play();

    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");

    isPlaying = true;
  } else {
    audio.pause();

    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");

    isPlaying = false;
  }
});

forward.addEventListener("click", () => {
  localStorage.setItem("resumeTime", 0);
  localStorage.setItem("wasPlaying", true);
  let curInd = Number(localStorage.getItem("curInd")) || 0;

  if (curInd === playlist.length - 1) {
    curInd = 0;
  } else {
    curInd++;
  }

  localStorage.setItem("curInd", curInd);

  loadHomePlay();

  audio.play();

  isPlaying = true;

  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
});

backward.addEventListener("click", () => {
  localStorage.setItem("resumeTime", 0);
  localStorage.setItem("wasPlaying", true);
  let curInd = Number(localStorage.getItem("curInd")) || 0;

  if (curInd === 0) {
    curInd = playlist.length - 1;
  } else curInd--;

  localStorage.setItem("curInd", curInd);

  loadHomePlay();

  audio.play();

  isPlaying = true;

  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
});

const renderRecentlyPlayed = () => {
  const recentlyPlayed =
    JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

  if (recentlyPlayed.length === 0) {
    recentlyPlayedContainer.innerHTML = "<p>No recently played songs yet</p>";
    return;
  }

  recentlyPlayedContainer.innerHTML = recentlyPlayed
    .map(
      (song) => `
      <div class="imgWrap">
        <div class="recentImg">
          <img
            src="./assets/images/${song.image}"
            alt="${song.title}"
          />
        </div>

        <div class="recentDetails">
          <p class="recentTitle">${song.title}</p>
        </div>
      </div>
    `,
    )
    .join("");
};

console.log(JSON.parse(localStorage.getItem("recentlyPlayed")));

renderRecentlyPlayed();

recentlyPlayedContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".imgWrap");

  if (!clicked) return;

  const index = [...document.querySelectorAll(".imgWrap")].indexOf(clicked);

  JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

  const recentlyPlayed =
    JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

  const selectedSong = recentlyPlayed[index];

  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];

  const songIndex = playlist.findIndex(
    (song) => song.title === selectedSong.title,
  );

  localStorage.setItem("resumeTime", 0);
  localStorage.setItem("wasPlaying", true);
  localStorage.setItem("curInd", songIndex);
  localStorage.setItem("selectedSong", JSON.stringify(selectedSong));

  window.location.href = "dashboard/index.html";
});

audio.addEventListener("ended", () => {
  let curInd = Number(localStorage.getItem("curInd")) || 0;

  const playlist = JSON.parse(localStorage.getItem("playlist")) || [];

  if (curInd === playlist.length - 1) {
    curInd = 0;
  } else {
    curInd++;
  }

  localStorage.setItem("curInd", curInd);

  loadHomePlay();
});

const persistvol = localStorage.getItem("vol");
audio.volume = persistvol ? Number(persistvol) : 1;

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const track = (audio.currentTime / audio.duration) * 100;
  // progressMiniFill.style.width = track + '%';
  progressMiniFill.style.width = `${track}%`;
});
