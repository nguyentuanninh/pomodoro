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
const UNSPLASH_ACCESS_KEY = "gg9iP35mMQOwm6tXK0TC-hBdJYD2wpfI8YBhmnrAwGg";
const UNSPLASH_CACHE_KEY = "city-flight-pomodoro-unsplash-cache";

const STORAGE_KEYS = {
  volume: "city-flight-pomodoro-volume",
  musicEnabled: "city-flight-pomodoro-music-enabled",
  notificationEnabled: "city-flight-pomodoro-notification-enabled",
  theme: "city-flight-pomodoro-theme",
};

const CITIES = [
  "Paris", "London", "Rome", "Berlin", "Madrid",
  "Amsterdam", "Vienna", "Prague", "Barcelona", "Lisbon",
  "Dublin", "Brussels", "Zurich", "Stockholm", "Copenhagen",
  "Athens", "Budapest", "Warsaw", "Oslo", "Helsinki",
];

const FLIGHT_DURATIONS = {
  "Amsterdam|Athens": 195, "Amsterdam|Barcelona": 130, "Amsterdam|Berlin": 80,
  "Amsterdam|Brussels": 45, "Amsterdam|Budapest": 130, "Amsterdam|Copenhagen": 95,
  "Amsterdam|Dublin": 100, "Amsterdam|Helsinki": 165, "Amsterdam|Lisbon": 175,
  "Amsterdam|London": 65, "Amsterdam|Madrid": 150, "Amsterdam|Oslo": 110,
  "Amsterdam|Paris": 70, "Amsterdam|Prague": 90, "Amsterdam|Rome": 135,
  "Amsterdam|Stockholm": 120, "Amsterdam|Vienna": 110, "Amsterdam|Warsaw": 115,
  "Amsterdam|Zurich": 85,
  "Athens|Barcelona": 185, "Athens|Berlin": 170, "Athens|Brussels": 190,
  "Athens|Budapest": 120, "Athens|Copenhagen": 195, "Athens|Dublin": 235,
  "Athens|Helsinki": 195, "Athens|Lisbon": 240, "Athens|London": 215,
  "Athens|Madrid": 225, "Athens|Oslo": 210, "Athens|Paris": 200,
  "Athens|Prague": 155, "Athens|Rome": 130, "Athens|Stockholm": 195,
  "Athens|Vienna": 140, "Athens|Warsaw": 155, "Athens|Zurich": 165,
  "Barcelona|Berlin": 150, "Barcelona|Brussels": 115, "Barcelona|Budapest": 160,
  "Barcelona|Copenhagen": 170, "Barcelona|Dublin": 140, "Barcelona|Helsinki": 210,
  "Barcelona|Lisbon": 100, "Barcelona|London": 120, "Barcelona|Madrid": 70,
  "Barcelona|Oslo": 185, "Barcelona|Paris": 105, "Barcelona|Prague": 140,
  "Barcelona|Rome": 110, "Barcelona|Stockholm": 185, "Barcelona|Vienna": 145,
  "Barcelona|Warsaw": 170, "Barcelona|Zurich": 100,
  "Berlin|Brussels": 85, "Berlin|Budapest": 90, "Berlin|Copenhagen": 65,
  "Berlin|Dublin": 120, "Berlin|Helsinki": 130, "Berlin|Lisbon": 190,
  "Berlin|London": 110, "Berlin|Madrid": 155, "Berlin|Oslo": 105,
  "Berlin|Paris": 105, "Berlin|Prague": 60, "Berlin|Rome": 115,
  "Berlin|Stockholm": 95, "Berlin|Vienna": 80, "Berlin|Warsaw": 75,
  "Berlin|Zurich": 85,
  "Brussels|Budapest": 120, "Brussels|Copenhagen": 100, "Brussels|Dublin": 85,
  "Brussels|Helsinki": 165, "Brussels|Lisbon": 155, "Brussels|London": 55,
  "Brussels|Madrid": 135, "Brussels|Oslo": 120, "Brussels|Paris": 50,
  "Brussels|Prague": 90, "Brussels|Rome": 115, "Brussels|Stockholm": 130,
  "Brussels|Vienna": 100, "Brussels|Warsaw": 120, "Brussels|Zurich": 70,
  "Budapest|Copenhagen": 130, "Budapest|Dublin": 170, "Budapest|Helsinki": 155,
  "Budapest|Lisbon": 205, "Budapest|London": 150, "Budapest|Madrid": 180,
  "Budapest|Oslo": 150, "Budapest|Paris": 140, "Budapest|Prague": 55,
  "Budapest|Rome": 100, "Budapest|Stockholm": 140, "Budapest|Vienna": 45,
  "Budapest|Warsaw": 70, "Budapest|Zurich": 100,
  "Copenhagen|Dublin": 130, "Copenhagen|Helsinki": 95, "Copenhagen|Lisbon": 200,
  "Copenhagen|London": 110, "Copenhagen|Madrid": 175, "Copenhagen|Oslo": 60,
  "Copenhagen|Paris": 120, "Copenhagen|Prague": 85, "Copenhagen|Rome": 150,
  "Copenhagen|Stockholm": 65, "Copenhagen|Vienna": 110, "Copenhagen|Warsaw": 85,
  "Copenhagen|Zurich": 110,
  "Dublin|Helsinki": 190, "Dublin|Lisbon": 155, "Dublin|London": 75,
  "Dublin|Madrid": 140, "Dublin|Oslo": 130, "Dublin|Paris": 95,
  "Dublin|Prague": 135, "Dublin|Rome": 165, "Dublin|Stockholm": 145,
  "Dublin|Vienna": 150, "Dublin|Warsaw": 155, "Dublin|Zurich": 115,
  "Helsinki|Lisbon": 255, "Helsinki|London": 175, "Helsinki|Madrid": 225,
  "Helsinki|Oslo": 100, "Helsinki|Paris": 175, "Helsinki|Prague": 130,
  "Helsinki|Rome": 185, "Helsinki|Stockholm": 60, "Helsinki|Vienna": 145,
  "Helsinki|Warsaw": 105, "Helsinki|Zurich": 155,
  "Lisbon|London": 145, "Lisbon|Madrid": 65, "Lisbon|Oslo": 210,
  "Lisbon|Paris": 145, "Lisbon|Prague": 185, "Lisbon|Rome": 170,
  "Lisbon|Stockholm": 220, "Lisbon|Vienna": 190, "Lisbon|Warsaw": 210,
  "Lisbon|Zurich": 155,
  "London|Madrid": 140, "London|Oslo": 130, "London|Paris": 75,
  "London|Prague": 120, "London|Rome": 145, "London|Stockholm": 145,
  "London|Vienna": 130, "London|Warsaw": 140, "London|Zurich": 100,
  "Madrid|Oslo": 195, "Madrid|Paris": 125, "Madrid|Prague": 165,
  "Madrid|Rome": 150, "Madrid|Stockholm": 200, "Madrid|Vienna": 180,
  "Madrid|Warsaw": 190, "Madrid|Zurich": 130,
  "Oslo|Paris": 135, "Oslo|Prague": 120, "Oslo|Rome": 170,
  "Oslo|Stockholm": 55, "Oslo|Vienna": 135, "Oslo|Warsaw": 110,
  "Oslo|Zurich": 130,
  "Paris|Prague": 100, "Paris|Rome": 120, "Paris|Stockholm": 150,
  "Paris|Vienna": 115, "Paris|Warsaw": 130, "Paris|Zurich": 75,
  "Prague|Rome": 105, "Prague|Stockholm": 115, "Prague|Vienna": 55,
  "Prague|Warsaw": 65, "Prague|Zurich": 80,
  "Rome|Stockholm": 170, "Rome|Vienna": 95, "Rome|Warsaw": 135,
  "Rome|Zurich": 95,
  "Stockholm|Vienna": 140, "Stockholm|Warsaw": 105, "Stockholm|Zurich": 140,
  "Vienna|Warsaw": 75, "Vienna|Zurich": 85,
  "Warsaw|Zurich": 110,
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
  isNotificationEnabled: true,
  theme: "dark",
  currentFocusTenMinuteMark: TEN_MINUTES_SECONDS,
};

