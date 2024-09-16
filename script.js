// document.addEventListener ('DOMContentLoaded', () => {
//     function criarCardNoticia (noticia, isSidebar = false) {
//         const card = document.createElement ('article')
//         card.className = 
//             isSidebar ? 'card-noticia sidebar-noticia' : 'card-noticia'

//         if (noticia.image) {
//             const img = document.createElement ('img')
//             img.src = noticia.image
//             img.alt = 'Imagem da Notícia'

//             card.appendChild (img)
//         }

//         const titleElement = 
//             isSidebar ? document.createElement ('h3') : document.createElement ('h2')
//         titleElement.textContent = noticia.title
//         card.appendChild (titleElement)

//         const p = document.createElement ('p')
//         p.textContent = noticia.summary
//         card.appendChild (p)

//         const a = document.createElement ('a')
//         a.href = noticia.link
//         a.textContent = 'Leia Mais'
//         card.appendChild (a)

//         return card
//     }

//     function carregarNoticias() {
//         const page = window.location.pathname.split ('/').pop().split ('.').shift()
//         const arquivoJSON = `src/json/${page}.json`

//         fetch (arquivoJSON)
//             .then (response => response.json())
//             .then (dados => {
//                 const mainContentContainer = 
//                     document.querySelector ('.main-content')
//                 const destaqueContainer = 
//                     document.querySelector ('.aside-box .sidebar:nth-of-type(1)')
//                 const eleicoesContainer = 
//                     document.querySelector ('.aside-box .sidebar:nth-of-type(2)')
            
//                 dados.noticias.forEach (noticia => {
//                     const card = criarCardNoticia (noticia)
//                     mainContentContainer.appendChild (card)
//                 })

//                 dados.destaque.forEach (noticia => {
//                     const card = criarCardNoticia (noticia, true)
//                     destaqueContainer.appendChild (card)
//                 })

//                 dados.eleicoes.forEach (noticia => {
//                     const card = criarCardNoticia (noticia, true)
//                     eleicoesContainer.appendChild (card)
//                 })
//             })
//             .catch (error => console.error ('Erro ao carregar notícias:', error))
//     }

//     carregarNoticias()
// })

document.addEventListener('DOMContentLoaded', () => {
    function criarCardNoticia(noticia, isSidebar = false) {
        const card = document.createElement('article');
        card.className = isSidebar ? 'card-noticia sidebar-noticia' : 'card-noticia';

        if (noticia.image) {
            const img = document.createElement('img');
            img.src = noticia.image;
            img.alt = 'Imagem da Notícia';
            card.appendChild(img);
        }

        const titleElement = isSidebar ? document.createElement('h3') : document.createElement('h2');
        titleElement.textContent = noticia.title;
        card.appendChild(titleElement);

        const p = document.createElement('p');
        p.textContent = noticia.summary;
        card.appendChild(p);

        const a = document.createElement('a');
        a.href = noticia.link;
        a.textContent = 'Leia Mais';
        card.appendChild(a);

        return card;
    }

    function carregarNoticias() {
        const page = window.location.pathname.split('/').pop().split('.').shift();
        const arquivoJSON = `src/json/${page}.json`; // Ajuste o caminho conforme necessário

        console.log('URL do JSON:', arquivoJSON);  // Para depuração

        fetch(arquivoJSON)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(dados => {
                const mainContentContainer = document.querySelector('.main-content');
                const destaqueContainer = document.querySelector('.aside-box .sidebar:nth-of-type(1)');
                const eleicoesContainer = document.querySelector('.aside-box .sidebar:nth-of-type(2)');

                if (dados.noticias) {
                    dados.noticias.forEach(noticia => {
                        const card = criarCardNoticia(noticia);
                        mainContentContainer.appendChild(card);
                    });
                }

                if (dados.destaque) {
                    dados.destaque.forEach(noticia => {
                        const card = criarCardNoticia(noticia, true);
                        destaqueContainer.appendChild(card);
                    });
                }

                if (dados.eleicoes) {
                    dados.eleicoes.forEach(noticia => {
                        const card = criarCardNoticia(noticia, true);
                        eleicoesContainer.appendChild(card);
                    });
                }
            })
            .catch(error => console.error('Erro ao carregar notícias:', error));
    }

    carregarNoticias();
});

