let remove = document.getElementById('remove')
remove.addEventListener('click', removeTodos)

let add = document.getElementById('add')
add.addEventListener('click', addTodos)

let controls = document.querySelector('.container')
let ul = document.getElementById('list')

todos = []
retrievedTodos = []


//check for any todos present in the database
async function fetchTodos() {

    let response = await fetch('https://lets-todo-backend.herokuapp.com/todos');

    if (response.status === 200) {
        let data = await response.json();
        retrievedTodos = data.todo
   
        if (retrievedTodos)
        {
            todos = retrievedTodos
            displayTodos()
        }
        
    }
}




async function removeTodos() {

    //removing only the todos which are checked
    let li = ul.children;

    for (let index = 0; index < li.length; index++) {

        while (li[index] && li[index].children[0].checked) {
            id = li[index].getAttribute("data-id")

            text = li[index].children[1].innerText
          
            removeIndex = retrievedTodos.indexOf(text)
            todos.splice(removeIndex,1)
            ul.removeChild(li[index])

        await fetch(`https://lets-todo-backend.herokuapp.com/todos/${id}`, { 
            method: 'DELETE', 
            headers: { 
                'Content-type': 'application/json'
            } 
        }); 
    }
    }
}

async function addTodos() {
    let input = document.getElementById('input')
    var todoText = input.value
    // remove all the leading and trailing  whitespaces
    todoText = todoText.replace(/(^\s+|\s+$)/g,'')
      
    // Prompt the user to enter a todo again if he enters an empty todo
    if (todoText === "") {

        alert("pls enter a todo")
    }
    else {
    
        // call the api
        let response = await fetch('https://lets-todo-backend.herokuapp.com/todos',{ 
      
            // Adding method type 
            method: "POST", 
              
            // Adding body or contents to send 
            body: JSON.stringify({ 
                title: todoText, 
            }), 
              
            // Adding headers to the request 
            headers: { 
                "Content-type": "application/json"
            } 
        });
        // console.log(response)
        if (response.status === 200) {
            await response.json().then(data=>{ 
                    todos.push(data["todo"])
        })
          // render all the todos
        displayTodos();
        }
    }
}

function displayTodos()
{
//  As long as <ul> has a child node, remove it
    while (ul.hasChildNodes()) {  
        ul.removeChild(list.firstChild);
    }
    todos.forEach(element => {
        //create li
         let li = document.createElement('li')
         li.setAttribute("data-id",element.id)
         //create checkbox
         let checkbox = document.createElement('input')
         checkbox.type = 'checkbox'
         checkbox.name = 'checkbox'
         checkbox.setAttribute('id', 'check')
 
         //create label
         let label = document.createElement('label')
 
         //add these elements
         li.appendChild(checkbox)

         var todoTextNode = document.createTextNode(element.title)
 
         label.appendChild(todoTextNode)
         li.appendChild(label)
         ul.insertBefore(li, ul.childNodes[0])
         setTimeout(() => {
             li.className = 'visual'
         }, 2)
         
    });
    
    input.value = ""
}

// on window loading, display all the todos in the database, if any
window.onload = fetchTodos()