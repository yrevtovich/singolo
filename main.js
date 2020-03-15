const MENU = document.querySelector('.main-navigation');

MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach( (elem) => elem.classList.remove('active'));
    if (event.target.tagName === "A") {
        event.target.classList.add('active');
    }
})


const DISPLAY

const GALLERY = document.querySelector('.portfolio-gallery');

GALLERY.addEventListener('click', (event) => {
    GALLERY.querySelectorAll('IMG').forEach( elem => elem.classList.remove('portfolio-gallery-item-active'));
    GALLERY.querySelectorAll('LI').forEach( elem => elem.classList.remove('portfolio-gallery-item-active'));
    console.log(event.target.tagName)
    if (event.target.tagName === "LI" || event.target.tagName === "IMG") {
        event.target.classList.add('portfolio-gallery-item-active');
    }
})

