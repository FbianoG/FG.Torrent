

const urlParams = new URLSearchParams(window.location.search)
let token = urlParams.get('id')


async function loadValidation() {
    localStorage.setItem("token", token)
    window.location.href = "/planos"
}


loadValidation()