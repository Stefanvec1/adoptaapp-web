document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFECTO NAVBAR MODO CLARO PREMIUM
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-active');
            navbar.classList.remove('border-transparent', 'py-5');
            navbar.classList.add('py-3');
        } else {
            navbar.classList.remove('nav-active', 'py-3');
            navbar.classList.add('border-transparent', 'py-5');
        }
    });

    // 2. ANIMACIÓN DE REVELADO
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
}); 

// --- SISTEMA DE GALERÍA DINÁMICA Y LIGHTBOX ---

const irudiDatuak = [
    // === ADOPTANTE PC ===
    { rol: 'adoptante', gailua: 'pc', izena: 'Saioa Hasi', src: './capturas/Login/LoginPC.png' },
    { rol: 'adoptante', gailua: 'pc', izena: 'Erregistroa', src: './capturas/Registro/RegistroPC.png' },
    { rol: 'adoptante', gailua: 'pc', izena: 'Esploratu (Menu Nagusia)', src: './capturas/Adoptante/PC/AdoptatzailePage.png' },
    { rol: 'adoptante', gailua: 'pc', izena: 'Animaliaren Fitxa', src: './capturas/Adoptante/PC/AnimaliInfoPage.png' },
    { rol: 'adoptante', gailua: 'pc', izena: 'Nire Gogokoak', src: './capturas/Adoptante/PC/GogokoakPage.png' },
    { rol: 'adoptante', gailua: 'pc', izena: 'Nire Hitzorduak', src: './capturas/Adoptante/PC/HitzorduPage.png' },
    { rol: 'adoptante', gailua: 'pc', izena: 'Babeslekuaren Profila', src: './capturas/Adoptante/PC/IkusiProtektoraAnimaliPage.png' },
    { rol: 'adoptante', gailua: 'pc', izena: 'Nire Profila', src: './capturas/Adoptante/PC/ProfilaIkusiPage.png' },
    { rol: 'adoptante', gailua: 'pc', izena: 'Txat Zerrenda', src: './capturas/Adoptante/PC/TxatenZerrendaPage.png' },
    { rol: 'adoptante', gailua: 'pc', izena: 'Txat Gela', src: './capturas/Adoptante/PC/TxatenGela.png' },

    // === ADOPTANTE MÓVIL ===
    { rol: 'adoptante', gailua: 'movil', izena: 'Saioa Hasi', src: './capturas/Login/LoginPageMovil.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Erregistroa', src: './capturas/Registro/ErregistroMovil.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Menu Nagusia', src: './capturas/Adoptante/AdoptanteMovil/MenuPage.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Animaliaren Fitxa 1', src: './capturas/Adoptante/AdoptanteMovil/AnimaliFitxaPage.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Animaliaren Fitxa 2', src: './capturas/Adoptante/AdoptanteMovil/AnimaliFitxaPage2.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Nire Gogokoak', src: './capturas/Adoptante/AdoptanteMovil/GogokoakPage.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Hitzorduak', src: './capturas/Adoptante/AdoptanteMovil/NireHitzorduPage.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Babeslekuaren Profila', src: './capturas/Adoptante/AdoptanteMovil/IkusiBesteAnimaliPage.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Nire Profila', src: './capturas/Adoptante/AdoptanteMovil/IkusiProfilaPage.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Txat Zerrenda', src: './capturas/Adoptante/AdoptanteMovil/TxatZerrendaPage.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Txat Gela', src: './capturas/Adoptante/AdoptanteMovil/TxatGelaPage.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Ezarpenak 1', src: './capturas/Adoptante/AdoptanteMovil/EzarpenPage.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Ezarpenak 2', src: './capturas/Adoptante/AdoptanteMovil/EzarpenPage2.jpg' },
    { rol: 'adoptante', gailua: 'movil', izena: 'Babeslekuak Ikusi', src: './capturas/Adoptante/AdoptanteMovil/ProtektoraPage.jpg' },

    // === PROTEKTORA PC ===
    { rol: 'protektora', gailua: 'pc', izena: 'Saioa Hasi', src: './capturas/Login/LoginPC.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Panela (Estatistikak)', src: './capturas/Protektora/PC/ProtektoraPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Animaliak Kudeatu', src: './capturas/Protektora/PC/NireAnimaliakPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Animalia Berria Igo', src: './capturas/Protektora/PC/AnimaliIgoPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Animalia Editatu', src: './capturas/Protektora/PC/AnimaliEditatuPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Final Zoriontsuak (Adoptatuak)', src: './capturas/Protektora/PC/AdoptatuakPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Egutegia', src: './capturas/Protektora/PC/EgutegiaPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Txat Zerrenda', src: './capturas/Protektora/PC/TxatZerrendaPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Txat Gela', src: './capturas/Protektora/PC/TxatGelaPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Ezarpenak 1', src: './capturas/Protektora/PC/EzarpenakPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Ezarpenak 2', src: './capturas/Protektora/PC/EzarpenakPage2.png' },

    // === PROTEKTORA MÓVIL ===
    { rol: 'protektora', gailua: 'movil', izena: 'Saioa Hasi', src: './capturas/Login/LoginPageMovil.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Panela', src: './capturas/Protektora/PC/BabeslekuaMovil/ProtektoraPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Menu Nagusia', src: './capturas/Protektora/PC/BabeslekuaMovil/MenuPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Animaliak Kudeatu', src: './capturas/Protektora/PC/BabeslekuaMovil/NireAnimaliPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Animalia Igo', src: './capturas/Protektora/PC/BabeslekuaMovil/AnimaliIgoPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Animalia Editatu 1', src: './capturas/Protektora/PC/BabeslekuaMovil/AnimaliEditatuPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Animalia Editatu 2', src: './capturas/Protektora/PC/BabeslekuaMovil/AnimaliEditatuPage2.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Adoptatuak', src: './capturas/Protektora/PC/BabeslekuaMovil/AnimaliAdoptatuakPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Egutegia', src: './capturas/Protektora/PC/BabeslekuaMovil/EgutegiPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Txat Zerrenda', src: './capturas/Protektora/PC/BabeslekuaMovil/TxatZerrendaPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Txat Gela', src: './capturas/Protektora/PC/BabeslekuaMovil/TxatGelaPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Ezarpenak 1', src: './capturas/Protektora/PC/BabeslekuaMovil/EzarpenPage.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Ezarpenak 2', src: './capturas/Protektora/PC/BabeslekuaMovil/EzarpenPage2.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Ezarpenak 3', src: './capturas/Protektora/PC/BabeslekuaMovil/EzarpenPage3.jpg' },
    { rol: 'protektora', gailua: 'movil', izena: 'Ezarpenak 4', src: './capturas/Protektora/PC/BabeslekuaMovil/EzarpenPage4.jpg' }
];

