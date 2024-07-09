const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
let todos = [];

function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos();
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo}</span>
            <button class="delete-btn" data-index="${index}">×</button>
        `;
        todoList.appendChild(li);
    });
}

function addTodo() {
    const todoText = input.value.trim();
    if (todoText === '') return;

    todos.push(todoText);
    saveTodos();
    renderTodos();
    input.value = '';
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo();
});

todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        deleteTodo(index);
    }
});

loadTodos();