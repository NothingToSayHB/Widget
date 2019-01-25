

let create = document.getElementById('addTask');
const mainBlock = document.body.appendChild(document.createElement('div'));
mainBlock.className = "Main-block";
const colors = ['#aa112e', '#0c11e7', '#e5fa01', '#28dd16'];

function createElement(type, className, innerHTML) { 
  let newElement = document.createElement(type);
  newElement.className = className || '';
  newElement.innerHTML = innerHTML || '';
  return newElement; 
}

function eventElement(taskList,input,block) { 
  let remoweTask = createElement('button', 'remove-btn', '<i class="fa fa-ban" aria-hidden="true"></i>');
  let task = createElement('div', 'task');
  let taskNumber = createElement('span', 'number-t', taskList.childNodes.length + 1 + '.'); 
  let taskText = createElement('span', 'elem-task', input.value);
  let colorText = block.querySelector('.colors .active');

/** При двойном клике на элемент изменить его текст*/
 taskText.addEventListener('dblclick', () => {
   let editInput = createElement('input');
   task.removeChild(taskText);
   task.appendChild(editInput);
   task.removeChild(remoweTask);
   editInput.addEventListener('keyup', (event) =>  {
      if(event.keyCode == 13){
       taskText.innerText = editInput.value;
       task.appendChild(taskText);
       task.appendChild(remoweTask);
       task.removeChild(editInput);
      }
   });
 });
  
 if (colorText !== null) {
   if (colorText.className == 'color active') {
     taskText.style.color = colorText.style.backgroundColor;
   } else {
     taskText.style.color = getRandomColor();
   }
 } 
  
  if (input.value !== null && input.value !== '') {
  task.appendChild(taskNumber);
  task.appendChild(taskText);
  task.appendChild(remoweTask);
  taskList.appendChild(task);
  }
  /** Удаление таска */
     remoweTask.addEventListener('click', () => {    
         taskList.removeChild(task);     
         for (let i = 0; i < taskList.childNodes.length; i++) {     
             taskList.childNodes[i].querySelector('.number-t')
             .innerText = i + 1 + '.';     
            }   
          }); 
        }

function createWidgetBlock() { 
  let newBlock = mainBlock.appendChild(document.createElement('div'));
  let input = createElement('input', 'maim-input');
  let addTaskButton = createElement('button', 'btn-create', '<i class="fa fa-plus" aria-hidden="true"></i>');
  let taskList = createElement('div', 'task-list');
  let removeWidget = createElement('button', 'remove-widget', '<i class="fa fa-trash" aria-hidden="true"></i>');
  let colorsTask = createElement('div', 'colors');
  
  /** Изменение цвета блок тасклист при двойном клике на него*/
  taskList.addEventListener('dblclick', () => {
   taskList.style.backgroundColor = getRandomColor();
  });

  /** Перебор элементов массива колорс и присваивание их в блоки ссылки а*/
  for (let i = 0; i < colors.length; i++) {
    let colorEl = createElement('a', 'color');
    colorEl.style.backgroundColor = colors[i];
    colorsTask.appendChild(colorEl); 
  }
  colorsTask.appendChild(createElement('a', 'random-color', '<i class="fa fa-question" aria-hidden="true"></i>'));
     for (let i = 0; i < colorsTask.childNodes.length; i++) {
    colorsTask.childNodes[i].addEventListener('click', () => {
      for (let j = 0; j < colorsTask.childNodes.length; j++) {
        if (colorsTask.childNodes[j].className == 'color' ||
            colorsTask.childNodes[j].className == 'color active') {
          colorsTask.childNodes[j].className = 'color';
         
        } else {
          colorsTask.childNodes[j].className = 'random-color';
        }
      }
      if (colorsTask.childNodes[i].className == 'color') {
        colorsTask.childNodes[i].className = 'color active';
      } else {
        colorsTask.childNodes[i].className = 'random-color active';
      }
    });
  }

  /** Верстка порядок элементов */
  newBlock.appendChild(input);
  newBlock.appendChild(addTaskButton);
  newBlock.appendChild(colorsTask);
  newBlock.appendChild(taskList);
  newBlock.appendChild(removeWidget);
  newBlock.className = 'bl-task-l';
  
  // /** Создание строки */
  

  addTaskButton.addEventListener('click',  () => {
    eventElement(taskList,input,newBlock); 
  });
  input.addEventListener('keyup', (event) =>{
  if (event.keyCode == 13) {
    eventElement(taskList,input,newBlock); 
  }
  });

  /** Удаление всего виджета  */

  removeWidget.addEventListener('click', () => {
    mainBlock.removeChild(newBlock);
  });
  return newBlock;
}

create.addEventListener('click', () => createWidgetBlock());

function getRandomColor() {
  const r = Math.floor(Math.random() * (256));
  const g = Math.floor(Math.random() * (256));
  const b = Math.floor(Math.random() * (256));
  const c = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return c;
}



