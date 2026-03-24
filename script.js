const MAX_SESSION_MINUTES = 45;
const SHORT_BREAK_MINUTES = 5;
const TEN_MINUTES_SECONDS = 600;
const RING_CIRCUMFERENCE = 326.73;
const TRACK_FADE_MS = 650;
const TRACK_TRANSITION_SECONDS = 0.85;
const SPRITE_FRAME_COUNT = 6;
const SPRITE_FRAME_INTERVAL_MS = 340;
const FOOTER_JSON_ANIMATIONS = [
  {
    containerId: "footerAnimationDoggie",
    path: "./animation/json/Cute Doggie.json",
  },
  {
    containerId: "footerAnimationGiraffe",
    path: "./animation/json/Meditating Giraffe.json",
  },
  {
    containerId: "footerAnimationPuppy",
    path: "./animation/json/Puppy sleeping.json",
  },
  {
    containerId: "footerAnimationCrab",
    path: "./animation/json/crab walk.json",
  },
  {
    containerId: "footerAnimationJellyfish",
    path: "./animation/json/Jellyfish.json",
  },
];
const DEFAULT_MUSIC_TRACKS = [
  "./sounds/1.mp3",
  "./sounds/2.mp3",
  "./sounds/3.mp3",
  "./sounds/4.mp3",
  "./sounds/5.mp3",
];
const STORAGE_KEYS = {
  volume: "city-flight-pomodoro-volume",
  musicEnabled: "city-flight-pomodoro-music-enabled",
  theme: "city-flight-pomodoro-theme",
};

const CITIES = [
  "Paris",
  "London",
  "Rome",
  "Berlin",
  "Madrid",
  "Amsterdam",
  "Vienna",
  "Prague",
];

const FLIGHT_DURATIONS = {
  "Paris|London": 75,
  "Paris|Rome": 120,
  "Paris|Berlin": 105,
  "Paris|Madrid": 125,
  "Paris|Amsterdam": 70,
  "Paris|Vienna": 115,
  "Paris|Prague": 100,
  "London|Rome": 145,
  "London|Berlin": 110,
  "London|Madrid": 140,
  "London|Amsterdam": 65,
  "London|Vienna": 130,
  "London|Prague": 120,
  "Rome|Berlin": 115,
  "Rome|Madrid": 150,
  "Rome|Amsterdam": 135,
  "Rome|Vienna": 95,
  "Rome|Prague": 105,
  "Berlin|Madrid": 155,
  "Berlin|Amsterdam": 80,
  "Berlin|Vienna": 80,
  "Berlin|Prague": 60,
  "Madrid|Amsterdam": 150,
  "Madrid|Vienna": 180,
  "Madrid|Prague": 165,
  "Amsterdam|Vienna": 110,
  "Amsterdam|Prague": 90,
  "Vienna|Prague": 55,
};

const appState = {
  departure: "",
  destination: "",
  totalFlightMinutes: 0,
  segments: [],
  currentSegmentIndex: 0,
  remainingSeconds: 0,
  totalFocusSeconds: 0,
  completedFocusSeconds: 0,
  isRunning: false,
  isComplete: false,
  tickerId: null,
  lastTickAt: 0,
  currentTrackIndex: 0,
  isTrackTransitioning: false,
  musicTracks: [...DEFAULT_MUSIC_TRACKS],
  consecutiveTrackErrors: 0,
  volume: 0.6,
  isMusicEnabled: false,
  theme: "dark",
  currentFocusTenMinuteMark: TEN_MINUTES_SECONDS,
};

