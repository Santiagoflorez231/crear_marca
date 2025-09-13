// JavaScript para la landing page

// Función que se ejecuta cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Landing page cargada correctamente');
    
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initActiveNavigation();
    initCarousel(); 
    initTeamMembers(); 
    initBusinessModelModal(); 
});

function initCarousel() {
    const carousel = document.getElementById('services-carousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.carousel-indicator');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Función para mostrar slide específico
    function showSlide(index) {
        // Ocultar todos los slides
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            } else {
                item.classList.remove('active');
                item.style.opacity = '0';
                item.style.transform = i < index ? 'translateX(-100%)' : 'translateX(100%)';
            }
        });
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
                indicator.classList.remove('bg-white/30');
                indicator.classList.add('bg-white/50');
            } else {
                indicator.classList.remove('active');
                indicator.classList.remove('bg-white/50');
                indicator.classList.add('bg-white/30');
            }
        });
        
        currentIndex = index;
    }
    
    // Función para ir al siguiente slide
    function nextSlide() {
        const next = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
        showSlide(next);
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        const prev = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        showSlide(prev);
    }
    
    // Event listeners para botones de navegación
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });
    
    // Auto-slide cada 5 segundos
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Pausar auto-slide al hacer hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Inicializar
    showSlide(0);
    startAutoSlide();
    
    // Soporte para swipe en móviles
    let startX = null;
    let startY = null;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Solo procesar swipe horizontal si es mayor que vertical
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > 50) { // Mínimo 50px para activar swipe
                if (deltaX > 0) {
                    nextSlide(); // Swipe left -> next
                } else {
                    prevSlide(); // Swipe right -> prev
                }
                resetAutoSlide();
            }
        }
        
        startX = null;
        startY = null;
    });
}

// Menú móvil
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Cerrar menú al hacer click en un enlace
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Navegación suave
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para el header fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación básica
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, introduce un email válido', 'error');
                return;
            }
            
            // Simular envío del formulario
            showLoader();
            
            setTimeout(() => {
                hideLoader();
                showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Remover notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    // Estilos según el tipo
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Mostrar loader
function showLoader() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loader);
}

// Ocultar loader
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.bg-white, h2, h3');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Navegación activa según scroll
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-active');
            }
        });
    });
}

// Función para cambiar el tema (modo oscuro/claro)
function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Cargar tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
}

// Función utilitaria para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Manejar redimensionamiento de ventana
window.addEventListener('resize', debounce(() => {
    // Aquí puedes agregar lógica para manejar el redimensionamiento
    console.log('Ventana redimensionada');
}, 250));

// Manejar errores globales
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
    // Aquí podrías enviar errores a un servicio de monitoreo
});

// Exportar funciones para uso global si es necesario
// Función para manejar la interactividad de los integrantes del equipo
function initTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    const modal = document.getElementById('team-modal');
    const closeModal = document.getElementById('close-modal');
    
    // Datos de los integrantes del equipo
    const teamData = [
        {
            id: 1,
            name: "Sara Yulitza Bedoya Niño",
            role: "Directora General",
            image: "/assets/images/sara.jpg",
            bio: `<p>Con más de 15 años de experiencia en gestión de recursos humanos, Ana lidera Núcleo RH con una visión innovadora y enfocada en resultados.</p>
                  <p>Su expertise en transformación organizacional ha sido clave para posicionar a Núcleo RH como referente en el sector de gestión de talento humano.</p>`,
            color: "from-yellow-500 to-yellow-600"
        },
        {
            id: 2,
            name: "Emmanuel Duque Velilla",
            role: "Director de Operaciones",
            image: "/assets/images/emmanuel.jpg",
            bio: `<p>Emmanuel es responsable de desarrollar e implementar estrategias operativas que garantizan la eficiencia de nuestros procesos.</p>
                  <p>Su capacidad para optimizar recursos y mejorar la calidad de servicio ha sido fundamental para el crecimiento sostenido de Núcleo RH.</p>`,
            color: "from-gray-500 to-gray-600"
        },
        {
            id: 3,
            name: "Sebastián Lópera tejada",
            role: "Director de Talento",
            image: "/assets/images/sebastian.jpg",
            bio: `<p>Laura lidera el equipo de reclutamiento y selección con un enfoque estratégico y orientado a las personas.</p>
                  <p>Su profundo conocimiento del mercado laboral y su capacidad para identificar talento excepcional hacen de ella una pieza fundamental en nuestro equipo directivo.</p>`,
            color: "from-yellow-500 to-yellow-600"
        }
    ];
    
    if (!teamMembers.length || !modal) return;
    
    function openMemberModal(memberId) {
        const member = teamData.find(m => m.id === parseInt(memberId));
        
        if (!member) return;
        
        document.getElementById('modal-name').textContent = member.name;
        document.getElementById('modal-role').textContent = member.role;
        document.getElementById('modal-bio').innerHTML = member.bio;
        
        const avatar = document.getElementById('modal-avatar');
        avatar.innerHTML = `<img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover">`;
        
        const isMobile = window.innerWidth < 640;
        document.getElementById('modal-header').className = `bg-gradient-to-r ${member.color} ${isMobile ? 'h-24' : 'h-32'} flex items-end ${isMobile ? 'p-4' : 'p-6'}`;
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        const modalContent = modal.querySelector('div');
        modalContent.classList.remove('scale-90');
        modalContent.classList.add('scale-100');
        
        modal.scrollTop = 0;
        
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFunction() {
        const modalContent = modal.querySelector('div');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-90');
        
        modal.classList.add('opacity-0');
        
        // Esperar a que termine la animación antes de deshabilitar completamente el modal
        setTimeout(() => {
            modal.classList.add('pointer-events-none');
            // Restaurar scroll en el body
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Añadir event listener a cada integrante
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member-id');
            if (memberId) openMemberModal(memberId);
        });
    });
    
    // Evento para cerrar el modal con el botón
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === this) closeModalFunction();
    });
}

// Inicializar modal para modelo de negocios
function initBusinessModelModal() {
    const showModalButton = document.getElementById('show-business-model');
    const modal = document.getElementById('business-model-modal');
    const closeButtons = modal ? modal.querySelectorAll('.close-modal') : [];
    
    if (showModalButton && modal) {
        // Abrir modal
        showModalButton.addEventListener('click', () => {
            modal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden'); // Evitar scroll en el fondo
        });
        
        // Cerrar modal con botones
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
        
        // Cerrar modal haciendo clic fuera de ella
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
        
        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }
}

window.LandingPage = {
    showNotification,
    toggleTheme,
    showLoader,
    hideLoader
};
