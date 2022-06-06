const todoLocalStorage = "todo-list";
const todoList = localStorage.getItem(todoLocalStorage)
  ? JSON.parse(localStorage.getItem(todoLocalStorage))
  : [];
//-------------------------------------------------selectors
//-------------------------------------------------selectors
const todoContainer = document.getElementById("todo_container");
const form = document.getElementById("form");
const createInput = document.getElementById("input");
const errorHtml = document.getElementById("error");

//-------------------------------------------------create todo
//-------------------------------------------------create todo
form.addEventListener("submit", function (event) {
  event.preventDefault();
  //create conditions
  if (!createInput.value.trim()) {
    return errorHandler("Please Write Something");
  }
  const isExist = todoList.find(
    (todo) => todo.todo === createInput.value.trim()
  );
  if (isExist) return errorHandler("Can't Create Duplicate");

  const newTodo = {
    id: generateId(),
    todo: createInput.value.trim(),
    selected: false,
  };
  todoList.push(newTodo);
  crateTodo(newTodo);
  localStorage.setItem(todoLocalStorage, JSON.stringify(todoList));
  createInput.value = "";
});

const displayTodo = (data) => {
  if (data.length > 0 || todoList.length > 0)
    return todoList.map((todo) => crateTodo(todo));
};

//--------------------------------------------------------helpers
//--------------------------------------------------------helpers
//generate id
const generateId = () => {
  return `#${Math.random().toString(16).slice(2) + new Date().getSeconds()}`;
};

//error handler
const errorHandler = (error) => {
  errorHtml.innerHTML = error;
  createInput.style.border += "solid 2px #f43f5e";

  setTimeout(() => {
    errorHtml.innerHTML = "";
    createInput.style.border = "";
  }, 3000);
};

const crateTodo = (todo) => {
  //create dom element
  const li = document.createElement("li");
  const todoInput = document.createElement("input");
  const actionContainer = document.createElement("div");
  const selectButton = document.createElement("button");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  //add styles
  li.className =
    "h-10 rounded-md mt-10 flex justify-between items-center px-2 bg-gray-50";
  todoInput.className =
    "font-semibold text-gray-500 h-10 w-full px-3 outline-none bg-transparent rounded-md";
  actionContainer.className = "flex items-center space-x-3";
  selectButton.className =
    "h-10 z-10 uppercase font-semibold text-sm text-gray-500";
  editButton.className =
    "h-10 z-10 uppercase font-semibold text-sm text-gray-500";
  deleteButton.className =
    "h-10 z-10 uppercase font-semibold text-sm text-red-500";

  //set attributes,values,dataset,innerText,innerHtml
  todoInput.readOnly = true;
  todoInput.value = "";
  todoInput.value = `${todo.todo}`;
  li.dataset.id = todo.id;
  li.appendChild(todoInput);

  selectButton.innerText = todo.selected ? `Selected` : "Select";
  editButton.innerHTML = `Edit`;
  deleteButton.innerHTML = `Delete`;

  //all todo actions
  li.addEventListener("click", function (event) {
    const item = event.target.parentElement.parentElement;
    const action = event.target.innerText;
    const id = item.dataset.id;

    /**
     * if action type select or selected
     */
    if (action === "SELECT" || "SELECTED") {
      selectButton.innerText = action === "SELECT" ? "SELECTED" : "SELECT";
      const todoList = JSON.parse(localStorage.getItem(todoLocalStorage));
      const itemIndex = todoList.findIndex((todo) => todo.id === id);
      todoList[itemIndex].selected = !todoList[itemIndex].selected;
      localStorage.setItem(todoLocalStorage, JSON.stringify(todoList));
    }

    /**
     * if action type edit or save find selected element and customize
     */
    if (action === "EDIT" || "SAVE") {
      const inputField = item.childNodes[0];
      const actionsContainer = item.childNodes[1];
      if (action === "EDIT") {
        editButton.innerText = "SAVE";
        inputField.readOnly = false;
        inputField.style.border = "1px solid gray";

        actionsContainer.childNodes[0].style.display = "none";
        actionsContainer.childNodes[2].style.display = "none";
      } else if (action === "SAVE") {
        const todoData = JSON.parse(localStorage.getItem(todoLocalStorage));
        const itemIndex = todoData.findIndex((todo) => todo.id === id);
        todoData[itemIndex].todo = todoInput.value;
        localStorage.setItem(todoLocalStorage, JSON.stringify(todoData));

        editButton.innerText = "EDIT";
        inputField.readOnly = true;
        inputField.style.border = "";
        actionsContainer.childNodes[0].style.display = "block";
        actionsContainer.childNodes[2].style.display = "block";
      }
    }

    /**
     * if action type delete then remove dom(todo element)
     */
    if (action === "DELETE") {
      item.remove();
      const newTodo = JSON.parse(localStorage.getItem(todoLocalStorage)).filter(
        (todo) => todo.id !== id
      );
      localStorage.setItem(todoLocalStorage, JSON.stringify(newTodo));
    }
  });

  actionContainer.appendChild(selectButton);
  actionContainer.appendChild(editButton);
  actionContainer.appendChild(deleteButton);
  li.appendChild(actionContainer);
  todoContainer.append(li);
};
displayTodo(todoList);
