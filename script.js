document.addEventListener ("DOMContentLoaded", () => {
    fetch ("/noticias.json")
      .then ((response) => response.json())
      .then ((data) => {
        const paginaAtual = window.location.pathname.split ("/").pop().split (".") [0]

        const container = document.querySelector (".main-content")
        const searchInput = document.getElementById ("search-input")
        const searchButton = document.getElementById ("search-button")
  
        const rendererizarNoticias = (noticias) => {
          container.innerHTML = ""
  
          noticias.forEach ((noticia, index) => {
            const card = `
              <div class="card-noticia">
                  <img src="${noticia.imagem}" alt="${noticia.titulo}">
                  <h2>${noticia.titulo}</h2>
                  <p>${noticia.descricao}</p>
                  <a href="./pages/layout/noticia.html?id=${index}&categoria=${noticia.categoria}" class="leia-mais">Leia mais</a>
              </div>
          `
            container.innerHTML += card
          })
        }
  
        const buscarNoticias = () => {
          const termoBusca = searchInput.value.toLowerCase()
          const noticiasFiltradas = []
  
          Object.keys (data.noticias).forEach ((categoria) => {
            data.noticias [categoria].forEach ((noticia) => {
              if (
                noticia.titulo.toLowerCase().includes (termoBusca) ||
                noticia.descricao.toLowerCase().includes (termoBusca)
              ) {
                noticia.categoria = categoria
                noticiasFiltradas.push (noticia)
              }
            })
          })
  
          if (noticiasFiltradas.length > 0) {
            rendererizarNoticias (noticiasFiltradas)
          } else {
            container.innerHTML = "<h1>Nenhuma notícia encontrada.</h1>"
          }
        }
  
        searchButton.addEventListener ("click", buscarNoticias)
        searchInput.addEventListener ("input", buscarNoticias)
  
        // Página inicial (index.html)
        if (paginaAtual === "index") {
          rendererizarNoticias(Object.values (data.noticias).flat())
        }
        // Páginas de categorias (ex: politica.html, esportes.html, etc.)
        else if (data.noticias [paginaAtual]) {
          const noticiasCategoria = data.noticias [paginaAtual]
  
          if (noticiasCategoria.length > 0) {
            rendererizarNoticias (noticiasCategoria)
          } else {
            container.innerHTML = "<h1>Nenhuma notícia disponível para esta categoria.</h1>"
          }
        }
        // Página de detalhes da notícia (noticia.html)
        else if (paginaAtual === "noticia") {
          const params = new URLSearchParams (window.location.search)
          const categoria = params.get ("categoria")
          const id = params.get ("id")
  
          if (!categoria || !id) {
            container.innerHTML = "<h1>Parâmetros inválidos.</h1>"
            return
          }
  
          if (data.noticias [categoria] && data.noticias [categoria] [id]) {
            const noticia = data.noticias [categoria] [id]
            document.getElementById ("noticia-imagem").src = noticia.imagem
            document.getElementById ("noticia-titulo").textContent = noticia.titulo
  
            document.getElementById ("noticia-conteudo").textContent = noticia.conteudo || noticia.descricao
            document.title = `${noticia.titulo} - WZy Comunicação`
  
            // Carregar notícias relacionadas
            carregarNoticiasRelacionadas (data.noticias, categoria, id)
          } else {
            container.innerHTML = "<h1>Notícia não encontrada.</h1>"
          }
        } else {
          container.innerHTML = "<h1>Página não encontrada.</h1>"
        }
      })
      .catch ((error) => {
        console.error ("Erro ao carregar o JSON:", error)
        container.innerHTML = "<h1>Erro ao carregar o JSON.</h1>"
      })
  
    // Função para carregar notícias relacionadas
    function carregarNoticiasRelacionadas (noticias, categoriaAtual, idAtual) {
      const containerRel = document.getElementById ("noticias-relacionadas")
      containerRel.innerHTML = ""
  
      const noticiasRelacionadas = []
  
      // Busca notícias de categorias diferentes
      for (const categoria in noticias) {
        if (categoria !== categoriaAtual) {
          noticiasRelacionadas.push(...noticias [categoria])
        }
      }
  
      // Exibe as notícias relacionadas (limitando a um número desejado)
      const limiteNoticias = 3
      noticiasRelacionadas.slice (0, limiteNoticias).forEach ((noticia, index) => {
        const card = `
                  <li>
                      <a href="./noticia.html?id=${index}&categoria=${categoria}">
                          <h3>${noticia.titulo}</h3>
                          <p>${noticia.descricao}</p>
                      </a>
                  </li>
              `
        containerRel.innerHTML += card
      })
    }
  
    class MobileNavbar {
      constructor (mobileMenuIcon, navList, navLinks) {
        this.mobileMenuIcon = document.querySelector (mobileMenuIcon)
        this.navList = document.querySelector (navList)
        this.navLinks = document.querySelectorAll (navLinks)
        this.activeClass = "active"
  
        this.handleClick = this.handleClick.bind (this)
        this.handleOutsideClick = this.handleOutsideClick.bind (this)
      }
  
      animateLinks() {
        this.navLinks.forEach ((link, index) => {
          link.style.animation
            ? (link.style.animation = "")
            : (link.style.animation = `navLinkFade 0.5s ease forwards ${
                index / 7 + 0.3
              }s`)
        })
      }
  
      handleClick() {
        this.navList.classList.toggle (this.activeClass)
        this.mobileMenuIcon.classList.toggle (this.activeClass)
        this.animateLinks();
        document.addEventListener ("click", this.handleOutsideClick)
      }
  
      handleOutsideClick (event) {
        if (
          !this.navList.contains (event.target) &&
          !this.mobileMenuIcon.contains (event.target)
        ) {
          this.navList.classList.remove (this.activeClass)
          this.mobileMenuIcon.classList.remove (this.activeClass)
          document.removeEventListener ("click", this.handleOutsideClick)
        }
      }
  
      addClickEvent() {
        this.mobileMenuIcon.addEventListener ("click", this.handleClick)
      }
  
      init() {
        if (this.mobileMenuIcon) {
          this.addClickEvent()
        }
        return this
      }
    }
  
    const mobileNavbar = new MobileNavbar (".mobile-menu", ".nav-menu", ".nav-list li")
    mobileNavbar.init()
  })
