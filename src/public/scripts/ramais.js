// VARIÁVEIS //
let search = document.querySelector('#search-input')
let listaRamais = document.querySelectorAll('.ramais-card')[0]
let title = document.querySelectorAll('h2')[0]
let ramais = []


// CHAMADAS //
getRamais()



// EVENTOS //
document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => { // Cria style.transiton no Menu
    e.target.style.transition = '400ms'
})

search.addEventListener('keyup', () => { // Filtrar ramais pelo texto digitado no input
    let filter = ramais.filter(ramal => {
        return ramal.setor.includes(search.value.toLowerCase())
    })
    gerar(filter)
})



// FUNÇÕES //

async function getRamais() { // Pegar dados vindo do DataBase 
    const getRamais = await fetch('/find-ramais')
    ramais = await getRamais.json()
    gerar(ramais)
}

function gerar(object) { // Gera a lista de ramais com base nos dados obtidos do DataBase
    listaRamais.innerHTML = ''
    object.forEach(ramal => {
        let newCard = document.createElement('li')
        newCard.classList = 'card'
        newCard.innerHTML = `
            <p class="card-setor">${ramal.setor}</p>
            <p class="card-posto">${ramal.posto}</p>
            <p class="card-ramal">${ramal.ramal}</p>
        `
        listaRamais.appendChild(newCard)
    })
    ordenar()
}

function ordenar() { // Ordena Array.Objects por ordem alfabética
    let card = listaRamais.querySelectorAll('li')
    let ordenados = Array.from(card).sort((a, b) => {
        return a.children[0].innerText.localeCompare(b.children[0].innerText)
    })
    listaRamais.innerHTML = ''
    ordenados.forEach(element => {
        let newCard = document.createElement('li')
        newCard.classList = 'card'
        newCard.innerHTML = `
            <p class="card-setor">${element.children[0].innerText}</p>
            <p class="card-posto">${element.children[1].innerText}</p>
            <p class="card-ramal">${element.children[2].innerText}</p>
        `
        listaRamais.appendChild(newCard)
    })
}