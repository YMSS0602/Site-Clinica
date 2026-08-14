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

//Sobre nós menu 
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o link do Sobre Nós
    const dropdownTitulo = document.querySelector('.dropdown-titulo');
    
    if (dropdownTitulo) {
        dropdownTitulo.addEventListener('click', function(e) {
            e.preventDefault(); 
        });
    }
});

    function abrirModal() {
      document.getElementById('modalAgendamento').style.display = 'flex';
    }

    function fecharModal() {
      document.getElementById('modalAgendamento').style.display = 'none';
    }

    window.onclick = function(event) {
      const modal = document.getElementById('modalAgendamento');
      if (event.target === modal) {
        fecharModal();
      }
    };

    function enviarParaWhatsApp(event) {
      event.preventDefault();

      const numeroWhatsApp = "5573981394240";

      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;
      const assunto = document.getElementById('assunto').value;
      const mensagem = document.getElementById('mensagem').value;

      const textoMensagem = `*Novo Agendamento/Contato via Site*%0A%0A` +
        `*Nome:* ${nome}%0A` +
        `*E-mail:* ${email}%0A` +
        `*Telefone:* ${telefone}%0A` +
        `*Assunto:* ${assunto}%0A%0A` +
        `*Mensagem:*%0A${mensagem}`;

      const url = `https://wa.me/${numeroWhatsApp}?text=${textoMensagem}`;
      window.open(url, '_blank');

      fecharModal();
    }


  document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navContent = document.getElementById('navContent');

    if (hamburgerBtn && navContent) {
      hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navContent.classList.toggle('active');
      });

      // Fecha o menu ao clicar em qualquer link (incluindo o linktree)
      const navLinks = document.querySelectorAll('.nav-link, .btn-agendar');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburgerBtn.classList.remove('active');
          navContent.classList.remove('active');
        });
      });
    } else {
      console.error('Elementos do menu hambúrguer não foram encontrados no DOM.');
    }
});
