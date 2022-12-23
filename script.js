// finding elements on page through the id 
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = []

if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(function (task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.text}</span>
    <div class="task-item__buttons">
        <button id="buttom_done" type="button" data-action="done" class="btn-action">
           done
        </button>
        <button id="buttom_del" type="button" data-action="delete" class="btn-action">
           del
        </button>
    </div>
    </li>`;

    tasksList.insertAdjacentHTML('beforeend', taskHTML)
    
});

checkEmptyList();

// track event in input
form.addEventListener('submit', addTask);

// del tasks
tasksList.addEventListener('click', deleteTask)

// done task
tasksList.addEventListener('click', doneTask)




function addTask(event) {
    // cancel sending form
    event.preventDefault();
    
    // get task text 
    const taskText = taskInput.value

    // describe task like obj
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };
    
    //add task to array
    tasks.push(newTask);

    saveToLocalStorage();
    
    
    // create css class
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    // create script for new task
    const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button id="buttom_done" type="button" data-action="done" class="btn-action">
           done
        </button>
        <button id="buttom_del" type="button" data-action="delete" class="btn-action">
            del
        </button>
    </div>
    </li>`;

    // add task 
    tasksList.insertAdjacentHTML('beforeend', taskHTML)

    // clean input n back focus on it
    taskInput.value = ""
    taskInput.focus()

    checkEmptyList();
  
}

function deleteTask(event) {
    //check if click was not on delete ==> finish func
    if (event.target.dataset.action !== 'delete') return;
    
    //search parent li and delete it
    const parentNode = event.target.closest('.list-group-item') 

    //determine task id
    const id = Number(parentNode.id)

    //find index of arr
    const index = tasks.findIndex(function (task){
        if (task.id === id) {
            return true
        }
    })

    // del with method splice(from what el delete, how many el)
    tasks.splice(index, 1)

    saveToLocalStorage();

    //delete task (teg li from html)
    parentNode.remove()

    checkEmptyList();

}    

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;

        const parentNode = event.target.closest('.list-group-item');

        //here use method find 
        const id = Number(parentNode.id)
        const task = tasks.find((task) => task.id === id);

        task.done = !task.done

        saveToLocalStorage();

        const taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
        
}    

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
                                <div class="empty-list__title">list is empty</div>
                                </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);                        
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}