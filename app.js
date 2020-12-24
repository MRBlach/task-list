//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//hide clear tasks button
document.getElementById('none').style.display = 'none';



//ccccccccccccccCREATE EVENT LISTENERS
// Load all event listeners
loadEventListeners();

function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear task event
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);

  clearBtn.addEventListener('click', cantClearTasks);
}





//fffffffffffffffffffffffFUNCTIONS

//Get tasks from local storage function 
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
        // Rerunning the contents of the addTasks function, but replacing taksInput.value with just task
        tasks.forEach(function(task){
            //create li element
          const li = document.createElement('li');
          //Add class
          li.className = 'collection-item';
          //Create text node and appent to li
          li.appendChild(document.createTextNode(task));

          //Create new link element
          const link = document.createElement('a');
          //Add class
          link.className = 'delete-item secondary-content fa fa-times';
          
          //Style icon
          link.style.float = "right";

          //Append the link to li
          li.appendChild(link);


          //Apend li to the ul
          taskList.appendChild(li);
  });
}




//Add task function
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  } else {
    //create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and appent to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content fa fa-times';
   
    //Style icon
    link.style.float = "right";

    //Append the link to li
    li.appendChild(link);


    //Apend li to the ul
    taskList.appendChild(li);

     
    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    //show clear tasks button 
    document.getElementById('none').style.display = 'inline-block';

  e.preventDefault();
}
}

//Store task function
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task function
function removeTask(e){
  if(e.target.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.remove();

    //remove task from local storage
    removeTaskFromLocalStorage(e.target.parentElement);
    }
  }
}

//Remove task from local storage function
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

 



//Clear tasks
  function clearTasks(e){
    if(taskList.firstChild){
      if(confirm('Are you sure?')){
        while (taskList.firstChild){
          taskList.removeChild(taskList.firstChild);
      }
    } 

    clearTaskFromLocalStorage();

    //hide clear tasks button 
    document.getElementById('none').style.display = 'none';
  }
}


  //Clear tasks from local storage function
  function clearTaskFromLocalStorage(){
    localStorage.clear();
  }    
    



//Filter tasks function
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  //select those with the class="collection-item", which is each li
  document.querySelectorAll('.collection-item')
  .forEach(function(task){
    //declare item variable
    const item = task.firstChild.textContent;
    //create if/else loop for the item variable
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else{
      task.style.display = 'none';
    }
  });}