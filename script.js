let remove = document.getElementById('remove')
remove.addEventListener('click', removeTodos)
let controls = document.querySelector('.container')
let ul = document.getElementById('list')

let add = document.getElementById('add')
add.addEventListener('click', addTodos)

function removeTodos() {
    // console.log("hi")

    let li = ul.children;
    // console.log(li)

    for (let index = 0; index < li.length; index++) {

        while (li[index] && li[index].children[0].checked) {
            // console.log(li[index])
            ul.removeChild(li[index])
        }
        // console.log(li[index].children[0].checked)

    }

}

function addTodos() {
    let input = document.getElementById('input')
    var todo = input.value
    var todoText = document.createTextNode(todo)
    if (todo === "") {
        //add a p tag and assign a value of enter your todo
        // let enterTodo = document.createElement('enterTodo')
        // enterTodoText = document.createTextNode('Enter a todo')
        // enterTodo.appendChild(enterTodoText);
        // controls.appendChild(enterTodo)
    }
    else {
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
        label.appendChild(todoText)
        li.appendChild(label)
        ul.insertBefore(li, ul.childNodes[0])

        setTimeout(() => {
            li.className = 'visual'
        }, 2)
        input.value = ""
    }
}