"use strict"

$(document).ready(function(){
    $('.feedback__slider').slick({
        dots: true,
        arrows: false,
        variableWidth: true,
        centerMode: true,
        slidesToShow: 1
    });
});

/*JS - Меню*/
let menu = document.querySelector(".menu-toggle");
let nav = document.querySelector(".divider");
let blackout = document.querySelector(".divider--backend");

menu.addEventListener('click', function() {
    menu.classList.toggle('active')
    nav.classList.toggle('active');
    blackout.classList.toggle('active');
} );

let links = document.querySelector(".divider__items");

links.addEventListener('click', function() {
    menu.classList.toggle('active')
    nav.classList.toggle('active');
    blackout.classList.toggle('active');
} );

/* feedback */
let btns = document.querySelectorAll(".feedback");
// let form = document.querySelector(".contact-form");
let formBody = document.querySelector(".form__body");


btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        // form.classList.toggle('active')
        formBody.classList.toggle('active');
        document.body.classList.toggle('stop-scrolling');
    })
})
let checkb = document.querySelector(".contact-form__custom-checkbox");
checkb.addEventListener('click', function () {
    if(checkb.classList.contains('_error')) {
        checkb.classList.remove('_error');
    }
    // document.body.classList.toggle('stop-scrolling');
})
let shadow = document.querySelector(".form__shadow");

shadow.addEventListener('click', function () {
    closeForm();
})
function closeForm() {
    formBody.classList.toggle('active');
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form_1');
    form.addEventListener('submit', formSend);
    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                console.log(result.message);
                form.reset();
                form.classList.remove('_sending');
                closeForm();
            } else {
                console.log("Ошибка");
                form.classList.remove('_sending');
                closeForm();
            }
        } else {
            console.log("Не заполнены поля валидации в количестве: " + error + " !");
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')) {
                if (emailValidator(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }

        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailValidator(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(input.value);
    }

})
