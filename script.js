const boot = document.getElementById('boot');
const tv = document.getElementById('tv');
const input = document.getElementById('input');
const convert = document.getElementById('convert');
const towersEl = document.getElementById('towers');
const resultEl = document.getElementById('result');


// Boot delay
setTimeout(() => {
boot.style.display = 'none';
tv.classList.remove('hidden');
}, 500);


function parseVotes(text) {
return text.split('\n').map(line => {
const [name, votes] = line.split('=');
return name && votes ? [name.trim(), Number(votes)] : null;
}).filter(Boolean);
}


convert.onclick = () => {
towersEl.innerHTML = '';
resultEl.textContent = '';


const data = parseVotes(input.value);
if (!data.length) return;


const maxVotes = Math.max(...data.map(v => v[1]));


data.forEach(([name, votes]) => {
const tower = document.createElement('div');
tower.className = 'tower';
tower.style.height = (votes / maxVotes * 200 + 20) + 'px';


const label = document.createElement('span');
label.textContent = name;
tower.appendChild(label);


if (votes === maxVotes) {
tower.classList.add('eliminated');
resultEl.textContent = `${name}, you're eliminated with ${votes} votes!`;
}


towersEl.appendChild(tower);
});
};