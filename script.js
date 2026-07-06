// =========================
// ELEMENTOS
// =========================

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


// =========================
// CAMBIO DE IDIOMA
// =========================

document.querySelectorAll(".language-btn").forEach(button => {

    button.addEventListener("click", () => {

        currentLanguage = button.dataset.lang;

        home.classList.remove("active");
        song.classList.add("active");

        renderLyrics();

    });

});


// =========================
// VOLVER AL INICIO
// =========================

backButton.addEventListener("click", () => {

    song.classList.remove("active");
    home.classList.add("active");

});


// =========================
// RENDERIZAR LETRA
// =========================

function renderLyrics(){

    lyricsContainer.innerHTML = "";

    const songData = DATA[currentLanguage];

    songData.lyrics.forEach(stanza=>{

        const div = document.createElement("div");

        div.className = "stanza";

        div.innerHTML = parseAnnotations(stanza);

        lyricsContainer.appendChild(div);

    });

}


// =========================
// DETECTAR [[ANOTACIONES]]
// =========================

function parseAnnotations(text){

    return text.replace(/\[\[(.*?)\]\]/g,function(match,key){

        return `
            <span class="annotation" data-note="${key}">
                ${key}
            </span>
        `;

    });

}


// =========================
// CLICK EN ANOTACIÓN
// =========================

document.addEventListener("click",function(e){

    if(!e.target.classList.contains("annotation")) return;

    const note = e.target.dataset.note;

    const info = DATA[currentLanguage].notes[note];

    if(!info) return;

    sheetTitle.textContent = info.title;
    sheetContent.innerHTML = info.text;

    overlay.classList.add("show");
    bottomSheet.classList.add("show");

});


// =========================
// CERRAR PANEL
// =========================

function closeBottomSheet(){

    overlay.classList.remove("show");
    bottomSheet.classList.remove("show");

}

closeSheet.addEventListener("click",closeBottomSheet);

overlay.addEventListener("click",closeBottomSheet);


// =========================
// DESLIZAR PARA CERRAR
// =========================

let startY = 0;

bottomSheet.addEventListener("touchstart",(e)=>{

    startY = e.touches[0].clientY;

});

bottomSheet.addEventListener("touchmove",(e)=>{

    let currentY = e.touches[0].clientY;

    if(currentY-startY>100){

        closeBottomSheet();

    }

});