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

cardData = [
  {
    label: "card 1",
    title: "Aisha (radialla'anha) Outlandish",
    image: "Aisha.jpg",
    artist: "Omar Esa",
    audio: `Aisha.mp3`,
    year: 2014,
  },
  {
    label: "card 2",
    title: "Lets Pray",
    image: "lets_pray_omar_esa_cover.svg",
    artist: "Omar Esa",
    audio: `Let-pray.mp3`,
    year: 2013,
  },
  {
    label: "card 3",
    title: `My Brother (FouseyTube)`,
    image: "Brother.png",
    artist: " Omar Esa",
    audio: `Brother.mp3`,
    year: 2016,
  },
  {
    label: "card 4",
    title: "Al Habib (The Loved One)",
    image: "Al-Habib.png",
    artist: "Talib al Habib",
    audio: `Al-Habib.mp3`,
    year: 2004,
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

const selectedSong = JSON.parse(localStorage.getItem("selectedSong"));

if (selectedSong) {
  nowPlayingImg.src = `./assets/images/${selectedSong.image}`;
  nowPlayingTitle.textContent = selectedSong.title;
  nowPlayingArtist.textContent = selectedSong.artist;
}

card.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".card");

  if (!clickedCard) return;

  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    if (cards[i] === clickedCard) {
      const selectedSong = cardData[i];

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
  window.location.href = "dashboard/index.html";
});

let isplaying = false;

play.addEventListener("click", () => {
  isplaying = !isplaying;

  if (isplaying) {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  } else {
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");
  }
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

renderRecentlyPlayed();

recentlyPlayedContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".imgWrap");

  if (!clicked) return;

  const index = [...document.querySelectorAll(".imgWrap")].indexOf(clicked);

  const recentlyPlayed =
    JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

  localStorage.setItem("selectedSong", JSON.stringify(recentlyPlayed[index]));

  window.location.href = "dashboard/index.html";
});
