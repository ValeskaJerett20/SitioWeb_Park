
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (!entry.isIntersecting) {
        el.classList.add("fade-out-left");
      } else {
        el.classList.remove("fade-out-left");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
