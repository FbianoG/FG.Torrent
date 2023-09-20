const files = [
    {
        name: 'violência sexual contra menor de idade',
        type: 'policial',
        doc: 'termopetro.pdf'
    },
    {
        name: 'violência sexual contra mulher',
        type: 'policial',
        doc: 'globo.com'
    },
    {
        name: 'termo de atendimento sul américa',
        type: 'atendimento',
        doc: 'globo.com'
    },
    {
        name: 'timbrado chn',
        type: 'outros',
        doc: 'globo.com'
    },
    {
        name: 'confirmação de atendimento petrobras',
        type: 'atendimento',
        doc: 'globo.com'
    },
    {
        name: 'violência sexual contra menor de idade',
        type: 'policial',
        doc: 'globo.com'
    },
    {
        name: 'violência sexual contra mulher',
        type: 'policial',
        doc: 'globo.com'
    },
    {
        name: 'termo de atendimento sul américa',
        type: 'atendimento',
        doc: 'globo.com'
    },
    {
        name: 'timbrado chn',
        type: 'outros',
        doc: 'globo.com'
    },
    {
        name: 'confirmação de atendimento petrobras',
        type: 'atendimento',
        doc: 'globo.com'
    },
    {
        name: 'violência sexual contra menor de idade',
        type: 'policial',
        doc: 'globo.com'
    },
    {
        name: 'violência sexual contra mulher',
        type: 'policial',
        doc: 'globo.com'
    },
    {
        name: 'termo de atendimento sul américa',
        type: 'atendimento',
        doc: 'globo.com'
    },
    {
        name: 'timbrado chn',
        type: 'outros',
        doc: 'globo.com'
    },
    {
        name: 'confirmação de atendimento petrobras',
        type: 'atendimento',
        doc: 'globo.com'
    },
]

// Criar transition ao tirar mouse do menu lateral (para evitar problemas no carregamento com transition já definida)
document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => {
    e.target.style.transition = '400ms'
})

const list = document.querySelectorAll('.termos')[0]
let searchInput = document.querySelector('#search-input')
let selectInput = document.querySelector('#filtro')

function load(e) {
    list.innerHTML = ''
    for (let i = 0; i < e.length; i++) {
        let newDoc = document.createElement('div')
        newDoc.classList = `card ${e[i].type}`
        newDoc.innerHTML = `
        <p>${e[i].name}</p>
        <h5>${e[i].type}</h5> 
        <a href="${e[i].doc}" target='_blank'><i class="fa-solid fa-file-pdf"></i></a>`
        list.appendChild(newDoc)
    }
    capitalize()
}
load(files)

// Search Docs Whith Input And Select
searchInput.addEventListener('keyup', function () {
    let findDoc = files.filter(function (doc) {
        return doc.name.toLowerCase().includes(searchInput.value.toLowerCase())
    })
    selectInput.value = ''
    load(findDoc)
})

selectInput.addEventListener('change', function () {
    let findDoc = files.filter(function (doc) {
        return doc.type.toLowerCase().includes(selectInput.value.toLowerCase())
    })
    load(findDoc)
})

function capitalize() {
    let paragraph = document.querySelectorAll('p')
    let kind = document.querySelectorAll('h5')
    for (let i = 0; i < paragraph.length; i++) {
        let words = paragraph[i].textContent.split(' ')
        for (let p = 0; p < words.length; p++) {
            words[p] = words[p].charAt(0).toUpperCase() + words[p].slice(1)
        }
        let paragraphCapitalized = words.join(' ')
        paragraph[i].textContent = paragraphCapitalized
    }
    for (let i = 0; i < kind.length; i++) {
        kind[i].textContent = kind[i].textContent.charAt(0).toUpperCase() + kind[i].textContent.slice(1)
    }
}