/* ==========================================================================
   2-YEAR ANNIVERSARY SCRAPBOOK WEBSITE - INTERACTIVE JAVASCRIPT
   ========================================================================== */

// --- 1. PHOTO BOOTH DATA & CAPTIONS ---
const PHOTO_COUNT = 26;

const PHOTO_FILES = [
  "processed_assets/photos/photo_1.jpg",
  "processed_assets/photos/photo_2.jpg",
  "processed_assets/photos/photo_3.jpeg",
  "processed_assets/photos/photo_4.jpeg",
  "processed_assets/photos/photo_5.jpeg",
  "processed_assets/photos/photo_6.jpeg",
  "processed_assets/photos/photo_7.jpeg",
  "processed_assets/photos/photo_8.jpeg",
  "processed_assets/photos/photo_9.jpeg",
  "processed_assets/photos/photo_10.jpeg",
  "processed_assets/photos/photo_11.jpeg",
  "processed_assets/photos/photo_12.jpeg",
  "processed_assets/photos/photo_13.jpeg",
  "processed_assets/photos/photo_14.jpeg",
  "processed_assets/photos/photo_15.jpeg",
  "processed_assets/photos/photo_16.jpeg",
  "processed_assets/photos/photo_17.jpeg",
  "processed_assets/photos/photo_18.jpeg",
  "processed_assets/photos/photo_19.jpeg",
  "processed_assets/photos/photo_20.jpeg",
  "processed_assets/photos/photo_21.jpeg",
  "processed_assets/photos/photo_22.jpeg",
  "processed_assets/photos/photo_23.jpeg",
  "processed_assets/photos/photo_24.jpeg",
  "processed_assets/photos/photo_25.jpeg",
  "processed_assets/photos/photo_26.png"
];

const PHOTO_CAPTIONS = [
  "My favourite person, in every lifetime.",
  "God's most beautiful plan for me.",
  "The girl who makes my heart skip a beat.",
  "My favourite notification, always.",
  "The prettiest smile I've ever seen.",
  "My home, no matter where we are.",
  "The reason behind my stupidest smiles.",
  "My favourite kind of trouble.",
  "The one I could annoy forever.",
  "My cutest little headache.",
  "The girl I fall for, every single day.",
  "My partner in crime and in everything.",
  "The one who makes ordinary days magical.",
  "My forever favourite face.",
  "The girl who knows all my moods.",
  "My favourite person to do absolutely nothing with.",
  "The one who makes me believe in destiny.",
  "My little sunshine on the darkest days.",
  "The girl I want to grow old and silly with.",
  "My favourite reason to look at my phone.",
  "The one who makes love feel so easy.",
  "My sweetest blessing from God.",
  "The girl I'd choose in every universe.",
  "My favourite adventure, yesterday, today, and always.",
  "The one who makes my world feel complete.",
  "Two years down, forever to go, my love."
];

let currentPhotoIndex = 0;

