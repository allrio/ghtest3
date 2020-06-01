// Scroll down and then the header gets a bit smaller
var header = document.querySelector('header');
var h1 = document.querySelector('h1');
var brandImg = document.querySelector('.brand-img');
var navLeft = document.querySelector('.navleft');
var navShowButton = document.querySelector('.nav-show-button');
var last_known_scroll_position = 0;
var ticking = false;
var changeAtY = 100;

function shrinkIt(scroll_pos) {
  if (last_known_scroll_position < changeAtY) {
    header.classList.remove('title-shrink');
    h1.classList.remove('h1-shrink');
    h1.classList.add('main-title');
    navLeft.style.top = "";
    navShowButton.style.top = "";
    // brandImg.classList.remove('brand-img-shrink');
  } else {;
    header.classList.add('title-shrink');
    h1.classList.add('h1-shrink');
    h1.classList.remove('main-title');
    navLeft.style.top = '50px';
    navShowButton.style.top = '50px';

    // brandImg.classList.add('brand-img-shrink');
  }
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      shrinkIt(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});

//Click on menu to show nav

navShowButton.addEventListener('click', function(e) {
  if (this.textContent === 'menu') {
    navLeft.style.maxHeight = '100%';
    navLeft.style.maxWidth = '200px';
    this.textContent = 'X';
  } else {
    navLeft.style.maxHeight = '';
    navLeft.style.maxWidth = '';
    this.textContent = 'menu';
  }
})
