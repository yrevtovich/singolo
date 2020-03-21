const MENU = document.querySelector('.main-navigation');
const PHONES = document.querySelector('.phones');
const GALLERY = document.querySelector('.portfolio-gallery');
const GALLERY_TABS = document.querySelector('.portfolio-navigation');
const FORM = document.querySelector('.message-form');
const FORM_BTN = document.querySelector('.submit-btn');
const SLIDER_ITEMS = document.querySelectorAll('.slider-item');
const sliderBtnRight = document.querySelector('.slider-arrow-right');
const sliderBtnLeft = document.querySelector('.slider-arrow-left');

let currentSlide = 0;
let nextSlide = 0;

MENU.addEventListener('click', event => {
    MENU.querySelectorAll('a').forEach( (elem) => elem.classList.remove('active'));
    if (event.target.tagName === "A") {
        event.target.classList.add('active');
    }
});

PHONES.addEventListener('click', event => {
    let phoneClass = event.target.classList[0];
    PHONES.querySelectorAll('.display').forEach( elem => {
        if (elem.classList.contains(phoneClass)) {
            elem.classList.toggle('hide-display');
        }
    });
});

GALLERY.addEventListener('click', event => {
    GALLERY.querySelectorAll('IMG').forEach( elem => elem.classList.remove('portfolio-gallery-item-active'));
    GALLERY.querySelectorAll('LI').forEach( elem => elem.classList.remove('portfolio-gallery-item-active'));

    if (event.target.tagName === 'LI' || event.target.tagName === 'IMG') {
        event.target.classList.add('portfolio-gallery-item-active');
    }
});

GALLERY_TABS.addEventListener('click', event => {    
    if (event.target.tagName === 'LI') {
        GALLERY_TABS.querySelectorAll('.portfolio-navigation-item').forEach( elem => {
            if ( elem.classList.contains('portfolio-navigation-item-active')) {
                elem.classList.remove('portfolio-navigation-item-active');
            }
        });

        event.target.classList.add('portfolio-navigation-item-active');   
        
        GALLERY_TABS.querySelectorAll('.portfolio-navigation-item').forEach( (item, index) => {
            if( item === event.target) {
                GALLERY.querySelectorAll('.portfolio-gallery-item').forEach( (elem, idx, arr) => {                    
                    if ( (idx + index) < arr.length) {
                        elem.style.setProperty('--order', `${idx + index}`);
                    } else {
                        elem.style.setProperty('--order', `0`);
                    }
                })
            }
        });
    }
});

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

// slider



function changeSlide(directionOut, directionIn) {
    moveSlides('to', directionOut, currentSlide);
    nextSlide = (currentSlide + 1) % SLIDER_ITEMS.length;
    moveSlides('from', directionIn, nextSlide);    
}

function moveSlides(type, direction, slide) {
    if (type === 'from') {
        SLIDER_ITEMS[slide].classList.remove('hide');
    }

    SLIDER_ITEMS[slide].classList.add(`move-${type}-${direction}`);

    SLIDER_ITEMS[slide].addEventListener('animationend', slideAnimationend.bind(null, type, direction, slide));  
    
    SLIDER_ITEMS[slide].removeEventListener('animationend', slideAnimationend);
}

sliderBtnLeft.addEventListener('click', () => {
    changeSlide('left', 'right');
    currentSlide = nextSlide;
});

sliderBtnRight.addEventListener('click', () => {
    changeSlide('right', 'left');
    currentSlide = nextSlide;
});

function slideAnimationend(type, direction, slide) {
    SLIDER_ITEMS[slide].classList.remove(`move-${type}-${direction}`);

        if (type === 'to') {
            SLIDER_ITEMS[slide].classList.add('hide');
        }   
}