// --- 2. MUSIC PLAYER DATA & SYNCHRONIZED SPOTIFY LYRICS ---
const SONGS_DATA = [
  {
    title: "Tum Se Hi",
    artist: "Pritam, Mohit Chauhan • Jab We Met",
    art: "processed_assets/photos/photo_1.jpg",
    mp3: "Tum Se Hi Jab We Met 128 Kbps.mp3",
    synthFrequency: 440,
    lyrics: [
      { text: "Na hai yeh pana, Na khona hi hai...", time: 0 },
      { text: "Tera na hona, isme hona hi hai...", time: 6 },
      { text: "Aankhon mein khwaab aake, chhue tumko...", time: 13 },
      { text: "Jab tumse hi, din hota hai...", time: 20 },
      { text: "Surmai shaam aati hai, Tumse hi...", time: 27 },
      { text: "Tumse hi har baat hoti hai...", time: 34 },
      { text: "Hai jaan mein jaan aati hai, Tumse hi...", time: 41 },
      { text: "Main kahin bhi rahunga, teri yaad saath hai...", time: 49 },
      { text: "Kaisi yeh tarse tamanna, kya yeh mulaqaat hai...", time: 57 },
      { text: "Tumse hi, tumse hi...", time: 65 },
      { text: "Happy 2nd Anniversary my Betu! ❤️", time: 74 }
    ]
  },
  {
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    art: "processed_assets/photos/photo_2.jpg",
    mp3: "Until_I_Found_You.mp3",
    synthFrequency: 523.25,
    lyrics: [
      { text: "Georgia, wrap me up in all your...", time: 0 },
      { text: "I want you in my arms...", time: 5 },
      { text: "Oh, let me hold your heart...", time: 10 },
      { text: "I would never let you go again like I did...", time: 16 },
      { text: "Oh, I used to say...", time: 22 },
      { text: "I would never fall in love until I found her...", time: 27 },
      { text: "I said, I would never fall unless it's with you, Betu! ❤️", time: 33 },
      { text: "Fall into me, I'll never let you go...", time: 40 },
      { text: "I would never fall in love until I found her...", time: 48 },
      { text: "And I'm so glad I found you, my love. 💕", time: 56 }
    ]
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran • Date Night Special",
    art: "processed_assets/photos/photo_17.jpeg",
    mp3: "Edd_Sheeran_-_Perfect_(mp3.pm).mp3",
    synthFrequency: 392,
    lyrics: [
      { text: "I found a love for me...", time: 0 },
      { text: "Darling, just dive right in and follow my lead...", time: 6 },
      { text: "Well, I found a girl, beautiful and sweet...", time: 13 },
      { text: "I never knew you were the someone waiting for me...", time: 20 },
      { text: "'Cause we were just kids when we fell in love...", time: 27 },
      { text: "Not knowing what it was, I will not give you up this time...", time: 34 },
      { text: "Darling, just kiss me slow, your heart is all I own...", time: 42 },
      { text: "And in your eyes, you're holding mine...", time: 50 },
      { text: "Baby, I'm dancing in the dark with you between my arms...", time: 58 },
      { text: "Barefoot on the grass, listening to our favorite song...", time: 67 },
      { text: "When you said you looked a mess, I whispered underneath my breath...", time: 76 },
      { text: "But you heard it: Darling, you look perfect tonight. ❤️", time: 85 }
    ]
  }
];

let currentSongIndex = 0;
let isPlaying = false;
let audioPlayer = null;
let audioTimer = null;
let webAudioCtx = null;
let synthOsc = null;

// --- 3. LOVE LETTER EXACT TEXT ---
const LETTER_TEXT = "Two years of loving you, annoying you, stealing kisses, and falling for that cute little smile of yours all over again. ❤️\n\nSometimes I wonder how God knew exactly who my heart needed, but I'm so glad He gave me you. You're my favourite person, my cutest headache, and the girl I want to tease, hug, and love for the rest of my life.\n\nHappy 2nd anniversary, my Betu. I never knew forever could look this beautiful. ❤️";

let letterRevealed = false;


// ==========================================================================
// PASSWORD LOCK SCREEN PROTECTION (PASSCODE: 2909)
// ==========================================================================
const SECRET_PASSCODE = "2909";

function onPasscodeInput(e) {
  const val = e.target.value;
  if (val.length === 4) {
    checkPasscode();
  }
}

function checkPasscode() {
  const input = document.getElementById("passcodeInput");
  const overlay = document.getElementById("lockScreenOverlay");
  const card = document.getElementById("lockCard");
  const errorMsg = document.getElementById("lockErrorMsg");
  if (!input || !overlay) return;

  const entered = input.value.trim();

  if (entered === SECRET_PASSCODE) {
    errorMsg.textContent = "";
    burstHeartParticles(window.innerWidth / 2, window.innerHeight / 2);
    overlay.classList.add("unlocked");
    document.body.style.overflow = "";
    sessionStorage.setItem("anniversaryUnlocked", "true");
  } else {
    if (errorMsg) {
      errorMsg.textContent = "Oops! Wrong secret code, try again Betu! 🥺❤️";
    }
    if (card) {
      card.classList.remove("shake");
      void card.offsetWidth;
      card.classList.add("shake");
    }
    input.value = "";
    input.focus();
  }
}

function initLockScreen() {
  const overlay = document.getElementById("lockScreenOverlay");
  if (!overlay) return;
  
  if (sessionStorage.getItem("anniversaryUnlocked") === "true") {
    overlay.classList.add("unlocked");
  } else {
    overlay.classList.remove("unlocked");
    const input = document.getElementById("passcodeInput");
    if (input) setTimeout(() => input.focus(), 300);
  }
}


// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  audioPlayer = document.getElementById("mainAudioPlayer");
  
  // Initialize Password Lock Screen
  initLockScreen();

  if (audioPlayer) {
    audioPlayer.addEventListener("timeupdate", () => {
      if (audioPlayer.duration) {
        updateProgressAndLyrics(audioPlayer.currentTime, audioPlayer.duration);
      }
    });

    audioPlayer.addEventListener("ended", () => {
      nextSong();
    });
  }

  // Render Polaroid Gallery
  renderPolaroidGrid();
  
  // Setup Music Player View
  loadSong(0);

  // Apply Apple Emoji rendering
  applyAppleEmojis();

  // Global Click Particles Generator
  document.addEventListener("click", createClickParticle);

  // Mouse Parallax for Floating Background Stickers
  document.addEventListener("mousemove", (e) => {
    const stickers = document.querySelectorAll(".bg-sticker");
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    stickers.forEach((st, idx) => {
      const speed = (idx % 4 + 1) * 12;
      st.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
  });

  // Dispenser Strip Button
  document.getElementById("btnDispenseStrip")?.addEventListener("click", dispensePhotoboothStrip);
});


// Helper to convert emojis to Apple-style SVG icons
function applyAppleEmojis() {
  if (typeof twemoji !== 'undefined') {
    twemoji.parse(document.body, {
      folder: 'svg',
      ext: '.svg'
    });
  }
}


// ==========================================================================
// SECTION NAVIGATION (MODAL OPEN/CLOSE)
// ==========================================================================
function openSection(sectionId) {
  const modalMap = {
    'photobooth': 'modalPhotobooth',
    'music': 'modalMusic',
    'letter': 'modalLetter'
  };
  
  const modal = document.getElementById(modalMap[sectionId]);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    applyAppleEmojis();
  }
}

function closeSection(sectionId) {
  const modalMap = {
    'photobooth': 'modalPhotobooth',
    'music': 'modalMusic',
    'letter': 'modalLetter'
  };
  
  const modal = document.getElementById(modalMap[sectionId]);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
  
  if (sectionId === 'music' && isPlaying) {
    pauseAudio();
  }
}


// ==========================================================================
// PHOTO BOOTH GALLERY & LIGHTBOX
// ==========================================================================
function renderPolaroidGrid() {
  const grid = document.getElementById("polaroidGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    const photoFile = PHOTO_FILES[i - 1];
    const caption = PHOTO_CAPTIONS[i - 1] || "our cute memory 💕";
    const randomRot = (Math.random() * 10 - 5).toFixed(1); // -5deg to +5deg
    
    const card = document.createElement("div");
    card.className = "polaroid-item";
    card.style.transform = `rotate(${randomRot}deg)`;
    card.setAttribute("onclick", `openLightbox(${i - 1})`);
    
    card.innerHTML = `
      <div class="polaroid-img-wrapper">
        <img src="${photoFile}" alt="Memory photo ${i}" loading="lazy">
      </div>
      <div class="polaroid-caption">${caption}</div>
    `;
    
    grid.appendChild(card);
  }
  applyAppleEmojis();
}

function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightbox();
  document.getElementById("lightboxModal").classList.add("active");
}

function closeLightbox() {
  document.getElementById("lightboxModal").classList.remove("active");
}

function updateLightbox() {
  const i = currentPhotoIndex + 1;
  const photoFile = PHOTO_FILES[currentPhotoIndex];
  
  document.getElementById("lightboxImg").src = photoFile;
  document.getElementById("lightboxCaption").textContent = PHOTO_CAPTIONS[currentPhotoIndex];
  document.getElementById("lightboxIndex").textContent = `${i} / ${PHOTO_COUNT}`;
  applyAppleEmojis();
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % PHOTO_COUNT;
  updateLightbox();
}

function prevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + PHOTO_COUNT) % PHOTO_COUNT;
  updateLightbox();
}

