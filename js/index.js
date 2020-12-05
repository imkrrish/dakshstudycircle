// Gallery Carousel 
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const dot_parents = document.querySelector('.controls ul');

// Buttons 

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//counter

let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-1170 * counter) + 'px)';

// dot active class 
function dot_next(count) {
  if (count === 4) {
    dot_parents.children[2].classList.remove('active');
    dot_parents.children[0].classList.add('active');
  }else{
    dot_parents.children[count-2].classList.remove('active');
    dot_parents.children[count-1].classList.add('active');
  }
}

function dot_prev(count) {
  if (count === 0) {
    dot_parents.children[0].classList.remove('active');
    dot_parents.children[2].classList.add('active');
  }else{
    dot_parents.children[count].classList.remove('active');
    dot_parents.children[count-1].classList.add('active');
  }
}

//Button Listners

nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = '0.6s ease-in-out';
  counter++;
  dot_next(counter);
  carouselSlide.style.transform = 'translateX(' + (-1170 * counter) + 'px)';
});

prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = '0.6s ease-in-out';
  counter--;
  dot_prev(counter)
  carouselSlide.style.transform = 'translateX(' + (-1170 * counter) + 'px)';
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = 'translateX(' + (-1170 * counter) + 'px)';
  }

  if (carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = 'none';
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = 'translateX(' + (-1170 * counter) + 'px)';
  }
});


// dots listners

document.querySelectorAll('.controls li').forEach(function(indicator , ind){
  indicator.addEventListener('click', function(){
    counter = ind+1;
    document.querySelector('.controls .active').classList.remove('active');
    indicator.classList.add('active');
    carouselSlide.style.transition = '0.6s ease-in-out';
    carouselSlide.style.transform = 'translateX(' + (-1170 * counter) + 'px)';
  });
});