// document.addEventListener('DOMContentLoaded', () => {
//   fetch('/noticias.json')
//       .then(response => response.json())
//       .then(data => {
//           const paginaAtual = window.location.pathname.split('/').pop().split('.')[0];
//           const container = document.querySelector('.main-content');

//           // Página inicial (index.html)
//           if (paginaAtual === 'index') {
//               Object.keys(data.noticias).forEach(categoria => {
//                   const noticia = data.noticias[categoria][0];  // Exibindo apenas a primeira notícia de cada categoria
//                   const index = 0;
//                   const card = `
//                       <div class="card-noticia">
//                           <img src="${noticia.imagem}" alt="${noticia.titulo}">
//                           <h2>${noticia.titulo}</h2>
//                           <p>${noticia.descricao}</p>
//                           <a href="./pages/layout/noticia.html?id=${index}&categoria=${categoria}" class="leia-mais">Leia mais</a>
//                       </div>
//                   `;
//                   container.innerHTML += card;
//               });

//               // Carregar notícias em destaque
//               carregarNoticiasDestaque(data.noticias.politica);
//               // Carregar notícias sobre eleições
//               carregarNoticiasEleicoes(data.noticias.politica); // Ajuste a categoria conforme necessário

//           } 
//           // Página de detalhes da notícia (noticia.html)
//           else if (paginaAtual === 'noticia') {
//               // Obter parâmetros da URL
//               const params = new URLSearchParams(window.location.search);
//               const categoria = params.get('categoria');
//               const id = params.get('id');

//               // Verificar se os parâmetros estão sendo recebidos
//               if (!categoria || !id) {
//                   container.innerHTML = '<h1>Parâmetros inválidos.</h1>';
//                   return;
//               }

//               // Verifica se a categoria e o ID existem no JSON
//               if (data.noticias[categoria] && data.noticias[categoria][id]) {
//                   const noticia = data.noticias[categoria][id];

//                   // Preencher os elementos HTML com os dados da notícia
//                   document.getElementById('noticia-imagem').src = noticia.imagem;
//                   document.getElementById('noticia-titulo').textContent = noticia.titulo;
//                   document.getElementById('noticia-conteudo').textContent = noticia.descricao;

//                   // Atualizar o título da página
//                   document.title = `${noticia.titulo} - WZy Comunicação`;
//               } else {
//                   container.innerHTML = '<h1>Notícia não encontrada.</h1>';
//               }
//           } 
//           // Outras páginas
//           else {
//               if (data.noticias[paginaAtual]) {
//                   const noticias = data.noticias[paginaAtual];

//                   if (noticias.length > 0) {
//                       noticias.forEach((noticia, index) => {
//                           const card = `
//                               <div class="card-noticia">
//                                   <img src="${noticia.imagem}" alt="${noticia.titulo}">
//                                   <h2>${noticia.titulo}</h2>
//                                   <p>${noticia.descricao}</p>
//                                   <a href="../pages/layout/noticia.html?id=${index}&categoria=${paginaAtual}" class="leia-mais">Leia mais</a>
//                               </div>
//                           `;
//                           container.innerHTML += card;
//                       });
//                   } else {
//                       container.innerHTML = '<h1>Nenhuma notícia disponível para esta categoria.</h1>';
//                   }
//               } else {
//                   container.innerHTML = '<h1>Página não encontrada.</h1>';
//               }
//           }
//       })
//       .catch(error => {
//           console.error('Erro ao carregar o JSON:', error);
//           container.innerHTML = '<h1>Erro ao carregar o JSON.</h1>';
//       });

//   // Função para carregar notícias em destaque
//   function carregarNoticiasDestaque(noticias) {
//       const containerDestaque = document.querySelector('.noticias-destaque');
//       const noticiasDestaque = noticias.slice(0, 4); // Exemplo: pegando 4 notícias em destaque

//       noticiasDestaque.forEach((noticia, index) => { // Adicionando o índice aqui
//           const card = `
//               <div class="card">
//                   <a href="./pages/layout/noticia.html?id=${index}&categoria=politica">
//                       <img src="${noticia.imagem}" alt="${noticia.titulo}">
//                       <p>${noticia.titulo}</p>
//                   </a>
//               </div>
//           `;
//           containerDestaque.innerHTML += card;
//       });
//   }

//   // Função para carregar notícias sobre eleições
//   function carregarNoticiasEleicoes(noticias) {
//       const containerEleições = document.querySelector('.eleicoes-2024');
//       const noticiasEleições = noticias.slice(4, 8); // Exemplo: pegando 4 notícias sobre eleições

