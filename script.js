function getTodayKey() {
  const today = new Date();
  return today.toISOString().split('T')[0]; // format: "2025-04-29"
}

// Letakkan di sini
const oshis = [
  { name: "Erine", image: "erine.jpg", type: "epic" },
  { name: "Feni", image: "feni.jpg", type: "epic" },
  { name: "Regie", image: "regie.jpg", type: "rare" },
  { name: "Trisha", image: "trisha.jpg", type: "rare" },
  { name: "Fritzy", image: "fritzy.jpg", type: "common" },
  { name: "Nala", image: "nala.jpg", type: "common" },
  { name: "Liliy", image: "lily.jpg", type: "common" },
  { name: "Marsha", image: "marsha.jpg", type: "rare" },
  { name: "Indah", image: "indah.jpg", type: "common" },
  { name: "Michie", image: "michie.jpg", type: "epic" },
  { name: "Anindya", image: "anindya.jpg", type: "rare" }
];

const probabilities = {
  common: 50,
  rare: 30,
  epic: 15,
  legendary: 5
};

function getRandomType() {
  const rand = Math.random() * 100;
  if (rand < probabilities.legendary) return 'legendary';
  if (rand < probabilities.legendary + probabilities.epic) return 'epic';
  if (rand < probabilities.legendary + probabilities.epic + probabilities.rare) return 'rare';
  return 'common';
}

function cekOshi() {
  const name = document.getElementById('username').value.trim();
  if (!name) {
    alert("Masukkan namamu dulu!");
    return;
  }

  const todayKey = getTodayKey();
  const storedData = JSON.parse(localStorage.getItem("cekOshiData")) || {};
  const lastDate = storedData.date;
  let count = storedData.count || 0;

  // Reset jika sudah hari baru
  if (lastDate !== todayKey) {
    count = 0;
  }

  if (count >= 5) {
    alert("Kamu sudah mencapai batas 5 kali cek hari ini. Coba lagi besok ya!");
    return;
  }

  // Proses random oshi
  const tipe = getRandomType();
  const kandidat = oshis.filter(o => o.type.toLowerCase() === tipe);
  if (kandidat.length === 0) {
    alert("Tidak ada oshi dengan tipe " + tipe + ". Periksa daftar oshi kamu.");
    return;
  }

  const oshi = kandidat[Math.floor(Math.random() * kandidat.length)];
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = `
    <div class="result-card ${tipe}">
      <h2>Halo, ${name}!</h2>
      <p>Kamu mendapatkan:</p>
      <h3>${oshi.name}</h3>
      <div class="oshi-wrapper">
        <img src="${oshi.image}" alt="${oshi.name}">
        <div class="type ${tipe}">Tipe: ${tipe.charAt(0).toUpperCase() + tipe.slice(1)}</div>
      </div>
      <p style="margin-top:10px; font-size:14px;">Kesempatan tersisa hari ini: ${4 - count}</p>
    </div>
  `;

  // Simpan data baru
  localStorage.setItem("cekOshiData", JSON.stringify({ date: todayKey, count: count + 1 }));
}