document.addEventListener("DOMContentLoaded", function () {

    const currentLanguage = document.querySelectorAll(".current-language");

    const languageSwitcher = document.querySelector(".language");
    const languageSwitcherMob = document.querySelector(".setting");

    const languageOptions = document.querySelector(".language-options");
    const languageOptionsMob = document.querySelector(".language-options-mob");

    

    // const mobMenuSwitcher = document.querySelector(".menu-title");
    // const mobMenuField = document.querySelector(".menu__subBox");
    // const mobMenuItems = document.querySelectorAll(".menu__subBox .link");
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.classList.add('_touch');

                // mobMenuItems.forEach( i => {
                //      i.addEventListener("click", toggleMobMenuOptions);
                // });

                
                // document.addEventListener("click", (event) => {
                //     if (!mobMenuSwitcher.contains(event.target)) {
                //         mobMenuField.style.display = "none";
                //     }
                // });

      } else {
        document.body.classList.add('pc');
    }



    const loadLanguage = async (lang) => {
        try {
            const response = await fetch(`./languages/${lang}.json`);
            const translations = await response.json();
            document.querySelectorAll("[data-translate]").forEach(el => {
                const key = el.getAttribute("data-translate");
                el.textContent = translations[key];
                // el.placeholder = translations[key];
            });
        } catch (error) {
            console.error("Error loading language:", error);
        }
    };

    
    const toggleLanguageOptions = (event) => {
        languageOptions.style.display = languageOptions.style.display === "block" ? "none" : "block";
    };

    const toggleLanguageOptionsMob = (event) => {
        languageOptionsMob.style.display = languageOptionsMob.style.display === "flex" ? "none" : "flex";
    };

    
    const switchLanguage = (lang) => {
   
        localStorage.setItem("selectedLanguage", lang);

        let langvar;
        
        if (lang === "en") {
            langvar = "Eng";
        } else if (lang === "de") {
            langvar = "Deu";
        } else {
            langvar = "Ukr";
        };

        for (let index = 0; index < currentLanguage.length; index++) {
            currentLanguage[index].textContent = langvar;
        }
        // currentLanguage.textContent = langvar; 
  
        loadLanguage(lang).then(() => {
            languageOptions.style.display = "none";
        });
    };

    
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
    // const selectedLanguage = localStorage.getItem("selectedLanguage");

    let selLangvar;

    if (selectedLanguage === "en") {
        selLangvar = "Eng";
    } else if (selectedLanguage === "de") {
        selLangvar = "Deu";
    } else {
        selLangvar = "Ukr";
    };

    for (let index = 0; index < currentLanguage.length; index++) {
        currentLanguage[index].textContent = selLangvar;
    }

    // currentLanguage.textContent = selLangvar;

    loadLanguage(selectedLanguage);

    languageSwitcher.addEventListener("click", toggleLanguageOptions);
    languageSwitcherMob.addEventListener("click", toggleLanguageOptionsMob);

    languageOptions.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-lang")) {
            switchLanguage(event.target.getAttribute("data-lang"));
        }
    });

    languageOptionsMob.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-lang")) {
            switchLanguage(event.target.getAttribute("data-lang"));
        }
    });

    
    document.addEventListener("click", (event) => {
        if (!languageSwitcher.contains(event.target)) {
            languageOptions.style.display = "none";
        }
    });

    
    document.addEventListener("click", (event) => {
        if (!languageSwitcherMob.contains(event.target)) {
            languageOptionsMob.style.display = "none";
        }
    });

    
    const menuLinks = document.querySelectorAll('a[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach (element => {
            element.addEventListener('click', onMenuLinkCkick);
        });

        function onMenuLinkCkick (e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
                window.scrollTo ({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
                e.preventDefault();

            }
        }
    }

    const returnBtn = document.querySelector('.return__btn');

    document.addEventListener('scroll', function () {
        if (scrollY >= 100) {
            returnBtn.classList.remove('hidden');
        }else{
            returnBtn.classList.add('hidden');
        };
    });

    returnBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    });

    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');

    let unlock = true;

    const timeout = 300;

    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener("click", function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const curentPopup = document.getElementById(popupName);
                console.log("curentPopup: ", curentPopup);
                popupOpen(curentPopup);
                e.preventDefault();
            });
        }
    };
    
    const popupCloseIcon = document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener("click", function (e) {
                popupClose(el.closest('.popup'));
                e.preventDefault();
            });
        }
    };

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener("click", function (e) {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
         };
    };

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnLock();
            }
        }
     };
    
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }        
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            }            
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    })


    const swiper = new Swiper('.slider-main-block', {
        // Optional parameters
        loop: true,
      
          // Navigation arrows
        navigation: {
          nextEl: '.slider-main-block__arrow.swiper-button-next',
          prevEl: '.slider-main-block__arrow.swiper-button-prev',
        },
        autoplay: {
          delay: 6000,
        },
      });
    
    //   swiper.on('click', function (event) {
    //     console.log('swiper click', event);
    //   });
    
      document.querySelectorAll('.about-content2 .slide-image').forEach(image => {
        image.addEventListener('click', (event) => {
            let imagePath = event.target.src; 
            let rezult = new URL(imagePath).pathname;
            let repoName = '/landing_page';
            if (rezult.startsWith(repoName)) {
                rezult = rezult.replace(repoName, '');
                console.log('replaced');
            }             
            const relativePath = rezult.slice(1);
            const imgElement = document.querySelector("#popup2 .popup-img__item");
            if (imgElement) {
                imgElement.src = relativePath; 
            }
            const curentPopup = document.getElementById("popup2");
            popupOpen(curentPopup);

        });
      });
    
    
    // *****************************************************************
    
    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
        if (digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }

    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        const startValue = parseInt(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);

    }

    let options = {
        threshold: 0.3
    }

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
                // observer.unobserve(targetElement);
            }
        });
    }, options);

    let sections = document.querySelectorAll(".running-numbers div");
    if (sections.length) {
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    
    // *****************************************************************

    const animItems = document.querySelectorAll ('.anim_items');
    console.log('animItems: ', animItems );

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                };

                if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('active');
                } else {
                    animItem.classList.remove('active');
                };
            }
        }

        function offset (el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.scrollX || document.documentElement.scrollLeft,
                scrollTop = window.scrollY || document.documentElement.scrollTop;
            return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
        }

        animOnScroll();
    };

    // *****************************************************************

    const mainForm = document.getElementById('form');
    console.log("mainForm", mainForm);

    // *****************************
    mainForm.addEventListener('submit', sendMail);

    // document.getElementById("sendButton").addEventListener("click", sendMail);

    function sendMail(event) {
        event.preventDefault();
        const name = encodeURIComponent(mainForm.name.value);
        const phone = encodeURIComponent(mainForm.phone.value);
        const email = encodeURIComponent(mainForm.email.value);
        const request = encodeURIComponent(mainForm.request.value);
        const select_type = encodeURIComponent(mainForm.select_type.value);
        const select_services = encodeURIComponent(mainForm.select_services.value);
        const privacy = encodeURIComponent(mainForm.privacy.checked);

        const subject = encodeURIComponent("Зворотній зв'язок");
        const body = `Ім'я: ${name}%0D%0AТелефон: ${phone}%0D%0AПошта: ${email}%0D%0AПовідомлення: ${request}%0D%0AТип авто: ${select_type}%0D%0AПослуга: ${select_services}%0D%0AЗгода на обробку даних: ${privacy}`;
    
        // Створюємо mailto посилання з перекодованими даними
        const mailtoLink = `mailto:info.autodienst.at@gmail.com?subject=${subject}&body=${body}`;
    
        // Відкриваємо mailto посилання для відправки листа

        if (privacy !=="true") {
            const confirmElem = document.querySelector(".confirmation .rect");
            confirmElem.classList.add('error');
        } else {
            window.location.href = mailtoLink;
        }

        // window.location.href = mailtoLink;
        
      }

    // *****************************************************************
  
});


