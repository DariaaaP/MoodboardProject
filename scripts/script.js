let btnChangeAvatar = document.querySelector('#change-pic-btn');
let btnSaveAvatar = document.querySelector('#save-pic-btn');
let btnCancelAvatar = document.querySelector('#cancel-pic-btn');
let btnChangeNickname = document.querySelector('#change-nickname-btn');
let btnSaveNickname = document.querySelector('#save-nickname-btn');
let btnCancelNickname = document.querySelector('#cancel-nickname-btn');

let formatLink = /(^data?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;

let changePic = document.querySelector(".change-pic");
let inputPic = document.querySelector("#avatar");
let imgPic = document.querySelector("#avatar-pic");

let changeNickname = document.querySelector(".change-nickname");
let inputNickname = document.querySelector("#nickname-input");
let divNickname = document.querySelector("#nickname");

let list = document.querySelector(".date_number");
let mood = document.querySelector('.information-mood');

function changeElement(btn, container, input) {
    btn.classList.toggle("invisible");
    container.classList.toggle("invisible");
    input.classList.remove("error");
}
divNickname.innerHTML = localStorage.getItem('namee');

function saveElement(input, type, elem, container, btn) {
    let src = input.value;
    if (src != "") {
        if (type == 'innerHtml') {
            elem.innerHTML = src;
            localStorage.setItem('namee', elem.innerHTML);
            changeElement(btn, container, input);
        } else if (type == 'src') {
            if (ValidInput(input, formatLink)) {
                elem.src = src;
                localStorage.setItem("avatar", elem.src);
                changeElement(btn, container, input);
            } else {
                alert ("Поле заполнено некорректно!")
            }
        }
    } else {
        alert("Поле не заполнено")
    }
    input.value = "";
}

document.addEventListener("DOMContentLoaded", function(event) {
    if (localStorage.getItem('avatar') == null || localStorage.getItem('avatar') == "") {
        localStorage.setItem('avatar', imgPic.src);
    } else {
        imgPic.src = localStorage.getItem('avatar');
    }
})

let month = document.querySelector('#month');
let month_names = ['January', 'February', 'March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let date = new Date()
month.innerHTML = month_names[date.getMonth()]+ ' ' + date.getFullYear();

Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};
let dates = new Date().daysInMonth();

for (let i=1; i <= dates; i++) {
    list.innerHTML += (`<button class="date_btn">${i}</button>`);
}

function getInfo() {
    mood.classList.toggle('show');
}

let btns = document.querySelectorAll('.date_btn');

let keys = Object.keys(localStorage);

function ValidInput(input, format) {
    if (input.value.match(format)) {
        input.classList.remove("error");
        return true;
    }
    else {
        input.classList.add("error");
        return false;
    }
}

btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        getInfo();
        btn.classList.toggle('click');
        list.classList.toggle('active');
        mood.innerHTML = `Настроение ещё не определено :>`
        for (let key of keys) {
            if (key == `${index+1}.${date.getMonth()}`) {
                mood.innerHTML = `Настроение ${index+1} числа было ${localStorage.getItem(key)}`
            }
        }
        for (let b in btns) {
            if (list.classList.contains('active')) {
                btns[b].disabled = true;
                if (btns[b].classList.contains('click')) {
                    btns[b].disabled = false;
                }
            } else {
                btns[b].disabled = false;
            }
        }
    });
});


btnChangeAvatar.addEventListener('click', () => changeElement(btnChangeAvatar, changePic));
btnSaveAvatar.addEventListener('click', () => saveElement(inputPic, "src", imgPic, changePic, btnChangeAvatar));
btnCancelAvatar.addEventListener('click', () => changeElement(btnChangeAvatar, changePic, inputPic));


btnChangeNickname.addEventListener('click', () => changeElement(btnChangeNickname, changeNickname));
btnSaveNickname.addEventListener('click', () => saveElement(inputNickname, "innerHtml", divNickname, changeNickname, btnChangeNickname));
btnCancelNickname.addEventListener('click', () => changeElement(btnChangeNickname, changeNickname, inputNickname));


