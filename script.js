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
});