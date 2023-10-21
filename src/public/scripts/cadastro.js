// Variáveis

let cep = document.querySelector('#cep')
let rua = document.querySelector('#rua')
let bairro = document.querySelector('#bairro')
let cidade = document.querySelector('#cidade')
let uf = document.querySelector('#uf')
let btnClear = document.querySelector('#btn-clear')
let btnPrint = document.querySelector('#btn-print')
let textDate = document.querySelector('#date')

// Eventos

cep.addEventListener('keyup', findCep)
btnClear.addEventListener('click', () => window.location.reload())
btnPrint.addEventListener('click', printData)




// Funções

async function findCep() { // Consulta o cep pela API
    if (cep.value.length == 8) {
        let api = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        let data = await api.json()
        if (data.uf) { // se existir algum dado, "uf", chama function 
            includeDataCep(data) // altera valores dos inputs
        }
    }
}

function includeDataCep(e) { // altera valores dos inputs
    rua.value = e.logradouro
    bairro.value = e.bairro
    cidade.value = e.localidade
    uf.value = e.uf
}

function printData() {
    let data = new Date()
    let dia = data.getDate().toString().padStart(2, "0")
    let mes = (data.getMonth() + 1).toString().padStart(2, "0")
    let hora = data.getHours().toString().padStart(2, "0")
    let min = data.getMinutes().toString().padStart(2, "0")
    let sec = data.getSeconds().toString().padStart(2, "0")
    textDate.textContent = `${dia}/${mes} - ${hora}:${min}:${sec}`
    window.print()
}