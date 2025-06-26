document.getElementById('valpo-btn').onclick = () => {
  document.getElementById('valpo').dispatchEvent(new Event('mouseenter'));
}
document.addEventListener("DOMContentLoaded", () => {
  // Lógica del formulario
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // evita que se recargue la página
      alert("Gracias por tu mensaje. Nos contactaremos contigo en breve.");
      form.reset(); // limpia el formulario
    });
  }

  // Lógica del menú mobile
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});