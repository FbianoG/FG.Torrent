let btnPrint = document.querySelectorAll('.btnPrint')[0]

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


btnPrint.addEventListener('click', ()=>{
    print()
})