let unekoArgazkiak = [];
let unekoIndizea = 0;

window.kargatuGaleria = function(rol, gailua) {
    const galeriaSeccion = document.getElementById('galeria');
    const galeriaGrid = document.getElementById('galeria-grid');
    const titulua = document.getElementById('galeria-titulua');
    const azpititulua = document.getElementById('galeria-azpititulua');

    const izenRola = rol === 'adoptante' ? 'Adoptatzailea' : 'Babeslekua / Elkartea';
    titulua.innerText = izenRola;
    azpititulua.innerText = gailua === 'pc' ? 'Windows (PC) Bertsioa' : 'Android (Mugikorra) Bertsioa';

    galeriaGrid.innerHTML = '';

    unekoArgazkiak = irudiDatuak.filter(img => img.rol === rol && img.gailua === gailua);

    unekoArgazkiak.forEach((img, index) => {
        // En móvil, la tarjeta será más alta y estrecha (aspect ratio distinto)
        const aspectClass = gailua === 'movil' ? 'aspect-[9/16]' : 'aspect-video';
        
        const html = `
            <div class="tilt-card rounded-2xl overflow-hidden border border-slate-200 group bg-white cursor-pointer shadow-sm hover:shadow-md transition-shadow" onclick="irekiLightbox(${index})">
                <div class="overflow-hidden ${aspectClass} relative flex justify-center items-center bg-slate-50">
                    <div class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <i class="fa-solid fa-magnifying-glass-plus text-white text-4xl transform scale-50 group-hover:scale-100 transition-transform duration-300"></i>
                    </div>
                    <img src="${img.src}" alt="${img.izena}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform relative z-0" onerror="this.src='./AdoptappLogo.jpg'">
                </div>
                <div class="p-4 border-t border-slate-100">
                    <h3 class="text-slate-800 font-bold text-lg text-center">${img.izena}</h3>
                </div>
            </div>
        `;
        galeriaGrid.innerHTML += html;
    });

    galeriaSeccion.classList.remove('hidden');
    setTimeout(() => { galeriaSeccion.scrollIntoView({ behavior: 'smooth' }); }, 100);
};

window.irekiLightbox = function(index) {
    unekoIndizea = index;
    eguneratuLightboxArgazkia();
    
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    
    lb.classList.remove('hidden');
    setTimeout(() => {
        lb.classList.remove('opacity-0');
        img.classList.remove('scale-95');
        img.classList.add('scale-100');
    }, 10);
    
    document.body.style.overflow = 'hidden'; 
};

window.itxiLightbox = function() {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    
    lb.classList.add('opacity-0');
    img.classList.remove('scale-100');
    img.classList.add('scale-95');
    
    setTimeout(() => {
        lb.classList.add('hidden');
    }, 300);
    
    document.body.style.overflow = 'auto'; 
};

window.aldatuArgazkia = function(norabidea) {
    unekoIndizea += norabidea;
    if (unekoIndizea < 0) unekoIndizea = unekoArgazkiak.length - 1;
    if (unekoIndizea >= unekoArgazkiak.length) unekoIndizea = 0;
    
    eguneratuLightboxArgazkia();
};

function eguneratuLightboxArgazkia() {
    const imgElement = document.getElementById('lightbox-img');
    const textElement = document.getElementById('lightbox-text');
    const argazkia = unekoArgazkiak[unekoIndizea];
    
    imgElement.src = argazkia.src;
    textElement.innerText = argazkia.izena;
}

document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('hidden')) {
        if (e.key === 'Escape') itxiLightbox();
        else if (e.key === 'ArrowRight') aldatuArgazkia(1);
        else if (e.key === 'ArrowLeft') aldatuArgazkia(-1);
    }
});
