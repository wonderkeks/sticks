"use strict";

// Drupal.behaviors.afterAjax = {
// 	attach: function (context, settings){
// 		maskPhone(context);
// 		popups(context);
// 		// Этот html нужно засунуть при успешной отправке.
// 		// <div fid="block-form-order" id="webform--submitted" style="display:none">Сообщение успешно отправлено</div>
// 		let wfsbmt = document.getElementById("webform--submitted");
// 		if (wfsbmt) {
// 			if (wfsbmt.getAttribute("fid")){
// 				document.getElementById(wfsbmt.getAttribute("fid")).classList.remove("active");
// 				document.getElementById("win-thanks").classList.add("active");
// 			};
// 		};
// 	}
// };

function select(elem = document) {
  let select = elem.querySelectorAll(".select");

  //select = once("select",select);

  if (select.length) {
    select.forEach(function (item) {
      let $this = item;
      // Оборачиваем
      let selectWrap = document.createElement("div");
      selectWrap.setAttribute("class", "select-box");
      $this.parentNode.insertBefore(selectWrap, $this);
      selectWrap.appendChild($this);

      // Создаем новый селект
      let selectStyled = document.createElement("div");
      selectStyled.setAttribute("class", "select-styled");
      selectWrap.appendChild(selectStyled);

      // Создаем новый список
      let options = document.createElement("div");
      options.setAttribute("class", "select-options");
      selectWrap.appendChild(options);

      let optionsList = document.createElement("ul");
      options.appendChild(optionsList);

      // Добавляем в список пункты
      for (let i = 0; i < $this.length; i++) {
        let text = $this.options[i].text;
        let option = document.createElement("li");
        option.innerText = text;
        optionsList.appendChild(option);

        // Клик на пункт
        option.addEventListener("click", function (e) {
          option
            .closest("ul")
            .querySelectorAll("li")
            .forEach(function (item) {
              item.classList.remove("choice");
            });
          option.classList.add("choice");
          let text = e.target.innerText;
          selectStyled.innerText = text;

          selectStyled.classList.remove("active");
          options.style.height = "0px";

          // Имитируем клик на реальный селект
          $this.querySelectorAll("option").forEach(function (item) {
            item.removeAttribute("selected");
          });
          $this.options[i].setAttribute("selected", "selected");
          let eventChange = new Event("change");
          $this.dispatchEvent(eventChange);
        });
      }

      // Выбранный пункт по умолчанию
      // let startChoice = $this.querySelector("option[selected='selected']");
      // let startText = item.dataset.placeholder;
      // selectStyled.innerText = startText;
      // let index = startChoice.index;
      // optionsList.querySelector("li:nth-child(" +(index + 1)+ ")").classList.add("choice");

      let selected = $this.querySelector("option[selected]");
      if (selected) {
        selectStyled.innerText = selected.innerText;
      } else {
        selectStyled.innerText = "Выберите пункт";
      }

      // Клик на селект
      selectStyled.addEventListener("click", function (e) {
        closeSelects(e);

        if (!selectStyled.classList.contains("active")) {
          selectStyled.classList.add("active");

          options.style.height = "auto";
          let optionsHeight = options.clientHeight + "px";
          options.style.height = "0px";
          setTimeout(function () {
            options.style.height = optionsHeight;
          }, 0);
        } else {
          selectStyled.classList.remove("active");
          options.style.height = "0px";
        }
      });
    });

    // Клик вне селекта
    elem.addEventListener("click", function (e) {
      if (!e.target.matches(".select-styled")) {
        closeSelects(e);
      }
    });

    function closeSelects(e) {
      if (e.target != elem.querySelector(".select-styled.active")) {
        elem.querySelectorAll(".select-styled.active").forEach(function (item) {
          item.classList.remove("active");
          item.nextElementSibling.style.height = "0px";
        });
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  select();
  popups();
  maskPhone();

  AOS.init();

  new AirDatepicker("#date");

  const burger = document.querySelector(".header__menu"),
    menu = document.querySelector(".menu");

  if (burger) {
    burger.addEventListener("click", () => {
      menu.classList.add("active");
      document.querySelector("body").style.overflow = "hidden";
    });

    menu.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("menu") ||
        e.target.classList.contains("menu__close")
      ) {
        menu.classList.remove("active");
        document.querySelector("body").style.overflow = "auto";
      }
    });
  }

  const promoArrow = document.querySelector(".promo__arrow");

  if (promoArrow) {
    promoArrow.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById("products")
        .scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  const marquee = document.querySelectorAll(".products__marquee");

  if (marquee.length) {
    marquee.forEach((item) => {
      const marqueeSwiper = new Swiper(item, {
        loop: "true",
        speed: 8000,
        spaceBetween: 16,
        slidesPerView: "auto",
        allowTouchMove: false,
        disableOnInteraction: false,
        centeredSlides: true,
        autoplay: {
          delay: 1,
        },
        breakpoints: {
         1000: {
          spaceBetween: 80
         }
        }
      });
    });
  }

  const aboutSlider = document.querySelector(".about__slider");

  if (aboutSlider) {
    const aboutSliderSwiper = new Swiper(aboutSlider, {
      centeredSlides: true,
      spaceBetween: 50,
      speed: 800,
      slidesPerView: 1,
      loop: "true",
      effect: "coverflow",
      coverflowEffect: {
        scale: 0.7,
        depth: 0,
        rotate: 0,
        slideShadows: false,
      },
      navigation: {
        nextEl: ".about__next",
        prevEl: ".about__prev",
      },
      breakpoints: {
        1000: {
          slidesPerView: "auto",
        }
      }
    });
  }

  Fancybox.bind(":not(.swiper-slide-duplicate) > [data-fancybox='gal1']", {
    groupAll: true,
    placeFocusBack: false, // Починить баг с фенсибоксом и свипером
    Image: {
      wheel: "slide",
    },
  });

  let fancyboxInSlider = document.querySelectorAll(
    ".swiper-slide-duplicate [data-fancybox]"
  );

  if (fancyboxInSlider.length) {
    fancyboxInSlider.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        let href = item.getAttribute("href");
        item
          .closest(".swiper")
          .querySelector(
            ".swiper-slide:not(.swiper-slide-duplicate) [data-fancybox][href='" +
              href +
              "']"
          )
          .click();
      });
    });
  }

  // Линия прокрутки страницы в карточке товаров
  const underline = document.querySelector(".product-page__nav span"),
    stickyItems = document.querySelectorAll(".product-page__nav  ul li"),
    scrollBlocks = document.querySelectorAll("[theView='']");


  if (underline) {
    function goToItem(i) {
      underline.style.transform = `translateX(${
        i.getBoundingClientRect().x
      }px)`;
      underline.style.width = i.getBoundingClientRect().width + "px";
    }

    goToItem(stickyItems[0]);

    stickyItems.forEach((item) => {
      item.addEventListener("mouseover", () => {
        goToItem(item);
      });
    });

    stickyItems.forEach((item) => {
      item.addEventListener("click", () => {
        let target = document.getElementById(item.getAttribute("toView"));
        target.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    });

    stickyItems.forEach((item) => {
      item.addEventListener("mouseleave", () => {
        stickyItems.forEach((jtem) => {
          if (jtem.classList.contains("active")) {
            goToItem(jtem);
          }
        });
      });
    });

    window.addEventListener("scroll", () => {
      // Создаётся массив положения всех вершин блоков
      let arr = [];
      scrollBlocks.forEach((item) => {
        arr.push(item.getBoundingClientRect().top + 20);
      });
      // Если число положительное, то блок активируется
      for (let i = 0; i < scrollBlocks.length; i++) {
        if (arr[i] > 0) {
          stickyItems.forEach((jtem) => {
            jtem.classList.remove("active");
          });
          stickyItems[i].classList.add("active");
          goToItem(stickyItems[i]);
          break;
        }
      }
    });
  }

  const up = document.querySelector('.up');

  if (up) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        up.classList.add('active');
      }
      else {
        up.classList.remove('active');
      }
    });
    up.addEventListener('click', () => {
      document.querySelector('body').scrollIntoView({block: "start", behavior: "smooth"});
    })
  }

  const mapElem = document.getElementById("map");
  // Карта на странице контактов
  if (mapElem) {
    let isLoaded = false;
    function loadMap() {
      var script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.classList.add("yamap-script");
      if (!document.querySelector(".yamap-script")) {
        document.body.appendChild(script);
        script.onload = function () {
          ymaps.ready(function () {
            // Инициализация карты
  
            let mapContacts = new ymaps.Map(
              mapElem,
              {
                zoom: 14,
                center: [57.733973, 47.024146],
                controls: ["zoomControl"],
              },
              {
                searchControlProvider: "yandex#search",
              }
            );
  
            // Основная метка
            let mainIco1 = new ymaps.Placemark(
              [57.733973, 47.024146],
              { hintContent: "Антел" },
              {
                iconLayout: "default#image",
                iconImageHref: "img/icons/pin.svg",
                iconImageSize: [50, 56],
                iconImageOffset: [-25, -56],
              }
            );
  
            mapContacts.geoObjects.add(mainIco1);
            mapContacts.behaviors.disable("scrollZoom");
          });
        };
      } else  {
        ymaps.ready(function () {
          // Инициализация карты

          let mapContacts = new ymaps.Map(
            mapElem,
            {
              zoom: 14,
              center: [57.733973, 47.024146],
              controls: ["zoomControl"],
            },
            {
              searchControlProvider: "yandex#search",
            }
          );

          // Основная метка
          let mainIco1 = new ymaps.Placemark(
            [57.733973, 47.024146],
            { hintContent: "Антел" },
            {
              iconLayout: "default#image",
              iconImageHref: "img/icons/pin.svg",
              iconImageSize: [50, 56],
              iconImageOffset: [-25, -56],
            }
          );

          mapContacts.geoObjects.add(mainIco1);
          mapContacts.behaviors.disable("scrollZoom");
        });
      }
      isLoaded = true;
      
    }
    if (mapElem.getBoundingClientRect().top < window.innerHeight) {
      loadMap();
    }
    window.addEventListener("scroll", function () {
      if (
        !isLoaded &&
        mapElem.getBoundingClientRect().top < window.innerHeight
      ) {
        loadMap();
      }
    });
  }

  const miniMap2 = document.getElementById("miniMap2");
  const miniMap1 = document.getElementById("miniMap1");
  // Карта на странице контактов
  if (miniMap2) {
    var script = document.createElement("script");
    script.classList.add("yamap-script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    document.body.appendChild(script);
    script.onload = function () {
      ymaps.ready(function () {
        // Инициализация карты

        let mapContacts = new ymaps.Map(
          miniMap2,
          {
            zoom: 17,
            center: [57.733973, 47.024146],
            controls: ["zoomControl"],
          },
          {
            searchControlProvider: "yandex#search",
          }
        );

        // Основная метка
        let mainIco1 = new ymaps.Placemark(
          [57.733973, 47.024146],
          { hintContent: "Антел" },
          {
            iconLayout: "default#image",
            iconImageHref: "img/icons/pin.svg",
            iconImageSize: [50, 56],
            iconImageOffset: [-25, -56],
          }
        );

        mapContacts.geoObjects.add(mainIco1);
        mapContacts.behaviors.disable("scrollZoom");
      });
      ymaps.ready(function () {
        // Инициализация карты

        let mapContacts = new ymaps.Map(
          miniMap1,
          {
            zoom: 17,
            center: [56.342012, 43.946374],
            controls: ["zoomControl"],
          },
          {
            searchControlProvider: "yandex#search",
          }
        );

        // Основная метка
        let mainIco1 = new ymaps.Placemark(
          [56.342012, 43.946374],
          { hintContent: "Антел" },
          {
            iconLayout: "default#image",
            iconImageHref: "img/icons/pin.svg",
            iconImageSize: [50, 56],
            iconImageOffset: [-25, -56],
          }
        );

        mapContacts.geoObjects.add(mainIco1);
        mapContacts.behaviors.disable("scrollZoom");
      });
    }

  }

  const textWall = document.querySelector(".text-wall");

  if (textWall) {
    const text = textWall.querySelector("p"),
      more = textWall.querySelector(".text-wall__more");

    if (text.clientHeight > 192) {
      text.classList.add("hide");
      more.addEventListener("click", () => {
        text.classList.remove("hide");
        more.classList.add("hide");
      });
    } else {
      more.classList.add("hide");
    }
  }

  const formItems = document.querySelectorAll(".form-item.empty");

  if (formItems.length) {
    formItems.forEach((item) => {
      const input = item.querySelector("input");

      if (input.value.trim() != "") {
        item.classList.remove("empty");
      }

      input.addEventListener("focus", () => {
        item.classList.remove("empty");
      });

      input.addEventListener("blur", () => {
        if (input.value.trim() != "") {
          item.classList.remove("empty");
        } else {
          item.classList.add("empty");
        }
      });

      input.addEventListener("change", () => {
        if (input.value.trim() != "") {
          item.classList.remove("empty");
        } else {
          item.classList.add("empty");
        }
      });
    });
  }

  const cartCounts = document.querySelectorAll(".cart__count");

  if (cartCounts.length) {
    cartCounts.forEach((item) => {
      let dec = item.querySelector("button.dec"),
        inc = item.querySelector("button.inc"),
        input = item.querySelector("input");

      dec.addEventListener("click", () => {
        if (input.value > 1) {
          input.value--;
        }
      });

      inc.addEventListener("click", () => {
        if (input.value < 99) {
          input.value++;
        }
      });

      input.addEventListener("", (e) => {
        console.log(1);
      });
    });
  }

  const productSlider = document.querySelector(".product-page__slider");

  if (productSlider) {
    const productSwiper = new Swiper(productSlider, {
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".product-page__pag",
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: ".product-page__next",
        prevEl: ".product-page__prev",
      },
    });
  }

  const productGall = document.querySelector(".product-page__gall");

  if (productGall) {
    const productGallSwiper = new Swiper(productGall, {
      slidesPerView: "auto",
      spaceBetween: 20,
      navigation: {
        nextEl: ".product-page__gall-next",
        prevEl: ".product-page__gall-prev",
      },
    });
  }

  const productMarquee = document.querySelector(".product-page__marquee");

  if (productMarquee) {
    const productMfrqueeSwiper = new Swiper(productMarquee, {
      loop: "true",
      speed: 7000,
      spaceBetween: 28,
      slidesPerView: "auto",
      allowTouchMove: false,
      disableOnInteraction: false,
      centeredSlides: true,
      autoplay: {
        delay: 1,
      },

    });
  }

  const faqItemsProd = document.querySelectorAll(".accordeon-title");

  if (faqItemsProd.length) {
    function openAcc(item) {
      item.classList.add("active");
      let panel = item.nextElementSibling;
      panel.style.paddingTop = "28px";
      panel.style.maxHeight = panel.scrollHeight + 28 + "px";
    }

    function closeAcc(item) {
      item.classList.remove("active");
      let panel = item.nextElementSibling;
      panel.style.paddingTop = "0px";
      panel.style.maxHeight = null;
    }

    openAcc(faqItemsProd[0]);

    faqItemsProd.forEach((item) => {
      item.addEventListener("click", () => {
        if (item.classList.contains("active")) {
          closeAcc(item);
        } else {
          openAcc(item);
        }
      });
    });
  }

  const prmoTitle = document.querySelector('.promo h1');

  if (prmoTitle) {
    if (window.screen.width < 700) {
      prmoTitle.innerHTML = 'производство';
      prmoTitle.insertAdjacentHTML('afterend', '<h1 class="second">деревянных палочек</h1>')
    }
  }

  const tooltipBtn = document.querySelector('.product-page__tooltip .question'),
        tooltipBox = document.querySelector('.product-page__tooltip .box');

  if (tooltipBtn && window.screen.width < 1001) {

    document.querySelector('main').addEventListener('click', (e) => {
      if (e.target.classList.contains('question')) {
        tooltipBox.classList.add('active');
      } else {
        tooltipBox.classList.remove('active');
      }
    })
  }  

});

