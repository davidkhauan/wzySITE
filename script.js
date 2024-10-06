document.addEventListener ('DOMContentLoaded', () => {
  fetch ('../noticias.json')
    .then (response => response.json())
    .then (data => {
      const paginaAtual = window.location.pathname.split ('/').pop().split ('.') [0]
      const container = document.querySelector ('.main-content')

      if (paginaAtual === 'index') {
        Object.keys (data.noticias).forEach (categoria => {
          const noticia = data.noticias [categoria] [0]
          const index = 0
          const card = `
            <div class="card-noticia">
              <img src="${noticia.imagem}" alt="${noticia.titulo}">
              <h2>${noticia.titulo}</h2>
              <p>${noticia.descricao}</p>
              <a href="./pages/layout/noticia.html?id=${index}&categoria=${categoria}" class="leia-mais" data-categoria="${categoria}" data-index="${index}">Leia mais</a>
            </div>
          `
          container.innerHTML += card
        })

        document.querySelectorAll ('.leia-mais').forEach (link => {
          link.addEventListener ('click', function () {
            const categoria = this.getAttribute ('data-categoria')
            const index = this.getAttribute ('data-index')
            localStorage.setItem('noticiaSelecionada', JSON.stringify(data.noticias[categoria][index]));
          });
        });
      } else if (paginaAtual === 'noticia') {
        // Carrega a notícia no detalhe
        const noticia = JSON.parse(localStorage.getItem('noticiaSelecionada'));

        if (noticia) {
          document.getElementById('noticia-imagem').src = noticia.imagem;
          document.getElementById('noticia-titulo').textContent = noticia.titulo;
          document.getElementById('noticia-conteudo').textContent = noticia.descricao;

          document.title = `${noticia.titulo} - WZy Comunicação`;
        } else {
          container.innerHTML = '<h1>Notícia não encontrada.</h1>';
        }
      } else {
        if (data.noticias[paginaAtual]) {
          const noticias = data.noticias[paginaAtual];

          if (noticias.length > 0) {
            noticias.forEach((noticia, index) => {
              const card = `
                <div class="card-noticia">
                  <img src="${noticia.imagem}" alt="${noticia.titulo}">
                  <h2>${noticia.titulo}</h2>
                  <p>${noticia.descricao}</p>
                  <a href="../pages/layout/noticia.html?id=${index}&categoria=${paginaAtual}" class="leia-mais" data-categoria="${paginaAtual}" data-index="${index}">Leia mais</a>
                </div>
              `;
              container.innerHTML += card;
            });

            document.querySelectorAll('.leia-mais').forEach(link => {
              link.addEventListener('click', function () {
                const categoria = this.getAttribute('data-categoria');
                const index = this.getAttribute('data-index');
                localStorage.setItem('noticiaSelecionada', JSON.stringify(data.noticias[categoria][index]));
                console.log('Notícia selecionada:', noticia);
              });
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
      container.innerHTML = '<h1>Erro ao carregar o JSON.</h1>';
      console.error('Erro ao carregar o JSON:', error);
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

      document.addEventListener('click', this.handleOutsideClick); // Adiciona o evento ao clicar fora
    }

    handleOutsideClick(event) {
      if (!this.navList.contains(event.target) && !this.mobileMenuIcon.contains(event.target)) {
        this.navList.classList.remove(this.activeClass);
        this.mobileMenuIcon.classList.remove(this.activeClass);
        document.removeEventListener('click', this.handleOutsideClick); // Remove o evento após fechar
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
