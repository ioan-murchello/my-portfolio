"use strict";

document.addEventListener("DOMContentLoaded", function () {
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  testWebP(function (support) {
    if (support == true) {
      document.querySelector("body").classList.add("webp");
    } else {
      document.querySelector("body").classList.add("no-webp");
    }
  });

  //theme-colors
  const themeColors = {
    default: {
      "--body-color": "#4c4c4c",
      "--bg-color": "#fff",
      "--main-color": "#50aeff",
      "--hover-color": "#2993ef",
      "--sub-color": "#2993ef",
      "--form-bg-color": "#fff",
      "--burger-color": "#000",
    },
    black: {
      "--body-color": "#a0a0a0",
      "--bg-color": "#000",
      "--main-color": "#2acc45",
      "--hover-color": "#60e21f",
      "--sub-color": "#2acc45",
      "--form-bg-color": "#0b230e",
      "--burger-color": "#a0a0a0",
    },
  };

  const switcher = document.querySelectorAll(".switcher");
  const switcherLable = document.querySelectorAll(".switcher-label");

  switcher.forEach((el) => {
    el.addEventListener("change", (e) => {
      document.body.style.transition = "all 0.5s ease";

      setItemToLocalStorage("checked", e.target.checked);

      if (e.target.checked == true) {
        switcherLable.forEach((label) => {
          label.style.backgroundImage = "url(img/icons/sun_icon.svg)";
        });
        switcher.forEach((inp) => (inp.checked = true));

        onSetTheme(e.target.checked.toString(), themeColors);
      } else {
        // switcher.forEach((inp) => (inp.checked = e.target.checked));

        switcherLable.forEach((label) => {
          label.style.backgroundImage = "url(img/icons/moon_icon.svg)";
        });
        onSetTheme(e.target.checked, themeColors);
      }
    });
  });

  function onSetTheme(arg, objWithThems) {
    let getNameThemeFromObjectWithThems;
    if (arg === "true") {
      getNameThemeFromObjectWithThems = objWithThems.black;
    } else {
      getNameThemeFromObjectWithThems = objWithThems.default;
    }

    Object.entries(getNameThemeFromObjectWithThems).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
  //----------------------------------------------

  //localStorageHandlers
  function setItemToLocalStorage(key, item) {
    localStorage.setItem(key, item);
  }

  setItemToLocalStorage("thems", JSON.stringify(themeColors));

  function getItemFromLocalStorage() {
    let check = localStorage.getItem("checked");
    if (check) {
      check.toString();
    }
    const thems = JSON.parse(localStorage.getItem("thems"));

    if (check && check === "true") {
      switcher.forEach((inp) => (inp.checked = true));

      switcherLable.forEach((label) => {
        label.style.backgroundImage = "url(img/icons/sun_icon.svg)";
      });

      onSetTheme(check, thems);
    } else {
      switcherLable.forEach((label) => {
        label.style.backgroundImage = "url(img/icons/moon_icon.svg)";
      });

      onSetTheme(check, thems);
    }
  }

  getItemFromLocalStorage();
  //----------------------------------------------

  //current-year----------------------------------
  var current_year = (document.querySelector(".current_year").textContent =
    new Date().getFullYear());
  //----------------------------------------------

  //scroll-by-links------------------------------------------------------
  var navigete_links = document.querySelectorAll(".header__links");
  var btn_toContact = document.querySelector(".hello__btn");
  navigete_links.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(el.getAttribute("href"));
      target.scrollIntoView({
        behavior: "smooth",
      });
    });
  });
  btn_toContact.addEventListener("click", function (e) {
    e.preventDefault();
    var target = e.target.getAttribute("href");
    document.querySelector(target).scrollIntoView({
      behavior: "smooth",
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
        behavior: "smooth",
      });
    });
  }
  toTop();

  //slider --------------------------------------------------
  var slider_line = document.querySelector(".swiper-wrapper"); 
  var data = [
    {
      thumbnail: "./img/paracell.jpg",
      title: "Paracell",
      description: "Creative landing page",
      url: "https://ioan-murchello.github.io/paracell/",
    },
    {
      thumbnail: "./img/todolist.jpg",
      title: "ToDoList",
      description:
        "A todo list is a simple application that allows users to create and manage a list of tasks or items they need to complete. ",
      url: "https://ioan-murchello.github.io/toDoList/toDoList/",
    },
    {
      thumbnail: "./img/jhon's-site.jpg",
      title: "Jhon's resume",
      description: "Site for Jhon's presentation",
      url: "https://ioan-murchello.github.io/johns-portfolio/",
    },
    {
      thumbnail: "./img/typing-trainer.jpg",
      title: "Typing trainer",
      description:
        "A simulator that every novice developer should have.Only for PC(in developent)",
      url: "https://ioan-murchello.github.io/typing-trainer/keyTraniner/",
    },
    {
      thumbnail: "./img/avilio-site.jpg",
      title: "Take your way",
      description: "Landing page",
      url: "https://ioan-murchello.github.io/aviliosite/",
    },
  ];

  // render slides
  function renderSlides(arr, container) {
    var slide_body;
    var slide_item;
    for (var i = 0; i < arr.length; i++) {
      slide_item = document.createElement("div");
      slide_item.classList.add("swiper-slide");
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
    return '<div class="slider__wrapper"><img src='
      .concat(
        thumbnail,
        ' alt="image" />\n <div class="description">\n <div class="slider__description-title">'
      )
      .concat(
        title,
        '</div>\n                <div class="slider__description-text">\n                  '
      )
      .concat(description, "\n                </div>\n                <a href=")
      .concat(
        url,
        ' target="_blank" class="slider__description-btn btn"\n                  >Open\n                  <svg\n                    width="12"\n                    height="12"\n                    viewBox="0 0 12 12"\n                    fill="none"\n                    xmlns="http://www.w3.org/2000/svg"\n                  >\n                    <path\n                      d="M3.74994 0.750061V2.25006H8.69244L-6.10352e-05 10.9426L1.05744 12.0001L9.74994 3.30756V8.25006H11.2499V0.750061H3.74994Z"\n                      fill="white"\n                    />\n                  </svg>\n                </a>\n              </div>\n             </div>'
      );
  }
  
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
      var _inputs = document.querySelectorAll(".form__input");
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
    return !/([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/.test(
      input.value
    );
  }
  //---------------------------------------------------------------------

  //swiper
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }, 

    speed: 800,

    direction: 'horizontal',

    effect: 'slide', 

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      //bullets
      clickable: true,
      dynamicBullets: true,

      // type: 'fraction',
      // //custom fraction
      // renderFraction: function(currentClass, totalClass){
      //   return `Project <span class=${currentClass}></span> from <span class=${totalClass}></span>`
      // }
    },

    // //scroll
    // scrollBar: {
    //   el: '.swiper-scrollbar',
    //   //to drag scroll
    //   draggable: true,
    // },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
    // switch On, switch Off on PC
    simulateTouch: true,

    //swipe sensetive
    touchRatio: 1,

    //swipe angle
    touchAngle: 45,

    //drag cursor
    grabCursor: true,

    //on slide click, move slide
    slideToClickedSlide: true,

    //keyboad events
    keyboard: {
      //on-off
      enabled: true,

      //on - only when slider inside viewport
      onlyInViewport: true,

      pageUpDown: true,
    },

    //onMouseWheel
    // mousewheel: {
    //   sensitivity: 1
    // }

    // slidesPerView: 1.5,

    //if in slider only one slide
    watchOverflow: true,

    //margin
    spaceBetween: 15,
  });
  //---------------------------------------------------------------------
});
