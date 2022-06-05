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

  const li = document.createElement("li");
  li.className =
    "h-10 rounded-md mt-10 flex justify-between items-center px-2 bg-gray-50";
  li.innerHTML = `<div class="font-semibold text-gray-500">${input.value}</div>`;

  const actionContainer = document.createElement("div");
  const selectButton = document.createElement("button");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  actionContainer.className = "flex items-center space-x-3";

  selectButton.innerText = "Select";
  editButton.innerHTML = "Edit";
  deleteButton.innerHTML = "Delete";

  selectButton.addEventListener("click", function (event) {
    const element = event.target;
    if (element.innerText === "Select") return (li.style.background = "#e0f9e0");
  });

  actionContainer.appendChild(selectButton);
  actionContainer.appendChild(editButton);
  actionContainer.appendChild(deleteButton);
  li.appendChild(actionContainer);
  todoContainer.append(li);
  input.value = "";
});

//--------------------------------------------------------helpers
//--------------------------------------------------------helpers
//error handler
const errorHandler = (error) => {
  errorHtml.innerHTML = error;
  input.style.border += "solid 2px #f43f5e";
  setTimeout(() => {
    errorHtml.innerHTML = "";
    input.style.border = "";
  }, 3000);
};
