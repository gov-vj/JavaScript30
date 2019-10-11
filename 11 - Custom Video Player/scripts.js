const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress =  player.querySelector('.progress');
const progressBar =  player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const volumeRange = player.querySelector('[name="volume"]');
const playbackRateRange = player.querySelector('[name="playbackRate"]');

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function skip() {
    video.currentTime += +this.dataset.skip;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(ev) {
    const scrubTime = (ev.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', () => toggle.textContent = '❚ ❚');
video.addEventListener('pause', () => toggle.textContent = '►');
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(sb => sb.addEventListener('click', skip));
volumeRange.addEventListener('input', () => {
    video.volume = +volumeRange.value;
});
playbackRateRange.addEventListener('input', () => {
    video.playbackRate = +playbackRateRange.value;
});

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', ev => mouseDown && scrub(ev));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);