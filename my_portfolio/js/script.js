"use strict";

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
var burgerBtn = document.querySelector(".header__menu_icon");
var btnLines = burgerBtn.querySelectorAll("span");
var navbar = document.querySelector(".header__nav");
burgerBtn.addEventListener("click", function () {
  if (!navbar.classList.contains("toggle")) {
    navbar.classList.add("toggle");
    document.body.style.overflow = "hidden";
    btnLines[0].classList.add("first_line");
    btnLines[2].classList.add("second_line");
    btnLines[1].classList.add("third_line");
  } else {
    navbar.classList.remove("toggle");
    document.body.style.overflow = "";
    btnLines[0].classList.remove("first_line");
    btnLines[2].classList.remove("second_line");
    btnLines[1].classList.remove("third_line");
  }
});

// //burger--------------------------------------

// function burgerMenu() {
//   const burgerBtn = document.querySelector(".header__menu_icon"),
//     btnLines = burgerBtn.querySelectorAll("span"),
//     body = document.querySelector("body"),
//     navbar = document.querySelector(".header__nav");

//   navbar.addEventListener('click', () => {
//     navbar.classList.remove("active");
//     body.classList.remove("blocked");
//     btnLines.forEach((line) => line.classList.remove("active-burger")); 
//   })

//   burgerBtn.addEventListener("click", function () {
//     if (!navbar.classList.contains("active")) {
//       navbar.classList.add("active");
//       btnLines.forEach((line) => line.classList.add("active-burger"));
//       body.classList.add("blocked"); 
//     } else {
//       navbar.classList.remove("active");
//       body.classList.remove("blocked");
//       btnLines.forEach((line) => line.classList.remove("active-burger"));
//     }
//   });

//   window.addEventListener("resize", () => {
//     if (window.innerWidth > 764) {
//       navbar.classList.remove("active");
//       body.classList.remove("blocked"); 
//       btnLines.forEach((line) => line.classList.remove("active-burger"));
//     }
//   });
// }

// burgerMenu();
// //-----------------------------------------------

//toTopButton
function toTop() {
  var offset = 300;
  var windowHeight = 1100;
  var scrollUp = document.querySelector(".to-top");
  function getTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
  window.addEventListener("scroll", function () {
    if (getTop() > offset) {
      scrollUp.classList.add("to-top-active");
    } else {
      scrollUp.classList.remove("to-top-active");
    }
    if (getTop() > windowHeight) {
      progress();
    }
  });
  scrollUp.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
toTop();

//  progressBar-------------------------------------
function progress() {
  var loadLine = document.querySelectorAll(".progress_line div");
  var percent = document.querySelectorAll(".skills__body-info");
  var sums = [];
  for (var i = 0; i < percent.length; i++) {
    sums.push(percent[i].textContent.slice(0, -1));
  }
  loadLine.forEach(function (el, index) {
    el.style.width = sums[index] + "%";
  });
}

//slider -----------------
var prev_btn = document.querySelector(".prev"),
  next_btn = document.querySelector(".next"),
  slider_window = document.querySelector(".slider__window"),
  slider_main = document.querySelector(".background__image"),
  slider_line = document.querySelector(".slider__line"),
  dots = document.querySelector(".navigate__dots"),
  current = document.querySelector(".current"),
  total = document.querySelector(".total"),
  height = window.getComputedStyle(slider_window).height;
var width = window.getComputedStyle(slider_window).offsetWidth;
var imgs = ["./img/paracell.jpg", "./img/portfolio_foto.jpg", "./img/paracell.jpg", "./img/portfolio_foto.jpg"];

// render slides
function renderSlides(arr, container) {
  var img_wrapper;
  var img;
  for (var i = 0; i < arr.length; i++) {
    img_wrapper = document.createElement("div");
    img_wrapper.classList.add("image__wrapper");
    img = document.createElement("img");
    img.setAttribute("src", arr[i]);
    img.setAttribute("alt", "image");
    img_wrapper.append(img);
    container.append(img_wrapper);
  }
}
renderSlides(imgs, slider_line);
var images = document.querySelectorAll(".image__wrapper");
var index = 1;
var offset = 0;
var images_length = imgs.length;
if (images_length < 10) {
  total.textContent = "0".concat(images_length);
  current.textContent = "0".concat(index);
} else {
  total.textContent = images_length;
  current.textContent = index;
}
slider_line.style.transition = "all 0.4s";
images.forEach(function (el) {
  el.style.width = width + "px";
  el.style.height = height + "px";
});
function makeSize() {
  width = slider_window.offsetWidth;
  images.forEach(function (el) {
    el.style.width = width + "px";
    el.style.height = height + "px";
  });
  slider_line.style.width = width * images.length + "px";
  rollSlider();
}
makeSize();
window.addEventListener("resize", makeSize);
function rollSlider() {
  slider_line.style.transform = "translateX(-".concat(offset * width, "px)");
}

//handlers
next_btn.addEventListener("click", function () {
  if (offset >= images_length - 1) {
    offset = 0;
  } else {
    offset++;
  }
  if (index === images_length) {
    index = 1;
  } else {
    index++;
  }
  if (images_length < 10) {
    current.textContent = "0".concat(index);
  } else {
    current.textContent = index;
  }
  slider_main.style.backgroundImage = "url(".concat(imgs[index - 1], ")");
  rollSlider();
  activeDots();
});
prev_btn.addEventListener("click", function () {
  if (offset <= 0) {
    offset = images_length - 1;
  } else {
    offset--;
  }
  if (index === 1) {
    index = images_length;
  } else {
    index--;
  }
  if (images.length < 10) {
    current.textContent = "0".concat(index);
  } else {
    current.textContent = index;
  }
  slider_main.style.backgroundImage = "url(".concat(imgs[index - 1], ")");
  rollSlider();
  activeDots();
});
function renderDots(length, container) {
  var dot;
  for (var i = 0; i < length; i++) {
    dot = createDots();
    container.insertAdjacentHTML("afterbegin", dot);
  }
}
function createDots() {
  return "<div class=\"dots dots__outside\">\n            <div class=\"dots__inside\"></div>\n          </div>";
}
renderDots(imgs.length, dots);
var allDots = document.querySelectorAll(".dots__inside");
function activeDots() {
  allDots.forEach(function (el) {
    return el.classList.remove("dots__active");
  });
  allDots[index - 1].classList.add("dots__active");
}
activeDots();