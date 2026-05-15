document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFECTO NAVBAR MODO CLARO
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'border-slate-200', 'shadow-sm', 'py-3');
            navbar.classList.remove('border-transparent', 'py-5');
        } else {
            navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'border-slate-200', 'shadow-sm', 'py-3');
            navbar.classList.add('border-transparent', 'py-5');
        }
    });

    // 2. ANIMACIÓN DE REVELADO (Intersection Observer)
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

    // 3. EFECTO INCLINACIÓN 3D
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease"; 
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = "none";
        });
    });
    // --- SISTEMA DE GALERÍA DINÁMICA ---

// Base de datos de imágenes (Rutas según tus capturas)
const irudiDatuak = [
    // --- ADOPTANTE PC ---
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

    // --- PROTEKTORA PC ---
    { rol: 'protektora', gailua: 'pc', izena: 'Saioa Hasi', src: './capturas/Login/LoginPC.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Panela (Estatistikak)', src: './capturas/Protektora/PC/ProtektoraPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Animaliak Kudeatu', src: './capturas/Protektora/PC/NireAnimaliakPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Animalia Berria Igo', src: './capturas/Protektora/PC/AnimaliIgoPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Animalia Editatu', src: './capturas/Protektora/PC/AnimaliaEditatuPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Final Zoriontsuak (Adoptatuak)', src: './capturas/Protektora/PC/AdoptatuakPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Egutegia', src: './capturas/Protektora/PC/EgutegiaPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Txat Zerrenda', src: './capturas/Protektora/PC/TxatZerrendaPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Txat Gela', src: './capturas/Protektora/PC/TxatGelaPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Ezarpenak 1', src: './capturas/Protektora/PC/EzarpenakPage.png' },
    { rol: 'protektora', gailua: 'pc', izena: 'Ezarpenak 2', src: './capturas/Protektora/PC/EzarpenakPage2.png' }
];

// Función que se ejecuta al hacer clic en el menú
window.kargatuGaleria = function(rol, gailua) {
    if(gailua === 'movil') return; // Bloqueado hasta que tengas las fotos de móvil

    const galeriaSeccion = document.getElementById('galeria');
    const galeriaGrid = document.getElementById('galeria-grid');
    const titulua = document.getElementById('galeria-titulua');
    const azpititulua = document.getElementById('galeria-azpititulua');

    // Cambiar los textos
    const izenRola = rol === 'adoptante' ? 'Adoptatzailea' : 'Babeslekua / Elkartea';
    titulua.innerText = izenRola;
    azpititulua.innerText = gailua === 'pc' ? 'Windows (PC) Bertsioa' : 'Android (Mugikorra) Bertsioa';

    // Limpiar fotos anteriores
    galeriaGrid.innerHTML = '';

    // Filtrar fotos que coincidan con lo que ha tocado el usuario
    const argazkiak = irudiDatuak.filter(img => img.rol === rol && img.gailua === gailua);

    // Generar el HTML de las tarjetas para cada foto
    argazkiak.forEach(img => {
        const html = `
            <div class="tilt-card rounded-2xl overflow-hidden border border-white/10 group bg-white/5">
                <div class="overflow-hidden aspect-video">
                    <img src="${img.src}" alt="${img.izena}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                </div>
                <div class="p-4 border-t border-white/10">
                    <h3 class="text-white font-bold text-lg">${img.izena}</h3>
                </div>
            </div>
        `;
        galeriaGrid.innerHTML += html;
    });

    // Mostrar la sección y hacer scroll suave hacia ella
    galeriaSeccion.classList.remove('hidden');
    setTimeout(() => {
        galeriaSeccion.scrollIntoView({ behavior: 'smooth' });
    }, 100);
};
});
