const todoLocalStorage = "todo-list";
const todoList = localStorage.getItem(todoLocalStorage)
  ? JSON.parse(localStorage.getItem(todoLocalStorage))
  : [];
//-------------------------------------------------selectors
//-------------------------------------------------selectors
const todoContainer = document.getElementById("todo_container");
const form = document.getElementById("form");
const input = document.getElementById("input");
const errorHtml = document.getElementById("error");

//-------------------------------------------------create todo
//-------------------------------------------------create todo
form.addEventListener("submit", function (event) {
  event.preventDefault();
  //create conditions
  if (!input.value.trim()) {
    return errorHandler("Please Write Something");
  }
  const isExist = todoList.find((todo) => todo.todo === input.value.trim());
  if (isExist) return errorHandler("Can't Create Duplicate");

  const newTodo = {
    id: generateId(),
    todo: input.value.trim(),
    selected: false,
  };
  todoList.push(newTodo);
  crateTodo(newTodo);
  localStorage.setItem(todoLocalStorage, JSON.stringify(todoList));
  input.value = "";
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
  input.style.border += "solid 2px #f43f5e";

  setTimeout(() => {
    errorHtml.innerHTML = "";
    input.style.border = "";
  }, 3000);
};
//create todo element
const crateTodo = (todo) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  li.className =
    "h-10 rounded-md mt-10 flex justify-between items-center px-2 bg-gray-50";
  input.className =
    "font-semibold text-gray-500 h-10 w-full px-3 outline-none bg-transparent";
  input.readOnly = true;
  input.value = "";
  input.value = `${todo.todo}`;
  li.appendChild(input);
  const actionContainer = document.createElement("div");
  const selectButton = document.createElement("button");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  actionContainer.className = "flex items-center space-x-3";
  selectButton.className =
    "h-10 z-10 uppercase font-semibold text-sm text-gray-500";
  editButton.className =
    "h-10 z-10 uppercase font-semibold text-sm text-gray-500";
  deleteButton.className =
    "h-10 z-10 uppercase font-semibold text-sm text-red-500";
  li.dataset.id = todo.id;

  selectButton.innerText = todo.selected ? `Selected` : "Select";
  editButton.innerHTML = `Edit`;
  deleteButton.innerHTML = `Delete`;

  //todo button action
  li.addEventListener("click", function (event) {
    const item = event.target.parentElement.parentElement;
    const action = event.target.innerText;
    const id = item.dataset.id;
    if (action === "SELECT" || "SELECTED") {
      selectButton.innerText = action === "SELECT" ? "SELECTED" : "SELECT";
      const todoList = JSON.parse(localStorage.getItem(todoLocalStorage));
      const itemIndex = todoList.findIndex((todo) => todo.id === id);
      todoList[itemIndex].selected = !todoList[itemIndex].selected;
      localStorage.setItem(todoLocalStorage, JSON.stringify(todoList));
    }
    if (action === "EDIT" || "SAVE") {
      const inputField = item.childNodes[0];
      const actionsContainer = item.childNodes[1];
      if (action === "EDIT") {
        editButton.innerText = "SAVE";
        inputField.readOnly = false;
        inputField.style.border = "1px solid gray";

        actionsContainer.childNodes[0].style.display = "none";
        actionsContainer.childNodes[2].style.display = "none";
        return;
      } else {
        if (id) {
          const todoList = JSON.parse(localStorage.getItem(todoLocalStorage));
          const itemIndex = todoList.findIndex((todo) => todo.id === id);
          todoList[itemIndex].todo = input.value;
          localStorage.setItem(todoLocalStorage, JSON.stringify(todoList));

          editButton.innerText = "EDIT";
          inputField.readOnly = true;
          inputField.style.border = "";
          actionsContainer.childNodes[0].style.display = "block";
          actionsContainer.childNodes[2].style.display = "block";
        }
      }
    }
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
