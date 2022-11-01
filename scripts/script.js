let btnChangeAvatar = document.querySelector('#change-pic-btn');
let btnSaveAvatar = document.querySelector('#save-pic-btn');
let btnCancelAvatar = document.querySelector('#cancel-pic-btn');
let btnChangeNickname = document.querySelector('#change-nickname-btn');
let btnSaveNickname = document.querySelector('#save-nickname-btn');
let btnCancelNickname = document.querySelector('#cancel-nickname-btn');

let changePic = document.querySelector(".change-pic");
let inputPic = document.querySelector("#avatar");
let imgPic = document.querySelector("#avatar-pic");

let changeNickname = document.querySelector(".change-nickname");
let inputNickname = document.querySelector("#nickname-input");
let divNickname = document.querySelector("#nickname");

function changeElement(btn, container) {
    btn.classList.toggle("invisible");
    container.classList.toggle("invisible");
}
divNickname.innerHTML = localStorage.getItem('namee');

function saveElement(input, type, elem, container, btn) {
    let src = input.value;
    if (src != "") {
        if (type == 'innerHtml') {
            elem.innerHTML = src;
            localStorage.setItem('namee', elem.innerHTML);
        } else if (type == 'src') {
            elem.src = src;
            localStorage.setItem("avatar", elem.src);
        }
        changeElement(btn, container);
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
let arr = new Date().daysInMonth();

for (let i=1; i <= arr; i++) {
    let list = document.querySelector(".date_number");
    list.innerHTML += (`<button class="date_btn">${i}</button><p class="date-mood">Настроение ${i} числа было ...</p>`);
}

function getInfo(el) {
    let hint = el.nextElementSibling;
    hint.classList.toggle("hint");
}

let btns = document.querySelectorAll('.date_btn');
    
btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        getInfo(btn);
        btn.classList.toggle('click');
    });
});


btnChangeAvatar.addEventListener('click', () => changeElement(btnChangeAvatar, changePic));
btnSaveAvatar.addEventListener('click', () => saveElement(inputPic, "src", imgPic, changePic, btnChangeAvatar));
btnCancelAvatar.addEventListener('click', () => changeElement(btnChangeAvatar, changePic));


btnChangeNickname.addEventListener('click', () => changeElement(btnChangeNickname, changeNickname));
btnSaveNickname.addEventListener('click', () => saveElement(inputNickname, "innerHtml", divNickname, changeNickname, btnChangeNickname));
btnCancelNickname.addEventListener('click', () => changeElement(btnChangeNickname, changeNickname));


