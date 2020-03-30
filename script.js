const MENU = document.querySelector('.main-navigation');
const MENU_WRAPPER = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-link');
const PHONES = document.querySelector('.phones');
const GALLERY = document.querySelector('.portfolio-gallery');
const GALLERY_TABS = document.querySelector('.portfolio-navigation');
const FORM = document.querySelector('.message-form');
const FORM_BTN = document.querySelector('.submit-btn');
const SLIDER_ITEMS = document.querySelectorAll('.slider-item');
const sliderBtnRight = document.querySelector('.slider-arrow-right');
const sliderBtnLeft = document.querySelector('.slider-arrow-left');
const topOffset = document.querySelector('.header').offsetHeight;
const mobMenuBtn = document.querySelector('.mob-menu-btn ');
const mainLogo = document.querySelector('.main-logo');


let currentSlide = 0;
let nextSlide = 0;
let isClickActionAvailable = true;
let mobMenuActive = false;
let leftOffset = 0;
    
window.addEventListener('scroll', scrollChangeMenuStyle);

MENU.addEventListener('click', event => {
    MENU.querySelectorAll('a').forEach( (elem) => elem.classList.remove('active'));
    if (event.target.tagName === "A") {
        event.target.classList.add('active');
    }
});

navLinks.forEach( link => {
    link.addEventListener('click', function(elem) {
        elem.preventDefault();

        let linkName = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(linkName);        
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset + 1;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });

        if ( MENU_WRAPPER.classList.contains('show') ) {
            activateMobMenu();
        }

    });
}); 

function scrollChangeMenuStyle() {
    let windowPosition = window.scrollY;   
    document.querySelectorAll('.container').forEach(function(section) {              
        let sectionOffset = section.offsetTop;    
        let sectionHeight = section.offsetHeight;    
        let sectionName = section.getAttribute('id');
        
        if (windowPosition >= sectionOffset - topOffset && windowPosition <= sectionOffset + sectionHeight) {

            navLinks.forEach( link => {
                link.classList.remove('active');
                if ( link.getAttribute('href').substring(1) === sectionName) {
                    link.classList.add('active');
                }
                if ( (sectionName === 'slider' || sectionName === 'header') && link.getAttribute('href').substring(1) === 'home') {
                    link.classList.add('active');
                }
            });
        }
    });       
}

PHONES.addEventListener('click', event => {
    let phoneClass = event.target.classList[0];
    PHONES.querySelectorAll('.display').forEach( elem => {
        if (elem.classList.contains(phoneClass)) {
            elem.classList.toggle('hide-display');
        }
    });
});

GALLERY.addEventListener('click', event => {
    GALLERY.querySelectorAll('LI').forEach( elem => elem.classList.remove('portfolio-gallery-item-active'));

    if (event.target.tagName === 'IMG') {
        event.target.parentElement.classList.add('portfolio-gallery-item-active');
    }
});

GALLERY_TABS.addEventListener('click', event => {    
    if (event.target.classList.contains('portfolio-navigation-item-active')) return;
    if (event.target.tagName === 'LI') {
        GALLERY_TABS.querySelectorAll('.portfolio-navigation-item').forEach( elem => {
            if ( elem.classList.contains('portfolio-navigation-item-active')) {
                elem.classList.remove('portfolio-navigation-item-active');
            }
        });

        event.target.classList.add('portfolio-navigation-item-active');   
        
        GALLERY_TABS.querySelectorAll('.portfolio-navigation-item').forEach( (item, index) => {
            if( item === event.target) {
                changeGalleryItemsOrder();
            }
        });
    }
});

function changeGalleryItemsOrder() {
    let galleryElemArr = [];
    GALLERY.querySelectorAll('.portfolio-gallery-item').forEach( (elem, idx, arr) => {  
        if ( (idx + 1) < arr.length) {
            galleryElemArr[idx + 1] = elem.cloneNode(true);
            elem.remove();
        } else {
            galleryElemArr[0] = elem.cloneNode(true);
            elem.remove();
        }
    });

    galleryElemArr.forEach( elem => {
        GALLERY.appendChild(elem);
    });
}



FORM_BTN.addEventListener('click', event => {
    if( FORM.checkValidity()) {
        event.preventDefault();
        displaySendMessage();
    }
})

function displaySendMessage() {
    const subject = document.querySelector('.subject-field');
    const description = document.querySelector('.message-field');

    document.body.classList.add('cancel-scroll');

    let messageBlockBg = messageConstruction(subject.value, description.value);

    messageBlockBg.querySelector('.message-btn').addEventListener('click', () => {
        messageBlockBg.remove();
        document.body.classList.remove('cancel-scroll');
        subject.value = '';
        description.value = '';
        document.querySelector('.name-field').value = '';
        document.querySelector('.email-field').value = '';
    })
}


