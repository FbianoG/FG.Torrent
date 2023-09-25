let btnFind = document.querySelector('#btn-find')
let input = document.querySelector('#nome-find')
let btn = document.querySelector('#btn')

// Criar transition ao tirar mouse do menu lateral (para evitar problemas no carregamento com transition já definida)
window.addEventListener('DOMContentLoaded', (e) => {
    document.querySelectorAll('nav')[0].style.transition = '400ms'
})

btnFind.addEventListener('click', async () => {
    try {
        let api = await fetch(`/find?nome=${input.value.toLowerCase()}`)
        let data = await api.json()
        console.log(data);
        if (data) {
            btn.parentElement.action = '/att'
            btn.value = 'Editar Plano'
            let id = document.querySelector('input[name="id"')
            let nome = document.querySelector('input[name="nome"')
            let login = document.querySelector('input[name="login"')
            let password = document.querySelector('input[name="password"')
            let web = document.querySelector('input[name="web"')
            let cod = document.querySelector('input[name="cod"')
            let tel = document.querySelector('input[name="tel"')
            let email = document.querySelector('input[name="email"')
            let att = document.querySelector('input[name="att"')
            let guia = document.querySelector('input[name="guia"')
            let senha = document.querySelector('input[name="senha"')
            let obs = document.querySelector('textarea[name="obs"')
            id.value = data._id
            nome.value = data.nome
            login.value = data.login
            password.value = data.password
            web.value = data.web
            cod.value = data.data.cod
            tel.value = data.data.tel
            email.value = data.data.email
            att.value = data.data.att
            guia.value = data.data.guia
            senha.value = data.data.senha
            obs.value = data.data.obs
        }

        // btnFind 
    }
    catch (err) {
        console.log(err)
    }
})