fetch ('../noticias.json')
  .then (response => response.json())
  .then (data => {
    const paginaAtual = window.location.pathname.split ('/').pop().split ('.') [0]
    const container = document.querySelector ('.main-content')

    if (paginaAtual === 'index') {
      Object.keys (data.noticias).forEach (categoria => {
        const noticia = data.noticias [categoria] [0]
        const card = `
          <div class="card-noticia">
            <img src="${noticia.imagem}" alt="${noticia.titulo}">
            <h2>${noticia.titulo}</h2>
            <p>${noticia.descricao}</p>
            <a href="./pages/layout/noticia.html?id=0&categoria=${categoria}" class="leia-mais" data-categoria="${categoria}" data-index="0">Leia mais</a>
          </div>
        `
        container.innerHTML += card
      })

      document.querySelectorAll ('.leia-mais').forEach (link => {
        link.addEventListener ('click', (event) => {
          const categoria = this.getAttribute ('data-categoria')
          const index = this.getAttribute ('data-index')

          localStorage.setItem ('noticiaSelecionada', JSON.stringify (data.noticias [categoria] [index]))
        })
      })
    } else if (paginaAtual === 'noticia') {
      const noticia = JSON.parse (localStorage.getItem ('noticiaSelecionada'))

      if (noticia) {
        document.getElementById ('noticia-imagem').src = noticia.imagem
        document.getElementById ('noticia-titulo').textContent = noticia.titulo
        document.getElementById ('noticia-conteudo').textContent = noticia.descricao

        document.title = `${noticia.titulo} - WZy Comunicação`
      } else {
        container.innerHTML = '<h1>Notícia não encontrada.</h1>'
      }
    } else {
      if (data.noticias [paginaAtual]) {
        const noticias = data.noticias [paginaAtual]

        if (noticias.length > 0) {
          noticias.forEach((noticia, index) => {
            const card = `
              <div class="card-noticia">
                <img src="${noticia.imagem}" alt="${noticia.titulo}">
                <h2>${noticia.titulo}</h2>
                <p>${noticia.descricao}</p>
                <a href="../pages/layout/noticia.html?id=${index}&categoria=${paginaAtual}" class="leia-mais" data-categoria="${paginaAtual}" data-index="${index}">Leia mais</a>
              </div>
            `

            container.innerHTML += card
          })

          document.querySelectorAll ('.leia-mais').forEach (link => {
            link.addEventListener ('click', (event) => {
              const categoria = this.getAttribute ('data-categoria')
              const index = this.getAttribute ('data-index')
              localStorage.setItem ('noticiaSelecionada', JSON.stringify (data.noticias [categoria] [index]))
            })
          })
        } else {
          container.innerHTML = '<h1>Nenhuma notícia disponível para esta categoria.</h1>'
        }
      } else {
        container.innerHTML = '<h1>Página não encontrada.</h1>'
      }
    }
  })
  .catch (error => console.error ('Erro ao carregar o JSON:', error))