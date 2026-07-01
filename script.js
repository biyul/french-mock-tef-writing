(function () {
  const TOTAL_SECONDS = 25 * 60;
  const LOW_TIME_THRESHOLD = 60;

  const lockBtn = document.getElementById("lockBtn");
  const lockIcon = document.getElementById("lockIcon");
  const lockLabel = document.getElementById("lockLabel");
  const timerBox = document.getElementById("timerBox");
  const editor = document.getElementById("editor");
  const wordCountEl = document.getElementById("wordCount");
  const shiftKey = document.getElementById("shiftKey");
  const letterKeys = document.querySelectorAll(".key[data-lower]");
  const charKeys = document.querySelectorAll(".key[data-char]");

  let locked = true;
  let shiftActive = false;
  let secondsLeft = TOTAL_SECONDS;
  let timerInterval = null;

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function renderTimer() {
    timerBox.textContent = formatTime(secondsLeft);
    timerBox.classList.toggle("time-low", secondsLeft <= LOW_TIME_THRESHOLD);
  }

  function startTimer() {
    if (timerInterval || secondsLeft <= 0) return;
    timerInterval = setInterval(() => {
      secondsLeft--;
      renderTimer();
      if (secondsLeft <= 0) {
        stopTimer();
        setLocked(true);
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function setLocked(nextLocked) {
    locked = nextLocked;
    editor.disabled = locked;
    shiftKey.disabled = locked;
    letterKeys.forEach((btn) => (btn.disabled = locked));
    charKeys.forEach((btn) => (btn.disabled = locked));

    if (locked) {
      lockIcon.textContent = "🔒";
      lockLabel.textContent = "Déverrouiller";
      stopTimer();
    } else {
      lockIcon.textContent = "🔓";
      lockLabel.textContent = "Verrouiller";
      if (secondsLeft > 0) startTimer();
    }
  }

  function updateWordCount() {
    const text = editor.value.trim();
    const count = text.length === 0 ? 0 : text.split(/\s+/).length;
    wordCountEl.textContent = count + " " + (count <= 1 ? "mot" : "mots");
  }

  function insertAtCursor(char) {
    if (editor.disabled) return;
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const value = editor.value;
    editor.value = value.slice(0, start) + char + value.slice(end);
    const cursor = start + char.length;
    editor.focus();
    editor.setSelectionRange(cursor, cursor);
    updateWordCount();
  }

  lockBtn.addEventListener("click", () => setLocked(!locked));

  editor.addEventListener("input", updateWordCount);

  function deactivateShift() {
    shiftActive = false;
    shiftKey.classList.remove("active");
    letterKeys.forEach((btn) => {
      btn.textContent = btn.dataset.lower;
    });
  }

  letterKeys.forEach((btn) => {
    btn.addEventListener("click", () => {
      const char = shiftActive ? btn.dataset.upper : btn.dataset.lower;
      insertAtCursor(char);
      if (shiftActive) deactivateShift();
    });
  });

  charKeys.forEach((btn) => {
    btn.addEventListener("click", () => insertAtCursor(btn.dataset.char));
  });

  shiftKey.addEventListener("click", () => {
    shiftActive = !shiftActive;
    shiftKey.classList.toggle("active", shiftActive);
    letterKeys.forEach((btn) => {
      btn.textContent = shiftActive ? btn.dataset.upper : btn.dataset.lower;
    });
    editor.focus();
  });

  renderTimer();
  updateWordCount();
})();
