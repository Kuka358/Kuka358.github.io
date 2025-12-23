document.addEventListener('DOMContentLoaded',function(){
    $('.main-slider').slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });
    
    // ===== МОБИЛЬНОЕ МЕНЮ =====
    $('#menuToggle').click(function(){
        $('.nav').toggleClass('active');
    });
    
    $('.nav-list a').click(function(){
        $('.nav').removeClass('active');
    });
    
    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var destination = document.getElementById("destination");
    var budget = document.getElementById("budget");
    var date = document.getElementById("date");
    var people = document.getElementById("people");
    var agree = document.getElementById("agreement");
    var form = document.getElementById("travelForm");
    var submitBtn = document.querySelector('.btn-submit');
    
    var statusEl = document.createElement('div');
    statusEl.id = "messageContainer";
    statusEl.style.marginTop = "15px";
    statusEl.style.textAlign = "center";
    statusEl.style.fontSize = "14px";
    statusEl.style.minHeight = "20px";
    form.appendChild(statusEl);
    
    var FORM_ENDPOINT = "https://formcarry.com/s/YVJZsd3gPap";
    var STORAGE_KEY = 'travel_form_data';

    function saveToStorage() {
        var obj = {
            name: name.value,
            phone: phone.value,
            destination: destination.value,
            budget: budget.value,
            date: date.value,
            people: people.value,
            agree: agree.checked
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
        } catch (e) {
            console.log("Ошибка сохранения: " + e);
        }
    }

    function restoreFromStorage() {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        try {
            var obj = JSON.parse(raw);
            name.value = obj.name || "";
            phone.value = obj.phone || "";
            destination.value = obj.destination || "";
            budget.value = obj.budget || "";
            date.value = obj.date || "";
            people.value = obj.people || "";
            if (obj.agree !== undefined) agree.checked = obj.agree;
        } catch (e) {
            console.log("Ошибка восстановления: " + e);
        }
    }

    function clearFormAndStorage() {
        form.reset();
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.log("Ошибка очистки: " + e);
        }
    }

    function validateForm() {
        statusEl.textContent = "";
        statusEl.style.color = "";
        
        if (!name.value.trim()) {
            statusEl.textContent = "Введите ваше имя";
            statusEl.style.color = "#e74c3c";
            name.focus();
            return false;
        }
        
        if (!phone.value.trim() || phone.value.length < 10) {
            statusEl.textContent = "Введите корректный номер телефона";
            statusEl.style.color = "#e74c3c";
            phone.focus();
            return false;
        }
        
        if (!agree.checked) {
            statusEl.textContent = "Необходимо согласиться на обработку данных";
            statusEl.style.color = "#e74c3c";
            return false;
        }
        
        return true;
    }

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        
        if (!validateForm()) return;

        var originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Отправка...";

        var payload = {
            name: name.value,
            phone: phone.value,
            destination: destination.value,
            budget: budget.value || "Не указан",
            date: date.value || "Не указаны",
            people: people.value || "Не указано",
            form_type: "travel_request",
            page: "TravelPro турагентство"
        };

        fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.status);
            }
            return response.json();
        })
        .then(function (data) {
            statusEl.style.color = "#27ae60";
            statusEl.textContent = "Спасибо! Ваша заявка принята. Мы перезвоним вам в течение 30 минут.";
            clearFormAndStorage();
        })
        .catch(function (error) {
            statusEl.style.color = "#e74c3c";
            statusEl.textContent = "Ошибка отправки. Пожалуйста, позвоните нам напрямую.";
            console.error('Ошибка:', error);
        })
        .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    });

    name.addEventListener("input", saveToStorage);
    phone.addEventListener("input", saveToStorage);
    destination.addEventListener("change", saveToStorage);
    budget.addEventListener("input", saveToStorage);
    date.addEventListener("change", saveToStorage);
    people.addEventListener("input", saveToStorage);
    agree.addEventListener("change", saveToStorage);

    restoreFromStorage();
});