function messageConstruction(sbj, descr) {
    let messageBlockBg = document.createElement('div');
    messageBlockBg.classList.add('message-block-bg');
    document.body.append(messageBlockBg);

    let messageBlock = document.createElement('div');
    messageBlock.classList.add('message-block');
    messageBlockBg.append(messageBlock);

    let messageHeader = document.createElement('h3');
    messageHeader.classList.add('message-header');
    messageHeader.innerText = 'The letter was sent ';
    messageBlock.append(messageHeader);

    let subject = document.createElement('p');
    subject.classList.add('message-subject');
    messageBlock.append(subject);

    let description = document.createElement('p');
    description.classList.add('message-description');
    messageBlock.append(description);

    let button = document.createElement('button');
    button.classList.add('message-btn');
    button.innerText = 'Ok';
    messageBlock.append(button);

    if ( sbj.length > 0 ) {
        subject.innerText = `Subject:   \"${sbj}\"`;        
    } else {
        subject.innerText = 'Without subject';
    }

    if ( descr.length > 0 ) {
        description.innerText = `Description:   \"${descr}\"`;
    } else {
        description.innerText = 'Without description';
    }

    return messageBlockBg;
}

function changeSlide(directionOut, directionIn) {
    if(!isClickActionAvailable) {
        return
    }
    isClickActionAvailable = false;
    moveSlides('to', directionOut, currentSlide);
    nextSlide = (nextSlide + 1) % SLIDER_ITEMS.length;
    moveSlides('from', directionIn, nextSlide);
    currentSlide = nextSlide;
}

function moveSlides(type, direction, slide) {
    if (type === 'from') {
        SLIDER_ITEMS[slide].classList.remove('hide');
    }
    SLIDER_ITEMS[slide].classList.add(`move-${type}-${direction}`);
}

SLIDER_ITEMS.forEach((elem, index) => {
    elem.addEventListener('animationend', slideAnimationend.bind(null, elem, index));
});

function slideAnimationend(elem, index) {
    elem.classList.remove('move-to-right', 'move-from-right', 'move-to-left', 'move-from-left');
    if(currentSlide !== index){
        elem.classList.add('hide');
    }
    isClickActionAvailable = true;
}

sliderBtnLeft.addEventListener('click', () => {
    changeSlide('left', 'right');
});

sliderBtnRight.addEventListener('click', () => {
    changeSlide('right', 'left');
});


mobMenuBtn.addEventListener('click', activateMobMenu);

function activateMobMenu() {
    document.body.classList.toggle('cancel-scroll-mob');
    
    if (mobMenuActive === false) {
        mobMenuActive = true;
        document.querySelector('.mob-menu-btn').classList.add('rotate-open');
        document.querySelector('.mob-menu-btn').classList.remove('rotate-close');
        MENU_WRAPPER.classList.add('show-menu', 'show');
        setPropertyOpen();
        mainLogo.classList.add('move-logo-open');
        
    } else {
        mobMenuActive = false;
        document.querySelector('.mob-menu-btn').classList.add('rotate-close');
        document.querySelector('.mob-menu-btn').classList.remove('rotate-open');
        MENU_WRAPPER.classList.add('hide-menu');
        setPropertyClose();
        mainLogo.classList.add('move-logo-close');
        
    }
    
}


// MENU.addEventListener('click', activateMobMenu);

MENU_WRAPPER.addEventListener('animationend', elem => {
    MENU_WRAPPER.classList.remove('hide-menu', 'show-menu');
    if (mobMenuActive === false) {
        MENU_WRAPPER.classList.remove('show');
    }

})

mainLogo.addEventListener('animationend', elem => {
    mainLogo.classList.remove('move-logo-open', 'move-logo-close');    
    document.querySelector('.logo-wrapper').classList.toggle('center');
    if (mobMenuActive === true) {
        mainLogo.classList.add('menu-logo');
    } else {
        mainLogo.classList.remove('menu-logo');
    }
});

function setPropertyOpen() {
    leftOffset = mainLogo.offsetLeft;
    mainLogo.style.setProperty('--spaceOpen', `${(77-leftOffset)}px`);
}

function setPropertyClose() {
    let currentOffset = mainLogo.offsetLeft;
    mainLogo.style.setProperty('--spaceClose', `${(leftOffset-currentOffset)}px`);
}

