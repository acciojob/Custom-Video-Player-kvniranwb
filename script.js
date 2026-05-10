const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// PLAY / PAUSE TOGGLE
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = "❚ ❚";
  } else {
    video.pause();
    toggle.textContent = "►";
  }
}

// UPDATE BUTTON ICON
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// UPDATE PROGRESS BAR
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// SCRUB (click progress bar)
function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// SKIP BUTTONS
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// RANGE (volume & playback speed)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// EVENT LISTENERS
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) =>
  button.addEventListener("click", skip)
);

ranges.forEach((range) =>
  range.addEventListener("input", handleRangeUpdate)
);

// PROGRESS BAR SEEK
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) =>
  mousedown && scrub(e)
);
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

// ERROR HANDLING (bonus requirement)
video.addEventListener("error", () => {
  alert("Error loading video. Please try again later.");
});