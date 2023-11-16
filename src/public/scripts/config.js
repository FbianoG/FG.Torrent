// Variáveis
let containerList = document.querySelectorAll(".containerList")[0];
let cardPlans = document.querySelectorAll(".cardPlans")[0];
let cardDocs = document.querySelectorAll(".cardDocs")[0];
let cardRamais = document.querySelectorAll(".cardRamais")[0];
let list = document.querySelectorAll(".list")[0];
let legends = document.querySelectorAll(".legends")[0];
let formCreate = document.querySelectorAll('.formCreate')[0]


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

cardPlans.addEventListener("click", getDataPlans);
cardDocs.addEventListener("click", getDataDocs);
cardRamais.addEventListener("click", getDataRamais);




// Funções

async function getDataPlans() { // Faz requisição dos "Planos" ao "DataBase"
	// try {
	editLegends("Planos")
	createLoad(); // Cria elemento animado de "loading"
	const api = await fetch(`/getPlans?id=${token}`)
	const data = await api.json()
	createListPlans(data); // Cria a lista de acordo com os dados vindo do "DataBase"
	// } catch (error) {
	// 	console.error({ menssage: "Um erro foi encontrado: ", error });
	// }
}

async function getDataDocs() { // Faz requisição dos "Documentos" ao "DataBase"
	try {
		editLegends("Documentos");
		createLoad(); // Cria elemento animado de "loading"
		const api = await fetch(`/getBranches?id=${token}`);
		const data = await api.json();
		console.log(data);
		createListDocs(data); // Cria a lista de acordo com os dados vindo do "DataBase"
	} catch (error) {
		console.error({ menssage: "Um erro foi encontrado: ", error });
	}
}

async function getDataRamais() { // Faz requisição dos "Ramais" ao "DataBase"
	try {
		editLegends("Ramais");
		createLoad(); // Cria elemento animado de "loading"
		const api = await fetch(`/getBranches?id=${token}`);
		const data = await api.json();
		console.log(data);
		createListRamais(data); // Cria a lista de acordo com os dados vindo do "DataBase"
	} catch (error) {
		console.error({ menssage: "Um erro foi encontrado: ", error });
	}
}

function createListPlans(e) { // Cria a lista de "Planos" com os dados vindo do "DataBase"
	list.innerHTML = ""
	newFormCreatePlans()
	e.forEach(element => {
		let newCardPlan = document.createElement("li")
		newCardPlan.classList = "card"
		newCardPlan.innerHTML = newCardPlanHtml(element) // Cria o HTML do "plano" com os dados do DataBase
		list.appendChild(newCardPlan)
		verificStatus(newCardPlan) // Verifica se o "Status" do elemento está ativo
	})
	createEvent(); // Cria eventos dos "Buttons" dos cards
}

function createListRamais(e) { // Cria a lista de "Ramais" com os dados vindo do "DataBase"
	list.innerHTML = ""
	newFormCreateRamal()
	e.forEach(element => {
		let newCardPlan = document.createElement("li")
		newCardPlan.classList = "card"
		newCardPlan.innerHTML = NewCardRamalHtml(element) // Cria o HTML do "Ramal" com os dados do DataBase
		list.appendChild(newCardPlan)
	});
	createEvent(); // Cria eventos dos "Buttons" dos cards
}

function createListDocs(e) { // Cria a lista de "Documentos" com os dados vindo do "DataBase"
	list.innerHTML = ""
	newFormCreateDocs()
	e.forEach(element => {
		let newCardPlan = document.createElement("li")
		newCardPlan.classList = "card"
		newCardPlan.innerHTML = NewCardDocsHtml(element) // Cria o HTML do "Documento" com os dados do DataBase
		list.appendChild(newCardPlan)
	});
	createEvent(); // Cria eventos dos "Buttons" dos cards
}

function newFormCreatePlans() { // Cria formulário para inclusão de um novo Plano
	formCreate.innerHTML = `
	<label>Criar Plano</label>
	<form action="/createPlan?id=${token}" method="post">
		<input type="text" name="nome" placeholder="Nome" required>
		<input type="text" name="login" placeholder="Login">
		<input type="text" name="password" placeholder="Senha">
		<button type="submit">Criar</button>
	</form>`
}

function newFormCreateRamal() { // Cria formulário para inclusão de um novo "Ramal"
	formCreate.innerHTML = `
		<label>Criar Ramal</label>
        <form action="/createRamal?id=${token}" method="post">
            <input type="text" name="setor" placeholder="Setor">
            <input type="text" name="ramal" placeholder="Ramal">
            <button type="submit">Criar</button>
        </form>`
}

function newFormCreateDocs() { // Cria formulário para inclusão de um novo Documento
	formCreate.innerHTML = `
	<label>Criar Documento</label>
	<form action="/createDocs?id=${token}" method="post">
		<input type="text" name="nome" placeholder="Nome" required>
		<input type="file" name="src" placeholder="Arquivo">
		<button type="submit">Criar</button>
	</form>`
}

