let ramais = []

async function getRamais() {
    const getRamais = await fetch('/find-ramais')
    ramais = await getRamais.json()
    console.log(ramais);
    gerar(ramais)
}
getRamais()

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

    let card = listaRamais.querySelectorAll('li')
    card.forEach(texto => {
        let arrayTexto = texto.querySelectorAll('p')[0].textContent.split(' ')
        let palavraCapitalizada = arrayTexto.map(palavra => {
            return palavra.charAt(0).toUpperCase() + palavra.slice(1)
        })
        textoCapitalizado = palavraCapitalizada.join(' ')
        texto.querySelectorAll('p')[0].textContent = textoCapitalizado
    })
    ordenar()
}

search.addEventListener('keyup', () => {
    let filter = ramais.filter(ramal => {
        return ramal.setor.includes(search.value.toLowerCase())
    })
    gerar(filter)
})

// CHAMADAS //
function ordenar() {
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
    console.log(ramais);
}


document.querySelectorAll('h2')[0].addEventListener('click', ordenar)