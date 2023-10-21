let cardPlans = document.querySelectorAll('.cardPlans')[0]
let cardDocs = document.querySelectorAll('.cardDocs')[0]
let cardRamais = document.querySelectorAll('.cardRamais')[0]
let list = document.querySelectorAll('.list')[0]


cardPlans.addEventListener('click', getData)
cardDocs.addEventListener('click', getData)
cardRamais.addEventListener('click', getData)


// getData()


async function getData() {
    let inf = this.querySelectorAll('h2')[0].textContent
    try {
        const api = await fetch(`/getData?inf=${inf}`)
        const data = await api.json()
        getList(data)
    } catch (error) {
        console.error({ menssage: "Um erro foi encontrado: ", error })
    }
}

function getList(e) {
    console.log(e);
    list.innerHTML = ""
    e.forEach(element => {
        let newCardPlan = document.createElement('li')
        newCardPlan.classList = 'card'
        newCardPlan.innerHTML = newCardPlanHtml(element)
        list.appendChild(newCardPlan)

        verificStatus(newCardPlan)
    });
    createEvent()
}



function verificStatus(e) {
    let spanStatus = e.querySelectorAll(".spanStatus")[0]

    if (spanStatus.parentElement.textContent == "true") {
        spanStatus.style.background = "#75e06a"
    } else {
        spanStatus.style.background = "#e64f4f"
    }
}

function createEvent() {
    let btnExtend = document.querySelectorAll('.btnExtend')
    let btnEdit = document.querySelectorAll('.btnEdit')
    btnExtend.forEach(element => {
        element.addEventListener('click', extendCard)
    });
    btnEdit.forEach(element => {
        element.addEventListener('click', editable)
    });

}

function extendCard(e) {
    let card = this.parentElement
    let btnIcon = this.querySelectorAll('.fa-solid')[0]
    if (btnIcon.style.transform == "rotate(180deg)") {
        btnIcon.style.transform = ""
        card.style.height = ""
    } else {
        btnIcon.style.transform = "rotate(180deg)"
        // console.log(card);
        card.style.height = "auto"
    }
}

function newCardPlanHtml(e) { // Cria o HTML do "plano" com os dados do DataBase
    const html = `
        <p>${e.nome}</p>
        <p>${e.create.slice(0, 10).split('-').reverse().join('/')}</p>
        <p>${e.create.slice(0, 10).split('-').reverse().join('/')}</p>
        <p>${e.login}</p>
        <p>${e.password}@2020</p>
        <p><span class="spanStatus"></span>${e.active}</p>
        <button class="btnExtend"><i class="fa-solid fa-caret-down"></i></button>
        <form action="/updatePlan" id="formEdit" method="post">
            <input type="text" name="id" disabled value="${e.id}" style="display: none">
            <label for="">Nome:</label>
            <input type="text" name="nome" disabled value="${e.nome}">
            <label for="">WebSite:</label>
            <input type="text" name="web" disabled value="${e.web}">
            <label for="">Usuário:</label>
            <input type="text" name="login" disabled value="${e.login}">
            <label for="">Senha:</label>
            <input type="text" name="password" disabled value="${e.password}">
            <label for="">Cod. Prestador:</label>
            <input type="text" name="cod" disabled value="${e.data.cod}">
            <label for="">Telefones:</label>
            <input type="text" name="tel" disabled value="${e.data.tel}">
            <label for="">E-mail:</label>
            <input type="text" name="email" disabled value="${e.data.email}">
            <label for="">Autorização:</label>
            <input type="text" name="att" disabled value="${e.data.att}">
            <label for="">Requer Guia:</label>
            <input type="text" name="guia" disabled value="${e.data.guia}">
            <label for="">Requer Senha:</label>
            <input type="text" name="senha" disabled value="${e.data.senha}">
            <label for="">Observação:</label>
            <textarea name="obs" disabled >${e.data.obs}</textarea>
            <div class="dataBtn">
                <input type="range" name="active" min="0" max="1" value="${e.active == true ? 1 : 0}" disabled>

                    <input type="button" value="Editar" class="btnEdit">
                    <input type="submit" value="Update">
                    <input type="submit" value="Cancelar" class="btnStatus">
            </div>
        </form>
    `
    return html
}

function editable() { // Transforma os "inputs" em editáveis
    let card = this.parentElement.parentElement
    let input = card.querySelectorAll('input')
    let textArea = card.querySelectorAll("textArea")[0]
    input.forEach(element => {
        element.removeAttribute("disabled")
    });
    textArea.removeAttribute("disabled")
}