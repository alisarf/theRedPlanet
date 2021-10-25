var hamburgerdiv = document.getElementById('hamburger-wrapper');
var navoptions = document.getElementById('nav-options-wrapper');



let showMenu = false;

hamburgerdiv.addEventListener('click', ()=> {

    if(!showMenu) {
        hamburgerdiv.classList.add('open');
        navoptions.classList.add('show');
        console.log('yooo')
        showMenu = true;
    } else {
        hamburgerdiv.classList.remove('open');
        navoptions.classList.remove('show');
        console.log('ayeee')
        showMenu = false;
    }
})