//       noticiasEleições.forEach((noticia, index) => { // Adicionando o índice aqui
//           const card = `
//               <div class="card">
//                   <a href="./pages/layout/noticia.html?id=${index + 4}&categoria=politica"> <!-- Ajustando o índice -->
//                       <img src="${noticia.imagem}" alt="${noticia.titulo}">
//                       <p>${noticia.titulo}</p>
//                   </a>
//               </div>
//           `;
//           containerEleições.innerHTML += card;
//       });
//   }

//   // Navbar móvel
//   class MobileNavbar {
//       constructor(mobileMenuIcon, navList, navLinks) {
//           this.mobileMenuIcon = document.querySelector(mobileMenuIcon);
//           this.navList = document.querySelector(navList);
//           this.navLinks = document.querySelectorAll(navLinks);
//           this.activeClass = 'active';

//           this.handleClick = this.handleClick.bind(this);
//           this.handleOutsideClick = this.handleOutsideClick.bind(this);
//       }

//       animateLinks() {
//           this.navLinks.forEach((link, index) => {
//               link.style.animation
//                   ? (link.style.animation = '')
//                   : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
//           });
//       }

//       handleClick() {
//           this.navList.classList.toggle(this.activeClass);
//           this.mobileMenuIcon.classList.toggle(this.activeClass);
//           this.animateLinks();
//           document.addEventListener('click', this.handleOutsideClick);
//       }

//       handleOutsideClick(event) {
//           if (!this.navList.contains(event.target) && !this.mobileMenuIcon.contains(event.target)) {
//               this.navList.classList.remove(this.activeClass);
//               this.mobileMenuIcon.classList.remove(this.activeClass);
//               document.removeEventListener('click', this.handleOutsideClick);
//           }
//       }

//       addClickEvent() {
//           this.mobileMenuIcon.addEventListener('click', this.handleClick);
//       }

//       init() {
//           if (this.mobileMenuIcon) {
//               this.addClickEvent();
//           }
//           return this;
//       }
//   }

//   // Iniciando o menu com as classes corretas
//   const mobileNavbar = new MobileNavbar('.mobile-menu', '.nav-menu', '.nav-list li');
//   mobileNavbar.init();
// });

document.addEventListener('DOMContentLoaded', () => {
  fetch('/noticias.json')
      .then(response => response.json())
      .then(data => {
          const paginaAtual = window.location.pathname.split('/').pop().split('.')[0];
          const container = document.querySelector('.main-content');
          const containerRel = document.getElementById('noticias-relacionadas');

          // Página inicial (index.html)
          if (paginaAtual === 'index') {
              Object.keys(data.noticias).forEach(categoria => {
                  const noticia = data.noticias[categoria][0];
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

              carregarNoticiasDestaque(data.noticias.politica);
              carregarNoticiasEleicoes(data.noticias.politica);

          } 
          // Página de detalhes da notícia (noticia.html)
          else if (paginaAtual === 'noticia') {
              const params = new URLSearchParams(window.location.search);
              const categoria = params.get('categoria');
              const id = params.get('id');

              if (!categoria || !id) {
                  container.innerHTML = '<h1>Parâmetros inválidos.</h1>';
                  return;
              }

              if (data.noticias[categoria] && data.noticias[categoria][id]) {
                  const noticia = data.noticias[categoria][id];
                  document.getElementById('noticia-imagem').src = noticia.imagem;
                  document.getElementById('noticia-titulo').textContent = noticia.titulo;
                  document.getElementById('noticia-conteudo').textContent = noticia.conteudo; // Mudar para 'conteudo' se necessário
                  document.title = `${noticia.titulo} - WZy Comunicação`;

                  // Carregar notícias relacionadas
                  carregarNoticiasRelacionadas(data.noticias, categoria, id);
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

  // Função para carregar notícias relacionadas
  function carregarNoticiasRelacionadas(noticias, categoriaAtual, idAtual) {
      const containerRel = document.getElementById('noticias-relacionadas');
      containerRel.innerHTML = ''; // Limpar conteúdo anterior

      const noticiasRelacionadas = [];

      // Busca notícias de categorias diferentes
      for (const categoria in noticias) {
          if (categoria !== categoriaAtual) {
              noticiasRelacionadas.push(...noticias[categoria]);
          }
      }

      // Exibe as notícias relacionadas (limitando a um número desejado)
      const limiteNoticias = 3; // Exemplo: limitar a 3 notícias
      noticiasRelacionadas.slice(0, limiteNoticias).forEach((noticia, index) => {
          const card = `
              <li>
                  <a href="./noticia.html?id=${index}&categoria=${categoriaAtual}">
                      <h3>${noticia.titulo}</h3>
                      <p>${noticia.descricao}</p>
                  </a>
              </li>
          `;
          containerRel.innerHTML += card;
      });
  }

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

  const mobileNavbar = new MobileNavbar('.mobile-menu', '.nav-menu', '.nav-list li');
  mobileNavbar.init();
});
