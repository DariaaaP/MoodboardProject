let todoForm = document.querySelector('#addBtnToDo');
let todoInput = document.querySelector('#addToDo');
let todoItemsList = document.querySelector('.todo-items');


let todos = [];

todoForm.addEventListener('click', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    if (item !== '') {
        let todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = '';
    } else {
        alert("Пустая список дел! Пожалуйста, введите текст!")
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function(item) {
        let checked = item.completed ? 'checked': null;
        let li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
            <input type="checkbox" class="check" ${checked}>
            ${item.name}
            <button class="delete-button">X</button>
            `;
        todoItemsList.prepend(li);
        if (li.classList.contains('checked')) {
            todoItemsList.append(li);
        }
    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage() {
    let reference = localStorage.getItem('todos');
    if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
    }
}

function toggle(id) {
    todos.forEach(function(item) {
    if (item.id == id) {
        item.completed = !item.completed;
    }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {

    todos = todos.filter(function(item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});