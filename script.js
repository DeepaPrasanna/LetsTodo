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

    let response = await fetch('http://127.0.0.1:5000/todos');

    if (response.status === 200) {
        let data = await response.json();
        // console.log(data.todo)
        for (const key in data.todo){
            // console.log(data.todo[key].title)
            let retrievedTodo = data.todo[key].title
            retrievedTodos.push(retrievedTodo)
           
        }
        if (retrievedTodos)
        {
        todos = retrievedTodos
        }
        displayTodos()
    }
}




async function removeTodos() {
    let retrievedIndex
    //removing only the todos which are checked
    let li = ul.children;

    for (let index = 0; index < li.length; index++) {

        while (li[index] && li[index].children[0].checked) {
            
            text = li[index].children[1].innerText
            // console.log(text)
            removeIndex = retrievedTodos.indexOf(text)
            // console.log(removeIndex)
            todos.splice(removeIndex,1)

            ul.removeChild(li[index])

            // call the get todos api again
            let response = await fetch('http://127.0.0.1:5000/todos');

            if (response.status === 200) {
                let data = await response.json();
                // console.log(data.todo)
                for (const key in data.todo){
                    // console.log(data.todo[key].title)
                    let retrievedTodo = data.todo[key].title
                    if (retrievedTodo === text)
                    {
                        retrievedIndex = data.todo[key].id
                        // console.log(retrievedIndex)
                        break
                    }
                
                
                }
            }

        await fetch(`http://127.0.0.1:5000/todos/${retrievedIndex}`, { 
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
        let response = await fetch('http://127.0.0.1:5000/todos',{ 
      
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

        if (response.status === 200) {

        // add in the todos array and then display
        todos.push(todoText)

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
    // console.log(retrievedTodos)
    todos.forEach(element => {
       
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
window.onload = fetchTodos()