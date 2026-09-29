const titleEl = document.getElementById("track-title");
const subtitleEl = document.getElementById("track-subtitle");
const messageEl = document.getElementById("message");
const playerSection = document.getElementById("player-section");
const audio = document.getElementById("audio");
const speedButtons = [...document.querySelectorAll("[data-speed]")];

function showMessage(title, message) {
  titleEl.textContent = title;
  subtitleEl.textContent = "";
  playerSection.hidden = true;
  messageEl.textContent = message;
}

function setSpeed(speed) {
  audio.playbackRate = speed;
  speedButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.speed) === speed);
  });
}

speedButtons.forEach((button) => {
  button.addEventListener("click", () => setSpeed(Number(button.dataset.speed)));
});

async function init() {
  const params = new URLSearchParams(window.location.search);
  const trackId = params.get("track");

  if (!trackId) {
    showMessage(
      "English Audio",
      "音声が指定されていません。教材のQRコードからアクセスしてください。"
    );
    return;
  }

  try {
    const response = await fetch("./tracks.json", { cache: "no-store" });
    if (!response.ok) throw new Error("tracks.json could not be loaded");

    const tracks = await response.json();
    const track = tracks[trackId];

    if (!track) {
      showMessage(
        "音声が見つかりません",
        "指定された教材の音声は現在利用できません。"
      );
      return;
    }

    titleEl.textContent = track.title || "English Audio";
    subtitleEl.textContent = track.subtitle || "";
    document.title = `${track.title || "English Audio"} | English Audio`;

    audio.src = track.file;
    audio.load();

    messageEl.textContent = "";
    playerSection.hidden = false;
    setSpeed(1);
  } catch (error) {
    console.error(error);
    showMessage(
      "読み込みエラー",
      "音声情報を読み込めませんでした。時間をおいて再度お試しください。"
    );
  }
}

init();