// Photobooth Strip Ejector Dispenser Animation
function dispensePhotoboothStrip() {
  const container = document.getElementById("stripOutput");
  if (!container) return;
  
  // Select 3 random photos
  const p1 = Math.floor(Math.random() * PHOTO_COUNT);
  const p2 = Math.floor(Math.random() * PHOTO_COUNT);
  const p3 = Math.floor(Math.random() * PHOTO_COUNT);

  const f1 = PHOTO_FILES[p1];
  const f2 = PHOTO_FILES[p2];
  const f3 = PHOTO_FILES[p3];

  container.innerHTML = `
    <div class="photobooth-strip-container">
      <img src="${f1}" class="strip-photo-item" alt="strip photo 1">
      <img src="${f2}" class="strip-photo-item" alt="strip photo 2">
      <img src="${f3}" class="strip-photo-item" alt="strip photo 3">
      <div class="strip-footer-text">2 Years of Us • Betu ❤️</div>
    </div>
  `;
  applyAppleEmojis();
}


// ==========================================================================
// MUSIC PLAYER & SYNCHRONIZED SPOTIFY LYRICS
// ==========================================================================
function loadSong(index) {
  currentSongIndex = index;
  const song = SONGS_DATA[index];
  
  // Update Cassette UI
  document.getElementById("cassetteTrackTitle").textContent = song.title;
  document.getElementById("cassetteTrackArtist").textContent = song.artist;
  
  // Update Spotify UI
  document.getElementById("spotifyTrackTitle").textContent = song.title;
  document.getElementById("spotifyArtist").textContent = song.artist;
  document.getElementById("spotifyAlbumArt").src = song.art;
  
  // Render Spotify Lyrics
  renderLyrics(song.lyrics);

  // Update Active Tab
  document.querySelectorAll(".song-tab").forEach((tab, idx) => {
    tab.classList.toggle("active", idx === index);
  });

  // Prepare HTML5 audio if mp3 available
  if (audioPlayer) {
    audioPlayer.src = song.mp3;
    audioPlayer.load();
  }
}

function renderLyrics(lyricsArray) {
  const container = document.getElementById("lyricsScrollBox");
  if (!container) return;
  
  container.innerHTML = "";
  lyricsArray.forEach((lineObj, idx) => {
    const lineEl = document.createElement("div");
    lineEl.className = "lyric-line" + (idx === 0 ? " active" : "");
    lineEl.id = `lyricLine_${idx}`;
    lineEl.textContent = lineObj.text;
    container.appendChild(lineEl);
  });
  applyAppleEmojis();
}

