document.addEventListener("DOMContentLoaded", () => {

    const home = document.getElementById("home");
    const song = document.getElementById("song");
    const lyricsContainer = document.getElementById("lyrics");

    const overlay = document.getElementById("overlay");
    const bottomSheet = document.getElementById("bottomSheet");

    const sheetTitle = document.getElementById("sheetTitle");
    const sheetContent = document.getElementById("sheetContent");

    const closeSheet = document.getElementById("closeSheet");
    const backButton = document.getElementById("backButton");

    let currentLanguage = "val";


    // LANGUAGE CHANGE
    document.querySelectorAll(".language-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            currentLanguage = btn.dataset.lang;

            home.classList.remove("active");
            song.classList.add("active");

            renderLyrics();
        });
    });


    // BACK BUTTON
    backButton.addEventListener("click", () => {
        song.classList.remove("active");
        home.classList.add("active");
    });


    // RENDER LYRICS
    function renderLyrics() {

        lyricsContainer.innerHTML = "";

        const songData = DATA[currentLanguage];

        songData.lyrics.forEach(stanza => {

            const div = document.createElement("div");
            div.className = "stanza";

            div.innerHTML = parseAnnotations(stanza);

            lyricsContainer.appendChild(div);
        });
    }


    // ANNOTATIONS
    function parseAnnotations(text) {
        return text.replace(/\[\[(.*?)\]\]/g, (_, key) => {
            return `<span class="annotation" data-note="${key}">${key}</span>`;
        });
    }


    // CLICK ANNOTATION
    document.addEventListener("click", (e) => {

        if (!e.target.classList.contains("annotation")) return;

        const note = e.target.dataset.note;
        const info = DATA[currentLanguage].notes[note];

        if (!info) return;

        sheetTitle.textContent = info.title;
        sheetContent.innerHTML = info.text;

        overlay.classList.add("show");
        bottomSheet.classList.add("show");
    });


    // CLOSE SHEET
    function closeSheetFn() {
        overlay.classList.remove("show");
        bottomSheet.classList.remove("show");
    }

    closeSheet.addEventListener("click", closeSheetFn);
    overlay.addEventListener("click", closeSheetFn);

});