const routeDisplay = document.getElementById("routeDisplay");
const flightTimeDisplay = document.getElementById("flightTimeDisplay");
const sessionDisplay = document.getElementById("sessionDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const modeDisplay = document.getElementById("modeDisplay");
const totalProgressBar = document.getElementById("totalProgressBar");
const progressPercent = document.getElementById("progressPercent");
const ringProgress = document.getElementById("ringProgress");
const appBackground = document.getElementById("appBackground");
const volumeRange = document.getElementById("volumeRange");
const muteToggleBtn = document.getElementById("muteToggleBtn");
const musicSprite = document.getElementById("musicSprite");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeToggleLabel = document.getElementById("themeToggleLabel");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const skipBtn = document.getElementById("skipBtn");
const newCitiesBtn = document.getElementById("newCitiesBtn");

const ambientAudio = new Audio();
ambientAudio.preload = "auto";
let fadeIntervalId = null;
let spriteAnimationIntervalId = null;
const footerLottieInstances = [];

/** Returns sprite frame path based on frame index. */
function getSpriteFramePath(frameIndex) {
  return `./animation/${frameIndex + 1}.png`;
}

/** Renders active sprite frame into the music animation image. */
function renderSpriteFrame(frameIndex) {
  if (!musicSprite) {
    return;
  }
  musicSprite.src = getSpriteFramePath(frameIndex);
}

/** Starts looping sprite animation from frame 1 to frame 6. */
function startSpriteAnimation() {
  if (!musicSprite || spriteAnimationIntervalId) {
    return;
  }

  let frameIndex = 0;
  renderSpriteFrame(frameIndex);
  spriteAnimationIntervalId = setInterval(() => {
    frameIndex = (frameIndex + 1) % SPRITE_FRAME_COUNT;
    renderSpriteFrame(frameIndex);
  }, SPRITE_FRAME_INTERVAL_MS);
}

/** Loads and starts all footer Lottie JSON animations. */
function startFooterLottieAnimations() {
  if (!window.lottie) {
    return;
  }

  if (footerLottieInstances.length) {
    return;
  }

  FOOTER_JSON_ANIMATIONS.forEach(animationConfig => {
    const container = document.getElementById(animationConfig.containerId);
    if (!container) {
      return;
    }

    const animation = window.lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: animationConfig.path,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    footerLottieInstances.push(animation);
  });
}

/** Renders mute button icon state. */
function updateMuteButton() {
  muteToggleBtn.textContent = appState.isMusicEnabled ? "🔊" : "🔇";
  muteToggleBtn.setAttribute(
    "aria-label",
    appState.isMusicEnabled ? "Turn music off" : "Turn music on",
  );
}

/** Loads saved user preferences from localStorage. */
function loadPreferences() {
  const savedVolume = localStorage.getItem(STORAGE_KEYS.volume);
  const savedMusicEnabled = localStorage.getItem(STORAGE_KEYS.musicEnabled);
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);

  if (savedVolume && !Number.isNaN(Number(savedVolume))) {
    const parsedVolume = Number(savedVolume);
    appState.volume = Math.min(1, Math.max(0, parsedVolume));
  }
  if (savedMusicEnabled) {
    appState.isMusicEnabled = savedMusicEnabled === "true";
  }
  if (savedTheme === "light" || savedTheme === "dark") {
    appState.theme = savedTheme;
  }
}

/** Persists sound settings and theme preferences. */
function savePreferences() {
  localStorage.setItem(STORAGE_KEYS.volume, String(appState.volume));
  localStorage.setItem(
    STORAGE_KEYS.musicEnabled,
    String(appState.isMusicEnabled),
  );
  localStorage.setItem(STORAGE_KEYS.theme, appState.theme);
}

/** Returns a normalized key for city duration lookup. */
function getDurationKey(cityA, cityB) {
  return [cityA, cityB].sort((a, b) => a.localeCompare(b)).join("|");
}

/** Formats minutes into compact hour-minute label. */
function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!hours) {
    return `${minutes}m`;
  }
  if (!minutes) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
}