const routeDisplay = document.getElementById("routeDisplay");
const flightTimeDisplay = document.getElementById("flightTimeDisplay");
const sessionDisplay = document.getElementById("sessionDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const modeDisplay = document.getElementById("modeDisplay");
const ringProgress = document.getElementById("ringProgress");
const appBackground = document.getElementById("appBackground");
const volumeRange = document.getElementById("volumeRange");
const muteToggleBtn = document.getElementById("muteToggleBtn");
const fullscreenToggleBtn = document.getElementById("fullscreenToggleBtn");
const musicSprite = document.getElementById("musicSprite");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeToggleLabel = document.getElementById("themeToggleLabel");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const skipBtn = document.getElementById("skipBtn");
const newCitiesBtn = document.getElementById("newCitiesBtn");
const departureSelect = document.getElementById("departureSelect");
const destinationSelect = document.getElementById("destinationSelect");

const ambientAudio = new Audio();
ambientAudio.preload = "auto";
const BASE_PAGE_TITLE = document.title || "City Flight Pomodoro";
let fadeIntervalId = null;
let spriteAnimationIntervalId = null;
const footerLottieInstances = [];
let notificationAudioContext = null;
let isFullscreenFallbackActive = false;

/** Returns true when the browser reports real fullscreen is active. */
function isRealFullscreenActive() {
  return Boolean(
    document.fullscreenElement || document.webkitFullscreenElement,
  );
}

/** Enables/disables CSS fallback fullscreen mode. */
function setFullscreenFallbackActive(active) {
  isFullscreenFallbackActive = active;
  document.body.classList.toggle("fullscreen-fallback", active);
}

/** Syncs fullscreen UI state based on current fullscreen status. */
function syncFullscreenUI() {
  if (!fullscreenToggleBtn) {
    return;
  }

  const realActive = isRealFullscreenActive();
  if (realActive && isFullscreenFallbackActive) {
    // If real fullscreen succeeds after a fallback attempt, remove fallback UI.
    setFullscreenFallbackActive(false);
  }

  document.body.classList.toggle("fullscreen-real", realActive);

  const isActive = realActive || isFullscreenFallbackActive;
  fullscreenToggleBtn.textContent = isActive ? "⤢" : "⛶";
  fullscreenToggleBtn.setAttribute(
    "aria-label",
    isActive ? "Exit fullscreen" : "Enter fullscreen",
  );
  fullscreenToggleBtn.setAttribute(
    "title",
    isActive ? "Exit fullscreen" : "Enter fullscreen",
  );
}

/** Attempts to enter real fullscreen mode. Returns whether it succeeded. */
async function requestRealFullscreen() {
  const element = document.documentElement;
  const request = element.requestFullscreen || element.webkitRequestFullscreen;
  if (!request) {
    return false;
  }

  try {
    const maybePromise = request.call(element);
    if (maybePromise && typeof maybePromise.then === "function") {
      await maybePromise;
    }

    // Some browsers don't resolve accurately; re-check after a short delay.
    await new Promise(resolve => setTimeout(resolve, 200));
    return isRealFullscreenActive();
  } catch (error) {
    return false;
  }
}

/** Exits real fullscreen mode if active. */
async function exitRealFullscreen() {
  const exit = document.exitFullscreen || document.webkitExitFullscreen;
  if (!exit) {
    return;
  }

  try {
    const maybePromise = exit.call(document);
    if (maybePromise && typeof maybePromise.then === "function") {
      await maybePromise;
    }
  } catch (error) {
    // Ignore exit errors; fullscreenchange will sync state.
  }
}

/** Toggles fullscreen mode (real fullscreen first, otherwise CSS fallback). */
async function handleFullscreenToggle() {
  if (!fullscreenToggleBtn) {
    return;
  }

  if (isRealFullscreenActive()) {
    await exitRealFullscreen();
    syncFullscreenUI();
    return;
  }

  if (isFullscreenFallbackActive) {
    setFullscreenFallbackActive(false);
    syncFullscreenUI();
    return;
  }

  const entered = await requestRealFullscreen();
  if (!entered) {
    setFullscreenFallbackActive(true);
  }
  syncFullscreenUI();
}

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
  const savedNotificationEnabled = localStorage.getItem(
    STORAGE_KEYS.notificationEnabled,
  );
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);

  if (savedVolume && !Number.isNaN(Number(savedVolume))) {
    const parsedVolume = Number(savedVolume);
    appState.volume = Math.min(1, Math.max(0, parsedVolume));
  }
  appState.isMusicEnabled = false;
  if (savedNotificationEnabled) {
    appState.isNotificationEnabled = savedNotificationEnabled === "true";
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
  localStorage.setItem(
    STORAGE_KEYS.notificationEnabled,
    String(appState.isNotificationEnabled),
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

/** Returns the singleton notification audio context. */
function getNotificationAudioContext() {
  if (notificationAudioContext) {
    return notificationAudioContext;
  }
  const AudioContextConstructor =
    window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) {
    return null;
  }
  notificationAudioContext = new AudioContextConstructor();
  return notificationAudioContext;
}

/** Resumes notification audio context after a user gesture when needed. */
async function resumeNotificationContextIfNeeded() {
  const context = getNotificationAudioContext();
  if (!context || context.state !== "suspended") {
    return;
  }
  try {
    await context.resume();
  } catch (_error) {
    // Ignore resume failures; browser gesture policy will guard playback.
  }
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
  if (!appState.isNotificationEnabled) {
    return;
  }
  const context = getNotificationAudioContext();
  if (!context || context.state !== "running") {
    return;
  }
  const now = context.currentTime;

  const patterns = {
    periodic: [620],
    session: [520, 650],
    complete: [760, 930, 1100],
  };

  const frequencies = patterns[type] || patterns.periodic;
  const repeatCount = 2;
  const singleDuration = frequencies.length * 0.17;
  const repeatGap = 0.12;

  for (let repeat = 0; repeat < repeatCount; repeat++) {
    const repeatOffset = repeat * (singleDuration + repeatGap);
    frequencies.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      const offset = now + repeatOffset + index * 0.17;
      const volume = appState.volume * 0.8;
      gainNode.gain.setValueAtTime(0, offset);
      gainNode.gain.linearRampToValueAtTime(volume, offset + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, offset + 0.15);
      oscillator.start(offset);
      oscillator.stop(offset + 0.16);
    });
  }
}

