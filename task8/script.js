document.addEventListener("DOMContentLoaded", function () {
    var fio = document.getElementById("fullName");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var org = document.getElementById("organization");
    var message = document.getElementById("message");
    var agree = document.getElementById("privacyPolicy");

    var openBtn = document.getElementById("openFeedbackBtn");
    var overlay = document.getElementById("modalOverlay");
    var closeBtn = document.getElementById("closeModalBtn");

    var form = document.getElementById("feedbackForm");
    var statusEl = document.getElementById("messageContainer");
    var submitBtn = document.getElementById("submitBtn");

    var FORM_ENDPOINT = "https://formcarry.com/s/YVJZsd3gPap";

    var STORAGE_KEY = 'feedback_form_data';

    function openForm() {
        restoreFromStorage();
        overlay.classList.add("open");
        overlay.style.display = "flex";
        overlay.setAttribute("aria-hidden", "false");
        history.pushState({ contactOpen: true }, "", "?contact=open");
        statusEl.textContent = "";
        fio.focus();
    }

    function closeForm() {
        overlay.classList.remove("open");
        overlay.style.display = "none";
        overlay.setAttribute("aria-hidden", "true");
        statusEl.textContent = "";

        try {
            history.back();
        } catch (e) {
        }
    }

    window.addEventListener("popstate", function (evt) {
        var state = evt.state;
        if (state && state.contactOpen) {
            overlay.classList.add("open");
            overlay.style.display = "flex";
            overlay.setAttribute("aria-hidden", "false");
            restoreFromStorage();
        } else {
            overlay.classList.remove("open");
            overlay.style.display = "none";
            overlay.setAttribute("aria-hidden", "true");
        }
    });

    function saveToStorage() {
        var obj = {
            fio: fio.value,
            email: email.value,
            phone: phone.value,
            org: org.value,
            message: message.value,
            agree: agree.checked
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
        } catch (e) {
            console.log("Ошибка STORAGE_KEY: " + e);
        }
    }

    function restoreFromStorage() {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) { return; }
        var obj = JSON.parse(raw);
        fio.value = obj.fio || "";
        email.value = obj.email || "";
        phone.value = obj.phone || "";
        org.value = obj.org || "";
        message.value = obj.message || "";
        agree.checked = !!obj.agree;
    }

    function clearFormAndStorage() {
        form.reset();
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.log("Ошибка очистки формы и хранилища: " + e);
        }
    }

    function validateForm() {
        if (!fio.value.trim()) {
            statusEl.textContent = "Введите ФИО";
            statusEl.style.color = "crimson";
            return false;
        }
        if (!email.value.trim()) {
            statusEl.textContent = "Введите почту";
            statusEl.style.color = "crimson";
            return false;
        }
        if (!message.value.trim()) {
            statusEl.textContent = "Введите сообщение";
            statusEl.style.color = "crimson";
            return false;
        }
        if (!agree.checked) {
            statusEl.textContent = "Необходимо согласиться на обработку персональных данных.";
            statusEl.style.color = "crimson";
            return false;
        }
        return true;
    }

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        statusEl.textContent = "";

        if (!validateForm()) { return; }

        submitBtn.disabled = true;
        submitBtn.textContent = "Отправка обращения...";

        var payload = {
            fio: fio.value,
            email: email.value,
            phone: phone.value,
            organization: org.value,
            message: message.value
        };

        fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(payload)
        }).then(function (resp) {
            if (!resp.ok) {
                throw new Error("Сервер вернул ошибку: " + resp.status);
            }
            return resp.json();
        }).then(function (data) {
            statusEl.style.color = "green";
            statusEl.textContent = "Спасибо! Ваше сообщение отправлено.";
            clearFormAndStorage();
        }).catch(function (err) {
            statusEl.style.color = "crimson";
            statusEl.textContent = "Ошибка отправки: " + (err.message || "Попробуйте позже.");
        }).finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = "Отправить сообщение";
        });
    });

    fio.addEventListener("input", saveToStorage);
    email.addEventListener("input", saveToStorage);
    phone.addEventListener("input", saveToStorage);
    org.addEventListener("input", saveToStorage);
    message.addEventListener("input", saveToStorage);
    agree.addEventListener("change", saveToStorage);

    openBtn.addEventListener("click", function () {
        openForm();
    });

    closeBtn.addEventListener("click", function () {
        closeForm();
    });

    if (window.location.search.indexOf("contact=open") !== -1) {
        history.replaceState({ contactOpen: true }, "", window.location.href);
        overlay.classList.add("open");
        overlay.style.display = "flex";
        overlay.setAttribute("aria-hidden", "false");
        restoreFromStorage();
    }

    overlay.style.display = "none";
});