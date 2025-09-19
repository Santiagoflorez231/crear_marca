// JavaScript para la landing page

// Función que se ejecuta cuando el DOM está listo
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Landing page cargada correctamente");

  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initScrollAnimations();
  initActiveNavigation();
  initCarousel();
  initTeamMembers();
  initBusinessModelModal();
  initCompetenciasExpandibles();
});

function initCarousel() {
  const carousel = document.getElementById("services-carousel");
  if (!carousel) return;

  const items = carousel.querySelectorAll(".carousel-item");
  const indicators = carousel.querySelectorAll(".carousel-indicator");
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");

  let currentIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add("active");
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      } else {
        item.classList.remove("active");
        item.style.opacity = "0";
        item.style.transform =
          i < index ? "translateX(-100%)" : "translateX(100%)";
      }
    });

    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active");
        indicator.classList.remove("bg-white/30");
        indicator.classList.add("bg-white/50");
      } else {
        indicator.classList.remove("active");
        indicator.classList.remove("bg-white/50");
        indicator.classList.add("bg-white/30");
      }
    });

    currentIndex = index;
  }

  function nextSlide() {
    const next = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    showSlide(next);
  }

  function prevSlide() {
    const prev = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    showSlide(prev);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      resetAutoSlide();
    });
  });

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

  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  showSlide(0);
  startAutoSlide();

  let startX = null;
  let startY = null;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  carousel.addEventListener("touchend", (e) => {
    if (!startX || !startY) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = startX - endX;
    const deltaY = startY - endY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          nextSlide(); 
        } else {
          prevSlide(); 
        }
        resetAutoSlide();
      }
    }

    startX = null;
    startY = null;
  });
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; 

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showNotification("Por favor, completa todos los campos", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Por favor, introduce un email válido", "error");
        return;
      }

      showLoader();

      setTimeout(() => {
        hideLoader();
        showNotification(
          "¡Mensaje enviado correctamente! Te contactaremos pronto.",
          "success"
        );
        contactForm.reset();
      }, 2000);
    });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;

  switch (type) {
    case "success":
      notification.classList.add("bg-green-500", "text-white");
      break;
    case "error":
      notification.classList.add("bg-red-500", "text-white");
      break;
    default:
      notification.classList.add("bg-blue-500", "text-white");
  }

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

function showLoader() {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  loader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loader);
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.remove();
  }
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(".bg-white, h2, h3");
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
}

function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("nav-active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("nav-active");
      }
    });
  });
}

// Función para cambiar el tema (modo oscuro/claro)
function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Cargar tema guardado
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
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
window.addEventListener(
  "resize",
  debounce(() => {
    // Aquí puedes agregar lógica para manejar el redimensionamiento
    console.log("Ventana redimensionada");
  }, 250)
);

// Manejar errores globales
window.addEventListener("error", (e) => {
  console.error("Error capturado:", e.error);
  // Aquí podrías enviar errores a un servicio de monitoreo
});

