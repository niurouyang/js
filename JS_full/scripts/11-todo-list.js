const todoList = [
    {
        name:'',
        dueDate:''
    }
];
printTodolist();

const addButton = document.querySelector('.js-add-button');


addButton.addEventListener('click',()=>{
    addList();
})


function addList() {
    const inputValue = document.querySelector('.js-name-input');
    const inputDate = document.querySelector('.due-date');
    const todoName = inputValue.value;
    const todoDate = inputDate.value;

    todoList.push({
        name:todoName,
        dueDate:todoDate
    });
    inputValue.value = '';
    printTodolist();
}


/*
function printTodolist() {
    let todoListhtml ='';
    for (i = 0; i < todoList.length;i++){
        const todoObject =todoList[i];
        //const name = todoObject.name;
        //const dueDate = todoList.dueDate;
        const{name,dueDate} = todoObject;
        const html =`
        <div class="todo-list-item">${name}</div>
        <div class="todo-list-item">${dueDate}</div>
        <button onclick="
            todoList.splice(${i},1);
            printTodolist();
        " class="delete-button">Delete
        </button>
        `;
        //above code generate html codes.
        //splice function will remove item from the array
    
        todoListhtml += html ;
        //add all the html together to form the todolist
        console.log(html)
    }

    document.querySelector('.js-todo-list').innerHTML = todoListhtml;
}
*/

//use foreach of array to rewrite the above code
function printTodolist(){

    let todoListhtml = '';
    todoList.forEach((value,index) =>{
        const{name,dueDate} = value;
        const html =`
        <div class="todo-list-item">${name}</div>
        <div class="todo-list-item">${dueDate}</div>
        <button class="delete-button js-delete-button">Delete
        </button>
        `;

        //above code generate html codes.
        //splice function will remove item from the array
        todoListhtml += html ;
        //add all the html together to form the todolist
        //console.log(html)
        }

    )
    document.querySelector('.js-todo-list').innerHTML = todoListhtml;

    document.querySelectorAll('.js-delete-button')
        .forEach((value,index) =>{
            const deleteButton = value;
            value.addEventListener('click',()=>{
                todoList.splice(index,1);
                printTodolist();
            });
        });
    //use eventlistener to replace the onclick, and this code use on a code generated button
}
