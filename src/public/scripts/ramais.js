let ramais = [
    {
        setor: 'recepção emergência adulta',
        posto: 'guichê 01',
        ramal: '1574'
    },
    {
        setor: 'recepção emergência adulta',
        posto: 'guichê 02',
        ramal: '1575'
    },
    {
        setor: 'recepção emergência pediátrica',
        posto: 'guichê 01',
        ramal: '1561'
    },
    {
        setor: 'recepção emergência pediátrica',
        posto: 'guichê 02',
        ramal: '1562'
    },
    {
        setor: 'posto enfermagem 6º andar',
        posto: 'posto 1',
        ramal: '1154'
    },
    {
        setor: 'posto médico 9º andar',
        posto: 'posto 1',
        ramal: '1765'
    },
]

// Criar transition ao tirar mouse do menu lateral (para evitar problemas no carregamento com transition já definida)
document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => {
    e.target.style.transition = '400ms'
})

// VARIÁVEIS //
let search = document.querySelector('#search-input')
let listaRamais = document.querySelectorAll('.ramais-card')[0]




// FUNÇÕES //
function gerar(object) {
    listaRamais.innerHTML = ''
    object.forEach((ramal) => {
        let newCard = document.createElement('li')
        newCard.classList = 'card'
        newCard.innerHTML = `
            <p class="card-setor">${ramal.setor}</p>
            <p class="card-posto">${ramal.posto}</p>
            <p class="card-ramal">${ramal.ramal}</p>
        `
        listaRamais.appendChild(newCard)
    })

    let card = listaRamais.querySelectorAll('li')
    card.forEach((texto) => {
        let arrayTexto = texto.querySelectorAll('p')[0].textContent.split(' ')
        let palavraCapitalizada = arrayTexto.map((palavra) => {
            return palavra.charAt(0).toUpperCase() + palavra.slice(1)
        })
        textoCapitalizado = palavraCapitalizada.join(' ')
        texto.querySelectorAll('p')[0].textContent = textoCapitalizado
    })
}

search.addEventListener('keyup', () => {
    let filter = ramais.filter((ramal) => {
        return ramal.setor.includes(search.value.toLowerCase())
    })
    gerar(filter)
})


// CHAMADAS //
gerar(ramais)