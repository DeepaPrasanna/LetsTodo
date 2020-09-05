let remove = document.getElementById('remove')
remove.addEventListener('click', removeTodos)

let add = document.getElementById('add')
add.addEventListener('click', addTodos)

let controls = document.querySelector('.container')
let ul = document.getElementById('list')

const KEY = "TODO_KEY"
todos = []

//check for any todos present in local storage
retrivedTodos = JSON.parse(localStorage.getItem(KEY))
if (retrivedTodos)
{
    todos = retrivedTodos
}


function removeTodos() {
    
    //removing only the todos which are checked
    let li = ul.children;

    for (let index = 0; index < li.length; index++) {

        while (li[index] && li[index].children[0].checked) {
            
            text = li[index].children[1].innerText
            removeIndex = todos.indexOf(text)
            todos.splice(removeIndex,1)

            //update the local storage
            localStorage.setItem(KEY, JSON.stringify(todos))

            ul.removeChild(li[index])
        }
    }
}

function addTodos() {

    let input = document.getElementById('input')
    var todoText = input.value
    // remove all the leading and trailing  whitespaces
    todoText = todoText.replace(/(^\s+|\s+$)/g,'')
      
    // Prompt the user to enter a todo again if he enters an empty todo
    if (todoText === "") {

        alert("pls enter a todo")
    }
    else {
    
        // check if the browser supports local storage
        if(typeof(Storage) !== "undefined") {

            // store the todo in an array
            todos.push(todoText)

            // store the todo data in local storage
            localStorage.setItem(KEY, JSON.stringify(todos))
        } else {
            alert("Sorry, your browser does not support web storage...")
        }

        // render all the todos
        displayTodos();
  
    }
}

function displayTodos()
{
    retrivedData = JSON.parse(localStorage.getItem(KEY))
    
   // As long as <ul> has a child node, remove it
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
    }
    
    retrivedData.forEach(element => {
         
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
         //retrive the todo text from the local storage
        //  let getTodoText = localStorage.getItem(KEY);
         var todoTextNode = document.createTextNode(element)
 
         label.appendChild(todoTextNode)
         li.appendChild(label)
         ul.insertBefore(li, ul.childNodes[0])
 
         setTimeout(() => {
             li.className = 'visual'
         }, 2)
         
    });
    
    input.value = ""
}

// on window loading, display all the todos in the local storage, if any
window.onload = displayTodos()