/** Formats a second counter into mm:ss string. */
function formatClock(totalSeconds) {
  const clampedSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(clampedSeconds / 60);
  const seconds = clampedSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/** Splits total flight minutes into focus and short-break segments. */
function buildSegments(totalFlightMinutes) {
  const focusSessions = [];
  let remaining = totalFlightMinutes;

  while (remaining > 0) {
    const sessionLength = Math.min(MAX_SESSION_MINUTES, remaining);
    focusSessions.push(sessionLength);
    remaining -= sessionLength;
  }

  return focusSessions.flatMap((minutes, index) => {
    const baseSegment = {
      type: "focus",
      minutes,
      sessionNumber: index + 1,
      totalSessions: focusSessions.length,
    };
    const isLastSession = index === focusSessions.length - 1;
    if (isLastSession) {
      return [baseSegment];
    }
    return [
      baseSegment,
      {
        type: "break",
        minutes: SHORT_BREAK_MINUTES,
        sessionNumber: index + 1,
        totalSessions: focusSessions.length,
      },
    ];
  });
}

/** Returns the active segment object. */
function getCurrentSegment() {
  return appState.segments[appState.currentSegmentIndex] || null;
}

/** Calculates current focus progress percentage for the entire route. */
function getOverallProgress() {
  if (!appState.totalFocusSeconds) {
    return 0;
  }
  const currentSegment = getCurrentSegment();
  const currentFocusElapsed =
    currentSegment && currentSegment.type === "focus"
      ? currentSegment.minutes * 60 - appState.remainingSeconds
      : 0;
  const elapsedTotal =
    appState.completedFocusSeconds + Math.max(0, currentFocusElapsed);
  return Math.min(100, (elapsedTotal / appState.totalFocusSeconds) * 100);
}

/** Calculates current segment progress for the circular ring. */
function getSegmentProgress() {
  const segment = getCurrentSegment();
  if (!segment) {
    return 1;
  }
  const segmentSeconds = segment.minutes * 60;
  if (!segmentSeconds) {
    return 1;
  }
  return Math.min(
    1,
    Math.max(0, (segmentSeconds - appState.remainingSeconds) / segmentSeconds),
  );
}

/** Stops any active audio fade interval. */
function stopFadeInterval() {
  if (!fadeIntervalId) {
    return;
  }
  clearInterval(fadeIntervalId);
  fadeIntervalId = null;
}

/** Fades audio volume between values over a duration. */
function fadeAudioVolume(fromVolume, toVolume, durationMs, onComplete) {
  stopFadeInterval();
  const frameMs = 50;
  const steps = Math.max(1, Math.round(durationMs / frameMs));
  let currentStep = 0;
  ambientAudio.volume = Math.max(0, Math.min(1, fromVolume));

  fadeIntervalId = setInterval(() => {
    currentStep += 1;
    const progress = currentStep / steps;
    ambientAudio.volume = Math.max(
      0,
      Math.min(1, fromVolume + (toVolume - fromVolume) * progress),
    );
    if (currentStep >= steps) {
      stopFadeInterval();
      if (onComplete) {
        onComplete();
      }
    }
  }, frameMs);
}

/** Moves to the next track index, looping after the last one. */
function moveToNextTrack() {
  appState.currentTrackIndex =
    (appState.currentTrackIndex + 1) % appState.musicTracks.length;
}

/** Loads and plays the current track with an optional fade-in. */
async function playCurrentTrack(shouldFadeIn = true) {
  const track = appState.musicTracks[appState.currentTrackIndex];
  if (!track) {
    return;
  }
  ambientAudio.src = track;
  ambientAudio.currentTime = 0;
  ambientAudio.volume = shouldFadeIn ? 0 : appState.volume;

  try {
    await ambientAudio.play();
    appState.consecutiveTrackErrors = 0;
    if (shouldFadeIn) {
      fadeAudioVolume(0, appState.volume, TRACK_FADE_MS);
    }
  } catch (_error) {
    moveToNextTrack();
  }
}

/** Starts music playback if music mode is enabled. */
async function startMusicPlayback() {
  if (!appState.isMusicEnabled || !appState.musicTracks.length) {
    return;
  }
  await playCurrentTrack(true);
}

/** Immediately stops music playback and resets current track position. */
function stopMusicPlayback() {
  appState.isTrackTransitioning = false;
  appState.consecutiveTrackErrors = 0;
  stopFadeInterval();
  ambientAudio.pause();
  ambientAudio.currentTime = 0;
}

/** Handles missing/failed tracks and prevents infinite retry loops. */
async function handleTrackLoadFailure() {
  if (!appState.isMusicEnabled || !appState.musicTracks.length) {
    return;
  }

  appState.consecutiveTrackErrors += 1;
  if (appState.consecutiveTrackErrors >= appState.musicTracks.length) {
    appState.isMusicEnabled = false;
    updateMuteButton();
    savePreferences();
    stopMusicPlayback();
    return;
  }

  moveToNextTrack();
  await playCurrentTrack(false);
}

/** Handles transition to the next track in the playlist. */
async function handleTrackTransition() {
  if (!appState.isMusicEnabled || appState.isTrackTransitioning) {
    return;
  }
  appState.isTrackTransitioning = true;
  const fromVolume = ambientAudio.volume;
  fadeAudioVolume(fromVolume, 0, TRACK_FADE_MS, async () => {
    moveToNextTrack();
    await playCurrentTrack(true);
    appState.isTrackTransitioning = false;
  });
}

/** Binds playlist events for sequential looping playback. */
function bindAudioEvents() {
  ambientAudio.addEventListener("timeupdate", () => {
    if (
      appState.isTrackTransitioning ||
      !Number.isFinite(ambientAudio.duration)
    ) {
      return;
    }
    const remainingSeconds = ambientAudio.duration - ambientAudio.currentTime;
    if (
      remainingSeconds <= TRACK_TRANSITION_SECONDS &&
      appState.isMusicEnabled
    ) {
      handleTrackTransition();
    }
  });

  ambientAudio.addEventListener("ended", () => {
    if (appState.isMusicEnabled && !appState.isTrackTransitioning) {
      moveToNextTrack();
      playCurrentTrack(false);
    }
  });

  ambientAudio.addEventListener("error", () => {
    if (!appState.isMusicEnabled) {
      return;
    }
    handleTrackLoadFailure();
  });
}

/** Plays a short generated tone for periodic or completion alerts. */
function playTone(type) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const now = context.currentTime;

  const patterns = {
    periodic: [620],
    session: [520, 650],
    complete: [760, 930, 1100],
  };

  const frequencies = patterns[type] || patterns.periodic;
  frequencies.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    const offset = now + index * 0.17;
    const volume = appState.volume * 0.2;
    gainNode.gain.setValueAtTime(0, offset);
    gainNode.gain.linearRampToValueAtTime(volume, offset + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, offset + 0.15);
    oscillator.start(offset);
    oscillator.stop(offset + 0.16);
  });
}