// Exportar funciones para uso global si es necesario
// Función para manejar la interactividad de los integrantes del equipo
function initTeamMembers() {
  const teamMembers = document.querySelectorAll(".team-member");
  const modal = document.getElementById("team-modal");
  const closeModal = document.getElementById("close-modal");

  // Datos de los integrantes del equipo
  const teamData = [
    {
      id: 1,
      name: "Sara Yulitza Bedoya Niño",
      role: "Gerente General",
      image: "assets/images/sara.jpg",
      bio: `<p>Directiva con experiencia consolidada en liderazgo organizacional, formulación de estrategias y coordinación de equipos de alto rendimiento. Orientada a la obtención de resultados y al cumplimiento de metas, se caracteriza por su capacidad para tomar decisiones estratégicas, optimizar recursos y dirigir procesos que fortalecen la productividad empresarial.</p>
                  <p>Posee competencias analíticas, habilidades interpersonales y gran adaptabilidad frente a entornos exigentes, con un manejo avanzado de herramientas ofimáticas.</p>
                  <h4 class="font-bold mt-4 mb-2">Competencias</h4>
                  <ul class="list-disc pl-5 mb-3">
                      <li>Conducción y liderazgo de equipos</li>
                      <li>Diseño e implementación de estrategias</li>
                      <li>Comunicación clara y asertiva</li>
                      <li>Gestión de decisiones clave</li>
                  </ul>
                  <h4 class="font-bold mt-4 mb-2">Valores Personales</h4>
                  <ul class="list-disc pl-5">
                      <li>Integridad y ética profesional</li>
                      <li>Responsabilidad y compromiso</li>
                      <li>Visión a largo plazo</li>
                      <li>Colaboración activa</li>
                      <li>Innovación y proactividad</li>
                  </ul>`,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 2,
      name: "Emmanuel Duque",
      role: "Gerente de Marketing",
      image: "assets/images/emmanuel.jpg",
      bio: `<p>Profesional creativo y orientado al crecimiento empresarial, con experiencia en la construcción y dirección de planes de marketing que fortalecen la visibilidad y posicionamiento de marcas. Cuenta con capacidad para liderar equipos, identificar oportunidades de mercado y gestionar campañas publicitarias integrales.</p>
        <p>Se distingue por su enfoque en la innovación, la satisfacción del cliente y el logro de objetivos comerciales, con un sólido dominio de herramientas digitales y tecnológicas.</p>
        <h4 class="font-bold mt-4 mb-2">Competencias</h4>
        <ul class="list-disc pl-5 mb-3">
            <li>Estrategia y dirección de marketing</li>
            <li>Marketing digital y gestión de redes</li>
            <li>Análisis de consumidores y tendencias</li>
            <li>Gestión por resultados y visión analítica</li>
            <li>Coordinación de equipos de trabajo</li>
        </ul>
        <h4 class="font-bold mt-4 mb-2">Valores Personales</h4>
        <ul class="list-disc pl-5">
            <li>Proactividad enfocada en logros</li>
            <li>Capacidad de adaptación y aprendizaje continuo</li>
            <li>Trabajo en equipo con liderazgo positivo</li>
            <li>Creatividad constante</li>
            <li>Ética y orientación al cliente</li>
        </ul>`,
      color: "from-blue-500 to-blue-600",
    },

    {
      id: 3,
      name: "Sebastián Lopera",
      role: "Líder de Talento Humano",
      image: "assets/images/sebastian.jpg",
      bio: `<p>Especialista en gestión de personas con experiencia en el diseño e implementación de políticas que impulsan el desarrollo profesional, la motivación y el compromiso del talento humano. Se caracteriza por su visión estratégica, liderazgo cercano y capacidad de comunicación efectiva para generar una cultura organizacional sólida.</p>
        <p>Maneja con eficiencia el cambio, promueve la diversidad y utiliza herramientas tecnológicas para potenciar la gestión de recursos humanos.</p>
        <h4 class="font-bold mt-4 mb-2">Competencias</h4>
        <ul class="list-disc pl-5 mb-3">
            <li>Liderazgo en gestión de personas</li>
            <li>Resolución de conflictos y negociación</li>
            <li>Diseño y ejecución de planes de desarrollo organizacional</li>
            <li>Administración de talento y planificación estratégica</li>
            <li>Promoción de inclusión y diversidad</li>
        </ul>
        <h4 class="font-bold mt-4 mb-2">Valores Personales</h4>
        <ul class="list-disc pl-5">
            <li>Confidencialidad y ética profesional</li>
            <li>Orientación al servicio con proactividad</li>
            <li>Trabajo colaborativo con liderazgo inclusivo</li>
            <li>Flexibilidad y adaptación al cambio</li>
        </ul>`,
      color: "from-gray-500 to-gray-600",
    },
  ];

  if (!teamMembers.length || !modal) return;

  function openMemberModal(memberId) {
    const member = teamData.find((m) => m.id === parseInt(memberId));

    if (!member) return;

    document.getElementById("modal-name").textContent = member.name;
    document.getElementById("modal-role").textContent = member.role;
    document.getElementById("modal-bio").innerHTML = member.bio;

    const avatar = document.getElementById("modal-avatar");
    avatar.innerHTML = `<img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover">`;

    const isMobile = window.innerWidth < 640;
    document.getElementById("modal-header").className = `bg-gradient-to-r ${
      member.color
    } ${isMobile ? "h-24" : "h-32"} flex items-end ${isMobile ? "p-4" : "p-6"}`;

    modal.classList.remove("opacity-0", "pointer-events-none");
    const modalContent = modal.querySelector("div");
    modalContent.classList.remove("scale-90");
    modalContent.classList.add("scale-100");

    modal.scrollTop = 0;

    // Prevenir scroll del fondo
    document.body.classList.add("modal-open");
  }

  function closeModalFunction() {
    const modalContent = modal.querySelector("div");
    modalContent.classList.remove("scale-100");
    modalContent.classList.add("scale-90");

    modal.classList.add("opacity-0");

    setTimeout(() => {
      modal.classList.add("pointer-events-none");
      document.body.classList.remove("modal-open");
    }, 300);
  }

  // Añadir event listener a cada integrante
  teamMembers.forEach((member) => {
    member.addEventListener("click", function () {
      const memberId = this.getAttribute("data-member-id");
      if (memberId) openMemberModal(memberId);
    });
  });

  // Evento para cerrar el modal con el botón
  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunction);
  }

  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener("click", function (e) {
    if (e.target === this) closeModalFunction();
  });
}

// Inicializar modal para modelo de negocios
function initBusinessModelModal() {
  const showModalButton = document.getElementById("show-business-model");
  const modal = document.getElementById("business-model-modal");
  const closeButtons = modal ? modal.querySelectorAll(".close-modal") : [];

  if (showModalButton && modal) {
    // Abrir modal
    showModalButton.addEventListener("click", () => {
      modal.classList.remove("hidden");
      // Prevenir scroll del fondo
      document.body.classList.add("modal-open");
    });

    // Cerrar modal con botones
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-open");
      });
    });

    // Cerrar modal haciendo clic fuera de ella
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-open");
      }
    });

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-open");
      }
    });
  }
}

// Función para manejar competencias expandibles
function initCompetenciasExpandibles() {
  const botonesExpandir = document.querySelectorAll('.btn-expandir');
  
  botonesExpandir.forEach(boton => {
    boton.addEventListener('click', function() {
      const card = this.closest('.competencia-card');
      const textoExpandible = card.querySelector('.texto-expandible');
      const iconoFlecha = this.querySelector('svg');
      const textoBtn = this.querySelector('.texto-btn');
      
      const estaExpandido = textoExpandible.style.maxHeight && textoExpandible.style.maxHeight !== '0px';
      
      if (estaExpandido) {
        // Contraer
        textoExpandible.style.maxHeight = '0px';
        textoExpandible.style.opacity = '0';
        iconoFlecha.style.transform = 'rotate(0deg)';
        textoBtn.textContent = 'Ver más';
      } else {
        // Expandir
        textoExpandible.style.maxHeight = textoExpandible.scrollHeight + 'px';
        textoExpandible.style.opacity = '1';
        iconoFlecha.style.transform = 'rotate(180deg)';
        textoBtn.textContent = 'Ver menos';
      }
    });
  });
}

window.LandingPage = {
  showNotification,
  toggleTheme,
  showLoader,
  hideLoader,
};
