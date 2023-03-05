"use strict";

document.addEventListener("DOMContentLoaded", function () {
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

  //current-year----------------------------------
  var current_year = document.querySelector(".current_year").textContent = new Date().getFullYear();
  //----------------------------------------------

  //scroll-by-links------------------------------------------------------
  var navigete_links = document.querySelectorAll(".header__links");
  var btn_toContact = document.querySelector(".hello__btn");
  navigete_links.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(el.getAttribute("href"));
      target.scrollIntoView({
        behavior: "smooth"
      });
    });
  });
  btn_toContact.addEventListener('click', function (e) {
    e.preventDefault();
    var target = e.target.getAttribute("href");
    document.querySelector(target).scrollIntoView({
      behavior: "smooth"
    });
  });
  //-------------------------------------------------------

  // //burger--------------------------------------
  var body = document.querySelector("body");
  function burgerMenu() {
    var burgerBtn = document.querySelector(".header__menu_icon"),
      btnLines = burgerBtn.querySelectorAll("span"),
      navbar = document.querySelector(".header__nav");
    navbar.addEventListener("click", function (e) {
      navbar.classList.remove("active");
      body.classList.remove("blocked");
      btnLines.forEach(function (line) {
        return line.classList.remove("active-burger");
      });
    });
    burgerBtn.addEventListener("click", function () {
      if (!navbar.classList.contains("active")) {
        navbar.classList.add("active");
        btnLines.forEach(function (line) {
          return line.classList.add("active-burger");
        });
        body.classList.add("blocked");
      } else {
        navbar.classList.remove("active");
        body.classList.remove("blocked");
        btnLines.forEach(function (line) {
          return line.classList.remove("active-burger");
        });
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navbar.classList.remove("active");
        body.classList.remove("blocked");
        btnLines.forEach(function (line) {
          return line.classList.remove("active-burger");
        });
      }
    });
  }
  burgerMenu();
  // //-----------------------------------------------

  //toTopButton
  var scrollUp = document.querySelector(".to-top");
  var offsett = 300;
  function getTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
  var pageYoffset = getTop();
  if (pageYoffset > offsett) {
    scrollUp.classList.add("to-top-active");
  } else {
    scrollUp.classList.remove("to-top-active");
  }
  function toTop() {
    window.addEventListener("scroll", function () {
      pageYoffset = getTop();
      if (pageYoffset > offsett) {
        scrollUp.classList.add("to-top-active");
      } else {
        scrollUp.classList.remove("to-top-active");
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

  //slider --------------------------------------------------
  var navigate_btns = document.querySelector(".navigate__btns"),
    prev_btn = document.querySelector(".prev"),
    next_btn = document.querySelector(".next"),
    slider_window = document.querySelector(".slider__window"),
    slider_main = document.querySelector(".background__image"),
    slider_line = document.querySelector(".slider__line"),
    dots = document.querySelector(".navigate__dots"),
    current = document.querySelector(".current"),
    total = document.querySelector(".total"),
    height = window.getComputedStyle(slider_window).height;
  var width = window.getComputedStyle(slider_window).offsetWidth;
  var data = [{
    thumbnail: "./img/paracell.jpg",
    title: "Paracell",
    description: "Creative landing page",
    url: "https://ioan-murchello.github.io/paracell/"
  }, {
    thumbnail: "./img/todolist.jpg",
    title: "ToDoList",
    description: "A todo list is a simple application that allows users to create and manage a list of tasks or items they need to complete. ",
    url: "https://ioan-murchello.github.io/toDoList/toDoList/"
  }, {
    thumbnail: "./img/jhon's-site.jpg",
    title: "Jhon's resume",
    description: "Site for Jhon's presentation",
    url: "https://ioan-murchello.github.io/johns-portfolio/"
  }, {
    thumbnail: "./img/typing-trainer.jpg",
    title: "Typing trainer",
    description: "A simulator that every novice developer should have.Only for PC(in developent)",
    url: "https://ioan-murchello.github.io/typing-trainer/keyTraniner/"
  }, {
    thumbnail: "./img/avilio-site.jpg",
    title: "Take your way",
    description: "Landing page",
    url: "https://ioan-murchello.github.io/aviliosite/"
  }];

  // render slides
  function renderSlides(arr, container) {
    var slide_body;
    var slide_item;
    for (var i = 0; i < arr.length; i++) {
      slide_item = document.createElement("div");
      slide_item.classList.add("slider__body-item");
      slide_body = renderSlide(arr[i]);
      slide_item.insertAdjacentHTML("afterbegin", slide_body);
      container.append(slide_item);
    }
  }
  renderSlides(data, slider_line);
  function renderSlide(_ref) {
    var thumbnail = _ref.thumbnail,
      title = _ref.title,
      description = _ref.description,
      url = _ref.url;
    return "<div class=\"slider__image-wrapper\">\n                <img src=".concat(thumbnail, " alt=\"image\" />\n              </div>\n              <div class=\"slider__description\">\n                <div class=\"slider__description-title\">").concat(title, "</div>\n                <div class=\"slider__description-text\">\n                  ").concat(description, "\n                </div>\n                <a href=").concat(url, " target=\"_blank\" class=\"slider__description-btn btn\"\n                  >Open\n                  <svg\n                    width=\"12\"\n                    height=\"12\"\n                    viewBox=\"0 0 12 12\"\n                    fill=\"none\"\n                    xmlns=\"http://www.w3.org/2000/svg\"\n                  >\n                    <path\n                      d=\"M3.74994 0.750061V2.25006H8.69244L-6.10352e-05 10.9426L1.05744 12.0001L9.74994 3.30756V8.25006H11.2499V0.750061H3.74994Z\"\n                      fill=\"white\"\n                    />\n                  </svg>\n                </a>\n              </div>\n             ");
  }
  var slides = document.querySelectorAll(".slider__body-item");
  var description_item = document.querySelectorAll(".slider__description");
  //resize description blocks
  function resizer() {
    var heithNums = [];
    var height;
    description_item.forEach(function (el) {
      heithNums.push(el.offsetHeight);
    });
    height = Math.max.apply(Math, heithNums);
    description_item.forEach(function (el) {
      return el.style.height = height + "px";
    });
  }
  resizer();
  var index = 1;
  var offset = 0;
  var data_length = data.length;
  function moreThen10(arrLength, current, index) {
    if (arrLength < 10) {
      current.textContent = "0".concat(index, "/");
    } else {
      current.textContent = index;
    }
  }
  if (data_length < 10) {
    total.textContent = "0".concat(data_length);
    current.textContent = "0".concat(index, "/");
  } else {
    total.textContent = data_length;
    current.textContent = index;
  }
  slider_line.style.transition = "all 0.5s";
  slides.forEach(function (el) {
    el.style.width = width + "px";
    el.style.height = height + "px";
  });
  description_item.forEach(function (el) {
    el.style.width = width + "px";
    el.style.height = height + "px";
  });

  //make size fof all images
  function makeSize() {
    width = slider_window.offsetWidth;
    slides.forEach(function (el) {
      el.style.width = width + "px";
      el.style.height = height + "px";
    });
    slider_line.style.width = width * slides.length + "px";
    rollSlider();
  }
  makeSize();
  window.addEventListener("resize", makeSize);

  //move_slider
  function rollSlider() {
    slider_line.style.transform = "translateX(-".concat(offset * width, "px)");
  }

  //handlers
  next_btn.addEventListener("click", function () {
    if (offset >= data_length - 1) {
      offset = 0;
    } else {
      offset++;
    }
    if (index > offset) {
      index = 0;
    }
    if (index === data_length) {
      index = 1;
    } else {
      index++;
    }
    moreThen10(data_length, current, index);
    rollSlider();
    activeDots(index);
  });
  prev_btn.addEventListener("click", function () {
    if (offset <= 0) {
      offset = data_length - 1;
    } else {
      offset--;
    }
    if (index === 1) {
      index = data_length;
    } else {
      index--;
    }
    if (index < offset) {
      index = data_length;
    }
    moreThen10(data_length, current, index);
    rollSlider();
    activeDots(index);
  });

  //swipe handler for slider-------------------------
  //   let startX = 0;
  //   let startY = 0;
  //   let distX = 0;
  //   let distY = 0;
  //   let threshold = width / 3;
  //   let allowedTime = 300;
  //   let elapsedTime = 0;
  //   let startTime = 0;

  //   slider_window.addEventListener("touchstart", function (e) {
  //     startX = Math.floor(e.changedTouches[0].pageX);
  //     startY = Math.floor(e.changedTouches[0].pageY);
  //     startTime = new Date().getTime();
  //     console.log(startX, startY);
  //     e.preventDefault();
  //   });

  //   slider_window.addEventListener("touchmove", function (e) {
  //     distX = Math.floor(e.changedTouches[0].pageX) - startX;
  //     distY = Math.floor(e.changedTouches[0].pageY) - startY;
  //     elapsedTime = new Date().getTime() - startTime;
  //     if (elapsedTime <= allowedTime && Math.abs(distX) > Math.abs(distY)) {
  //       e.preventDefault();
  //       slider_line.style.transform =
  //         "translateX(" + (-(index * width) + distX) + "px)";
  //     }
  //   });

  //   slider_window.addEventListener("touchend", function (e) {
  //     if (Math.abs(distX) > threshold && elapsedTime <= allowedTime) {
  //       if (distX > 0 && index > 0) {
  //         index--;
  //       } else if (distX < 0 && index < data_length.length - 1) {
  //         index++;
  //       }
  //     }
  //     slider_line.style.transform =
  //       "translateX(" + -(index * width) + "px)";
  //       activeDots(index)
  //   });
  // //-------------------------------------------------

  //dots---------------------------------------------
  var dotsArray = [];
  function renderDots(length, container) {
    var dot;
    for (var i = length; i > 0; i--) {
      dot = createDots(i);
      dotsArray.push(dot);
      container.insertAdjacentHTML("afterbegin", dot);
    }
  }
  function createDots(index) {
    return "<div class=\"dots dots__outside\" data-slide-to=".concat(index, ">\n            <div class=\"dots__inside\" data-slide-to=").concat(index, "></div>\n          </div>");
  }
  renderDots(data_length, dots);
  var insideDots = document.querySelectorAll(".dots__inside");
  var outsideDots = document.querySelectorAll(".dots__outside");
  outsideDots.forEach(function (dot) {
    dot.addEventListener("click", function (e) {
      var slideTo;
      var target = e.target;
      var attr = target.getAttribute("data-slide-to");
      slideTo = attr;
      index = slideTo;
      offset = slideTo - 1;
      if (data_length < 10) {
        current.textContent = "0".concat(index, "/");
      } else {
        current.textContent = index;
      }
      rollSlider();
      activeDots(attr);
    });
  });
  function activeDots(index) {
    insideDots.forEach(function (el) {
      if (el.classList.contains("dots__active")) {
        el.classList.remove("dots__active");
      }
      if (el.dataset.slideTo == index) {
        el.classList.add("dots__active");
      }
    });
  }
  activeDots(index);

  //slide-end-------------------------------------------------------------

  //popup-------------------------------------

  var pop_up = document.querySelector(".popup_main_wrapper");
  pop_up.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-modal") === "close") {
      pop_up.classList.remove("popup_active");
      body.style.overflow = "";
    }
  });

  // form----------------------------------------------
  var inputs = document.querySelectorAll(".form__input");
  inputs.forEach(function (el) {
    var label = el.previousElementSibling;
    el.addEventListener("focus", function () {
      label.classList.add("active_label");
    });
  });
  inputs.forEach(function (el) {
    var label = el.previousElementSibling;
    el.addEventListener("focusout", function () {
      el.value = el.value.replaceAll(/[<]/gi, "&#60;").trimStart();
      if (!el.value == "") {
        return;
      } else {
        label.classList.remove("active_label");
      }
    });
  });
  var form = document.getElementById("form");
  form.addEventListener("submit", formSend);
  function formSend(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var error = formValidate(form);
    if (error === 0) {
      form.reset();
      var _inputs = document.querySelectorAll("._req");
      _inputs.forEach(function (input) {
        return input.previousElementSibling.classList.remove("active_label");
      });
      pop_up.classList.add("popup_active");
      body.style.overflow = "hidden";
      setTimeout(function () {
        pop_up.classList.remove("popup_active");
        body.style.overflow = "";
      }, 2000);
    }
    return false;
  }
  function formValidate(form) {
    var error = 0;
    var formRequired = document.querySelectorAll("._req");
    for (var i = 0; i < formRequired.length; i++) {
      var input = formRequired[i];
      removeError(input);
      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          addError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          addError(input);
          error++;
        }
      }
    }
    return error;
  }
  function addError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  function removeError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  function emailTest(input) {
    return !/([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/.test(input.value);
  }
  //---------------------------------------------------------------------
});