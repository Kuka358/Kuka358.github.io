window.addEventListener("DOMContentLoaded", function(){
    var quantity = document.getElementById("quantity");
    var productOption = document.getElementById("product-option");
    var form = document.getElementById("radio-group");
    var radio = form.elements["service"];
    var quantityError = document.getElementById("quantity-error");
    var productField = document.getElementById("product-field");
    var propertyField = document.getElementById("property-field");
    var propertyCheckbox = document.getElementById("property-checkbox");
    var result = document.getElementById("summary");

    var basePrice = {"1": 100, "2": 200, "3": 300};
    var propertyAdd = 2000;

    function getSelectedType(){
        for(var i = 0; i < radio.length; i++){
            if(radio[i].checked)
                return radio[i].value;
        }
        return "1";
    }

    function isValidQuantity(str) {
        return /^[1-9][0-9]*$/.test(str);
    }

    function updateOptions(){
        var t = getSelectedType();
        if(t === "1"){
            productField.style.display = "none";
            propertyField.style.display = "none";
        }
        else if(t === "2"){
            productField.style.display = "";
            propertyField.style.display = "none";
        }
        else if(t === "3"){
            productField.style.display = "none";
            propertyField.style.display = "";
        }
    }

    function resum() {
        var t = getSelectedType();
        var qRaw = quantity.value.trim();

        if (!isValidQuantity(qRaw)) {
            quantityError.textContent = "Введите целое число > 0.";
            quantityError.style.color = "red";
            quantityError.style.fontWeight = "bold";
            result.textContent = "Стоимость: 0";
            return;
        }

        quantityError.textContent = "";

        var q = Number(qRaw);
        var unit = basePrice[t];
        var add = 0;

        if (t === "2") {
            add = Number(productOption.value);
        } else if (t === "3") {
            add = propertyCheckbox.checked ? propertyAdd : 0;
        }

        var total = q * (unit + add);
        result.textContent = "Стоимость: " + total + " руб. (" + q + " × " + (unit + add) + " руб.)";
    }

    var k;
    for (k = 0; k < radio.length; k++) {
        radio[k].addEventListener("change", function () {
            updateOptions();
            resum();
        });
    }

    quantity.addEventListener("input", function () {
        resum();
    });

    productOption.addEventListener("change", function () {
        resum();
    });

    propertyCheckbox.addEventListener("change", function () {
        resum();
    });

    updateOptions();
    resum();
})