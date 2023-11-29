// Variáveis
let list = document.querySelectorAll('.list')[0]

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




// Funções

function createElement(e) {
    list.innerHTML = ""
    let sitesOrderly = e.sort((a, b) => { // Ordena os sites por ordem alfabética
        return a.name.localeCompare(b.name)
    })
    sitesOrderly.forEach(element => {
        let newCard = document.createElement('li')
        newCard.innerHTML = `
        <a href="${element.web}" target="_blank">
            <div class="image">
                <img src="${element.src}" alt="">
            </div>
            <p>${element.name}</p>
        </a>
        `
        list.appendChild(newCard)
    });
}

async function getSites() {
    const api = await fetch(`/getSites?id=${token}`)
    const data = await api.json()
    createElement(data)
}




// Chamadas

getSites()