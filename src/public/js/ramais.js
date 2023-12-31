// Viriáveis //
let searchInput = document.querySelector("#search-input");
let listaRamais = document.querySelectorAll(".ramais-card")[0];
let title = document.querySelectorAll("h2")[0];
let ramais = [];


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


// Eventos //

document.querySelectorAll("nav")[0].addEventListener("mouseleave", (e) => { // Cria style.transiton no Menu
	e.target.style.transition = "400ms";
});
searchInput.addEventListener("keyup", filterForSetor); // Pesquisar "setor" pelo valor do"input"




// Funções //

async function getRamais() { // Pegar dados vindo do DataBase 
	try {
		const getRamais = await fetch(`/getBranches?id=${token}`);
		const Data = await getRamais.json();
		if (Data.length > 0) {
			ramais = Data;
			gerar(ramais);
		} else {
			console.log("Não foram encontrados dados.");
		}
	} catch (error) {
		console.error({ message: "Um erro foi encontrado", error });
	}
}

function gerar(e) {
	let oderedRamais = orderRamais(e); // Ordena "lista de ramais" por ordem alfabética
	listaRamais.innerHTML = "";
	oderedRamais.forEach(element => {
		let newCardRamal = document.createElement("li");
		newCardRamal.classList = "card";
		newCardRamal.innerHTML = cardRamalHtml(element); // cria o "HTML" do "ramal"
		listaRamais.appendChild(newCardRamal);
	});
}

function cardRamalHtml(e) { // cria o "HTML" do "ramal"
	const html = `
    <p class="card-setor">${e.setor}</p>
    <p class="card-ramal">${e.ramal}</p>`;
	return html;
}

function orderRamais(e) { // Ordena "lista de ramais" por ordem alfabética
	return Array.from(e).sort((a, b) => {
		return a.setor.localeCompare(b.setor);
	});
}

function filterForSetor() { // Pesquisar "setor" pelo valor do"input"
	let filter = ramais.filter(ramal => {
		return ramal.setor.includes(searchInput.value.toLowerCase());
	});
	gerar(filter);
}



// Chamadas //

getRamais(); // Pegar dados vindo do DataBase