// Окна
function popups(elem = document) {
  // Открыть
  let buttonOpenPopup = elem.querySelectorAll("[data-popup]");
  if (buttonOpenPopup.length) {
    //buttonOpenPopup = once("popups",buttonOpenPopup);

    buttonOpenPopup.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        let popup_id = item.getAttribute("data-popup");
        elem.querySelector("#" + popup_id + "").classList.add("active");
      });
    });
  }
  // Закрыть
  let popup = elem.querySelectorAll(".popup");
  if (popup.length < 1 && elem.classList.contains("popup")) {
    popup = [elem];
  }
  if (popup.length) {
    //once("popups",popup);

    popup.forEach(function (item) {
      item.addEventListener("click", function (e) {
        if (e.target.matches(".popup") || e.target.matches(".popup__close")) {
          item.classList.remove("active");
        }
      });
    });
  }
}

// Маска телефона
function maskPhone(elem = document) {
  let inputs = elem.querySelectorAll('input[type="tel"]');
  if (inputs.length) {
    //inputs = once("inputs",inputs);

    inputs.forEach((phone) => {
      let code = "+7",
        find = /\+7/;
      code = "+7";
      find = /\+7/;
      phone.addEventListener("focus", function () {
        phone.value = code + " " + phone.value.replace(code + " ", "");
      });
      phone.addEventListener("input", function () {
        let val = phone.value.replace(find, ""),
          res = code + " ";
        val = val.replace(/[^0-9]/g, "");
        for (let i = 0; i < val.length; i++) {
          res += i === 0 ? " (" : "";
          res += i == 3 ? ") " : "";
          res += i == 6 || i == 8 ? "-" : "";
          if (i == 10) break;
          res += val[i];
        }
        phone.value = res;
      });
      phone.addEventListener("blur", function () {
        let val = phone.value.replace(find, "");
        val = val.trim();
        if (!val) phone.value = null;
      });
    });
  }
}

