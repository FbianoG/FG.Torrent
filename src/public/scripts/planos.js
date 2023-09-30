let planos = []

async function get() {
    let api = await fetch('/index')
    let dados = await api.json()
    console.log(dados);
    dados.forEach(plano => {
        planos.push(plano)
    })
    gera()
}
get()

function gera() {

    // Criar transition ao tirar mouse do menu lateral (para evitar problemas no carregamento com transition já definida)
    document.querySelectorAll('nav')[0].addEventListener('mouseleave', (e) => {
        e.target.style.transition = '400ms'
    })

    let lista = document.querySelector('#lista')
    function gerar(planos) {
        lista.innerHTML = ''
        for (let i = 0; i < planos.length; i++) {
            let novoPlano = document.createElement('div')
            novoPlano.className = 'card'
            novoPlano.innerHTML = `
                <h2>${planos[i].nome}</h2><label>User: </label><p class='user'>${planos[i].login}</p><label>Senha: </label><p class='password'>${planos[i].password}</p><div class="data">
                <a class='file'><i class="fa-solid fa-folder file"></i></a>
                <a href="${planos[i].web}" target="_blank"><i class="fa-solid fa-globe"></i></a>
                </div>
            `
            lista.appendChild(novoPlano)
        }
        capitalizar()
    }
    gerar(planos)

    lista.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.value == 'user' || target.classList.value == 'password') {
            let popup = document.querySelectorAll('.popup')[0]
            let copiado = document.querySelector('#copiado')
            navigator.clipboard.writeText(target.textContent)
            copiado.innerText = `"${target.textContent}"`
            popup.style.bottom = '20px'
            popup.style.transition = '600ms'
            popup.style.opacity = '1'
            setTimeout(hidden, 3500)
            function hidden() {
                popup.style.bottom = '-100px'
                popup.style.transition = '600ms'
                popup.style.opacity = '0'
            }
        }
        else if (target.parentElement.classList.value == 'file') {
            let alvo = target.parentElement.parentElement.parentElement.querySelectorAll('h2')[0]
            let alvoEncontrado = planos.find(function (obj) {
                return obj.nome == alvo.textContent.toLowerCase()
            })
            console.log(alvoEncontrado);
            if (alvoEncontrado) {
                let deep = document.querySelectorAll('.deep')[0]
                let dados = document.createElement('div')
                dados.className = 'dados'
                dados.innerHTML = `
                    <h1>${alvoEncontrado.nome.toUpperCase()}</h1>
                    <br><br>
                    <p><b>Código de prestador:</b> ${alvoEncontrado.data.cod}</p>
                    <br>
                    <p><b>Telefone:</b> ${alvoEncontrado.data.tel}</p>
                    <p><b>Email:</b> ${alvoEncontrado.data.email}</p>
                    <br>
                    <p><b>Autorização:</b> ${alvoEncontrado.data.att}</p>
                    <p><b>Senha:</b> ${alvoEncontrado.data.senha}</p>
                    <p><b>Guia:</b> ${alvoEncontrado.data.guia}</p><br>
                    <p><b>Obs:</b> ${alvoEncontrado.data.obs}</p>
                    <span><i class="fa-solid fa-arrow-right-from-bracket" id='exit'></i></span>
                `
                deep.insertBefore(dados, deep.firstChild)
                deep.style.opacity = '1'
                deep.style.zIndex = '10'
                document.querySelector('#exit').addEventListener('click', (ex) => {
                    ex.target.parentElement.parentElement.remove()
                    deep.style.opacity = '0'
                    deep.style.zIndex = '-1'
                })
            }
            else {
                console.log('não encontrado')
            }
        }
        else {
            return
        }
    });

    let search = document.querySelector('#search-input')

    search.addEventListener('keyup', () => {
        let resultado = planos.filter(plano => {
            return plano.nome.toLowerCase().includes(search.value.toLowerCase())
        })
        gerar(resultado)
    })

    function capitalizar() {
        let h2 = document.querySelectorAll('h2')
        h2.forEach(titulo => {
            let arrayTitulo = titulo.textContent.split(' ')
            let tituloCapitalizado = arrayTitulo.map(palavra => {
                return palavra.charAt(0).toUpperCase() + palavra.slice(1)
            })
            titulo.textContent = tituloCapitalizado.join(' ')
        })
    }
}