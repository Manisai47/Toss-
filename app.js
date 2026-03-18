const coin = document.getElementById("coin");
const flipBtn = document.getElementById("flipBtn");

const totalEl = document.getElementById("total");
const headsEl = document.getElementById("heads");
const tailsEl = document.getElementById("tails");
const streakEl = document.getElementById("streak");
const aiText = document.getElementById("aiText");

const themeSwitcher = document.getElementById("themeSwitcher");
const soundToggle = document.getElementById("soundToggle");

let state = JSON.parse(localStorage.getItem("tossx")) || {
    total: 0,
    heads: 0,
    tails: 0,
    streak: 0,
    last: ""
};

const sounds = {
    flip: new Audio("https://www.soundjay.com/button/beep-07.wav")
};

const aiLines = [
    "Consistency beats luck. Keep flipping 🔥",
    "You’re building momentum. Don’t stop.",
    "Randomness teaches patience.",
    "Luck favors those who show up.",
    "Streaks are mindset, not chance 👀"
];

function updateUI() {
    totalEl.textContent = state.total;
    headsEl.textContent = state.heads;
    tailsEl.textContent = state.tails;
    streakEl.textContent = state.streak;
}

function save() {
    localStorage.setItem("tossx", JSON.stringify(state));
}

flipBtn.onclick = () => {
    coin.classList.add("flip");

    if (soundToggle.checked) sounds.flip.play();

    setTimeout(() => {
        const result = Math.random() < 0.5 ? "Heads" : "Tails";

        coin.textContent = result;

        state.total++;

        if (result === "Heads") state.heads++;
        else state.tails++;

        if (state.last === result) state.streak++;
        else state.streak = 1;

        state.last = result;

        aiText.textContent =
            aiLines[Math.floor(Math.random() * aiLines.length)];

        updateUI();
        save();

        coin.classList.remove("flip");
    }, 900);
};

themeSwitcher.onchange = () => {
    document.body.className = themeSwitcher.value;
};

updateUI();
