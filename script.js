
    // Когда пользователь прокрутит вниз 20px, показать кнопку
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        const scrollTopBtn = document.getElementById("scrollTopBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    }

    // Когда пользователь нажимает на кнопку, страница прокручивается наверх
    function topFunction() {
        //document.body.scrollTop = 0; // Для Safari
        //document.documentElement.scrollTop = 0; // Для остальных браузеров
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Убираем якорь из URL
        if (window.location.hash) {
            history.replaceState(null, null, window.location.pathname);
        }
    }


    // Lazy load of background image
    document.addEventListener("DOMContentLoaded", function() {
        let lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-bg"));
    
        if ("IntersectionObserver" in window) {
            let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        let lazyBackground = entry.target;
                        lazyBackground.style.backgroundImage = lazyBackground.getAttribute("data-bg");
                        lazyBackgroundObserver.unobserve(lazyBackground);
                    }
                });
            });
    
            lazyBackgrounds.forEach(function(lazyBackground) {
                lazyBackgroundObserver.observe(lazyBackground);
            });
        } else {
            // Фолбэк для старых браузеров
            lazyBackgrounds.forEach(function(lazyBackground) {
                lazyBackground.style.backgroundImage = lazyBackground.getAttribute("data-bg");
            });
        }
    });

    
    // Дата не раннее сегодня
    document.addEventListener('DOMContentLoaded', function () {
        // Imposta il valore minimo come la data di oggi
        const oggi = new Date().toISOString().split('T')[0]; // Ottiene la data odierna nel formato corretto (AAAA-MM-GG)
        document.getElementById('giorno').setAttribute('min', oggi);
      });

    // проверка времени  
    document.addEventListener('DOMContentLoaded', function () {
        const giornoInput = document.getElementById('giorno');
        const turnoInput = document.getElementById('turno');
    
        // Устанавливаем минимальную дату (сегодня)
        const oggi = new Date().toISOString().split('T')[0];
        giornoInput.setAttribute('min', oggi);
    
        // Функция для обновления минимального времени
        function aggiornaOrarioMinimo() {
          const selectedDate = new Date(giornoInput.value);
          const today = new Date();
    
          if (selectedDate.toDateString() === today.toDateString()) {
            // Если дата выбрана сегодня, устанавливаем минимальное время
            const currentTime = today.toTimeString().split(':').slice(0, 2).join(':');
            turnoInput.setAttribute('min', currentTime);
          } else {
            // Если выбрана другая дата, убираем ограничение по времени
            turnoInput.removeAttribute('min');
          }
        }
    
        // Добавляем обработчики событий
        giornoInput.addEventListener('change', aggiornaOrarioMinimo);
        turnoInput.addEventListener('input', aggiornaOrarioMinimo); // Обработчик для времени
    
        // Обновляем минимальное время при загрузке страницы
        aggiornaOrarioMinimo();
      });


    // проверка количества
    document.addEventListener('DOMContentLoaded', function () {
        const quantiInput = document.getElementById('quanti');
    
        // Aggiungi un evento per controllare il valore
        quantiInput.addEventListener('input', function () {
          if (quantiInput.value < 1) {
            quantiInput.value = ''; // Reset del campo se il valore è 0 o negativo
          }
        });
      });


// Телефон по маске
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call(document.querySelectorAll('.tel'), function(input) {
        var keyCode;

        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;

            // Перемещаем курсор на первый значащий символ маски
            if (pos < 4) {
                event.preventDefault();
                this.setSelectionRange(4, 4);
            }

            var matrix = "+39 (___)-___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                });

            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 4); // Устанавливаем первую значащую позицию на символ после "+39 "
                new_value = new_value.slice(0, i);
            }

            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}";
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
                this.value = new_value;
            }

            if (event.type == "blur") {
                // Проверка на минимальное количество цифр и полное заполнение номера
                var cleanVal = this.value.replace(/\D/g, ""); // Убираем все нецифровые символы
                if (cleanVal.length < 12) { // +39 + 10 цифр
                    this.setCustomValidity("Inserisci tutte le cifre del numero.");
                } else {
                    this.setCustomValidity(""); // Убираем сообщение об ошибке, если длина корректна
                }
            }
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);
    });
});

// Проверяем, согласился ли пользователь ранее
if (localStorage.getItem("cookiesAccepted") === "true") {
    document.getElementById("cookie-notice").style.display = "none";
    document.getElementById("map-container").style.display = "block";
  }

  // Функция для принятия cookies
  function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    document.getElementById("cookie-notice").style.display = "none";
    document.getElementById("map-container").style.display = "block";
  }


//JavaScript для активации кнопки:
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('input', function () {
        // Проверяем, все ли обязательные поля заполнены
        if (form.checkValidity()) {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', true);
        }
    });
});


// Функция принятия данных формы
  function formSubmit(event) {

    // Остановить стандартное поведение отправки формы
    event.preventDefault();

    const loading   = document.querySelector("#loading");
    const error     = document.querySelector("#error");
    const success   = document.querySelector("#success");

    loading.classList.remove("d-none");
    success.classList.add("d-none");
    error.classList.add("d-none");

    const name      = document.querySelector('#nome').value;
    const surname   = document.querySelector('#cognome').value;
    const mobile    = document.querySelector('#cellulare').value.replace(/[^\d+]/g, '');
    const people    = document.querySelector('#quanti').value;
    const date      = document.querySelector('#giorno').value;
    const turn      = document.querySelector('#turno').value;
    const message   = document.querySelector('#messaggio').value;


    $.ajax({
        url: "https://cieffe-web-backend.vercel.app/api/ombra/reservations",
        type: "POST",
        data: {
            name: name,
            surname: surname,
            mobile: mobile,
            people: people,
            date: date,
            turn: turn,
            message: message
        },
        success: function (result) {

          console.log("result", result);
          
          loading.classList.add("d-none");
          error.classList.add("d-none");
          success.classList.remove("d-none");

          setTimeout(function() {

            success.classList.add("d-none")
            
            }, 2000)
            
          
        },
          
        error: function (error) {
          
          console.log(error);
          
          loading.classList.add("d-none");
          success.classList.add("d-none");
          error.classList.remove("d-none");

          setTimeout(function() {

            success.classList.add("d-none")
            
            }, 2000)
            
          
        },
    });

  // console.log('Done');  
}

// Нажатие на кнопки Vedi di piu
document.querySelectorAll('.mybutton').forEach(function(button) {
    button.addEventListener('click', function() {
      window.open('https://andrew-lazarev.com/en/', '_blank');
    });
  });
