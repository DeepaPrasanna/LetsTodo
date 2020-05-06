""
let remove = document.getElementById('remove')
remove.addEventListener('click', removeTodos)

let add = document.getElementById('add')
add.addEventListener('click', addTodos)

let controls = document.querySelector('.container')
let ul = document.getElementById('list')


function removeTodos() {
    //removing only the todos which are checked
    let li = ul.children;
    // console.log(li)

    for (let index = 0; index < li.length; index++) {

        while (li[index] && li[index].children[0].checked) {
            // console.log(li[index])
            ul.removeChild(li[index])
        }
    }
}

function addTodos() {
    let input = document.getElementById('input')
    var todoText = input.value
    var todoTextNode = document.createTextNode(todoText)

    if (todoText === "") {
        //add a p tag and assign a value of enter your todo
        let enterTodo = document.createElement('p')
        enterTodoText = document.createTextNode('Please enter a todo!')
        enterTodo.appendChild(enterTodoText);
        controls.appendChild(enterTodo)
        //the element auto destroys itself
        setTimeout(() => {
            enterTodo.remove()
        }, 2000)

    }
    else {
        // enterTodo.remove()
        //create li

        let li = document.createElement('li')

        //create checkbox
        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = 'checkbox'
        checkbox.setAttribute('id', 'check')

        //create label
        let label = document.createElement('label')

        //add these elements

        li.appendChild(checkbox)
        label.appendChild(todoTextNode)
        li.appendChild(label)
        ul.insertBefore(li, ul.childNodes[0])

        setTimeout(() => {
            li.className = 'visual'
        }, 2)
        input.value = ""
    }

    window.localStorage.setItem("key", todoText);

    // console.log((parseInt(key)) += 1)

}