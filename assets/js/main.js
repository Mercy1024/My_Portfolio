"use strict";
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
/*=============== SHOW MENU ===============*/
// validate if constant exist
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
/*============== MENU HIDDEN ===============*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll(".nav-link");
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // when we click on each nav link, we remove the show menu class
  navMenu.classList.remove("show-menu");
}

navLinks.forEach((e) => e.addEventListener("click", linkAction));

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // when the scroll greater than 80vh add the scroll header to the tag header
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== TESTIMONIAL SWIPER ===============*/
var swiper = new Swiper(".testimonial-wrapper", {
  loop: "true",

  pagination: {
    el: ".swiper-pagination",
    clickable: "true",
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// add an event listener for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // get current scroll position
  let scrollY = window.pageYOffset;
  //Now we loop through sections to get height, top and Id values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58, // we subtract 100 to make sure we are in the middle of the section
      sectionId = current.getAttribute("id");

    // if our current scroll position enters the space where current section on the screen is, add.active class to the correspondnig navigation linkAction,else remove it.
    // To know which link needs an active class, we use sectionId variable we are getting while looping through sections as a Selector
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

/*=============== PORTFOLIO ITEM FILTER ===============*/
const filterContainer = document.querySelector(".portfolio-filter-inner"),
  filterBtns = filterContainer.children,
  totalFilterBtn = filterBtns.length,
  portfolioItems = document.querySelectorAll(".portfolio-item"),
  totalPortfolioItems = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");
    console.log(filterValue);
    for (let k = 0; k < totalPortfolioItems; k++) {
      if (filterValue === portfolioItems[k].getAttribute("data-category")) {
        portfolioItems[k].classList.remove("hide");
        portfolioItems[k].classList.add("show");
      } else {
        portfolioItems[k].classList.add("hide");
        portfolioItems[k].classList.remove("show");
      }

      if (filterValue === "all") {
        portfolioItems[k].classList.remove("hide");
        portfolioItems[k].classList.add("show");
      }
    }
  });
}

/*=============== THEME/DISPLAY CUSTOMIZATION ===============*/
const theme = document.querySelector("#theme-button");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
const colorPalette = document.querySelectorAll(".choose-color span");
var root = document.querySelector(":root");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

// openModal
const openTheModal = () => {
  themeModal.style.display = "grid";
};

//closeModal
const closeThemeModal = (e) => {
  if (e.target.classList.contains("customize-theme")) {
    themeModal.style.display = "none";
  }
};

theme.addEventListener("click", openTheModal);
themeModal.addEventListener("click", closeThemeModal);

/*===== FONTS =====*/

//remove active class from spans or font size selectors
const removeSizeSelector = () => {
  fontSizes.forEach((size) => {
    size.classList.remove("active");
  });
};
fontSizes.forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle("active");
    if (size.classList.contains("font-size-1")) {
      fontSize = "12px";
    } else if (size.classList.contains("font-size-2")) {
      fontSize = "14px";
    } else if (size.classList.contains("font-size-3")) {
      fontSize = "16px";
    } else if (size.classList.contains("font-size-4")) {
      fontSize = "18px";
    }

    //change fontsize of the root element
    document.querySelector("html").style.fontSize = fontSize;
  });
});

/*===== PRIMARY COLORS =====*/
// remove active class from colors
const changeActiveColorClass = () => {
  colorPalette.forEach((colorPicker) => {
    colorPicker.classList.remove("active");
  });
};
colorPalette.forEach((color) => {
  color.addEventListener("click", () => {
    let primaryHue;
    changeActiveColorClass();
    if (color.classList.contains("color-1")) {
      primaryHue = 252;
    } else if (color.classList.contains("color-2")) {
      primaryHue = 52;
    } else if (color.classList.contains("color-3")) {
      primaryHue = 352;
    } else if (color.classList.contains("color-4")) {
      primaryHue = 152;
    } else if (color.classList.contains("color-5")) {
      primaryHue = 202;
    }
    color.classList.add("active");
    root.style.setProperty("--primary-color-hue", primaryHue);
  });
});

/*===== THEME BACKGROUNDS =====*/
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//change BackgroundColor
const changeBG = () => {
  root.style.setProperty("--light-color-lightness", lightColorLightness);
  root.style.setProperty("--white-color-lightness", whiteColorLightness);
  root.style.setProperty("--dark-color-lightness", darkColorLightness);
};

Bg1.addEventListener("click", () => {
  //add active class
  Bg1.classList.add("active");
  //remove active class
  Bg2.classList.remove("active");
  Bg3.classList.remove("active");
  //remove customized changes from local storage
  window.location.reload();
});
Bg2.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "20%";
  lightColorLightness = "15%";

  //add active class
  Bg2.classList.add("active");
  //remove active class
  Bg1.classList.remove("active");
  Bg3.classList.remove("active");
  changeBG();
});

(() => {
  darkColorLightness = "95%";
  whiteColorLightness = "20%";
  lightColorLightness = "15%";

  //add active class
  Bg2.classList.add("active");
  //remove active class
  Bg1.classList.remove("active");
  Bg3.classList.remove("active");
  changeBG();
})();

Bg3.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "10%";
  lightColorLightness = "0%";

  //add active class
  Bg3.classList.add("active");
  //remove active class
  Bg1.classList.remove("active");
  Bg2.classList.remove("active");
  changeBG();
});

/*===== FORM SUBMISSION =====*/
const SubmitBtn = document.querySelector(".contact-form a");
const userMessage = document.querySelector(".contact-form .userMessage");
const mail = document.querySelector(".contact-form .mail");
const subject = document.querySelector(".contact-form .subject");
const errorAlert = document.querySelector(".error");

const SendMail = () => {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "kaydenmm89@gmail.com",
    Password: "51A6557C4F5AF759C83FFDEE73977A028844",
    To: "kaydenmm89@gmail.com",
    From: "kaydenmm89@gmail.com",
    Subject: `${mail.value}:   ${subject.value}`,
    Body: `${userMessage.value}`,
  }).then(() => {
    SubmitBtn.style.backgroundColor = "rgb(30, 255, 0)";
    SubmitBtn.textContent = "Submitted";
    setTimeout(window.location.reload(), 2000);
  });
};

SubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = mail.value,
    subjectValue = subject.value,
    userMessageValue = userMessage.value;

  if (name == "" || subjectValue == "" || userMessageValue == "") {
    SubmitBtn.style.display = "none";
    errorAlert.style.display = "block";

    setTimeout(() => {
      errorAlert.style.display = "none";
      SubmitBtn.style.display = "inline-block";
    }, 2000);
  } else {
    SendMail();
  }
});
