// Carregar o arquivo JSON com as notícias
fetch('../noticias.json')
  .then(response => response.json())
  .then(data => {
    // Identifica a categoria da página atual
    const paginaAtual = window.location.pathname.split("/").pop().split(".")[0];

    // Verifica se há notícias para a categoria atual
    if (data.noticias[paginaAtual]) {
      const noticias = data.noticias[paginaAtual];
      const container = document.querySelector('.main-content');

      // Gera os cards de notícias
      noticias.forEach((noticia, index) => {
        const card = `
          <div class="card-noticia">
            <img src="${noticia.imagem}" alt="${noticia.titulo}">
            <h2>${noticia.titulo}</h2>
            <p>${noticia.descricao}</p>
            <a href="../pages/layout/noticia.html?id=${index}">Leia mais</a>
          </div>
        `;
        container.innerHTML += card;
      });
    } else {
      console.error('Nenhuma notícia encontrada para esta categoria.');
    }
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));
