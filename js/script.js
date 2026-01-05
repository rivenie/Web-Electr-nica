// Carrusel
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  let currentSlide = 0;

  function showSlide(index) {
    // Ocultar todas las diapositivas
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Desactivar todos los puntos
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Mostrar la diapositiva actual
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  // Cambiar diapositiva al hacer clic en los puntos
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Cambiar automáticamente cada 5 segundos
  setInterval(() => {
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
  }, 5000);

  // Acordeón Misión/Visión
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;

      // Cerrar todos los demás acordeones
      document.querySelectorAll(".accordion-item").forEach((item) => {
        if (item !== accordionItem) {
          item.classList.remove("active");
        }
      });

      // Alternar el acordeón actual
      accordionItem.classList.toggle("active");
    });
  });

  // Formulario de contacto
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Aquí normalmente enviarías el formulario a un servidor
      // Por ahora solo mostramos un mensaje
      alert(
        "Formulario enviado correctamente. Nos pondremos en contacto pronto."
      );

      // Limpiar el formulario
      contactForm.reset();
    });
  }

  // Menú responsive
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn && navMenu) {
    // Alternar menú en móvil
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-menu");
      navMenu.classList.toggle("show");
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("mobile-menu")) {
          navMenu.classList.remove("show");
        }
      });
    });

    // Mostrar/ocultar menú según el tamaño de pantalla
    function handleResponsiveMenu() {
      if (window.innerWidth <= 768) {
        if (!navMenu.classList.contains("mobile-menu")) {
          navMenu.classList.add("mobile-menu");
        }
      } else {
        navMenu.classList.remove("mobile-menu");
        navMenu.classList.remove("show");
      }
    }

    // Ejecutar al cargar y al redimensionar
    handleResponsiveMenu();
    window.addEventListener("resize", handleResponsiveMenu);
  }

  /*Carrusel Marcas */
  /* Carrusel Marcas */
  const carouselTrack = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  // Usar los slides que YA EXISTEN en el HTML
  const brandSlides  = document.querySelectorAll(".brand-slide");
  let currentIndex = 0;
  const visibleSlides = 4;

  function updateCarousel() {
    if (brandSlides .length > 0) {
      const slideWidth = brandSlides [0].offsetWidth + 30; // 30px de gap
      const newTransform = -currentIndex * slideWidth;
      carouselTrack.style.transform = `translateX(${newTransform}px)`;
    }
  }

  function nextSlide() {
    if (currentIndex < brandSlides .length - visibleSlides) {
      currentIndex++;
    } else {
      currentIndex = 0; // Volver al inicio
    }
    updateCarousel();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = brandSlides .length - visibleSlides; // Ir al final
    }
    updateCarousel();
  }

  // Event listeners
  if (nextButton) nextButton.addEventListener("click", nextSlide);
  if (prevButton) prevButton.addEventListener("click", prevSlide);

  // Auto slide cada 3 segundos
  let autoSlide;
  if (brandSlides .length > 0) {
    autoSlide = setInterval(nextSlide, 3000);

    // Pausar auto slide al interactuar
    carouselTrack.addEventListener("mouseenter", () =>
      clearInterval(autoSlide)
    );
    carouselTrack.addEventListener("mouseleave", () => {
      autoSlide = setInterval(nextSlide, 3000);
    });
  }

  // Inicializar
  updateCarousel();

  // Ajustar al cambiar tamaño de ventana
  window.addEventListener("resize", updateCarousel);
});
