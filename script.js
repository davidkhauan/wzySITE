document.addEventListener('DOMContentLoaded', () => {
  fetch('/noticias.json')
    .then(response => response.json())
    .then(data => {
      const paginaAtual = window.location.pathname.split('/').pop().split('.')[0];
      const container = document.querySelector('.main-content');

      // Página inicial (index.html)
      if (paginaAtual === 'index') {
        Object.keys(data.noticias).forEach(categoria => {
          const noticia = data.noticias[categoria][0];  // Exibindo apenas a primeira notícia de cada categoria
          const index = 0;
          const card = `
            <div class="card-noticia">
              <img src="${noticia.imagem}" alt="${noticia.titulo}">
              <h2>${noticia.titulo}</h2>
              <p>${noticia.descricao}</p>
              <a href="./pages/layout/noticia.html?id=${index}&categoria=${categoria}" class="leia-mais">Leia mais</a>
            </div>
          `;
          container.innerHTML += card;
        });
      } 
      // Página de detalhes da notícia (noticia.html)
      else if (paginaAtual === 'noticia') {
        // Obter parâmetros da URL
        const params = new URLSearchParams(window.location.search);
        const categoria = params.get('categoria');
        const id = params.get('id');

        // Verificar se os parâmetros estão sendo recebidos
        if (!categoria || !id) {
          container.innerHTML = '<h1>Parâmetros inválidos.</h1>';
          return;
        }

        // Verifica se a categoria e o ID existem no JSON
        if (data.noticias[categoria] && data.noticias[categoria][id]) {
          const noticia = data.noticias[categoria][id];

          // Preencher os elementos HTML com os dados da notícia
          document.getElementById('noticia-imagem').src = noticia.imagem;
          document.getElementById('noticia-titulo').textContent = noticia.titulo;
          document.getElementById('noticia-conteudo').textContent = noticia.descricao;

          // Atualizar o título da página
          document.title = `${noticia.titulo} - WZy Comunicação`;
        } else {
          container.innerHTML = '<h1>Notícia não encontrada.</h1>';
        }
      } 
      // Outras páginas
      else {
        if (data.noticias[paginaAtual]) {
          const noticias = data.noticias[paginaAtual];

          if (noticias.length > 0) {
            noticias.forEach((noticia, index) => {
              const card = `
                <div class="card-noticia">
                  <img src="${noticia.imagem}" alt="${noticia.titulo}">
                  <h2>${noticia.titulo}</h2>
                  <p>${noticia.descricao}</p>
                  <a href="../pages/layout/noticia.html?id=${index}&categoria=${paginaAtual}" class="leia-mais">Leia mais</a>
                </div>
              `;
              container.innerHTML += card;
            });
          } else {
            container.innerHTML = '<h1>Nenhuma notícia disponível para esta categoria.</h1>';
          }
        } else {
          container.innerHTML = '<h1>Página não encontrada.</h1>';
        }
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o JSON:', error);
      container.innerHTML = '<h1>Erro ao carregar o JSON.</h1>';
    });

  // Navbar móvel
  class MobileNavbar {
    constructor(mobileMenuIcon, navList, navLinks) {
      this.mobileMenuIcon = document.querySelector(mobileMenuIcon);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = 'active';

      this.handleClick = this.handleClick.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = '')
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
      });
    }

    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenuIcon.classList.toggle(this.activeClass);
      this.animateLinks();
      document.addEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick(event) {
      if (!this.navList.contains(event.target) && !this.mobileMenuIcon.contains(event.target)) {
        this.navList.classList.remove(this.activeClass);
        this.mobileMenuIcon.classList.remove(this.activeClass);
        document.removeEventListener('click', this.handleOutsideClick);
      }
    }

    addClickEvent() {
      this.mobileMenuIcon.addEventListener('click', this.handleClick);
    }

    init() {
      if (this.mobileMenuIcon) {
        this.addClickEvent();
      }
      return this;
    }
  }

  // Iniciando o menu com as classes corretas
  const mobileNavbar = new MobileNavbar('.mobile-menu', '.nav-menu', '.nav-list li');
  mobileNavbar.init();
});
