"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", function (e) {
  // console.log(e.target.getBoundingClientRect());

  // console.log(document.documentElement.getBoundingClientRect()); //to know the actual height and width of the webpage

  // console.log(section1.getBoundingClientRect().left);
  // console.log(section1.getBoundingClientRect().top);
  // console.log(window.scrollY); //window.pageYoffset
  // console.log(window.scrollX); //window.pageXoffset

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(
  //   section1.getBoundingClientRect().left,
  //   section1.getBoundingClientRect().top + window.scrollY
  // );

  // smooth scrolling
  // 1-way
  // window.scrollTo({
  //   left:section1.getBoundingClientRect().left,
  //   top:section1.getBoundingClientRect().top + window.scrollY,
  //   behavior:"smooth",
  // });

  // 2-way
  section1.scrollIntoView({ behavior: "smooth" });
});

// //rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)}))`;

// // this event execution happens in target phase
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   e.preventDefault();//so that page will not scroll
//   console.log("LINK", e.target);
//   this.style.backgroundColor = randomColor();
// });

// // this event execution happens in bubbling phase
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   console.log("LINKS", e.target);
//   this.style.backgroundColor = randomColor();
// });

// // this event execution happens in bubbling phase
// document.querySelector(".nav").addEventListener("click", function (e) {
//   console.log("NAV" , e.target);
//   this.style.backgroundColor = randomColor();
// });

// //rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)}))`;

// // this event execution happens in target phase
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   e.preventDefault();//so that page will not scroll
//   console.log("LINK", e.target);
//   this.style.backgroundColor = randomColor();
//   // e.stopPropagation();
// });

// // this event execution happens in capturing phase
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   console.log("LINKS", e.target);
//   this.style.backgroundColor = randomColor();
// });

// // this event execution happens in capturing phase
// document.querySelector(".nav").addEventListener("click", function (e) {
//   console.log("NAV" , e.target);
//   this.style.backgroundColor = randomColor();
// },true);

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Note = event delegation(reducing no of event listener)
// helps us to improve performance
// how to implement the technique of event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// const h1 = document.querySelector("h1");
// // Going downwards: child
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

// // Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--gradient-secondary)"; //yellow

// h1.closest("h1").style.background = "var(--gradient-primary)"; //khudko hi target kiya and green hogya

// //Going sideways: siblings
// console.log(h1. previousElementSibling); //null
// console.log(h1.nextElementSibling); //h4

// console.log(h1.previousSibling); 
// console.log(h1.nextSibling);

// console.log(h1.parentElement. children);
// [...h1.parentElement.children].forEach(function(el) {
// if(el !== h1) el.style.transform = 'scale'
// })


///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});



///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));



///////////////////////////////////////
// Sticky Navigation

// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.
//   classList.add('sticky');
//   else nav.classList.remove('sticky');
// });




// ///////////////////////////////////////
// // Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, //entire viewport
//   threshold: [0,0.2], //as intersectionRatio = 0.2 obscallback() will execute
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);


const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);





///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});



// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};


const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});  

imgTargets.forEach(img => imgObserver.observe(img));


//////////////////////////////////
// Slider components

const slides = document.querySelectorAll(".slide");
const maxSlides = slides.length;
const rightBtn = document.querySelector(".slider__btn--right");
const leftBtn = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");
let currSlide = 0;


// //translating eachslides
// slides.forEach((s,i) => {
//   s.style.transform = `translateX(${i*100}%)`;
// });

// leftBtn.addEventListener("click" , function(){

//   if(currSlide === 0) currSlide = maxSlides -1;
//   else  currSlide = currSlide -1;

//   slides.forEach((s,i) => {
//     s.style.transform = `translateX(${(i-currSlide)*100}%)`;
//   });

// });

// rightBtn.addEventListener("click" , function(){
  
//   currSlide = (currSlide+1)%maxSlides;

//   slides.forEach((s,i) => {
//     s.style.transform = `translateX(${(i-currSlide)*100}%)`;
//   });

// });


// optimizing the above code
const createDots = function(){
  slides.forEach((s,i) =>{
    dotsContainer.insertAdjacentHTML('beforeend',`<button class = "dots__dot" data-slide=${i}></button>`);
  });
}

const dotsActive = function(a){
  dots.forEach((d) =>{    
    d.classList.remove('dots__dot--active');
  });
  a.classList.add("dots__dot--active");
}

const moveSlides = function(currSlide){
  slides.forEach((s,i) => {
    s.style.transform = `translateX(${(i-currSlide)*100}%)`;
  });
}

const moveLeft = function(){
  if(currSlide === 0) currSlide = maxSlides -1;
  else  currSlide = currSlide -1;

  moveSlides(currSlide);
  // console.log(currSlide);
  dotsActive(dots[currSlide]);
}

const moveRight = function(){
  currSlide = (currSlide+1)%maxSlides;

  moveSlides(currSlide);
  dotsActive(dots[currSlide]);
}

//initial condition
moveSlides(0);
createDots();
const dots = document.querySelectorAll('.dots__dot');
dotsActive(dots[0]);

leftBtn.addEventListener("click" , moveLeft);

rightBtn.addEventListener("click" , moveRight);

dotsContainer.addEventListener("click" , function(e){
  if(e.target.classList.contains('dots__dot')){
    let a = e.target.dataset.slide;
    moveSlides(a);
    // console.log(e.target);
    
    dotsActive(e.target);
  }
});

document.addEventListener("keydown",function(e){
  if(e.key === 'ArrowLeft'){
    if(currSlide === 0) currSlide = maxSlides -1;
    else  currSlide = currSlide -1;
    moveSlides(currSlide);
    dotsActive(dots[currSlide]);
  }
  else if(e.key === 'ArrowRight'){
    currSlide = (currSlide+1)%maxSlides;
    moveSlides(currSlide);
    dotsActive(dots[currSlide]);
  }
});


///////////////////////////////////////
// Lifecycle DOM Events
// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree built!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Page fully loaded', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });