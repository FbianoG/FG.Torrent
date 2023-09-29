// Criar transition ao tirar mouse do menu lateral (para evitar problemas no carregamento com transition já definida)
document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => {
    e.target.style.transition = '400ms'
})


let btnAdd = document.querySelector('#btnAdd')
let card = document.querySelectorAll('.dadosProcedimentos')[0]
btnAdd.addEventListener('click', () => {
    let list = document.querySelectorAll('.listProcedimentos')[0]
    console.log(list.children.length);
    if (list.children.length < 5) {
        let num = list.children.length + 1
        let newProcedimento = document.createElement('div')
        newProcedimento.classList = `procedimento${num} procedimentos`
        newProcedimento.innerHTML = `
            <label for="">Cód. Procedimento:</label>
            <input type="text" id='proced${num}'>
            <label for="">Nome do Procedimento:</label>
            <input type="text" id='des${num}'>
            <label for="">Quantidade</label>
            <select name="" id="qtd${num}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>`

        list.appendChild(newProcedimento)
        window.scrollTo({
            top: window.scrollY + 1000, behavior: 'smooth'
        })
    }
})

card.addEventListener('keyup', (e) => {
    let desProcedimento = e.target.parentElement.children[3]
    let input = e.target.value
    let codigos = {
        '10102019': 'Visita Hospitalar (Paciente Internado)',
        '10104020': 'Atendimento médico do intensivista em uti',
        '10104011': 'Atendimento do intensivista diarista',
        '31309054': 'Cesariana',
        '31303013': 'Aspiração manual intra-uterina (AMIU)',
    }
    if (input in codigos) { // Verifica se o "input" existe em "codigos"
        desProcedimento.value = codigos[input]
        if (input == '10104020') {
            e.target.parentElement.children[5].value = 2
        }
    }
})

let btnGerar = document.querySelectorAll('.gerar')[0]
let btnLimpar = document.querySelectorAll('.limpar')[0]
btnGerar.addEventListener('click', gerar)
btnLimpar.addEventListener('click', limpar)


function gerar() {
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
}

function limpar() {
    location.reload()
}
