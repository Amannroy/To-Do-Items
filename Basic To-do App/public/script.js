document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    addButton.addEventListener('click', () => {
        const todoText = todoInput.value;
        if (todoText !== '') {
            addTodoToServer(todoText);
        }
    });

    function addTodoToServer(todoText) {
        fetch('/addTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo: todoText })
        })
        .then(() => {
            todoInput.value = '';
            fetchTodos();
        });
    }

    function fetchTodos() {
        fetch('/getTodos')
        .then(response => response.json())
        .then(data => {
            renderTodoList(data);
        });
    }

    function renderTodoList(todos) {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo;
            todoList.appendChild(li);
        });
    }

    fetchTodos();
});
