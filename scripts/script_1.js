document.addEventListener("DOMContentLoaded", function(event) {
    let form = document.querySelector('#form');
    let inputName = document.querySelector('#formName');

    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        localStorage.setItem('namee', inputName.value);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('https://httpbin.org/post', {
                method: "POST",
                body: formData
            });
            if (response.ok){
                let result = await response.json();
                console.log(result);
                form.reset();
                form.classList.remove('_sending');
                location.href='index.html';
            }else{
                alert("Ошибка");
                form.classList.remove('_sending');
            }

        } else {
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

});