function togglePlayPause() {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function playAudio() {
  isPlaying = true;
  document.getElementById("playIcon").className = "fa-solid fa-pause";
  document.getElementById("cassetteDeck").classList.add("playing");
  
  if (audioPlayer) {
    audioPlayer.play().catch(() => {
      startSynthMelody();
    });
  }
}

function pauseAudio() {
  isPlaying = false;
  document.getElementById("playIcon").className = "fa-solid fa-play";
  document.getElementById("cassetteDeck").classList.remove("playing");
  
  if (audioPlayer) audioPlayer.pause();
  stopSynthMelody();
}

function updateProgressAndLyrics(sec, dur) {
  const song = SONGS_DATA[currentSongIndex];
  const totalSec = dur || 200;
  const pct = (sec / totalSec) * 100;
  
  const seekBar = document.getElementById("trackSeekBar");
  if (seekBar) seekBar.value = pct;
  
  const currDisp = document.getElementById("currentTimeDisplay");
  if (currDisp) currDisp.textContent = formatTime(sec);
  
  const totDisp = document.getElementById("totalTimeDisplay");
  if (totDisp) totDisp.textContent = formatTime(totalSec);

  // Highlight active lyric line based on time
  const lyrics = song.lyrics;
  let activeIdx = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (sec >= lyrics[i].time) {
      activeIdx = i;
    }
  }

  document.querySelectorAll(".lyric-line").forEach((el, idx) => {
    const isActive = (idx === activeIdx);
    el.classList.toggle("active", isActive);
    if (isActive) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function switchSong(index) {
  pauseAudio();
  loadSong(index);
  playAudio();
}

function nextSong() {
  const nextIdx = (currentSongIndex + 1) % SONGS_DATA.length;
  switchSong(nextIdx);
}

function prevSong() {
  const prevIdx = (currentSongIndex - 1 + SONGS_DATA.length) % SONGS_DATA.length;
  switchSong(prevIdx);
}

function formatTime(s) {
  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Web Audio API Ambient Melodic Chimes (Fallback audio)
function startSynthMelody() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!webAudioCtx) webAudioCtx = new AudioContext();
    if (webAudioCtx.state === 'suspended') webAudioCtx.resume();

    const song = SONGS_DATA[currentSongIndex];
    const baseFreq = song.synthFrequency || 440;
    
    synthOsc = webAudioCtx.createOscillator();
    const gainNode = webAudioCtx.createGain();
    
    synthOsc.type = 'sine';
    synthOsc.frequency.setValueAtTime(baseFreq, webAudioCtx.currentTime);
    
    // Soft volume envelope
    gainNode.gain.setValueAtTime(0.05, webAudioCtx.currentTime);
    
    synthOsc.connect(gainNode);
    gainNode.connect(webAudioCtx.destination);
    
    synthOsc.start();
  } catch(e) {
    console.log("Audio synth fallback initialized.");
  }
}

function stopSynthMelody() {
  if (synthOsc) {
    try { synthOsc.stop(); } catch(e) {}
    synthOsc = null;
  }
}


// ==========================================================================
// LOVE LETTER ENVELOPE & WORD-BY-WORD TYPEWRITER REVEAL
// ==========================================================================
function toggleLetterOpen() {
  const wrapper = document.getElementById("envelopeWrapper");
  if (!wrapper) return;
  
  wrapper.classList.toggle("open");
  const isOpen = wrapper.classList.contains("open");
  
  const hint = document.getElementById("envelopeHint");
  if (hint) {
    hint.innerHTML = isOpen ? 
      '<i class="fa-solid fa-heart"></i> Click envelope again to fold back <span class="emoji-ios">💌</span>' :
      '<i class="fa-solid fa-hand-pointer"></i> Click on the envelope to open & read my letter! <span class="emoji-ios">💌</span>';
  }

  if (isOpen && !letterRevealed) {
    revealLetterTextWordByWord();
    letterRevealed = true;
    burstHeartParticles(window.innerWidth / 2, window.innerHeight / 2);
  }
}

function revealLetterTextWordByWord() {
  const container = document.getElementById("letterBodyText");
  if (!container) return;
  
  container.innerHTML = "";
  
  // Split letter text by spaces while preserving line breaks
  const paragraphs = LETTER_TEXT.split("\n\n");
  
  paragraphs.forEach((pText, pIdx) => {
    const pEl = document.createElement("p");
    pEl.style.marginBottom = "16px";
    
    const words = pText.split(" ");
    words.forEach((word, wIdx) => {
      const span = document.createElement("span");
      span.className = "word-span";
      span.textContent = word;
      // Stagger word entrance delay
      span.style.animationDelay = `${(pIdx * 20 + wIdx) * 0.08}s`;
      pEl.appendChild(span);
    });
    
    container.appendChild(pEl);
  });
}


// ==========================================================================
// GLOBAL CLICK PARTICLES (HEARTS, KISSES & SPARKLES)
// ==========================================================================
function createClickParticle(e) {
  // Don't trigger inside buttons or inputs
  if (e.target.closest("button") || e.target.closest("input")) return;
  
  const x = e.clientX;
  const y = e.clientY;
  
  burstHeartParticles(x, y);
}

function burstHeartParticles(x, y) {
  const container = document.getElementById("particleContainer");
  if (!container) return;
  
  const symbols = ["❤️", "🥰", "💋", "✨", "🌸", "💖", "🧸"];
  
  for (let i = 0; i < 8; i++) {
    const part = document.createElement("span");
    part.className = "particle-item";
    part.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    const tx = (Math.random() * 140 - 70) + "px";
    const ty = (Math.random() * -120 - 40) + "px";
    const rot = (Math.random() * 60 - 30) + "deg";
    
    part.style.left = x + "px";
    part.style.top = y + "px";
    part.style.setProperty("--tx", tx);
    part.style.setProperty("--ty", ty);
    part.style.setProperty("--rot", rot);
    
    container.appendChild(part);
    
    setTimeout(() => {
      part.remove();
    }, 1200);
  }
}
