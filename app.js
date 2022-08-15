// DEFINE UI VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD ALL EVENT LISTENERS
loadEventListeners();

// LOAD ALL EVENT LISTENERS 
function loadEventListeners() {
  //DOM LOAD EVENT
  document.addEventListener('DOMContentLoaded', getTasks);
  // ADD TASK EVENT
  form.addEventListener('submit', addTask);
  // REMOVE TASK EVENT
  taskList.addEventListener('click', removeTask);
  // CLEAR TASK EVENT
  clearBtn.addEventListener('click', clearTasks);
  // FILTER TASKS EVENT
  filter.addEventListener('keyup', filterTasks);
}

//  GET TASKS FROM LOCAL STORAGE
function getTasks() {
  //initialise tasks
  let tasks;
  // then we check if the local storage is currently storing any tasks
  if(localStorage.getItem('tasks') === null){
    // set it to an empty array if there is
    tasks = [];
  } else {
    // storage can only store strings, so we need to parse the input
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // now we want to loop through the tasks that do exist in the local storage
  tasks.forEach(function(task){

    //THE BELOW IS COPIED FROM BELOW - THIS IS HOW WE SHOW THE TASKS IN STORAGE AS ACTUAL TASKS IN THE (UI) LIST
    // CREATE li ELEMENT
  const li = document.createElement('li');
  // ADD CLASS
  li.className = 'collection-item';
  // CREATE TEXT NODE & APPEND TO li
  li.appendChild(document.createTextNode(task)); // (task) IS THE ONLY CHANGE FORM THE ONE BELOW
  // CREATE NEW LINK ELEMENT
  const link = document.createElement('a');
  //ADD CLASS (In Materialize, to place x to the right we need to use CLASS secondry-content)
  link.className = 'delete-item secondary-content';
  // ADD ICON HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // APPEND THE LINK TO THE li
  li.appendChild(link);

  //APPEND li TO THE ul
  taskList.appendChild(li);
  })

}


// ADD TASK
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // CREATE li ELEMENT
  const li = document.createElement('li');
  // ADD CLASS
  li.className = 'collection-item';
  // CREATE TEXT NODE & APPEND TO li
  li.appendChild(document.createTextNode(taskInput.value));
  // CREATE NEW LINK ELEMENT
  const link = document.createElement('a');
  //ADD CLASS (In Materialize, to place x to the right we need to use CLASS secondry-content)
  link.className = 'delete-item secondary-content';
  // ADD ICON HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // APPEND THE LINK TO THE li
  li.appendChild(link);

  //APPEND li TO THE ul
  taskList.appendChild(li);

  // STORE IN LOCAL STORAGE
  storeTaskInLocalStorage(taskInput.value);


  // CLEAR INPUT
  taskInput.value = '';

  e.preventDefault();
}

// STORE TASK
function storeTaskInLocalStorage(task){
  // initialise tasks
  let tasks;
  // then we check if the local storage is currently storing any tasks
  if(localStorage.getItem('tasks') === null){
    // set it to an empty array if it is
    tasks = [];
  } else {
    // storage can only store strings, so we need to parse the input
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task)

  //STORE ITEM - convert input to string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// REMOVE TASK
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //REMOVE FROM LOCAL STORAGE
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  } 
}

//REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
  // initialise tasks
  let tasks;
  // then we check if the local storage is currently storing any tasks
  if(localStorage.getItem('tasks') === null){
    // set it to an empty array if it is
    tasks = [];
  } else {
    // storage can only store strings, so we need to parse the input
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  //LOOP THROUGH THE TASKS
  tasks.forEach(function(task, index){
    //CHECK TO SEE IF THE TEXT ITEM IN THE LIST MATCHES THE TEXT IN THE STRING
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  //  now we go under the foreach and set the local storage again
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR TASKS (ALL)
function clearTasks() {
  // taskList.innerHTML = '';

  //FASTER WAY OF THE ABOVE (Faster excecution)
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //CLEAR TASKS FROM LOCAL STORAGE
  clearTasksFromLocalStorage();
}

//CLEAR TASKS FROM LOCAL STORAGE
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// FILTER TASKS
function filterTasks(e) {
  //THE BELOW TARGETS WHATEVER THE USER TYPES IN
  const text = e.target.value.toLowerCase();
  
  //WE CAN USE A FOREACH LOOP HERE TO LOOP THROUGH EACH LIST AS THE QUERYSELECTORALL RETURNS A NODELIST
  document.querySelectorAll('.collection-item').forEach(
    function(task) {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  );
}