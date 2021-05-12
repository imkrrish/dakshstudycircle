
// Testimonials Section 

// testimonial Carousel 
const tCarouselSlide = document.querySelector('.tCarousel-slide');
const tCarouselImages = document.querySelectorAll('.tCarousel-slide .review-slide');
const tDot_parents = document.querySelector('.tControls ul');

// Buttons 

const tPrevBtn = document.querySelector('#tPrevBtn');
const tNextBtn = document.querySelector('#tNextBtn');

//tCounter

let tCounter = 1;
const tSize = tCarouselImages[0].clientWidth;

tCarouselSlide.style.transform = 'translateX(' + (-1170 * tCounter) + 'px)';

// tDot tActive class 
function tDot_next(count) {
    if (count === 4) {
        tDot_parents.children[2].classList.remove('tActive');
        tDot_parents.children[0].classList.add('tActive');
    } else {
        tDot_parents.children[count - 2].classList.remove('tActive');
        tDot_parents.children[count - 1].classList.add('tActive');
    }
}

function tDot_prev(count) {
    if (count === 0) {
        tDot_parents.children[0].classList.remove('tActive');
        tDot_parents.children[2].classList.add('tActive');
    } else {
        tDot_parents.children[count].classList.remove('tActive');
        tDot_parents.children[count - 1].classList.add('tActive');
    }
}

//Button Listners

tNextBtn.addEventListener('click', () => {
    if (tCounter >= tCarouselImages.length - 1) return;
    tCarouselSlide.style.transition = '0.6s ease-in-out';
    tCounter++;
    tDot_next(tCounter);
    tCarouselSlide.style.transform = 'translateX(' + (-1170 * tCounter) + 'px)';
});

tPrevBtn.addEventListener('click', () => {
    if (tCounter <= 0) return;
    tCarouselSlide.style.transition = '0.6s ease-in-out';
    tCounter--;
    tDot_prev(tCounter)
    tCarouselSlide.style.transform = 'translateX(' + (-1170 * tCounter) + 'px)';
});

tCarouselSlide.addEventListener('transitionend', () => {
    if (tCarouselImages[tCounter].id === 'tLastClone') {
        tCarouselSlide.style.transition = 'none';
        tCounter = tCarouselImages.length - 2;
        tCarouselSlide.style.transform = 'translateX(' + (-1170 * tCounter) + 'px)';
    }

    if (tCarouselImages[tCounter].id === 'tFirstClone') {
        tCarouselSlide.style.transition = 'none';
        tCounter = tCarouselImages.length - tCounter;
        tCarouselSlide.style.transform = 'translateX(' + (-1170 * tCounter) + 'px)';
    }
});


// ttDots listners

document.querySelectorAll('.tControls li').forEach(function (indicator, ind) {
    indicator.addEventListener('click', function () {
        tCounter = ind + 1;
        document.querySelector('.tControls .tActive').classList.remove('tActive');
        indicator.classList.add('tActive');
        tCarouselSlide.style.transition = '0.6s ease-in-out';
        tCarouselSlide.style.transform = 'translateX(' + (-1170 * tCounter) + 'px)';
    });
});