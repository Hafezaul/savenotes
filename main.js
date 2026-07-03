// Menyimpan seluruh data
let notes = [];

// =============================
// Load Data Catatan dari JSON
// =============================
async function loadData() {
    try {
        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Gagal mengambil data");
        }

        notes = await response.json();

        sortNotes();

        renderCards(notes);

        document.getElementById("totalNotes").textContent = notes.length;

    } catch (error) {
        console.error(error);
    }
}

// =============================
// Sort berdasarkan tanggal catatan
// =============================
function sortNotes() {
    notes.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
}

// =============================
// Render Cards Catatan
// =============================
function renderCards(data) {

    const container = document.getElementById("notesContainer");
    const emptyState = document.getElementById("emptyState");

    container.textContent = "";

    if (data.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    const fragment = document.createDocumentFragment();

    data.forEach(note => {

        const card = document.createElement("article");

        card.className =
            "bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] transition duration-200 hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[14px_14px_0_0_#000]";

        // Judul
        const title = document.createElement("h2");
        title.className = "text-2xl mb-4";
        title.textContent = note.judul;

        // Badge
        const badge = document.createElement("span");
        badge.className =
            "inline-block bg-yellow-300 border-4 border-black px-3 py-1 mb-4";
        badge.textContent = note.kategori;

        // Tanggal
        const date = document.createElement("p");
        date.className = "mb-3 text-sm";
        date.textContent = note.tanggal;

        // Deskripsi
        const desc = document.createElement("p");
        desc.className = "mb-6";
        desc.textContent = note.deskripsi;

        // Tombol
        const button = document.createElement("a");

        button.href = note.link;
        button.target = "_blank";
        button.rel = "noopener noreferrer";

        button.className =
            "inline-block bg-blue-500 text-white border-4 border-black px-5 py-3 shadow-[5px_5px_0_0_#000] hover:bg-blue-700 hover:-translate-x-1 hover:-translate-y-1 transition";

        button.textContent = "Buka Catatan";

        card.appendChild(title);
        card.appendChild(badge);
        card.appendChild(date);
        card.appendChild(desc);
        card.appendChild(button);

        fragment.appendChild(card);

    });

    container.appendChild(fragment);
}

// =============================
// Search catatan gwh
// =============================
function searchNotes(keyword) {

    const value = keyword.toLowerCase();

    const filtered = notes.filter(note =>

        note.judul.toLowerCase().includes(value) ||
        note.kategori.toLowerCase().includes(value) ||
        note.deskripsi.toLowerCase().includes(value)

    );

    renderCards(filtered);

}

// =============================
// Event
// =============================
document
    .getElementById("searchInput")
    .addEventListener("input", (event) => {

        searchNotes(event.target.value);

    });

// =============================
// Start
// =============================
loadData();