const API_URL = "PASTE_YOUR_WEB_APP_URL_HERE";


const resultsEl = document.getElementById("results");
const startBtn = document.getElementById("start");
const drumroll = document.getElementById("drumroll");


let sorted = [];
let index = 0;


async function loadVotes() {
const res = await fetch(API_URL);
const data = await res.json();


sorted = Object.entries(data)
.sort((a, b) => a[1] - b[1]); // least votes first
}


function revealNext() {
if (index >= sorted.length) {
drumroll.pause();
return;
}


const [name, votes] = sorted[index];
const li = document.createElement("li");
li.textContent = `${name} — ${votes} votes`;


resultsEl.appendChild(li);
setTimeout(() => li.classList.add("show"), 50);


index++;
setTimeout(revealNext, 2000);
}


startBtn.onclick = async () => {
resultsEl.innerHTML = "";
index = 0;


await loadVotes();
drumroll.play();
setTimeout(revealNext, 3000);
};