// Обенуть таблицы
if (window.innerWidth < 768) {
  let contentTable = document.querySelectorAll(".content table");
  if (contentTable.length) {
    contentTable.forEach(function (item) {
      let tableWrap = document.createElement("div");
      tableWrap.setAttribute("class", "table-wrap");
      item.parentNode.insertBefore(tableWrap, item);
      tableWrap.appendChild(item);
    });
  }
}

// // Fancybox
// Fancybox.bind(':not(.swiper-slide-duplicate) > [data-fancybox]', {
// 	groupAll: true,
// 	placeFocusBack: false, // Починить баг с фенсибоксом и свипером
// 	Image:{
// 		wheel: "slide",
// 	},
// });
// // Исправить баг с дублированием изображений в фенсибоксе, если свипер бесконечный
// document.addEventListener("DOMContentLoaded", function(){
// 	let fancyboxInSlider = document.querySelectorAll('.swiper-slide-duplicate [data-fancybox]');
// 	if(fancyboxInSlider.length){
// 		fancyboxInSlider.forEach(function(item){
// 			item.addEventListener("click", function(e){
// 				e.preventDefault();
// 				let href = item.getAttribute("href");
// 				item.closest(".swiper").querySelector(".swiper-slide:not(.swiper-slide-duplicate) [data-fancybox][href='"+href+"']").click();
// 			});
// 		});
// 	};

// });
