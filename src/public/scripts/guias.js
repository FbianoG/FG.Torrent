





// Variáveis
let codTuss = []
let btnAdd = document.querySelector('#btnAdd')
let card = document.querySelectorAll('.dadosProcedimentos')[0]
let btnGerar = document.querySelectorAll('.gerar')[0]
let btnLimpar = document.querySelectorAll('.limpar')[0]
let btnSelect = document.querySelectorAll('.btnSelect')[0]
let typeSelect = document.querySelectorAll('#typeGuiaSelect')[0]

let dataPac = document.querySelectorAll('.dadosPaciente')[0]
let dataAut = document.querySelectorAll('.dadosAutorizacao')[0]
let dataInt = document.querySelectorAll('.dadosinternacao')[0]
let dataProced = document.querySelectorAll('.dadosProcedimentos')[0]
let dataConfirm = document.querySelectorAll('.dadosConfirmação')[0]



// Eventos

document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => { // Criar transition ao tirar mouse do menu lateral (para evitar problemas no carregamento)
    e.target.style.transition = '400ms'
})
btnAdd.addEventListener('click', createInput) // Adiciona mais campos para inclusão de novos procedimentos
card.addEventListener('keyup', fillInputProcedure) // Preenche automáticamente o campo "procedimentos" de acordo com o código digitado
btnGerar.addEventListener('click', gerar) // Envia os dados para o cachê e redireciona para a página da guia
btnLimpar.addEventListener('click', limpar) // Reload
typeSelect.addEventListener('change', selectTypeGuia) // selecionar tipo de "guia"





// Funções

function selectTypeGuia() { // Select para definir o tipo de guia que será gerada
    if (typeSelect.value == "confirmação") {
        dataPac.style.display = ''
        dataAut.style.display = ''
        dataInt.style.display = ''
        dataProced.style.display = ''
        dataConfirm.style.display = 'block'
        btnGerar.parentElement.style.display = "flex"
    } else if (typeSelect.value == "internação") {
        dataPac.style.display = 'block'
        dataAut.style.display = 'block'
        dataInt.style.display = 'block'
        dataProced.style.display = 'block'
        dataConfirm.style.display = ''
        btnGerar.parentElement.style.display = "flex"
        getTuss() // Puxa dados do arquivo "JSON" da tabela Tuss
    } else {
        return
    }
}

async function getTuss() { // Puxa dados do arquivo "JSON" da tabela Tuss
    const tuss = await fetch("../tuss/tabela_22.json")
    const Data = await tuss.json()
    codTuss = Data
}

function fillInputProcedure(e) { // Preenche automáticamente o campo "procedimentos" de acordo com o código digitado
    let input = e.target
    if (input.value.length == 8) {
        let desProcedimento = e.target.parentElement.children[3]
        let findValue = codTuss.rows.find(element => {
            return element.codigo == input.value
        })
        if (findValue) {
            desProcedimento.value = findValue.procedimento
            if (findValue.procedimento == '10104020') {
                e.target.parentElement.children[5].value = 2
            }
        }
    }
}

function createInput() { // Adiciona mais campos para inclusão de novos procedimentos
    let list = document.querySelectorAll('.listProcedimentos')[0]
    if (list.children.length < 5) {
        let num = list.children.length + 1
        let newProcedimento = document.createElement('div')
        newProcedimento.classList = `procedimento${num} procedimentos`
        newProcedimento.innerHTML = createInputHTML(num) // cria html dos "inputs"
        list.appendChild(newProcedimento)
        window.scrollTo({
            top: window.scrollY + 1000, behavior: 'smooth'
        })
    }
}

function createInputHTML(e) { // cria html dos "inputs"
    const html = `
        <label for="">Cód. Procedimento:</label>
        <input type="text" id='proced${e}'>
        <label for="">Nome do Procedimento:</label>
        <input type="text" id='des${e}'>
        <label for="">Quantidade</label>
        <select name="" id="qtd${e}">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    `
    return html
}

function gerar() { // // Envia os dados para o cachê e redireciona para a página da "guiaint"
    if (typeSelect.value == "internação") {
        let dadosPaciente = {}
        dadosPaciente.nome = document.querySelector('#nome').value.toLowerCase()
        dadosPaciente.carteira = document.querySelector('#carteira').value
        dadosPaciente.plano = document.querySelector('#plano').value
        dadosPaciente.guia = document.querySelector('#guia').value
        dadosPaciente.senha = document.querySelector('#senha').value
        dadosPaciente.medico = document.querySelector('#medico').value.toLowerCase()
        dadosPaciente.crm = document.querySelector('#crm').value
        dadosPaciente.dataSol = document.querySelector('#dataSol').value
        dadosPaciente.dataAut = document.querySelector('#dataAut').value
        dadosPaciente.tipo = document.querySelector('#tipo').value
        dadosPaciente.carater = document.querySelector('#carater').value
        dadosPaciente.leito = document.querySelector('#leito').value
        dadosPaciente.diaria = document.querySelector('#diaria').value
        let list = document.querySelectorAll('.listProcedimentos')[0]
        dadosPaciente.proced = []
        dadosPaciente.des = []
        dadosPaciente.qtd = []
        for (let i = 1; i <= list.children.length; i++) {
            dadosPaciente.proced.push(document.querySelector(`#proced${i}`).value)
            dadosPaciente.des.push(document.querySelector(`#des${i}`).value)
            dadosPaciente.qtd.push(document.querySelector(`#qtd${i}`).value)
        }
        localStorage.setItem('dadosPaciente', JSON.stringify(dadosPaciente))
        window.open('guiaint.html', '_blank')
    } else if (typeSelect.value == 'confirmação') {
        let dadosConfirmacao = {}
        dadosConfirmacao.nome = document.querySelector('#nomeConfirm').value.toLowerCase()
        dadosConfirmacao.carteira = document.querySelector('#carteiraConfirm').value
        dadosConfirmacao.plano = document.querySelector('#planoConfirm').value
        dadosConfirmacao.produto = document.querySelector('#produtoConfirm').value
        localStorage.setItem('Termo. Confirm. Atend:', JSON.stringify(dadosConfirmacao))
        let url = `termo${dadosConfirmacao.plano}.html`
        window.open(url, '_blank')
    }
}

function limpar() { // Reload
    location.reload()
}