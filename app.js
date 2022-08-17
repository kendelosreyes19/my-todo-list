// SELECTORS

const todoInput = document.querySelector('.form-input')
const todoButton = document.querySelector('.form-button')
const todoList = document.querySelector('.todo-ul')
const filterOption = document.querySelector('.filter-todo')

// EVENT LISTENER
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)
// FUNCTIONS

function addTodo(event) {
    // prevent from submitting the form
    event.preventDefault();

    // todo div

    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todoDiv')

    // create <li>

    const todoDivList = document.createElement('li')
    todoDivList.innerText = todoInput.value
    todoDiv.classList.add('todoDivList')
    todoDiv.appendChild(todoDivList)

    // add items to the LocalStorage

    saveLocalTodos(todoInput.value)

    // check mark button

    const checkBtn = document.createElement('button')
    checkBtn.innerHTML = '<li class= "fas fa-check"></li>'
    checkBtn.classList.add('checkBtn')
    todoDiv.appendChild(checkBtn)

    // trash button

    const trashBtn = document.createElement('button')
    trashBtn.innerHTML = '<li class= "fas fa-trash"></li>'
    trashBtn.classList.add('trashBtn')
    todoDiv.appendChild(trashBtn)

    // append to LIST
    todoList.appendChild(todoDiv)

    // clear the INPUT
    todoInput.value = ""
    todoInput.focus()
}

function deleteCheck(e) {
    const item = e.target

    // deleting todo items
    if (item.classList[0] === 'trashBtn') {
        const parentItem = item.parentElement
        // animation
        parentItem.classList.add('itemDeleted')
        removeLocalTodos(parentItem)
        addEventListener('transitionend', () => {
            parentItem.remove()
        });

    }
    // crossing out todo items
    if (item.classList[0] === 'checkBtn') {
        const parentItem = item.parentElement
        parentItem.classList.toggle('itemCompleted')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        const mStyle = todo.style;
        if (mStyle != undefined && mStyle != null) {
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("itemCompleted")) {
                        mStyle.display = "flex";
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("itemCompleted")) {
                        mStyle.display = "flex";
                    } else {
                        mStyle.display = "none";
                    }
                    break;
            }
        }
    })
}

function saveLocalTodos(todo) {
    // check if there's alread a local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    // check if there's alread a local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {
        // todo div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todoDiv')
        // create <li>
        const todoDivList = document.createElement('li')
        todoDivList.innerText = todo
        todoDiv.classList.add('todoDivList')
        todoDiv.appendChild(todoDivList)
        // check mark button
        const checkBtn = document.createElement('button')
        checkBtn.innerHTML = '<li class= "fas fa-check"></li>'
        checkBtn.classList.add('checkBtn')
        todoDiv.appendChild(checkBtn)
        // trash button
        const trashBtn = document.createElement('button')
        trashBtn.innerHTML = '<li class= "fas fa-trash"></li>'
        trashBtn.classList.add('trashBtn')
        todoDiv.appendChild(trashBtn)
        // append to LIST
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    // check if there's alread a local storage
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}