/** Updates browser tab title with current timer and mode label. */
function updateDocumentTitle() {
  if (appState.isComplete) {
    document.title = `Done • ${BASE_PAGE_TITLE}`;
    return;
  }

  const currentSegment = getCurrentSegment();
  const segmentLabel =
    currentSegment && currentSegment.type === "break" ? "Break" : "Focus";
  document.title = `${formatClock(appState.remainingSeconds)} • ${segmentLabel}`;
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

  const segmentProgress = getSegmentProgress();
  ringProgress.style.strokeDashoffset = String(
    RING_CIRCUMFERENCE * (1 - segmentProgress),
  );

  updateDocumentTitle();

  if (appState.isComplete) {
    startPauseBtn.textContent = "Start";
    startPauseBtn.disabled = true;
  } else if (appState.isRunning) {
    startPauseBtn.textContent = "Pause";
    startPauseBtn.disabled = false;
  } else {
    startPauseBtn.textContent = "Start";
    startPauseBtn.disabled = false;
  }
  startPauseBtn.setAttribute("aria-label", startPauseBtn.textContent);
  startPauseBtn.setAttribute("title", startPauseBtn.textContent);
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
  }
  if (currentSegment && !triggeredBySkip) {
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
  void resumeNotificationContextIfNeeded();
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
  void resumeNotificationContextIfNeeded();
  stopTimer();
  render();
}