/** Sets mode label and session status text for current segment. */
function updateModeAndSessionLabels() {
  const currentSegment = getCurrentSegment();
  if (!currentSegment) {
    modeDisplay.textContent = "✓";
    sessionDisplay.textContent = "Done";
    return;
  }

  if (currentSegment.type === "break") {
    modeDisplay.textContent = "☕";
    sessionDisplay.textContent = `${currentSegment.sessionNumber + 1}/${currentSegment.totalSessions}`;
    return;
  }

  modeDisplay.textContent = "⏱";
  sessionDisplay.textContent = `${currentSegment.sessionNumber}/${currentSegment.totalSessions}`;
}

/** Applies visual updates for timer, progress, and action button states. */
function render() {
  const routeText = `${appState.departure} → ${appState.destination}`;
  routeDisplay.textContent = routeText;
  flightTimeDisplay.textContent = `✈ ${formatMinutes(appState.totalFlightMinutes)}`;
  timerDisplay.textContent = formatClock(appState.remainingSeconds);

  updateModeAndSessionLabels();

  const overallPercent = getOverallProgress();
  progressPercent.textContent = `${Math.round(overallPercent)}%`;
  totalProgressBar.style.width = `${overallPercent}%`;

  const segmentProgress = getSegmentProgress();
  ringProgress.style.strokeDashoffset = String(
    RING_CIRCUMFERENCE * (1 - segmentProgress),
  );

  startBtn.disabled = appState.isRunning || appState.isComplete;
  pauseBtn.disabled = !appState.isRunning;
  skipBtn.disabled = appState.isComplete;
}

