let sites = [
    {
        name: "integra",
        src: "./imagens/integra.png",
        url: "https://impar.requestia.com/authentication/profile/select.aspx"
    },
    {
        name: "sisqual",
        src: "./imagens/sisqual.jpg",
        url: "https://gestaoescala.redeimpar.com.br/sisqualIdentityServer/core/login?signin=c9f7760209ff50b1b374034843e92359"
    },
    {
        name: "pulses",
        src: "./imagens/pulses.png",
        url: "https://www.pulses.com.br/app/engage/survey?ctoken=M2JiNWZkOGExNGQ4NDc5ZmMwNzliODJmM2EzMGU5MmIzMjUwbW1vaTd1dTE="
    },
    {
        name: "multitone",
        src: "./imagens/multitone.png",
        url: "http://10.4.254.19/#"
    },
    {
        name: "portal pessoas",
        src: "./imagens/dasa.png",
        url: "https://adfs.dasa.com.br/adfs/ls/?SAMLRequest=hZLBbuIwEEB%2FJXLPsR0npWAFJFq0KlK7RYXtoTfHNuBVMmY9zqb79w2hq3JpuY6eNe9pXM7buIdn%2B6e1GJM5og3RebjzgG1jw9qGv07bX88PU7KP8YCSMdVVApvfdUWV1r6FiNSDsY0CQ7VvGKqmFsyZA1MaL9EkWQUfvfb1rQPjYDclbQDpFTqUoBqLMmq5nj8%2BSEG5rE4QyvvNZpWuntYbkix6cwfqqH0mabZIjUJ1XEKrMAxYjYwky8WUrHmmK21zlVYTa9NCiFGqRsU4HWteiNGk4DdG9Shia5eAUUGcEsFFnmY8zUab7EaKXF5ndDzOX0nyYgMO63tHkrw1NeD3HYeP6A9YAorvH6j%2Fl%2Fl8UZxq%2B9iu62iXUx92THCeMV6wHrKgrz7p%2FAuaMz450gbd7orMyt5EDtlhduF0JTtjy5%2B98nKx8rXT%2F5IfPjQqfl2U0WyYOJNuB1S2gAer3dZZQ9isZOffcvYO&RelayState=arc6ad74e&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=WE4Xpswb8n07PZxExBuQ97rKdNPHRjuTeGh9KZHRNyuxCq6ICaXagnZAH6KgcY473yUedsKoYsvPYCzaxNZmjcN6DvMKEMAjuoUhaPNhsAcw3w69F8Ec0P5jrwB5CmWOcpTxoKm3kdBEAfzZK7IrjE0InxwcLyahIVIh9I08St%2BSl3bnGzG1ZImmn%2B%2FpTkNTHBkedOfMlRwQguC3GdG38bvs8YPOqkl9u5I%2FnIaoc4QPRoHsZMgYLBO9p0espfCE%2FPMhliAwbAapFmZU0bplle%2Bh95guhgU6VHgQk8NSI2ozP1YSrSInfkSqsOu%2FLJfw3W1q0O%2BCUs2PM7FFjfw8Fg%3D%3D"
    },
    {
        name: "green",
        src: "./imagens/green.png",
        url: "https://portal-drp.green-sempapel.com.br/greenplus-web/"
    },
    {
        name: "Workplace",
        src: "./imagens/workplace.png",
        url: "https://dasa.workplace.com/work/landing/input/"
    },
    {
        name: "alterar senha do integra",
        src: "./imagens/alterarSenha.png",
        url: "https://alteresuasenha.redeimpar.com.br/RDWeb/Pages/en-US/password.aspx"
    },
]

let list = document.querySelectorAll('.list')[0]






let sitesOrderly = sites.sort((a,b) =>{
    return a.name.localeCompare(b.name)
})


sitesOrderly.forEach(element => {
    createElement(element)
});



function createElement(e) {
    let newCard = document.createElement('li')
    newCard.innerHTML = `
    <a href="${e.url}" target="_blank">
        <div class="image">
            <img src="${e.src}" alt="">
        </div>
        <p>${e.name}</p>
    </a>
    `
    list.appendChild(newCard)
}