const musicContainer = document.getElementById("music-container");
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('music-cover');

// Song Title
const songs = ['naba', 'sad', 'saffat', 'morning'];


// Keep track of Song
let songIndex = 3;

loadSong(songs[songIndex]);


// load song name
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
};
// Play Song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// Pause Song

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}
// Previous Song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}
// Next Song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}
// Update Time Progress

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

// Set Progress
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX;
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Previous Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// Time Progress

audio.addEventListener('timeupdate', updateProgress);


// Progress Bar
progressContainer.addEventListener('click', setProgress)

// Song Ends
audio.addEventListener('ended', nextSong)