/** Resets current route timer to first segment without changing cities. */
function handleReset() {
  void resumeNotificationContextIfNeeded();
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
  void resumeNotificationContextIfNeeded();
  if (appState.isComplete) {
    return;
  }
  advanceSegment(true);
}

/** Populates city select dropdowns with sorted city list. */
function populateCitySelectors() {
  const sorted = [...CITIES].sort();
  [departureSelect, destinationSelect].forEach(select => {
    select.innerHTML = "";
    sorted.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      select.appendChild(option);
    });
  });
}

/** Syncs select dropdowns to match current app state cities. */
function syncCitySelectors() {
  departureSelect.value = appState.departure;
  destinationSelect.value = appState.destination;
}

/** Sets up a route from the currently selected cities and resets the timer. */
function applyRoute(departure, destination) {
  void resumeNotificationContextIfNeeded();
  stopTimer();
  appState.completedFocusSeconds = 0;
  appState.isComplete = false;
  appState.currentFocusTenMinuteMark = TEN_MINUTES_SECONDS;

  appState.departure = departure;
  appState.destination = destination;

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

  syncCitySelectors();
  updateBackground();
  render();
}

/** Builds a random city route and initializes related timer state. */
function generateRoute() {
  const departureIndex = Math.floor(Math.random() * CITIES.length);
  let destinationIndex = Math.floor(Math.random() * CITIES.length);
  while (destinationIndex === departureIndex) {
    destinationIndex = Math.floor(Math.random() * CITIES.length);
  }
  applyRoute(CITIES[departureIndex], CITIES[destinationIndex]);
}

