/**
 * WhatsApp Floating Button Widget
 * M.G.N CodeWave - 2026
 */

(function () {
  "use strict";

  // Configuration
  const config = {
    phoneNumber: "24166198918",
    message: "Bonjour, je souhaite discuter d'un projet web",
    position: "bottom-right", // bottom-right, bottom-left
    backgroundColor: "#25D366",
    size: "60px",
    bottomOffset: "110px", // Décalé pour éviter le bouton Back to Top
    rightOffset: "40px",
  };

  // Créer le bouton WhatsApp
  function createWhatsAppButton() {
    const button = document.createElement("a");
    button.href = `https://wa.me/${
      config.phoneNumber
    }?text=${encodeURIComponent(config.message)}`;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.className = "whatsapp-float";
    button.setAttribute("aria-label", "Contactez-nous sur WhatsApp");
    button.innerHTML = '<i class="fab fa-whatsapp"></i>';

    // Styles inline pour assurer la compatibilité
    const styles = `
      position: fixed;
      width: ${config.size};
      height: ${config.size};
      bottom: ${config.bottomOffset};
      ${
        config.position === "bottom-right"
          ? `right: ${config.rightOffset};`
          : `left: ${config.rightOffset};`
      }
      background-color: ${config.backgroundColor};
      color: #FFF;
      border-radius: 50px;
      text-align: center;
      font-size: 30px;
      box-shadow: 2px 2px 15px rgba(0,0,0,0.3);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      text-decoration: none;
    `;

    button.style.cssText = styles;

    // Effet hover
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
      this.style.boxShadow = "2px 2px 20px rgba(0,0,0,0.4)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.boxShadow = "2px 2px 15px rgba(0,0,0,0.3)";
    });

    // Animation d'apparition
    button.style.opacity = "0";
    button.style.transform = "scale(0)";

    document.body.appendChild(button);

    // Animer l'apparition
    setTimeout(() => {
      button.style.transition = "all 0.5s ease";
      button.style.opacity = "1";
      button.style.transform = "scale(1)";
    }, 1000);

    // Masquer/afficher au scroll
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 300) {
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
      } else {
        button.style.opacity = "0";
        button.style.pointerEvents = "none";
      }

      lastScroll = currentScroll;
    });
  }

  // Initialiser quand le DOM est prêt
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createWhatsAppButton);
  } else {
    createWhatsAppButton();
  }
})();