function verificStatus(e) { // Verifica se o "Status" do elemento está ativo para mudar a cor
	let spanStatus = e.querySelectorAll(".spanStatus")[0]
	if (spanStatus.parentElement.textContent == "true") {
		spanStatus.style.background = "#75e06a"
	} else {
		spanStatus.style.background = "#e64f4f"
	}
}

function createEvent() { // Cria eventos dos "Buttons" dos cards
	let btnExtend = document.querySelectorAll(".btnExtend")
	let btnEdit = document.querySelectorAll(".btnEdit")
	btnExtend.forEach(element => {
		element.addEventListener("click", extendCard)
	})
	btnEdit.forEach(element => {
		element.addEventListener("click", editable)
	})
}

function extendCard(e) { // Expande o card ao clicar no button
	let card = this.parentElement
	let btnIcon = this.querySelectorAll(".fa-solid")[0]
	if (btnIcon.style.transform == "rotate(180deg)") {
		btnIcon.style.transform = ""
		card.style.maxHeight = "50px"
	} else {
		btnIcon.style.transform = "rotate(180deg)"
		// console.log(card);
		card.style.maxHeight = "165px"
	}
}

function newCardPlanHtml(e) { // Cria o HTML do "plano" com os dados do DataBase
	const html = `
        <p>${e.nome}</p>
        <p>${e.create.slice(0, 10).split("-").reverse().join("/")}</p>
        <p>${e.update.slice(0, 10).split("-").reverse().join("/")}</p>
        <p>${e.login}</p>
        <p>${e.password}@2020</p>
        <p><span class="spanStatus"></span>${e.active}</p>
        <button class="btnExtend"><i class="fa-solid fa-caret-down"></i></button>
        <form action="/updatePlan?id=${token}" id="formEdit" method="post">
            <input type="text" name="id" disabled value="${e.id}" style="display: none">
            <label for="">Nome:</label>
            <input type="text" name="nome" id="nome" disabled value="${e.nome}">
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
                <label for="">Inativo / Ativo:</label>
                <input type="range" name="active" min="0" max="1" value="${e.active == true ? 1 : 0}" disabled>
                <button type="button" value="Editar" class="btnEdit">Editar</button>
                <button type="submit" value="Update">Update</button>
            </div>
        </form>
    `;
	return html;
}

function NewCardRamalHtml(e) { // Cria o HTML do "ramal" com os dados do DataBase
	const html = `
    <p>${e.setor}</p>
    <p>${e.ramal}</p>
    <p>${e.create.slice(0, 10).split("-").reverse().join("/")}</p>
    <p>${e.update.slice(0, 10).split("-").reverse().join("/")}</p>
    <button class="btnExtend"><i class="fa-solid fa-caret-down"></i></button>
    <form action="/updateBranche?id=${token}" id="formEdit" method="post">
        <input type="text" name="id" disabled value="${e.id}" style="display: none">
        <label for="">Setor:</label>
        <input type="text" name="setor" id="nome" disabled value="${e.setor}">
        <label for="">Ramal:</label>
        <input type="text" name="ramal" disabled value="${e.ramal}">
        <div class="dataBtn">
            <button type="button" value="Editar" class="btnEdit">Editar</button>
            <button type="submit" value="Update">Update</button>
        </div>
    </form>
`
	return html
}

function editable() { // Transforma os "inputs" em editáveis
	let card = this.parentElement.parentElement
	let input = card.querySelectorAll("input")
	let textArea = card.querySelectorAll("textArea")[0]
	if (this.textContent == "Editar") {
		this.textContent = "Cancelar"
		input.forEach(element => {
			element.removeAttribute("disabled")
		});
		textArea.removeAttribute("disabled")
	} else {
		this.textContent = "Editar"
		input.forEach(element => {
			element.setAttribute("disabled", true)
		});
		textArea.setAttribute("disabled", true)
	}
}

function createLoad() { // Cria elemento animado de "loading"
	list.innerHTML = ""
	let load = document.createElement("div")
	load.classList = "loading"
	load.innerHTML = `
    <div class="circle"><div class="minorCircle"></div></div>
	<p>Buscando...</p>
    `
	list.appendChild(load)
}

function editLegends(e) { // Muda legenda da lista de acordo com filtro selecinado
	if (e == "Ramais") {
		legends.innerHTML = `
            <label>Setor</label>
            <label>Ramal</label>
            <label>Criado em</label>
            <label>Atualizado em</label>`
	} else if (e == "Documentos") {
		legends.innerHTML = `
            <label>Documento</label>
            <label>Arquivo</label>`;
	} else {
		legends.innerHTML = `
            <label>Plano</label>
            <label>Criado em</label>
            <label>Atualizado em</label>
            <label>Usuário</label>
            <label>Senha</label>
            <label>Status</label>`;
	}

}




// Chamadas 

getDataPlans();