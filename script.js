fetch ('../noticias.json')
  .then (response => response.json())
  .then (data => { 
    const paginaAtual = window.location.pathname.split ('/').pop().split ('.') [0]
    const container = document.querySelector ('.main-content')

    if (data.noticias [paginaAtual]) {
      const noticias = data.noticias [paginaAtual]

      if (noticias.length > 0) {
        noticias.forEach ((noticia, index) => {
          const card = `
            <div class="card-noticia">
              <img src="${noticia.imagem}" alt="${noticia.titulo}">
              <h2>${noticia.titulo}</h2>
              <p>${noticia.descricao}</p>
              <a href="../pages/layout/noticia.html?id=${index}">Leia mais</a>
            </div>
          `

          container.innerHTML += card
        })
      } else {
        container.innerHTML = '<h1>Nenhuma notícia disponível para esta categoria.</h1>'
      }
    } else {
      container.innerHTML = '<h1>Página não encontrada.</h1>'
    }
  })
  .catch (error => console.error('Erro ao carregar o JSON:', error))