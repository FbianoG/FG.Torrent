// Variáveis

let list = document.querySelectorAll('.list-card')[0]
let searchInput = document.querySelector('#search-input')
const files = [
    {
        name: 'violência sexual contra menor de idade',
        type: 'policial',
        doc: './pdf/sexmenor.pdf'
    },
]

const urlParams = new URLSearchParams(window.location.search);
let token = urlParams.get('id');




const jwtLinks = document.querySelectorAll('nav a');
jwtLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); 
        const originalHref = this.getAttribute('href');
        const url = originalHref + `?id=${token}`;
        window.location.href = url;
    });
});

// Eventos


document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => { // Criar transition ao tirar mouse do menu lateral (para evitar problemas no carregamento)
    e.target.style.transition = '400ms'
})
searchInput.addEventListener('keyup', filterForName) // Filtra "lista de documentos" pelo valor do "input"




// Funções

function createList(e) { // Cria e gera "card de documentos"
    console.log(e);
    list.innerHTML = ''
    e.forEach(element => {
        let newDoc = document.createElement('div') // Cria HTML dos "cards de documentos"
        newDoc.classList = `card ${element.type}`
        newDoc.innerHTML = createCardHtml(element)
        list.appendChild(newDoc)
    })
}

function filterForName() { // Filtra "lista de documentos" pelo valor do "input"
    let findDoc = files.filter(function (doc) {
        return doc.name.toLowerCase().includes(searchInput.value.toLowerCase())
    })
    load(findDoc)
}

function createCardHtml(e) {  // Cria HTML dos "cards de documentos"
    const html = `
        <p class="card-termo">${e.name}</p>
        <p class="card-categoria" id="card-${e.type}">${e.type}</p> 
        <a href="${e.doc}" target='_blank' class="card-pdf"><i class="fa-solid fa-file-pdf"></i></a>
    `
    return html
}




// Chamadas

createList(files) // Cria e gera "card de documentos"