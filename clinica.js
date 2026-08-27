document.addEventListener('DOMContentLoaded', () => {
  // Menu Hambúrguer Unificado
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navContent = document.getElementById('navContent');

  if (hamburgerBtn && navContent) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburgerBtn.classList.toggle('ativo');
      navContent.classList.toggle('ativo');
      hamburgerBtn.classList.toggle('active');
      navContent.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a, .btn-agendar');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('ativo', 'active');
        navContent.classList.remove('ativo', 'active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navContent.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('ativo', 'active');
        navContent.classList.remove('ativo', 'active');
      }
    });
  }

  // Painel de Contatos
  const btnToggleContatos = document.getElementById('btnToggleContatos');
  const btnFecharContatos = document.getElementById('btnFecharContatos');
  const painelContatos = document.getElementById('painelContatos');

  if (btnToggleContatos && painelContatos) {
    btnToggleContatos.addEventListener('click', () => {
      painelContatos.classList.toggle('ativo');
    });
  }
  if (btnFecharContatos && painelContatos) {
    btnFecharContatos.addEventListener('click', () => {
      painelContatos.classList.remove('ativo');
    });
  }

  // Slideshow
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dotsContainer');

  if (slides.length > 0) {
    let currentSlide = 0;

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => gotoSlide(index));
        dotsContainer.appendChild(dot);
      });
    }

    function gotoSlide(index) {
      slides[currentSlide].classList.remove('active');
      const dots = document.querySelectorAll('.dot');
      if (dots.length) dots[currentSlide].classList.remove('active');
      
      currentSlide = index;
      
      slides[currentSlide].classList.add('active');
      if (dots.length) dots[currentSlide].classList.add('active');
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let next = (currentSlide + 1) % slides.length;
        gotoSlide(next);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        gotoSlide(prev);
      });
    }

    setInterval(() => {
      let next = (currentSlide + 1) % slides.length;
      gotoSlide(next);
    }, 5000);
  }
});

// Manipulação do Modal
function abrirModal() {
  const modal = document.getElementById('modalAgendamento');
  if (modal) modal.style.display = 'flex';
}

function fecharModal() {
  const modal = document.getElementById('modalAgendamento');
  if (modal) modal.style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('modalAgendamento');
  if (event.target === modal) {
    fecharModal();
  }
};

function abrirModalServico(idConteudo) {
  const modal = document.getElementById('modalServico');
  const corpo = document.getElementById('modalServicoCorpo');
  const fonte = document.getElementById(idConteudo);

  if (modal && corpo && fonte) {
    corpo.innerHTML = fonte.innerHTML;
    modal.classList.add('ativo');
  }
}

function fecharModalServico() {
  const modal = document.getElementById('modalServico');
  if (modal) modal.classList.remove('ativo');
}

function fecharModalServicoFora(event) {
  if (event.target.id === 'modalServico') {
    fecharModalServico();
  }
}

// Envio para WhatsApp
function enviarParaWhatsApp(e) {
  if (e) e.preventDefault();
  const nome = document.getElementById('nome')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const tel = document.getElementById('telefone')?.value || '';
  const assunto = document.getElementById('assunto')?.value || '';
  const msg = document.getElementById('mensagem')?.value || '';

  const textoMensagem = `*Novo Agendamento/Contato via Site*%0A%0A` +
    `*Nome:* ${encodeURIComponent(nome)}%0A` +
    `*E-mail:* ${encodeURIComponent(email)}%0A` +
    `*Telefone:* ${encodeURIComponent(tel)}%0A` +
    `*Assunto:* ${encodeURIComponent(assunto)}%0A%0A` +
    `*Mensagem:*%0A${encodeURIComponent(msg)}`;

  const url = `https://wa.me/5573981394240?text=${textoMensagem}`;
  window.open(url, '_blank');
  fecharModal();
}

// Animação de aparição fluida dos elementos ao rolar a página
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    threshold: 0.12 // Ativa quando 12% do elemento entra na tela
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); // Anima apenas uma vez
      }
    });
  }, observerOptions);

  // Aplica o efeito nas seções principais e nos cards
  const elementosParaAnimar = document.querySelectorAll("section, .card-servico, .card-info, .mapa-wrapper");
  
  elementosParaAnimar.forEach(el => {
    el.classList.add("reveal-on-scroll");
    observer.observe(el);
  });
});