/** Clears interval timer and resets running flags. */
function stopTimer() {
  if (appState.tickerId) {
    clearInterval(appState.tickerId);
    appState.tickerId = null;
  }
  appState.isRunning = false;
}

/** Moves to the next available segment or completes the route. */
function advanceSegment(triggeredBySkip = false) {
  const currentSegment = getCurrentSegment();
  if (currentSegment && currentSegment.type === "focus" && !triggeredBySkip) {
    appState.completedFocusSeconds += currentSegment.minutes * 60;
    playTone("session");
  }

  appState.currentSegmentIndex += 1;
  const nextSegment = getCurrentSegment();

  if (!nextSegment) {
    appState.remainingSeconds = 0;
    appState.isComplete = true;
    stopTimer();
    playTone("complete");
    render();
    return;
  }

  appState.remainingSeconds = nextSegment.minutes * 60;
  appState.currentFocusTenMinuteMark = TEN_MINUTES_SECONDS;
  render();
}

/** Handles periodic per-second timer updates and transitions. */
function handleTick() {
  const now = Date.now();
  const elapsedSeconds = Math.max(
    1,
    Math.floor((now - appState.lastTickAt) / 1000),
  );
  appState.lastTickAt = now;
  appState.remainingSeconds = Math.max(
    0,
    appState.remainingSeconds - elapsedSeconds,
  );

  const currentSegment = getCurrentSegment();
  if (currentSegment && currentSegment.type === "focus") {
    const currentFocusElapsed =
      currentSegment.minutes * 60 - appState.remainingSeconds;
    while (currentFocusElapsed >= appState.currentFocusTenMinuteMark) {
      playTone("periodic");
      appState.currentFocusTenMinuteMark += TEN_MINUTES_SECONDS;
    }
  }

  if (appState.remainingSeconds <= 0) {
    advanceSegment(false);
    return;
  }

  render();
}

/** Starts timer countdown from current state. */
function handleStart() {
  if (appState.isRunning || appState.isComplete) {
    return;
  }
  appState.isRunning = true;
  appState.lastTickAt = Date.now();
  appState.tickerId = setInterval(handleTick, 1000);
  render();
}

/** Pauses countdown and ambient playback while preserving progress. */
function handlePause() {
  stopTimer();
  render();
}

/** Resets current route timer to first segment without changing cities. */
function handleReset() {
  stopTimer();
  appState.currentSegmentIndex = 0;
  appState.completedFocusSeconds = 0;
  appState.isComplete = false;
  appState.currentFocusTenMinuteMark = TEN_MINUTES_SECONDS;
  const firstSegment = getCurrentSegment();
  appState.remainingSeconds = firstSegment ? firstSegment.minutes * 60 : 0;
  render();
}

/** Skips current segment and jumps to the next phase immediately. */
function handleSkip() {
  if (appState.isComplete) {
    return;
  }
  advanceSegment(true);
}

/** Builds a random city route and initializes related timer state. */
function generateRoute() {
  stopTimer();
  appState.completedFocusSeconds = 0;
  appState.isComplete = false;
  appState.currentFocusTenMinuteMark = TEN_MINUTES_SECONDS;

  const departureIndex = Math.floor(Math.random() * CITIES.length);
  let destinationIndex = Math.floor(Math.random() * CITIES.length);
  while (destinationIndex === departureIndex) {
    destinationIndex = Math.floor(Math.random() * CITIES.length);
  }

  appState.departure = CITIES[departureIndex];
  appState.destination = CITIES[destinationIndex];

  const durationKey = getDurationKey(appState.departure, appState.destination);
  appState.totalFlightMinutes = FLIGHT_DURATIONS[durationKey] || 90;

  appState.segments = buildSegments(appState.totalFlightMinutes);
  appState.totalFocusSeconds = appState.segments
    .filter(segment => segment.type === "focus")
    .reduce((total, segment) => total + segment.minutes * 60, 0);
  appState.currentSegmentIndex = 0;
  appState.remainingSeconds = appState.segments[0]
    ? appState.segments[0].minutes * 60
    : 0;

  updateBackground();
  render();
}