/** Handles departure city selector change. */
function handleDepartureChange() {
  let dest = destinationSelect.value;
  if (dest === departureSelect.value) {
    const other = CITIES.find(c => c !== departureSelect.value);
    dest = other || CITIES[0];
  }
  applyRoute(departureSelect.value, dest);
}

/** Handles destination city selector change. */
function handleDestinationChange() {
  let dep = departureSelect.value;
  if (dep === destinationSelect.value) {
    const other = CITIES.find(c => c !== destinationSelect.value);
    dep = other || CITIES[0];
  }
  applyRoute(dep, destinationSelect.value);
}

/** Returns the Unsplash image cache from localStorage. */
function getUnsplashCache() {
  try {
    return JSON.parse(localStorage.getItem(UNSPLASH_CACHE_KEY)) || {};
  } catch (_error) {
    return {};
  }
}

/** Saves an image URL to the Unsplash cache for a city. */
function setUnsplashCache(city, url) {
  const cache = getUnsplashCache();
  cache[city] = url;
  try {
    localStorage.setItem(UNSPLASH_CACHE_KEY, JSON.stringify(cache));
  } catch (_error) {
    // localStorage full — silently skip caching.
  }
}

/** Fetches a city photo URL from Unsplash, using cache when available. */
async function fetchCityImage(city) {
  const cache = getUnsplashCache();
  if (cache[city]) {
    return cache[city];
  }

  try {
    const query = encodeURIComponent(`${city} city skyline`);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } },
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const url = data.results[0].urls.regular;
      setUnsplashCache(city, url);
      return url;
    }
  } catch (_error) {
    // Network error — fall back to gradient.
  }
  return null;
}

const LOCAL_IMAGES = [
  "./images/amsterdam.jpg",
  "./images/berlin.jpg",
  "./images/london.jpg",
  "./images/madrid.jpg",
  "./images/paris.jpg",
  "./images/prague.jpg",
  "./images/rome.jpg",
  "./images/vienna.jpg",
];

/** Applies a random local image as the background fallback. */
function applyLocalImageFallback() {
  const randomIndex = Math.floor(Math.random() * LOCAL_IMAGES.length);
  const path = LOCAL_IMAGES[randomIndex];
  const image = new Image();
  image.onload = () => {
    appBackground.style.backgroundImage = `url("${path}")`;
    appBackground.classList.add("image-loaded");
  };
  image.onerror = () => {
    // If local image also fails, apply a gradient.
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
  };
  image.src = path;
}

/** Loads route background from Unsplash, falls back to random local image. */
async function updateBackground() {
  appBackground.classList.remove("image-loaded");

  const cities = [appState.destination, appState.departure];
  for (const city of cities) {
    const url = await fetchCityImage(city);
    if (url) {
      const image = new Image();
      image.onload = () => {
        appBackground.style.backgroundImage = `url("${url}")`;
        appBackground.classList.add("image-loaded");
      };
      image.src = url;
      return;
    }
  }

  // Unsplash failed for both cities — use a random local image.
  applyLocalImageFallback();
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
  await resumeNotificationContextIfNeeded();
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
  startPauseBtn.addEventListener("click", () => {
    if (appState.isRunning) {
      handlePause();
    } else {
      handleStart();
    }
  });
  resetBtn.addEventListener("click", handleReset);
  skipBtn.addEventListener("click", handleSkip);
  newCitiesBtn.addEventListener("click", generateRoute);
  departureSelect.addEventListener("change", handleDepartureChange);
  destinationSelect.addEventListener("change", handleDestinationChange);
  volumeRange.addEventListener("input", handleVolumeChange);
  muteToggleBtn.addEventListener("click", handleMuteToggle);
  fullscreenToggleBtn.addEventListener("click", handleFullscreenToggle);
  themeToggleBtn.addEventListener("click", handleThemeToggle);

  document.addEventListener("fullscreenchange", syncFullscreenUI);
  document.addEventListener("webkitfullscreenchange", syncFullscreenUI);
}

/** Initializes UI controls from state before first render. */
function hydrateControls() {
  volumeRange.value = String(Math.round(appState.volume * 100));
  updateMuteButton();
  ringProgress.style.strokeDasharray = String(RING_CIRCUMFERENCE);
  applyTheme();
  syncFullscreenUI();
}

/** Initializes app settings, route data, and event bindings. */
function initApp() {
  loadPreferences();
  bindAudioEvents();
  populateCitySelectors();
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
