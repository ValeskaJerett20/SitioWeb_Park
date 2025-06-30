document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
});

// Transición IMagen 
document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("logo-section");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        target.classList.remove("opacity-0", "-translate-x-10");
      } else {
        // Reinicia al salir de vista
        target.classList.add("opacity-0", "-translate-x-10");
      }
    }, {
      threshold: 0.2
    });

    observer.observe(target);
  });
// end transición imagen


//video display
document.addEventListener("DOMContentLoaded", () => {
    const videoSection = document.getElementById("video-section");
    const videoFrame = document.getElementById("video-frame");
    const originalSrc = videoFrame.getAttribute("src");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // ✨ Animación de entrada
        videoSection.classList.remove("opacity-0", "translate-y-10");

        // ▶️ Autoplay video
        const src = videoFrame.getAttribute("src");
        if (!src.includes("autoplay=1")) {
          videoFrame.setAttribute("src", originalSrc.replace("autoplay=0", "autoplay=1"));
        }
      } else {
        // 🔄 Reset: oculta animación y reinicia video
        videoSection.classList.add("opacity-0", "translate-y-10");
        videoFrame.setAttribute("src", originalSrc);
      }
    }, {
      threshold: 0.5,
    });

    observer.observe(videoSection);
  });

  //Animacion del texto, debajo del video
  
  document.addEventListener("DOMContentLoaded", () => {
    const funcionaSection = document.getElementById("funciona-section");
    const boton = document.getElementById("boton-nosotros");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        funcionaSection.classList.remove("opacity-0", "translate-y-10");

        // ✨ Agrega animación al botón (una sola vez)
        boton.classList.add("animate-pulse-smooth");

        // Opcional: remueve animación después de 1s para que no se repita
        setTimeout(() => {
          boton.classList.remove("animate-pulse-smooth");
        }, 1000);
      } else {
        funcionaSection.classList.add("opacity-0", "translate-y-10");
      }
    }, {
      threshold: 0.5,
    });

    observer.observe(funcionaSection);
  });




const titleText = `CONECTIVIDAD,\nCONTROL Y COBRO\nEN UNA SOLA\nSOLUCIÓN`;
  const paragraphText = `EN PARK, NOS MUEVE LA INNOVACIÓN,\nLA EFICIENCIA Y EL DISEÑO DE HERRAMIENTAS\nQUE HACEN MÁS SIMPLE, SEGURO\nY ORDENADO EL USO DE LOS ESPACIOS.`;

  function typeWriter(element, text, delay = 50, callback) {
    let i = 0;
    element.innerHTML = ""; // <-- Limpia contenido antes de empezar
    function typing() {
      if (i < text.length) {
        element.innerHTML += text[i] === '\n' ? '<br/>' : text[i];
        i++;
        setTimeout(typing, delay);
      } else if (callback) {
        callback();
      }
    }
    typing();
  }

  function animateCycle() {
    const titleEl = document.getElementById("typewriter-title");
    const paraEl = document.getElementById("typewriter-paragraph");

    // Oculta y mueve fuera de vista
    titleEl.classList.add("opacity-0", "translate-x-10");
    paraEl.classList.add("opacity-0", "translate-x-10");

    // Espera a que se apliquen clases y luego inicia
    setTimeout(() => {
      titleEl.classList.remove("opacity-0", "translate-x-10");
      paraEl.classList.remove("opacity-0", "translate-x-10");

      // Limpia contenido justo antes de escribir
      titleEl.innerHTML = "";
      paraEl.innerHTML = "";

      typeWriter(titleEl, titleText, 50, () => {
        typeWriter(paraEl, paragraphText, 30);
      });
    }, 300); // Delay corto para evitar glitch visual
  }

  // Espera 3 segundos al cargar y repite cada 4s
  setTimeout(() => {
    animateCycle();
    setInterval(animateCycle, 12000);
  }, 1000);


//   Sección 2
function setupObserver(id, initialClass, finalClass) {
    const element = document.getElementById(id);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove('opacity-0', initialClass);
      } else {
        element.classList.add('opacity-0', initialClass);
      }
    }, {
      threshold: 0.3,
    });

    observer.observe(element);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupObserver('anim-left', '-translate-x-10');
    setupObserver('anim-right', 'translate-x-10');
  });