/** Converts city names to lowercase slugs for file paths. */
function slugifyCity(city) {
  return city.toLowerCase().replace(/\s+/g, "-");
}

/** Applies gradient fallback background when city images are missing. */
function applyFallbackBackground() {
  const gradients = [
    "linear-gradient(120deg, #101726, #1d2f50, #0f203f)",
    "linear-gradient(120deg, #221738, #213d63, #0b2955)",
    "linear-gradient(120deg, #1b1322, #29476a, #123b5c)",
  ];
  const seed = (appState.departure + appState.destination)
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);
  appBackground.style.backgroundImage = gradients[seed % gradients.length];
  appBackground.classList.remove("image-loaded");
}

/** Loads route background image and falls back if assets are unavailable. */
function updateBackground() {
  const cityCandidates = [appState.departure, appState.destination].map(
    city => `./images/${slugifyCity(city)}.jpg`,
  );
  const tryLoad = index => {
    if (index >= cityCandidates.length) {
      applyFallbackBackground();
      return;
    }

    const image = new Image();
    image.onload = () => {
      appBackground.style.backgroundImage = `url("${cityCandidates[index]}")`;
      appBackground.classList.add("image-loaded");
    };
    image.onerror = () => tryLoad(index + 1);
    image.src = cityCandidates[index];
  };

  tryLoad(0);
}

/** Applies saved theme class to the document body. */
function applyTheme() {
  const isLight = appState.theme === "light";
  document.body.classList.toggle("theme-light", isLight);
  document.body.classList.toggle("theme-dark", !isLight);
  themeToggleLabel.textContent = isLight ? "🌙" : "☀";
  themeToggleBtn.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode",
  );
}

/** Handles volume slider changes with immediate audio feedback. */
function handleVolumeChange(event) {
  appState.volume = Number(event.target.value) / 100;
  if (appState.isMusicEnabled) {
    ambientAudio.volume = appState.volume;
  }
  savePreferences();
}

/** Toggles background music playback on and off. */
async function handleMuteToggle() {
  appState.isMusicEnabled = !appState.isMusicEnabled;
  updateMuteButton();
  savePreferences();
  if (appState.isMusicEnabled) {
    appState.currentTrackIndex = 0;
    await startMusicPlayback();
    return;
  }
  stopMusicPlayback();
}

/** Switches between dark and light themes. */
function handleThemeToggle() {
  appState.theme = appState.theme === "dark" ? "light" : "dark";
  applyTheme();
  savePreferences();
}

/** Binds all UI event listeners once during app startup. */
function bindEvents() {
  startBtn.addEventListener("click", handleStart);
  pauseBtn.addEventListener("click", handlePause);
  resetBtn.addEventListener("click", handleReset);
  skipBtn.addEventListener("click", handleSkip);
  newCitiesBtn.addEventListener("click", generateRoute);
  volumeRange.addEventListener("input", handleVolumeChange);
  muteToggleBtn.addEventListener("click", handleMuteToggle);
  themeToggleBtn.addEventListener("click", handleThemeToggle);
}

/** Initializes UI controls from state before first render. */
function hydrateControls() {
  volumeRange.value = String(Math.round(appState.volume * 100));
  updateMuteButton();
  ringProgress.style.strokeDasharray = String(RING_CIRCUMFERENCE);
  applyTheme();
}

/** Initializes app settings, route data, and event bindings. */
function initApp() {
  loadPreferences();
  bindAudioEvents();
  hydrateControls();
  startSpriteAnimation();
  startFooterLottieAnimations();
  bindEvents();
  generateRoute();
  if (appState.isMusicEnabled) {
    startMusicPlayback();
  }
}

initApp();
