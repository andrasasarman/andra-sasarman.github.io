document.addEventListener("DOMContentLoaded", () => {
    const modals = [
      "modals/modal-ecpp.html",
      "modals/modal-nzc.html",
      "modals/modal-treasurup.html",
      "modals/modal-ecpp-campaign.html",
      "modals/modal-enipau.html"
    ];
  
    const container = document.getElementById("modals-container");
  
    // Încarcă toate modalurile
    Promise.all(modals.map(url => fetch(url).then(res => res.text())))
      .then(htmls => {
        htmls.forEach(html => container.insertAdjacentHTML("beforeend", html));
        setupModals();
      })
      .catch(err => console.error("Error loading modals:", err));
  
    function setupModals() {
      // Deschidere modal
      document.querySelectorAll("[data-modal]").forEach(btn => {
        btn.addEventListener("click", () => {
          const target = document.getElementById(btn.dataset.modal);
          if (target) {
            target.classList.remove("hidden");
            target.classList.add("flex");
          }
        });
      });
  
      // Închidere (pe X sau backdrop)
      document.querySelectorAll("[data-close]").forEach(el => {
        el.addEventListener("click", () => {
          const modal = el.closest(".fixed");
          modal.classList.add("hidden");
          modal.classList.remove("flex");
        });
      });
  
      // Închidere cu ESC
      document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
          document.querySelectorAll(".fixed.flex").forEach(modal => {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
          });
        }
      });
    }
  });
  