document.addEventListener("DOMContentLoaded", function(){
    const input = document.getElementById("field");
    const select = document.getElementById("select");
    const button = document.getElementById("button");
    const result = document.getElementById("result");

    button.addEventListener("click", function () {
        const price = Number(select.value);
        const quantity = input.value.trim();

        const isValid = /^[1-9][0-9]*$/.test(quantity);

        if (!isValid) {
            result.textContent = "неверное количество";
            return;
        }

        const total = price * Number(quantity);
        result.textContent = "Стоимость покупок: " + total + " руб.";
    })
})
