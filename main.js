const MENU = document.querySelector('.main-navigation');
const PHONES = document.querySelector('.phones');
const GALLERY = document.querySelector('.portfolio-gallery');

MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach( (elem) => elem.classList.remove('active'));
    if (event.target.tagName === "A") {
        event.target.classList.add('active');
    }
});

PHONES.addEventListener('click', (event) => {
    let phoneClass = event.target.classList[0];
    PHONES.querySelectorAll('.display').forEach( elem => {
        if (elem.classList.contains(phoneClass)) {
            elem.classList.toggle('hide-display');
        }
    });
});

GALLERY.addEventListener('click', (event) => {
    GALLERY.querySelectorAll('IMG').forEach( elem => elem.classList.remove('portfolio-gallery-item-active'));
    GALLERY.querySelectorAll('LI').forEach( elem => elem.classList.remove('portfolio-gallery-item-active'));
    console.log(event.target.tagName)
    if (event.target.tagName === "LI" || event.target.tagName === "IMG") {
        event.target.classList.add('portfolio-gallery-item-active');
    }
});

