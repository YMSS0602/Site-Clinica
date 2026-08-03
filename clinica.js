document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  function openSidebar() {
    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  menuBtn.addEventListener("click", openSidebar);
  closeBtn.addEventListener("click", closeSidebar);
  sidebarOverlay.addEventListener("click", closeSidebar);

  // Fechar ao clicar em qualquer link da barra lateral
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", closeSidebar);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });
});