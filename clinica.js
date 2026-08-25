document.addEventListener('DOMContentLoaded', () => {
  // 1. MENU HAMBÚRGUER (ÚNICA EXECUÇÃO)
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navContent = document.getElementById('navContent');

  if (hamburgerBtn && navContent) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Impede interferências de cliques em outros elementos
      hamburgerBtn.classList.toggle('active');
      navContent.classList.toggle('active');
    });

    // Fecha o menu mobile ao clicar em qualquer link
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a, .btn-agendar');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navContent.classList.remove('active');
      });
    });

    // Fecha o menu se o usuário clicar fora dele
    document.addEventListener('click', (e) => {
      if (!navContent.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        navContent.classList.remove('active');
      }
    });
  }

  // 2. PAINEL COLAPSÁVEL DE CONTATOS (SÓ EXECUTA SE OS ELEMENTOS EXISTIREM)
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

  // 3. SLIDESHOW (SEGURA ERROS DE ARQUIVOS ONDE ELE NÃO EXISTE)
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

// Envio de mensagem para WhatsApp
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